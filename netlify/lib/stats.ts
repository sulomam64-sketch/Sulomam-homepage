import { homePlaylist } from '../../src/content/playlist.ts'
import { readDeployContext } from './store-name.ts'

export type PlayEvent = 'play' | 'complete'

export type DayCounts = {
  plays: number
  completions: number
}

export type TrackCounts = {
  plays: number
  completions: number
  days: Record<string, DayCounts>
}

export type CounterStore = {
  get(key: string): Promise<{ data: unknown; etag: string | null } | null>
  /** Create the key only when it is absent. Returns false if it already exists. */
  setNew(key: string, value: TrackCounts): Promise<boolean>
  /**
   * Replace the key when `etag` still matches.
   * A null etag writes unconditionally (the store could not offer a version).
   */
  compareAndSet(key: string, value: TrackCounts, etag: string | null): Promise<boolean>
}

export type TrackReport = {
  id: string
  title: string
  plays: number
  completions: number
  days: Record<string, DayCounts>
}

export type StatsReport = {
  generatedAt: string
  timezone: 'Asia/Tokyo'
  context: string
  totals: DayCounts
  tracks: TrackReport[]
}

const MAX_ATTEMPTS = 8
const DAY_KEY = /^\d{4}-\d{2}-\d{2}$/

export function dayKey(date: Date, timeZone = 'Asia/Tokyo'): string {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(date)
    const year = parts.find((part) => part.type === 'year')?.value
    const month = parts.find((part) => part.type === 'month')?.value
    const day = parts.find((part) => part.type === 'day')?.value
    if (year && month && day) return `${year}-${month}-${day}`
  } catch {
    // Fall through to UTC.
  }
  return date.toISOString().slice(0, 10)
}

function nonNegInt(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return 0
  return Math.min(Math.floor(value), Number.MAX_SAFE_INTEGER)
}

function saturate(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  return Math.min(Math.floor(value), Number.MAX_SAFE_INTEGER)
}

export function emptyCounts(): TrackCounts {
  return { plays: 0, completions: 0, days: {} }
}

export function normalizeCounts(raw: unknown): TrackCounts {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return emptyCounts()
  const record = raw as Record<string, unknown>
  const days: Record<string, DayCounts> = {}
  if (record.days && typeof record.days === 'object' && !Array.isArray(record.days)) {
    for (const [key, value] of Object.entries(record.days as Record<string, unknown>)) {
      if (!DAY_KEY.test(key)) continue
      if (!value || typeof value !== 'object' || Array.isArray(value)) continue
      const day = value as Record<string, unknown>
      days[key] = {
        plays: nonNegInt(day.plays),
        completions: nonNegInt(day.completions),
      }
    }
  }
  return {
    plays: nonNegInt(record.plays),
    completions: nonNegInt(record.completions),
    days,
  }
}

function applyEvent(current: TrackCounts, event: PlayEvent, day: string): TrackCounts {
  const previous = current.days[day] ?? { plays: 0, completions: 0 }
  const playInc = event === 'play' ? 1 : 0
  const completeInc = event === 'complete' ? 1 : 0
  return {
    plays: saturate(current.plays + playInc),
    completions: saturate(current.completions + completeInc),
    days: {
      ...current.days,
      [day]: {
        plays: saturate(previous.plays + playInc),
        completions: saturate(previous.completions + completeInc),
      },
    },
  }
}

export async function incrementTrack(
  store: CounterStore,
  trackId: string,
  event: PlayEvent,
  now = new Date(),
): Promise<void> {
  const day = dayKey(now)
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const current = await store.get(trackId)
    const next = applyEvent(normalizeCounts(current?.data), event, day)
    if (!current) {
      if (await store.setNew(trackId, next)) return
      continue
    }
    if (await store.compareAndSet(trackId, next, current.etag)) return
  }
  throw new Error('play counter could not commit an update')
}

function sortedDays(days: Record<string, DayCounts>): Record<string, DayCounts> {
  const sorted: Record<string, DayCounts> = {}
  for (const key of Object.keys(days).sort()) {
    const value = days[key]
    if (value) sorted[key] = value
  }
  return sorted
}

export async function loadReport(
  store: CounterStore,
  now = new Date(),
  context = readDeployContext(),
): Promise<StatsReport> {
  const tracks = await Promise.all(
    homePlaylist.map(async (track) => {
      const entry = await store.get(track.id)
      const counts = normalizeCounts(entry?.data)
      return {
        id: track.id,
        title: track.title,
        plays: counts.plays,
        completions: counts.completions,
        days: sortedDays(counts.days),
      }
    }),
  )
  const totals = tracks.reduce(
    (sum, track) => ({
      plays: sum.plays + track.plays,
      completions: sum.completions + track.completions,
    }),
    { plays: 0, completions: 0 },
  )
  return {
    generatedAt: now.toISOString(),
    timezone: 'Asia/Tokyo',
    context,
    totals,
    tracks,
  }
}

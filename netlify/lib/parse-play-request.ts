import { homePlaylist } from '../../src/content/playlist.ts'
import type { PlayEvent } from './stats.ts'

const knownTrackIds = new Set(homePlaylist.map((track) => track.id))

export function parsePlayRequest(body: unknown): { trackId: string; event: PlayEvent } | null {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null
  const record = body as Record<string, unknown>
  const { trackId, event } = record
  if (typeof trackId !== 'string' || !knownTrackIds.has(trackId)) return null
  if (event !== 'play' && event !== 'complete') return null
  return { trackId, event }
}

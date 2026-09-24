import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createPlayRecorder, trackIdFromAudioSrc } from '../../src/components/playCounter.ts'
import { credentialFromRequest, isAuthorized } from './auth.ts'
import { isCrossSite } from './request-guards.ts'
import { parsePlayRequest } from './parse-play-request.ts'
import { renderStatsPage } from './stats-page.ts'
import { playStoreName } from './store-name.ts'
import {
  dayKey,
  emptyCounts,
  incrementTrack,
  loadReport,
  normalizeCounts,
  type CounterStore,
  type TrackCounts,
} from './stats.ts'

function memoryStore(options?: { conflictOnce?: boolean }): CounterStore & {
  read(key: string): TrackCounts | undefined
} {
  const rows = new Map<string, { data: TrackCounts; etag: string }>()
  let seq = 0
  let conflictOnce = options?.conflictOnce ?? false
  return {
    read(key) {
      const row = rows.get(key)
      return row ? structuredClone(row.data) : undefined
    },
    async get(key) {
      const row = rows.get(key)
      if (!row) return null
      return { data: structuredClone(row.data), etag: row.etag }
    },
    async setNew(key, value) {
      if (rows.has(key)) return false
      seq += 1
      rows.set(key, { data: structuredClone(value), etag: String(seq) })
      return true
    },
    async compareAndSet(key, value, etag) {
      const row = rows.get(key)
      if (!row || etag == null || row.etag !== etag) return false
      if (conflictOnce) {
        conflictOnce = false
        row.data = {
          ...row.data,
          plays: row.data.plays + 1,
        }
        seq += 1
        row.etag = String(seq)
        return false
      }
      seq += 1
      rows.set(key, { data: structuredClone(value), etag: String(seq) })
      return true
    },
  }
}

describe('dayKey', () => {
  it('uses Asia/Tokyo calendar dates', () => {
    assert.equal(dayKey(new Date('2026-09-24T14:30:00.000Z')), '2026-09-24')
    assert.equal(dayKey(new Date('2026-09-24T15:30:00.000Z')), '2026-09-25')
  })
})

describe('incrementTrack', () => {
  it('counts a play and a completion on the Tokyo day', async () => {
    const store = memoryStore()
    const when = new Date('2026-09-24T15:30:00.000Z')
    await incrementTrack(store, 'shimmercloud-amb-inst', 'play', when)
    await incrementTrack(store, 'shimmercloud-amb-inst', 'complete', when)
    assert.deepEqual(store.read('shimmercloud-amb-inst'), {
      plays: 1,
      completions: 1,
      days: { '2026-09-25': { plays: 1, completions: 1 } },
    })
  })

  it('retries when another write wins the compare-and-swap', async () => {
    const store = memoryStore({ conflictOnce: true })
    await incrementTrack(store, 'rin-r6b-ballade', 'play', new Date('2026-09-24T01:00:00.000Z'))
    await incrementTrack(store, 'rin-r6b-ballade', 'play', new Date('2026-09-24T01:00:00.000Z'))
    assert.equal(store.read('rin-r6b-ballade')?.plays, 3)
  })

  it('repairs a corrupt blob instead of throwing', async () => {
    const store = memoryStore()
    await store.setNew('wander-hiphop-track-demo', emptyCounts())
    const current = await store.get('wander-hiphop-track-demo')
    assert.ok(current)
    await store.compareAndSet(
      'wander-hiphop-track-demo',
      { plays: -4, completions: Number.NaN, days: { bad: { plays: 1, completions: 0 } } } as unknown as TrackCounts,
      current.etag,
    )
    await incrementTrack(store, 'wander-hiphop-track-demo', 'play', new Date('2026-09-01T00:00:00.000Z'))
    const next = normalizeCounts(store.read('wander-hiphop-track-demo'))
    assert.equal(next.plays, 1)
    assert.equal(next.completions, 0)
    assert.deepEqual(next.days, { '2026-09-01': { plays: 1, completions: 0 } })
  })
})

describe('loadReport', () => {
  it('lists every playlist track, including ones with no plays', async () => {
    const previous = process.env.CONTEXT
    process.env.CONTEXT = 'production'
    try {
      const store = memoryStore()
      await incrementTrack(store, 'undoor-remix', 'play', new Date('2026-09-24T00:00:00.000Z'))
      const report = await loadReport(store, new Date('2026-09-24T03:00:00.000Z'))
      assert.equal(report.context, 'production')
      assert.equal(report.timezone, 'Asia/Tokyo')
      assert.equal(report.tracks.length, 6)
      assert.equal(report.totals.plays, 1)
      assert.equal(report.tracks.find((track) => track.id === 'undoor-remix')?.plays, 1)
      assert.equal(report.tracks.find((track) => track.id === 'rin-r6b-ballade')?.plays, 0)
    } finally {
      if (previous === undefined) delete process.env.CONTEXT
      else process.env.CONTEXT = previous
    }
  })
})

describe('parsePlayRequest', () => {
  it('accepts known tracks and rejects everything else', () => {
    assert.deepEqual(parsePlayRequest({ trackId: 'pocketmonster-show-op', event: 'play' }), {
      trackId: 'pocketmonster-show-op',
      event: 'play',
    })
    assert.equal(parsePlayRequest({ trackId: 'not-a-track', event: 'play' }), null)
    assert.equal(parsePlayRequest({ trackId: 'rin-r6b-ballade', event: 'pause' }), null)
    assert.equal(parsePlayRequest(['rin-r6b-ballade']), null)
    assert.equal(parsePlayRequest(null), null)
  })
})

describe('auth', () => {
  it('matches the secret without accepting blanks or the wrong value', () => {
    assert.equal(isAuthorized('correct-horse', 'correct-horse'), true)
    assert.equal(isAuthorized('wrong', 'correct-horse'), false)
    assert.equal(isAuthorized('correct-horse', ''), false)
    assert.equal(isAuthorized('correct-horse', undefined), false)
    assert.equal(isAuthorized(null, 'correct-horse'), false)
    assert.equal(isAuthorized('x'.repeat(513), 'x'.repeat(513)), false)
  })

  it('reads the header, then bearer, then the query key', () => {
    const header = new Request('https://sulomam.com/stats?key=from-query', {
      headers: { 'x-play-stats-key': ' from-header ' },
    })
    assert.equal(credentialFromRequest(header), 'from-header')
    const bearer = new Request('https://sulomam.com/api/play-stats?key=from-query', {
      headers: { authorization: 'Bearer from-bearer' },
    })
    assert.equal(credentialFromRequest(bearer), 'from-bearer')
    const query = new Request('https://sulomam.com/stats?key=from-query')
    assert.equal(credentialFromRequest(query), 'from-query')
  })
})

describe('request guards', () => {
  it('flags cross-site browser posts and allows same-origin ones', () => {
    const cross = new Request('https://sulomam.com/api/play', {
      headers: { origin: 'https://evil.example', host: 'sulomam.com' },
    })
    assert.equal(isCrossSite(cross), true)
    const same = new Request('https://sulomam.com/api/play', {
      headers: { origin: 'https://sulomam.com', host: 'sulomam.com' },
    })
    assert.equal(isCrossSite(same), false)
    const fetchSite = new Request('https://sulomam.com/api/play', {
      headers: { 'sec-fetch-site': 'cross-site', origin: 'https://sulomam.com', host: 'sulomam.com' },
    })
    assert.equal(isCrossSite(fetchSite), true)
    const curl = new Request('https://sulomam.com/api/play')
    assert.equal(isCrossSite(curl), false)
  })
})

describe('playStoreName', () => {
  it('keeps production separate from previews and local dev', () => {
    assert.equal(playStoreName('production'), 'play-counts')
    assert.equal(playStoreName('deploy-preview'), 'play-counts-deploy-preview')
    assert.equal(playStoreName('dev'), 'play-counts-dev')
    assert.equal(playStoreName(''), 'play-counts-dev')
  })
})

describe('stats page', () => {
  it('escapes titles and includes noindex', () => {
    const html = renderStatsPage({
      generatedAt: '2026-09-24T00:00:00.000Z',
      timezone: 'Asia/Tokyo',
      context: 'production',
      totals: { plays: 2, completions: 1 },
      tracks: [
        {
          id: 'rin-r6b-ballade',
          title: 'RIN <script> & co',
          plays: 2,
          completions: 1,
          days: { '2026-09-24': { plays: 2, completions: 1 } },
        },
      ],
    })
    assert.match(html, /noindex/)
    assert.match(html, /RIN &lt;script&gt; &amp; co/)
    assert.doesNotMatch(html, /<script>/)
    assert.match(html, />2</)
  })
})

describe('client recorder', () => {
  it('sends one play and one completion per track and ignores sender failures', () => {
    const bodies: string[] = []
    const record = createPlayRecorder((body) => {
      bodies.push(body)
    })
    record('sin-jazzhiphop-demo', 'play')
    record('sin-jazzhiphop-demo', 'play')
    record('sin-jazzhiphop-demo', 'complete')
    record('', 'play')
    assert.equal(bodies.length, 2)
    assert.deepEqual(parsePlayRequest(JSON.parse(bodies[0] ?? 'null')), {
      trackId: 'sin-jazzhiphop-demo',
      event: 'play',
    })
    assert.deepEqual(parsePlayRequest(JSON.parse(bodies[1] ?? 'null')), {
      trackId: 'sin-jazzhiphop-demo',
      event: 'complete',
    })

    const failing = createPlayRecorder(() => {
      throw new Error('network down')
    })
    assert.doesNotThrow(() => failing('rin-r6b-ballade', 'play'))
  })

  it('maps absolute audio URLs back to playlist ids', () => {
    const tracks = [{ id: 'shimmercloud-amb-inst', src: '/audio/ShimmerCloud_amb_inst.mp3' }]
    assert.equal(
      trackIdFromAudioSrc('https://sulomam.com/audio/ShimmerCloud_amb_inst.mp3', tracks),
      'shimmercloud-amb-inst',
    )
    assert.equal(trackIdFromAudioSrc('/audio/ShimmerCloud_amb_inst.mp3', tracks), 'shimmercloud-amb-inst')
    assert.equal(trackIdFromAudioSrc('https://sulomam.com/audio/missing.mp3', tracks), null)
    assert.equal(trackIdFromAudioSrc('', tracks), null)
  })
})

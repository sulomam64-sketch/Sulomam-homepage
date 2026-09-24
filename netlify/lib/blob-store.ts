import { getStore } from '@netlify/blobs'
import type { CounterStore, TrackCounts } from './stats.ts'
import { playStoreName } from './store-name.ts'

export function blobCounterStore(): CounterStore {
  const store = getStore({ name: playStoreName(), consistency: 'strong' })
  return {
    async get(key) {
      const entry = await store.getWithMetadata(key, { type: 'json', consistency: 'strong' })
      if (!entry) return null
      return { data: entry.data, etag: entry.etag ?? null }
    },
    async setNew(key, value: TrackCounts) {
      const result = await store.setJSON(key, value, { onlyIfNew: true })
      return result.modified
    },
    async compareAndSet(key, value: TrackCounts, etag) {
      if (!etag) {
        await store.setJSON(key, value)
        return true
      }
      const result = await store.setJSON(key, value, { onlyIfMatch: etag })
      return result.modified
    },
  }
}

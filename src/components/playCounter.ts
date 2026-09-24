export type PlayEventName = 'play' | 'complete'

type TrackRef = {
  id: string
  src: string
}

/** Map an `<audio>` src (absolute or site-relative) back to a playlist id. */
export function trackIdFromAudioSrc(src: string, tracks: readonly TrackRef[]): string | null {
  if (!src) return null
  let pathname = src
  try {
    pathname = new URL(src, 'https://sulomam.com').pathname
  } catch {
    return null
  }
  let decoded = pathname
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    decoded = pathname
  }
  return tracks.find((track) => track.src === decoded)?.id ?? null
}

/**
 * Fire-and-forget play/complete reporter.
 * Each event is sent at most once per track for the lifetime of this recorder
 * (one page load, while the module stays alive).
 */
export function createPlayRecorder(send: (body: string) => void) {
  const seen = new Set<string>()
  return (trackId: string, event: PlayEventName) => {
    if (!trackId) return
    const key = `${event}\0${trackId}`
    if (seen.has(key)) return
    let body: string
    try {
      body = JSON.stringify({ trackId, event })
    } catch {
      return
    }
    seen.add(key)
    try {
      send(body)
    } catch {
      // A failed report must never surface to the player.
    }
  }
}

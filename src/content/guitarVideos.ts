export type GuitarVideo = {
  id: string
  title: string
  artist: string
  /**
   * Optional YouTube lesson. Paste an 11-character id or a full URL, for example:
   * `xxxxxxxxxxx`
   * `https://www.youtube.com/watch?v=xxxxxxxxxxx`
   * `https://youtu.be/xxxxxxxxxxx`
   * Leave it unset and the card shows a coming-soon state. Nothing links out to Instagram.
   */
  youtube?: string
  /** Optional image in `public/`, e.g. `/guitar/eleanor.jpg`. Hidden once a lesson embed is set. */
  thumbnail?: string
  note?: string
  /**
   * `upcoming` is a teaser (no lesson line) until `youtube` is set.
   * Any other card with no `youtube` shows the lesson coming-soon line.
   */
  status?: 'ready' | 'upcoming'
}

/** Footer profile. Arrangement lessons are not Instagram links. */
export const guitarTikTok = {
  handle: '@sulomam',
  url: 'https://www.tiktok.com/@sulomam',
} as const

const YOUTUBE_ID = /^[\w-]{11}$/

/** Pull a YouTube id out of a bare id or a watch / share / embed URL. */
export function youtubeVideoId(value: string | undefined): string | null {
  const trimmed = value?.trim()
  if (!trimmed) return null
  if (YOUTUBE_ID.test(trimmed)) return trimmed
  try {
    const url = new URL(trimmed)
    const host = url.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0] ?? ''
      return YOUTUBE_ID.test(id) ? id : null
    }
    if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'music.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      const fromQuery = url.searchParams.get('v') ?? ''
      if (YOUTUBE_ID.test(fromQuery)) return fromQuery
      const fromPath = url.pathname.match(/\/(?:embed|shorts|live)\/([\w-]{11})/)
      return fromPath ? fromPath[1] : null
    }
  } catch {
    return null
  }
  return null
}

export const guitarVideos: GuitarVideo[] = [
  {
    id: 'eleanor-rigby',
    title: 'Eleanor Rigby',
    artist: 'The Beatles',
    note: "Based on Jacob's version / standard tuning",
  },
  {
    id: 'redbone',
    title: 'Redbone',
    artist: 'Childish Gambino',
    note: 'Still on the stand.',
    status: 'upcoming',
  },
]

/**
 * Cards actually rendered in the solo arrangements section.
 * Empty for now. Assign `guitarVideos` (or a subset) to show them again.
 */
export const visibleGuitarVideos: readonly GuitarVideo[] = []

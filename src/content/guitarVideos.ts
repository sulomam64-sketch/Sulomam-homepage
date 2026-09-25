import { siteConfig } from './config'

export type GuitarVideoPlatform = 'instagram' | 'tiktok' | 'youtube'

export type GuitarVideo = {
  id: string
  title: string
  artist: string
  platform: GuitarVideoPlatform
  /**
   * Exact reel or video URL.
   * Paste over the profile link when you have it, for example:
   * https://www.instagram.com/reel/XXXXXXXXXXX/
   * https://www.tiktok.com/@sulomam/video/XXXXXXXX
   * https://youtu.be/XXXXXXXX
   * Cards stay plain links — no Instagram embed.
   */
  url: string
  /** Optional image in `public/`, e.g. `/guitar/eleanor.jpg`. Omit for a text card. */
  thumbnail?: string
  note?: string
  /**
   * `upcoming` is a teaser and does not link out, even if `url` is filled in.
   * Switch to `ready` (or omit) when the video should be tappable.
   */
  status?: 'ready' | 'upcoming'
}

/** Footer / profile. Reel URLs belong on each video's `url`, not here. */
export const guitarTikTok = {
  handle: '@sulomam',
  url: 'https://www.tiktok.com/@sulomam',
} as const

const platformName: Record<GuitarVideoPlatform, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
}

export function guitarPlatformName(platform: GuitarVideoPlatform): string {
  return platformName[platform]
}

/** Link text. Profile URLs use `watchOn`; a pasted reel URL uses `watchReel`. */
export function guitarWatchLabel(
  video: GuitarVideo,
  labels: { watchOn: string; watchReel: string; watch: string },
): string {
  const platform = platformName[video.platform]
  if (/\/(reel|p|tv)\//.test(video.url)) return labels.watchReel
  if (/tiktok\.com\/@[^/]+\/video\//.test(video.url)) return labels.watch
  if (/youtube\.com|youtu\.be/.test(video.url)) return labels.watch
  return labels.watchOn.replaceAll('{platform}', platform)
}

export const guitarVideos: GuitarVideo[] = [
  {
    id: 'eleanor-rigby',
    title: 'Eleanor Rigby',
    artist: 'The Beatles',
    platform: 'instagram',
    url: siteConfig.instagram.url,
    note: "Based on Jacob's version / standard tuning",
    status: 'ready',
  },
  {
    id: 'redbone',
    title: 'Redbone',
    artist: 'Childish Gambino',
    platform: 'instagram',
    url: siteConfig.instagram.url,
    note: 'Still on the stand.',
    status: 'upcoming',
  },
]

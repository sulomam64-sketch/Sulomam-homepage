/**
 * Scale practice clips for /guitar.
 *
 * The section stays in a "coming soon" state until at least one item has a real URL.
 * Paste an Instagram, TikTok, or YouTube link into `url` — empty strings are ignored.
 *
 * Example:
 * {
 *   id: 'minor-pentatonic-box-1',
 *   title: 'Minor pentatonic, box 1',
 *   url: 'https://www.instagram.com/reel/XXXXXXXX/',
 *   note: 'Standard tuning',
 * }
 */
export type ScalePracticeVideo = {
  id: string
  title: string
  /** Instagram, TikTok, or YouTube URL. Leave '' until the clip is up. */
  url: string
  note?: string
}

export const scalePracticeVideos: ScalePracticeVideo[] = []

export function scalePlatformLabel(url: string): string {
  if (url.includes('instagram.com')) return 'Instagram'
  if (url.includes('tiktok.com')) return 'TikTok'
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube'
  return 'Video'
}

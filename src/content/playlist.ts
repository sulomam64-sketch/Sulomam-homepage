export type PlaylistTrack = {
  id: string
  title: string
  artist: string
  src: string
  cover?: string
}

/** Homepage Listen playlist. Replace demo files in `public/audio/` — see that folder’s README. */
export const homePlaylist: PlaylistTrack[] = [
  {
    id: 'demo-neo-fusion',
    title: 'Demo — Neo Fusion',
    artist: 'Sulomam',
    src: '/audio/demo-neo-fusion.mp3',
  },
  {
    id: 'demo-jazz-guitar',
    title: 'Demo — Jazz guitar',
    artist: 'Sulomam',
    src: '/audio/demo-jazz-guitar.mp3',
  },
  {
    id: 'demo-track-sketch',
    title: 'Demo — Track sketch',
    artist: 'Sulomam',
    src: '/audio/demo-track-sketch.mp3',
  },
]

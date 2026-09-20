export type PlaylistTrack = {
  id: string
  title: string
  artist: string
  src: string
  cover?: string
}

/** Homepage Listen playlist. Drop files in `public/audio/` — see that folder’s README. */
export const homePlaylist: PlaylistTrack[] = [
  {
    id: 'pocketmonster-show-op',
    title: 'pocketmonster_show_op',
    artist: 'Sulomam',
    src: '/audio/pocketmonster_show_op.mp3',
  },
  {
    id: 'shimmercloud-amb-inst',
    title: 'ShimmerCloud_amb_inst',
    artist: 'Sulomam',
    src: '/audio/ShimmerCloud_amb_inst.mp3',
  },
  {
    id: 'undoor-dancer',
    title: 'Undoor_danceR',
    artist: 'Sulomam',
    src: '/audio/Undoor_danceR.mp3',
  },
]

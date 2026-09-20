# Audio demos

Drop original MP3 or WAV files in this folder, then point each track `src` in [`src/content/playlist.ts`](../../src/content/playlist.ts).

```ts
{
  id: 'neo-fusion',
  title: 'Neo Fusion',
  artist: 'Sulomam',
  src: '/audio/neo-fusion.mp3',
  cover: '/audio/neo-fusion.jpg', // optional
}
```

Vite serves `public/` at the site root, so `/audio/your-file.mp3` maps to `public/audio/your-file.mp3`.

## Current files

- `pocketmonster_show_op.mp3`
- `ShimmerCloud_amb_inst.mp3`
- `UNDOOR_REMIX.mp3`

Do **not** add client masters you are not allowed to host. Works / YouTube credits stay on the Work page.

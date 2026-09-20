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

`demo-neo-fusion.mp3`, `demo-jazz-guitar.mp3`, and `demo-track-sketch.mp3` are short test tones so the Listen player is demoable. Replace them with real **original** demos.

Do **not** add client masters or commercial tracks here. Works / YouTube credits stay on the Work page.

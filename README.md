# Sulomam Homepage

Jimdo の [sulomam.com](https://www.sulomam.com/) 置き換え用サイト（第1弾）。

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

成果物は `dist/` です。

## 設定

- お問い合わせ宛先・Instagram: `src/content/config.ts`
- Listen プレイリスト: `src/content/playlist.ts`（MP3 は `public/audio/` — 入れ方はそこの README）
- 多言語文言: `src/i18n/messages/`（`ja` / `en` / `zh` / `ko` / `es`）
- Works のタイトル等（固有名詞）: `src/content/config.ts`
- **GNA 記事一覧:** [`src/content/gnaNotes.ts`](src/content/gnaNotes.ts)

## 再生回数（非公開）

デモ曲の再生開始（と最後まで聴いた回数）を Netlify Blobs に数えます。サイト上の見た目は変わりません。リンクも置きません。

`PLAY_STATS_KEY` を Netlify の環境変数に入れるまで、集計の閲覧 URL は 404 です。カウント用の `POST /api/play` 自体は鍵なしで動きます。

1. Netlify → プロジェクト `sulomam-homepage` → **Project configuration → Environment variables**
2. `PLAY_STATS_KEY` を追加する。値はクエリに載せやすい秘密文字列（例: `openssl rand -hex 24`）
3. スコープは **Functions / Runtime**（ビルド専用だと関数から読めません）。Production と、プレビューでも見るなら Deploy Previews も選ぶ
4. 保存したあと **再デプロイ**する

閲覧（鍵が違っても未設定でも 404）:

```text
https://sulomam.com/api/play-stats?key=YOUR_KEY
https://sulomam.com/stats?key=YOUR_KEY
```

ヘッダーでも同じです: `x-play-stats-key: YOUR_KEY`（または `Authorization: Bearer YOUR_KEY`）。

日別の日付は日本時間です。Deploy Preview の数字は本番とは別ストアなので、プレビューで再生しても本番の合計は増えません。

## GNA 記事の書き方

1. **日本語**は [note](https://note.com/) で公開
2. **英語**は同じテーマを [Substack](https://substack.com/) で公開（完全一致の翻訳でなくてよい）
3. 両URLを [`src/content/gnaNotes.ts`](src/content/gnaNotes.ts) の `noteUrl` / `substackUrl` に貼る（新規なら行を追加）
4. GitHub に push → Netlify が反映（未連携ならデプロイを依頼）

サイトの `/gna` は目次です。本文は note（日本語）と Substack（英語）側に置きます。

## デプロイ / Jimdo 退会

- Netlify: [`netlify.toml`](netlify.toml) + [`public/_redirects`](public/_redirects)
- Vercel: [`vercel.json`](vercel.json)（予備）
- **Netlify 公開 → ドメイン移管 → Jimdo 退会** の手順: **[MIGRATION.md](MIGRATION.md)**

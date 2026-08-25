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
- 多言語文言: `src/i18n/messages/`（`ja` / `en` / `zh` / `ko` / `es`）
- Works のタイトル等（固有名詞）: `src/content/config.ts`
- **GNA 記事一覧:** [`src/content/gnaNotes.ts`](src/content/gnaNotes.ts)（本文は note）

## GNA 記事の書き方

1. [note](https://note.com/) で記事を書く・公開する
2. 公開URLを [`src/content/gnaNotes.ts`](src/content/gnaNotes.ts) の `noteUrl` に貼る（新規なら行を追加）
3. GitHub に push → Netlify が反映（未連携ならデプロイを依頼）

サイトの `/gna` は目次（タイトル・要約・note へのリンク）です。本文は note 側に置きます。

## デプロイ / Jimdo 退会

- Netlify: [`netlify.toml`](netlify.toml) + [`public/_redirects`](public/_redirects)
- Vercel: [`vercel.json`](vercel.json)（予備）
- **Netlify 公開 → ドメイン移管 → Jimdo 退会** の手順: **[MIGRATION.md](MIGRATION.md)**

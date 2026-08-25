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
- **GNA 記事一覧:** [`src/content/gnaNotes.ts`](src/content/gnaNotes.ts)

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

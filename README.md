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

- お問い合わせ宛先・Instagram: `src/content/config.ts`（`contactEmail` は公開前に本番アドレスへ）
- 多言語文言: `src/i18n/messages/`（`ja` / `en` / `zh` / `ko` / `es`）
- Works のタイトル等（固有名詞）: `src/content/config.ts`

## デプロイ / Jimdo 退会

- Netlify: [`netlify.toml`](netlify.toml) + [`public/_redirects`](public/_redirects)
- Vercel: [`vercel.json`](vercel.json)（予備）
- **Netlify 公開 → ドメイン移管 → Jimdo 退会** の手順: **[MIGRATION.md](MIGRATION.md)**

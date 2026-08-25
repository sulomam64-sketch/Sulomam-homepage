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
- **GNA 記事（日本語）:** `content/gna/*.md` — 本番では [/admin/](https://sulomam-homepage.netlify.app/admin/)（Decap CMS）から編集

## GNA 記事の書き方（本番）

1. **初回だけ** Netlify 管理画面で次を有効化（[プロジェクト設定](https://app.netlify.com/projects/sulomam-homepage)）:
   - **Project configuration → Identity → Enable Identity** → Invite users で自分のメールを招待
   - Identity → **Services → Git Gateway → Enable**
   - **Project configuration → Build & deploy → Continuous deployment → Link repository** → GitHub の `Sulomam-homepage`（branch: `main`）
2. https://sulomam-homepage.netlify.app/admin/ を開く
3. 招待メールで登録／ログイン
4. **GNA 記事** → New → タイトル・日付・本文 → Publish
5. 数分後に `/gna` に反映

ローカルで Markdown を直接編集する場合: `content/gna/*.md` を編集して push。

## デプロイ / Jimdo 退会

- Netlify: [`netlify.toml`](netlify.toml) + [`public/_redirects`](public/_redirects)
- Vercel: [`vercel.json`](vercel.json)（予備）
- **Netlify 公開 → ドメイン移管 → Jimdo 退会** の手順: **[MIGRATION.md](MIGRATION.md)**

# Jimdo 退会に向けた移管手順（Netlify）

方針: **先にサイトを Netlify で公開 → `sulomam.com` を Jimdo から Netlify Domains へ移管 → 安定後に Jimdo 退会**。

このリポジトリは既に Netlify 向け設定済みです（[`netlify.toml`](netlify.toml) / [`public/_redirects`](public/_redirects)）。

---

## フェーズ 0 — サイト側の準備

1. [`src/content/config.ts`](src/content/config.ts) の `contactEmail` を **本番の受信メール**に変更する（いまはプレースホルダ）
2. GitHub にこのリポジトリを push する（未作成なら新規 repo を作成）
3. ローカルで `npm run build` が通ることを確認

---

## フェーズ 1 — Netlify にサイト公開（仮URL）

1. [Netlify](https://app.netlify.com/) にログイン（GNA 制作時のアカウント）
2. **Add new site** → **Import an existing project** → GitHub の `sulomam-homepage` を選択
3. ビルド設定（`netlify.toml` があれば自動）:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. デプロイ完了後、`https://xxxx.netlify.app` で確認
   - Home / Work / GNA / Contact
   - 言語切替・ナイトモード
   - `/work` を直接開いても 404 にならないこと（SPA）
5. この時点ではまだ独自ドメインを接続しなくてよい

---

## フェーズ 2 — Jimdo でドメイン移管の準備

Jimdo 管理画面で次を実施（メニュー名はプランにより異なる）:

1. **ドメインのロック解除**（Transfer lock / レジストリロックを OFF）
2. **Whois / 登録者メール**が届く実アドレスか確認
3. **Auth Code（認証コード / EPP）を取得**して控える
4. **WHOIS プライバシーを一時 OFF**（移管失敗の定番原因）
5. ドメイン取得から **60 日未満**でないか確認（未満だと移管不可のことが多い）
6. `@sulomam.com` のメールを使っている場合は、移管後の **MX レコード**方針をメモ（メール継続なら MX を消さない）

Jimdo ヘルプの「ドメイン移管」「レジストラ変更」も併読する。

---

## フェーズ 3 — Netlify Domains へ移管

1. Netlify → **Domains** → **Transfer a domain**（表記は Transfer domain など）
2. `sulomam.com` を入力し、Jimdo の **Auth Code** を入力
3. 移管費用・更新年を確認して開始
4. 登録者メールに届く **承認リンクを必ずクリック**
5. 完了まで **数日〜最大およそ 5〜7 日**かかることがある
6. 完了後、Netlify Domains に `sulomam.com` が表示されることを確認

よくある止まりどころ: Auth Code 期限切れ / ロック再 ON / 承認メール未クリック / 取得 60 日未満。

---

## フェーズ 4 — サイトにドメインを接続

1. 公開したサイト → **Domain management** → **Add custom domain**
2. `sulomam.com` と `www.sulomam.com` を追加
3. Netlify Domains 管理下なら、画面の指示どおり **Netlify DNS** に揃える
4. HTTPS（証明書）が **Active / Provisioned** になるまで待つ
5. スマホ・別回線で `https://sulomam.com` が新サイトか確認

---

## フェーズ 5 — Jimdo 退会

1. 新サイト安定後、**数日〜1週間**は様子を見る
2. 問題なければ Jimdo の有料プラン解約・退会
3. Instagram 等の URL が `sulomam.com` なら変更不要

ドメイン移管後、Jimdo 上の旧サイトは別URLになることが多い。切り戻し用にしばらく残す。

---

## 注意

- 移管（レジストラ変更）と「DNS だけ付け替え」は別物。退会前提なので **移管**で進める
- Web 用の A / CNAME と、メール用の **MX を混同しない**
- Web SHOP は新サイト未実装

## エージェントが代行できないこと

Jimdo / Netlify へのログイン、Auth Code 取得、移管申請・承認は **ご自身の操作が必要**です。

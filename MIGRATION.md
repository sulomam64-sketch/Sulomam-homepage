# Jimdo 退会に向けた移管手順（Cloudflare → Netlify）

方針: **サイトは Netlify で公開済み → `sulomam.com` を Jimdo から Cloudflare へ移管 → Cloudflare DNS で Netlify に接続 → 安定後に Jimdo 退会**。

重要: **Netlify は他社からのドメイン移管（レジストラ転入）を受け付けません。** Auth Code の移管先は Cloudflare です。

仮URL: https://sulomam-homepage.netlify.app  
問い合わせ先: `sulomam@sulomam.com`（移管・DNS変更時も **MX を消さない**）

---

## フェーズ 0〜1 — 完了

- [x] `contactEmail` 本番化・GitHub push・ビルド
- [x] Netlify 公開（sulomam-homepage）
- [x] Jimdo から Auth Code 取得

---

## フェーズ 2 — Cloudflare へ移管（いまここ）

1. https://dash.cloudflare.com/ でアカウント作成／ログイン
2. 左メニュー **Domain registration**（ドメイン登録）→ **Transfer**（移管）
   - 見当たらない場合: ダッシュボード検索で `Transfer domains`、または  
     https://dash.cloudflare.com/?to=/:account/domains/transfer
3. ドメインに `sulomam.com` を入力
4. Jimdo の **Auth Code（EPP）** を入力
5. 連絡先・支払いを確認（移管時に更新年が付くことが多い）
6. 申請開始
7. 登録者メールに **承認** が来たら必ずクリック
8. 完了まで数日かかることがある。Cloudflare に `sulomam.com` が表示されたら成功

公式: [Transfer a domain to Cloudflare](https://developers.cloudflare.com/registrar/get-started/transfer-domain-to-cloudflare/)

止まりどころ: Auth Code 期限切れ / Jimdo 側ロック / 取得 60 日未満 / 承認メール未クリック。

---

## フェーズ 3 — Netlify にサイト接続

移管完了後:

1. [sulomam-homepage](https://app.netlify.com/projects/sulomam-homepage) → **ドメイン管理** → **Add a domain**
2. `sulomam.com` と `www.sulomam.com` を追加
3. Netlify が表示する DNS 値を控える
4. Cloudflare → 対象ドメイン → **DNS** でレコード設定
   - サイト用（A / CNAME 等）は Netlify の指示どおり
   - **既存の MX は削除・変更しない**（メール継続）
5. つながりにくい場合、対象レコードのプロキシを **DNS only（灰色雲）** にして再確認
6. Netlify で HTTPS が Active になるまで待つ
7. 別端末で `https://sulomam.com` が新サイトか確認

---

## フェーズ 4 — Jimdo 退会

1. 新サイト安定後、数日〜1週間様子を見る
2. Jimdo の有料プラン解約・退会
3. ドメインは Cloudflare 管理のまま残る

---

## エージェントが代行できないこと

Cloudflare / Jimdo / Netlify へのログイン、移管申請・支払い・承認、DNS の本番変更は **ご自身の操作が必要**です。Cloudflare の移管画面スクショや「申請した／完了した」連絡をもらえれば、次のクリックを案内します。

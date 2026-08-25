# Jimdo 退会に向けた移管手順（Netlify）

方針: **先にサイトを Netlify で公開 → `sulomam.com` を Jimdo から Netlify Domains へ移管 → 安定後に Jimdo 退会**。

このリポジトリは既に Netlify 向け設定済みです（[`netlify.toml`](netlify.toml) / [`public/_redirects`](public/_redirects)）。

仮URL: https://sulomam-homepage.netlify.app  
問い合わせ先: `sulomam@sulomam.com`（移管後も **MX を消さない**）

---

## フェーズ 0 — サイト側の準備（完了）

- [x] `contactEmail` を本番アドレスへ
- [x] GitHub へ push
- [x] `npm run build` 確認

---

## フェーズ 1 — Netlify にサイト公開（完了）

- [x] https://sulomam-homepage.netlify.app で公開済み

---

## フェーズ 2 — Jimdo で Auth Code 取得（いまここ）

Jimdo で取得した `.com` ドメインは、画面だけで Auth Code が出ないことが多く、**サポートへ「ドメイン移管申請」メッセージを送る**のが定番です。

### 手順

1. Jimdo にログインし、`sulomam.com` を使っているサイトの編集画面を開く
2. **管理メニュー → サポート → 新規メッセージ**
3. 件名: `ドメイン移管申請` / カテゴリ: `ドメイン`
4. 本文に次をコピーして埋める:

```
ご契約者名 ：（Jimdo契約者の氏名）
ご契約ドメイン名(移管希望のドメイン)：sulomam.com
対象ドメイン移管に同意しますか：はい
Admin-C (ドメインの管理者メールアドレス) メールアドレス：（Whois/管理者に登録している受信可能なメール）
移管先の指定事業者番号（AGNT-○○○○）：（.com のため不要。空欄で可）
ドメイン移管の目的について：他ホームページサービスで使用するために移管
（補足：Netlify Domains へ移管し、公式サイトを Netlify で公開するため）
ドメインのオプション解約に同意します：同意する
```

5. 送信後、**数日以内**に Jimdo から Auth Code がメールで届くことが多い
6. 届いた Auth Code を控える（期限切れに注意）
7. 取得から **60 日未満**のドメインは移管できないことが多い

参考: [Jimdo — Authcode の取得](https://help.jimdo-dolphin.com/hc/ja/articles/360000775083)

AI ビルダー画面の場合は、独自ドメイン横の `⋮` →「ドメインを移管する」から申請できることもあります。どちらの UI でも、最終的に管理者メールへ Auth Code が届きます。

---

## フェーズ 3 — Netlify Domains へ移管

1. [Netlify Domains](https://app.netlify.com/teams/) → **Domains** → **Transfer a domain**（表記は Transfer domain など）
2. `sulomam.com` と Jimdo の **Auth Code** を入力
3. 移管費用・更新年を確認して開始
4. 登録者メールに届く **承認リンクを必ずクリック**
5. 完了まで **数日〜最大およそ 5〜7 日**かかることがある
6. 完了後、Netlify Domains に `sulomam.com` が表示されることを確認

よくある止まりどころ: Auth Code 期限切れ / 承認メール未クリック / 取得 60 日未満。

---

## フェーズ 4 — サイトにドメインを接続

1. [sulomam-homepage](https://app.netlify.com/projects/sulomam-homepage) → **Domain management** → **Add custom domain**
2. `sulomam.com` と `www.sulomam.com` を追加
3. Netlify Domains 管理下なら、画面の指示どおり **Netlify DNS** に揃える
4. **MX（メール）は触らない** — `sulomam@sulomam.com` を継続するため
5. HTTPS（証明書）が **Active / Provisioned** になるまで待つ
6. スマホ・別回線で `https://sulomam.com` が新サイトか確認

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

Jimdo / Netlify へのログイン、サポートへの移管申請、Auth Code の受領、移管申請・承認は **ご自身の操作が必要**です。Auth Code が届いたらチャットに共有（または「取れた」と連絡）してもらえれば、次の Netlify 操作を案内します。

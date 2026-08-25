import type { Messages } from './types'

export const ja: Messages = {
  site: {
    brand: 'Sulomam',
    tagline: 'Touch of Sound',
    headline: '音に、手触りを。',
    description: '作編曲・ギター・MIX。用途に合わせて個別にお見積もりします。',
    languageLabel: '言語',
    themeLabel: '表示',
    themeLight: 'ライト',
    themeDark: 'ナイト',
    nav: [
      { to: '/', label: 'Home' },
      { to: '/work', label: 'Work' },
      { to: '/gna', label: 'GNA' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  layout: {
    navAria: 'メイン',
    instagram: 'Instagram',
  },
  home: {
    consultCta: '無料で相談する',
    worksCta: 'Works を見る',
    servicesHeading: 'Skills',
    intro: {
      eyebrow: 'About',
      title: 'About',
      paragraphs: [
        'ギタリスト / 作編曲家 / MIX エンジニアの Sulomam です。',
        'BGM や CM、ライブ用トラック、既存曲のアレンジや MIX など、案件ごとに内容を決めて進めています。',
        '料金表は設けず、ヒアリングのうえでお見積もりします。',
      ],
    },
    services: [
      {
        id: 'compose-arrange',
        title: '作曲・編曲',
        description: 'BGM、CM、オープニング、フル尺トラックなど。用途と尺に合わせて組み立てます。',
      },
      {
        id: 'mix',
        title: 'MIX / 仕上げ',
        description: '既存素材の MIX、Vox EDIT、リリースや映像に載せられる状態までの仕上げ。',
      },
      {
        id: 'guitar',
        title: 'ギター演奏・REC',
        description: 'アコギ / エレキの演奏・REC。トラックへの重ねや、演奏感の補強。',
      },
      {
        id: 'direction',
        title: 'ディレクション・相談',
        description:
          '方向性の整理、リファレンスの読み解き、AI 生成素材のブラッシュアップも含めご相談ください。',
      },
      {
        id: 'live-support',
        title: 'Live サポート',
        description: 'ライブ・セッション向けの演奏サポートや、現場／リモートでの音まわりの手伝い。',
      },
    ],
    consult: {
      eyebrow: 'Consultation',
      title: '相談から始めましょう',
      lead: '決まった料金表はありません。用途・尺・納期・いま手元にある素材を伺ったうえで、個別にお見積もりします。',
      points: [
        'メールや Zoom など、まずは無料で打ち合わせ可能です',
        '「こういう映像に音が欲しい」「デモはあるが仕上げたい」など、途中からの相談も歓迎です',
        'AI で作った下書きがある場合も、アレンジ・演奏・MIX で一緒に仕上げられます',
      ],
    },
    closing: {
      title: 'おわりに',
      body: 'まずは無料の打ち合わせで、曲の方向性とお見積もりをお伝えします。お気軽にご相談ください。',
      aside: 'アレンジのみ、MIX のみ、ギター Rec のみなど、部分的なお仕事も歓迎です。',
      cta: 'Contact',
    },
  },
  work: {
    eyebrow: 'Work',
    title: 'Works',
    lead: '楽曲製作・アレンジ・クレジットの一部です。',
    production: 'Production',
    guitar: 'Guitar play',
    subtitles: {
      'pokemon-we-move': 'ポケモン公式 YouTube より',
      nomura: '"あなたの夢を動かそう"',
    },
    descriptions: {
      'pokemon-we-move': 'オープニング / ドローン show。株式会社 ioly 様で製作致しました。',
      sawayaka: 'さわやか信用金庫 20周年記念「サワヤカショートストーリー」音楽を製作致しました。',
      dsj: '「人の力」特設サイト向け MV 音楽を製作致しました。',
      graphite: 'CM（SC 放送と Web にて 2021/8 公開）',
      nogizaka: 'dance 用楽曲制作',
      tohoshinki: '共作クレジット',
      'koda-tour': 'Soundpark との共同製作',
      'koda-lit': 'live 用アレンジ（Soundpark との共同製作）',
      nomura: '楽曲製作（Soundpark との共同製作）',
      pocky: '楽曲製作（Soundpark との共同製作）',
      yuma: '作曲・アレンジ',
      'drama-cd': 'サウンドトラック製作',
      nakamura: '楽曲アレンジ',
      root9: '楽曲提供',
      'naitetamaruka-heli': '作曲・アレンジ・mix',
      'naitetamaruka-rainbow': '作曲・アレンジ・mix',
      'nakamura-guitar': 'Percussive Agt',
      'heartbeat-unlock': 'ギター参加',
      'grateful-dead': 'Egt',
      gaki: 'Guitar',
      'yusuke-hana': 'm5 花唄 (Guitar)',
      'yusuke-history': 'm10 History III (Guitar)',
      'heartbeat-kaori': 'you are the universe ~自分を信じて~ (Agt＆Egt)',
    },
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Contact',
    lead: '無料で打ち合わせ（メール / Zoom 等）にて方向性とお見積もりをいたします。お気軽にご相談ください。',
    name: 'お名前 *',
    email: 'メールアドレス *',
    message: 'メッセージ *',
    note: '送信するとメーラーが開きます。宛先は下記アドレスです。',
    submit: 'メールを開く',
    mailSubject: '[Sulomam] お問い合わせ',
    mailUntitled: '無題',
    mailName: 'お名前',
    mailEmail: 'メール',
  },
  gna: {
    eyebrow: 'GNA',
    title: 'GNA 使い方講座',
    lead: 'ギターナビゲーションアシスタント（GNA）の画面の見方と、練習の進め方を短くまとめます。アプリを開きながら読む想定です。',
    intro: {
      id: 'intro',
      title: 'GNA とは',
      body: [
        'GNA は、ギターの指板上でコード・スケール・キーを眺めながら練習するためのナビです。',
        '触ったキーやスケール、連続練習の記録が残り、「いま自分の地図がどこまで広がったか」を確認できます。',
        'まずは一つのキー・一つの形から触り、慣れてきたら隣のポジションや別キーへ広げていく使い方が向いています。',
      ],
    },
    lessons: [
      {
        id: 'chords',
        title: '講座 1 — コード',
        body: [
          'コード画面では、選択したコードの押さえを指板上で確認できます。',
          'クリック（タップ）でフレットの ON/OFF、右クリック（長押し）でミュート（×）を切り替えられます。',
          '空の指板から押弦を足していくモードでは、形を作りながらコード名の判別も追えます。まずは開放に近い基本形を一つ覚え、同じコードを別ポジションでも出せるかを試すと定着しやすいです。',
        ],
      },
      {
        id: 'scales',
        title: '講座 2 — スケール',
        body: [
          'スケール画面では、スケール内の音が指板全体に表示されます。黄色がルート、ほかがスケール音です。マスをタップすると音が鳴ります。',
          'ペンタトニックは Box（ボックス）単位で表示できます。枠を ON にすると「いまの箱」が見え、矢印で隣の箱へ移れます。',
          'CAGED の考え方と組み合わせると、「同じスケールでも枠をずらしてポジションを変える」練習がしやすくなります。最初は一つの Box だけでフレーズを作り、慣れたら隣の Box へつなぎましょう。',
        ],
      },
      {
        id: 'keys',
        title: '講座 3 — キー（ダイアトニック）',
        body: [
          'ダイアトニック画面では、聞こえたコードを入力すると、メジャー／ナチュラルマイナーなどキー候補を一覧できます。',
          '「この進行はどのキーか」を感覚だけで決めず、候補を見てから指板やスケール表示に戻ると、練習の目的がはっきりします。',
          '伴奏ループと組み合わせられる場合は、判別したキーでスケールを開き、同じキーのまま弾く練習につなげてください。',
        ],
      },
      {
        id: 'practice',
        title: '講座 4 — 練習と GNA 記録',
        body: [
          'クイズでは正解でスコアが加算され、連続正解でストリークが伸びます。短時間でも「確認テスト」として使うと記憶に残ります。',
          'GNA の記録画面では、触ったキーやスケール、CAGED 形、連続練習の積み上げを確認できます。五度円やグラフで「広がり」が見えます。',
          'おすすめの進め方: ① 今日はキーを一つ決める → ② コードかスケールを触る → ③ クイズで軽く確認 → ④ 記録で広がりを見る。毎日ぜんぶやる必要はなく、どれか一つでも地図は育ちます。',
        ],
      },
    ],
    termsHeading: '用語メモ',
    termsLead: 'アプリ内でよく出る言葉だけ、短く説明します。',
    terms: [
      {
        id: 'caged',
        term: 'CAGED',
        body: '開放弦に近い基本形（C・A・G・E・D）をネック上でずらして覚える枠組みです。同じコードでも形を変えるとポジションが変わります。',
      },
      {
        id: 'box',
        term: 'Box（ボックス）',
        body: 'ペンタトニックなどを、指が届く範囲の「箱」に分けたポジションです。枠を ON にすると選択中の箱が見え、隣の箱へ移れます。',
      },
      {
        id: 'diatonic',
        term: 'ダイアトニック',
        body: 'あるキーの音階から作られるコードや進行のことです。GNA では入力したコードからキー候補を判別できます。',
      },
      {
        id: 'fifths',
        term: '五度円',
        body: '隣り合うキーが完全五度で並ぶ図です。スキルマップでは触ったルートが点灯し、キーの広がりが一目でわかります。',
      },
      {
        id: 'degree',
        term: '度数',
        body: 'ルートから数えた音の距離（1度・3度・5度など）です。スケールやコードの役割を、音名ではなく関係で見るときに使います。',
      },
    ],
  },
}

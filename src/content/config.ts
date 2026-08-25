/** Non-translated site config */
export const siteConfig = {
  brand: 'Sulomam',
  /** Contact form mailto destination (from current sulomam.com). */
  contactEmail: 'sulomam@sulomam.com',
  instagram: {
    handle: '@sulomam_guitar',
    url: 'https://www.instagram.com/sulomam_guitar/',
  },
} as const

export type WorkMeta = {
  id: string
  title: string
  link?: { href: string; label: string }
  tracks?: string[]
}

export const productionWorkMeta: WorkMeta[] = [
  {
    id: 'pokemon-we-move',
    title: 'pokemon fantastic Live Show "We Move" 2023',
  },
  { id: 'sawayaka', title: 'さわやか信用金庫 様' },
  {
    id: 'dsj',
    title: 'ディエスジャパン 様',
    link: { href: 'https://dsj.co.jp/hitonochikara/', label: 'dsj.co.jp/hitonochikara' },
  },
  { id: 'graphite', title: 'グラファイトデザイン 様' },
  { id: 'nogizaka', title: '乃木坂46 真夏の全国ツアー final 2021' },
  {
    id: 'tohoshinki',
    title: '東方神起 Remix アルバム "Two of Us"',
    tracks: [
      'm4 Sweat (Agt & アレンジ)（藤田 剛との共作）',
      'm9 Ocean (Agt & アレンジ)（藤田 剛との共作）',
    ],
  },
  {
    id: 'koda-tour',
    title: '倖田來未 LIVE TOUR 2016 ~Best Single Collection~',
    tracks: ['m5 メドレーアレンジ'],
  },
  { id: 'koda-lit', title: '倖田來未 "LIT"' },
  { id: 'nomura', title: '野村證券 × ニッセイ・ウェルス生命 SPECIAL MOVIE' },
  { id: 'pocky', title: 'ポッキーパーティー Project 特設 MOVIE' },
  {
    id: 'yuma',
    title: '麻美ゆま "SCAR Light EP"',
    tracks: [
      'm1 SCAR Light (作曲,アレンジ)',
      'm2 ギリ☆ギリMY WAY (作曲,アレンジ)',
      'm3 Let it Roll (作曲,アレンジ)',
      'm4 Try Again (アレンジ)',
      'm5 Ceres (作曲,アレンジ)',
      "m6 Don't Look Back (作曲,アレンジ)",
    ],
  },
  { id: 'drama-cd', title: 'ドラマCD "魔導師は平凡を望む"' },
  { id: 'nakamura', title: '中村月子 "みんな知ってる"' },
  { id: 'root9', title: '√9 (ルートナイン) "愛してると叫べ"' },
  {
    id: 'naitetamaruka-heli',
    title: '泣いてたまるか!! "ヘリクリサム"',
    tracks: [
      'm1 ヘリクリサム (作曲 (佐々木卓馬と共作)、アレンジ、mix)',
      'm2 JACKALL (作曲、アレンジ、mix)',
      'm3 いのちのしるし (mix)',
      'm4 祈り紙 (作曲、アレンジ、mix)',
      'm5 絆 (作曲 (佐々木卓馬と共作)、アレンジ、mix)',
    ],
  },
  {
    id: 'naitetamaruka-rainbow',
    title: '泣いてたまるか!! "Rainbow"',
    tracks: [
      'm1 GO JAHL (作曲,アレンジ、mix)',
      'm2 Dry River Bed (アレンジ、mix)',
      'm3 Cloud 9 (アレンジ、mix)',
      'm4 ぬくもり (アレンジ,mix)',
      'm5 Drop (作曲,アレンジ、mix)',
      'm6 Rainey (作曲,アレンジ,mix)',
      'm7 RAINBOW (アレンジ、mix)',
      'm8 一番好きな人 (アレンジ、mix)',
    ],
  },
]

export const guitarWorkMeta: WorkMeta[] = [
  { id: 'nakamura-guitar', title: '中村月子 "記憶の園に"' },
  {
    id: 'heartbeat-unlock',
    title: 'HeartBeat(ハービー) EP "Unlock"',
    tracks: [
      'm1 are U ready!? (Agt＆Egt)',
      'm2 酔いちくれDISCO (Agt＆Egt)',
      'm3 my hands (Agt＆Egt)',
      "m4 I'll be waiting (Agt＆Egt)",
      'm5 ママチャリライダー (Agt)',
    ],
  },
  { id: 'grateful-dead', title: 'HeartBeat — 映画グレイトフルデッド主題歌 "PARADIDE"' },
  {
    id: 'gaki',
    title: '餓鬼レンジャー',
    tracks: [
      'm3 TACO DANCE',
      'm4 そんなんじゃない',
      'm8 RANGER SHOW',
      'm16 yes!!',
      'm17 BOOM! ~発車します~',
      'm18 GO GO 浄土',
    ],
  },
  { id: 'yusuke-hana', title: '遊助 "お前しかいねぇ" 遊turing RED RICE' },
  { id: 'yusuke-history', title: '遊助 "あの..旅の途中なんですケド。"' },
  { id: 'heartbeat-kaori', title: 'HeartBeat & DJ KAORI' },
]

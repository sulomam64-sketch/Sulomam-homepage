/** GNA articles: Japanese on note, English on Substack. */
export type GnaNoteArticle = {
  id: string
  titleJa: string
  titleEn: string
  date: string
  summaryJa: string
  summaryEn: string
  /** note.com URL (Japanese). Empty until published. */
  noteUrl: string
  /** Substack URL (English). Empty until published. */
  substackUrl: string
}

export const gnaNoteArticles: GnaNoteArticle[] = [
  {
    id: 'why-gna',
    titleJa: '指板で迷子になる人へ。GNAを一人で作った理由',
    titleEn: 'Why I built GNA alone',
    date: '2026-08-28',
    summaryJa:
      'スケール帳・コード帳・キー判別を別々に開いていた練習を、ひとつの指板にまとめた理由。',
    summaryEn:
      'Why I merged scale books, chord charts, and key detection onto one fretboard.',
    noteUrl: 'https://note.com/sulomam_gna/n/n28f50c26ac10',
    substackUrl: '',
  },
  {
    id: 'closed-test',
    titleJa: 'GNA（ギターナビゲーションアシスタント）Androidクローズドテスト、テスター募集',
    titleEn: 'GNA Android closed test — testers wanted',
    date: '2026-08-28',
    summaryJa:
      'Google Play クローズドテスト参加者を募集。無料・課金なし・広告なし。Android 1.0.18。',
    summaryEn:
      'Recruiting Google Play closed-test participants. Free, no ads. Android 1.0.18.',
    noteUrl: 'https://note.com/sulomam_gna/n/nd735e8ab6458',
    substackUrl: '',
  },
  {
    id: 'chords',
    titleJa: '講座 1 — コード',
    titleEn: 'Lesson 1 — Chords',
    date: '2024-01-02',
    summaryJa: 'コード画面で押さえを確認し、基本形から別ポジションへ広げる。',
    summaryEn: 'Check fingerings on the chord screen, then move beyond open-position shapes.',
    noteUrl: '',
    substackUrl: '',
  },
  {
    id: 'scales',
    titleJa: '講座 2 — スケール',
    titleEn: 'Lesson 2 — Scales',
    date: '2024-01-03',
    summaryJa: 'スケール音の表示、Box、CAGED を使ったポジション練習。',
    summaryEn: 'Scale tones on the neck, Boxes, and CAGED-based position practice.',
    noteUrl: '',
    substackUrl: '',
  },
  {
    id: 'keys',
    titleJa: '講座 3 — キー（ダイアトニック）',
    titleEn: 'Lesson 3 — Keys (diatonic)',
    date: '2024-01-04',
    summaryJa: '聞こえたコードからキー候補を見つけ、練習の目的をはっきりさせる。',
    summaryEn: 'Find key candidates from chords you hear, then practice with a clear goal.',
    noteUrl: '',
    substackUrl: '',
  },
  {
    id: 'practice',
    titleJa: '講座 4 — 練習と GNA 記録',
    titleEn: 'Lesson 4 — Practice & GNA log',
    date: '2024-01-05',
    summaryJa: 'クイズと記録画面で、短い確認テストと地図の広がりを見る。',
    summaryEn: 'Use quizzes and the log to check progress and see how your map grows.',
    noteUrl: '',
    substackUrl: '',
  },
]

export function getGnaNoteArticles(): GnaNoteArticle[] {
  return [...gnaNoteArticles].sort(
    (a, b) => b.date.localeCompare(a.date) || a.titleJa.localeCompare(b.titleJa, 'ja'),
  )
}

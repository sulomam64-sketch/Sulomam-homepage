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
    id: 'what-is-gna',
    titleJa: 'GNA とは',
    titleEn: 'What is GNA?',
    date: '2024-01-01',
    summaryJa: 'ギターの指板上でコード・スケール・キーを眺めながら練習するためのナビです。',
    summaryEn: 'A fretboard navigator for practicing chords, scales, and keys.',
    noteUrl: '',
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

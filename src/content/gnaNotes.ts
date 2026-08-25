/** GNA articles published on note. Add a new row when you publish. */
export type GnaNoteArticle = {
  id: string
  title: string
  date: string
  summary: string
  /** note.com article URL. Empty = listed as pending until you paste the link. */
  noteUrl: string
}

export const gnaNoteArticles: GnaNoteArticle[] = [
  {
    id: 'what-is-gna',
    title: 'GNA とは',
    date: '2024-01-01',
    summary: 'ギターの指板上でコード・スケール・キーを眺めながら練習するためのナビです。',
    noteUrl: '',
  },
  {
    id: 'chords',
    title: '講座 1 — コード',
    date: '2024-01-02',
    summary: 'コード画面で押さえを確認し、基本形から別ポジションへ広げる。',
    noteUrl: '',
  },
  {
    id: 'scales',
    title: '講座 2 — スケール',
    date: '2024-01-03',
    summary: 'スケール音の表示、Box、CAGED を使ったポジション練習。',
    noteUrl: '',
  },
  {
    id: 'keys',
    title: '講座 3 — キー（ダイアトニック）',
    date: '2024-01-04',
    summary: '聞こえたコードからキー候補を見つけ、練習の目的をはっきりさせる。',
    noteUrl: '',
  },
  {
    id: 'practice',
    title: '講座 4 — 練習と GNA 記録',
    date: '2024-01-05',
    summary: 'クイズと記録画面で、短い確認テストと地図の広がりを見る。',
    noteUrl: '',
  },
]

export function getGnaNoteArticles(): GnaNoteArticle[] {
  return [...gnaNoteArticles].sort(
    (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'ja'),
  )
}

import { Link, Navigate, useParams } from 'react-router-dom'
import { getGnaPost } from '../content/gnaPosts'
import { useI18n } from '../i18n'
import './GnaPage.css'

function formatDate(iso: string, locale: string): string {
  if (!iso) return ''
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function GnaPostPage() {
  const { slug = '' } = useParams()
  const { t, locale } = useI18n()
  const post = getGnaPost(slug)

  if (!post) {
    return <Navigate to="/gna" replace />
  }

  return (
    <article className="page gna-article">
      <header className="page-header">
        <p className="eyebrow">{t.gna.eyebrow}</p>
        <p className="gna-post-date">
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        </p>
        <h1 className="page-title">{post.title}</h1>
      </header>

      <div
        className="page-section gna-article-body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <p className="page-section gna-back">
        <Link to="/gna">{t.gna.backToList}</Link>
      </p>
    </article>
  )
}

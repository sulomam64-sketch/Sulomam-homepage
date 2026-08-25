import { Link } from 'react-router-dom'
import { getGnaPosts } from '../content/gnaPosts'
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

export function GnaPage() {
  const { t, locale } = useI18n()
  const { gna } = t
  const posts = getGnaPosts()

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">{gna.eyebrow}</p>
        <h1 className="page-title">{gna.title}</h1>
        <p className="section-lead">{gna.lead}</p>
        {locale !== 'ja' ? <p className="gna-posts-note">{gna.postsNote}</p> : null}
      </header>

      <section className="page-section gna-posts" aria-label={gna.postsHeading}>
        <h2 className="page-section-title">{gna.postsHeading}</h2>
        {posts.length === 0 ? (
          <p className="gna-para">{gna.emptyPosts}</p>
        ) : (
          <ul className="gna-post-list">
            {posts.map((post) => (
              <li key={post.slug} className="gna-post-item">
                <time className="gna-post-date" dateTime={post.date}>
                  {formatDate(post.date, locale)}
                </time>
                <h3 className="gna-post-title">
                  <Link to={`/gna/${post.slug}`}>{post.title}</Link>
                </h3>
                {post.summary ? <p className="gna-post-summary">{post.summary}</p> : null}
                <Link className="gna-post-more" to={`/gna/${post.slug}`}>
                  {gna.readMore}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="page-section gna-terms">
        <h2 className="page-section-title">{gna.termsHeading}</h2>
        <p className="gna-terms-lead">{gna.termsLead}</p>
        <dl className="gna-term-list">
          {gna.terms.map((item) => (
            <div key={item.id} className="gna-term">
              <dt>{item.term}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}

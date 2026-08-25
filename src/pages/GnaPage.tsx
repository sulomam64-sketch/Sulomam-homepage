import { getGnaNoteArticles } from '../content/gnaNotes'
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
  const articles = getGnaNoteArticles()

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
        {articles.length === 0 ? (
          <p className="gna-para">{gna.emptyPosts}</p>
        ) : (
          <ul className="gna-post-list">
            {articles.map((article) => (
              <li key={article.id} className="gna-post-item">
                <time className="gna-post-date" dateTime={article.date}>
                  {formatDate(article.date, locale)}
                </time>
                <h3 className="gna-post-title">
                  {article.noteUrl ? (
                    <a href={article.noteUrl} target="_blank" rel="noreferrer">
                      {article.title}
                    </a>
                  ) : (
                    article.title
                  )}
                </h3>
                {article.summary ? <p className="gna-post-summary">{article.summary}</p> : null}
                {article.noteUrl ? (
                  <a
                    className="gna-post-more"
                    href={article.noteUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {gna.openOnNote}
                  </a>
                ) : (
                  <span className="gna-post-pending">{gna.pendingNote}</span>
                )}
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

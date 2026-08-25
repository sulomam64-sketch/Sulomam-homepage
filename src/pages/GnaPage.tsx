import { useI18n } from '../i18n'
import './GnaPage.css'

export function GnaPage() {
  const { t } = useI18n()
  const { gna } = t

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">{gna.eyebrow}</p>
        <h1 className="page-title">{gna.title}</h1>
        <p className="section-lead">{gna.lead}</p>
      </header>

      <section className="page-section gna-lesson">
        <h2 className="page-section-title">{gna.intro.title}</h2>
        {gna.intro.body.map((paragraph) => (
          <p key={paragraph} className="gna-para">
            {paragraph}
          </p>
        ))}
      </section>

      {gna.lessons.map((lesson) => (
        <section key={lesson.id} className="page-section gna-lesson">
          <h2 className="page-section-title">{lesson.title}</h2>
          {lesson.body.map((paragraph) => (
            <p key={paragraph} className="gna-para">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

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

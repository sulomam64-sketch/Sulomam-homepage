import { Link } from 'react-router-dom'
import { lessonBookingPath, lessonLineUrl, lessonWhatsAppUrl } from '../content/lesson'
import type { LessonThanksCopy } from '../i18n/messages/types'
import { useNoIndex, usePageTitle } from './lesson/usePageMeta'
import './LessonPage.css'

export function LessonThanksPage({ copy, lang }: { copy: LessonThanksCopy; lang: 'ja' | 'en' }) {
  usePageTitle(copy.pageTitle)
  useNoIndex()

  return (
    <div className="page lesson-page lesson-thanks" lang={lang}>
      <header className="page-header">
        <p className="eyebrow">{lang === 'ja' ? 'Lesson' : 'Lessons'}</p>
        <h1 className="page-title">{copy.title}</h1>
      </header>

      <div className="page-section lesson-body">
        {copy.lead.map((paragraph) => (
          <p key={paragraph} className="lesson-text">
            {paragraph}
          </p>
        ))}
        {copy.items ? (
          <ol className="lesson-steps">
            {copy.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        ) : null}
        {copy.after?.map((paragraph) => (
          <p key={paragraph} className="lesson-text">
            {paragraph}
          </p>
        ))}

        <div className="lesson-actions">
          {lang === 'ja' ? (
            <Link className="btn btn-primary" to={lessonBookingPath}>
              {copy.cta}
            </Link>
          ) : (
            <a className="btn btn-primary" href={lessonWhatsAppUrl} target="_blank" rel="noopener noreferrer">
              {copy.cta}
            </a>
          )}
        </div>

        {copy.extra ? (
          <section className="lesson-section lesson-thanks-extra" aria-labelledby="lesson-thanks-extra">
            <h2 className="lesson-heading" id="lesson-thanks-extra">
              {copy.extra.heading}
            </h2>
            <p className="lesson-text">{copy.extra.body}</p>
            {lessonLineUrl !== '#' ? (
              <div className="lesson-actions lesson-actions-inline">
                <a className="btn btn-primary" href={lessonLineUrl} target="_blank" rel="noopener noreferrer">
                  {copy.extra.cta}
                </a>
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </div>
  )
}

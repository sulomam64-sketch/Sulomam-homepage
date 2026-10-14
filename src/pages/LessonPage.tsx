import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { lessonFreeTrialPath, lessonPathForLocale } from '../content/lesson'
import { lessonPayHref } from '../content/paymentLinks'
import { useI18n } from '../i18n'
import type { LessonPageCopy, LessonSection } from '../i18n/messages/types'
import { usePageTitle } from './lesson/usePageMeta'
import './LessonPage.css'

function PayLink({ id, label, primary, to }: { id: string; label: string; primary: boolean; to?: string }) {
  if (to) {
    return (
      <Link className={primary ? 'btn btn-primary' : 'btn btn-outline'} to={to}>
        {label}
      </Link>
    )
  }
  const href = lessonPayHref(id) ?? '#'
  const external = /^https?:\/\//i.test(href)
  return (
    <a
      className={primary ? 'btn btn-primary' : 'btn btn-outline'}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </a>
  )
}

function Section({ section, index }: { section: LessonSection; index: number }) {
  const headingId = `lesson-section-${index}`

  switch (section.kind) {
    case 'entrances':
      return (
        <nav className="lesson-entrances" aria-label={section.items.map((item) => item.title).join(' / ')}>
          {section.items.map((item) => (
            <a key={item.anchor} className="lesson-entrance" href={`#${item.anchor}`}>
              <span className="lesson-entrance-title">{item.title}</span>
              <span className="lesson-entrance-price">{item.price}</span>
              <span className="lesson-entrance-body">{item.body}</span>
              <span className="lesson-entrance-cta">{item.cta} ↓</span>
            </a>
          ))}
        </nav>
      )
    case 'part':
      return (
        <header className="lesson-part" id={section.anchor}>
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 className="lesson-part-title">{section.title}</h2>
          {section.lead ? <p className="lesson-text">{section.lead}</p> : null}
        </header>
      )
    case 'buttons':
      return (
        <div className="lesson-actions lesson-actions-inline">
          {section.items.map((button, buttonIndex) => (
            <PayLink
              key={button.id}
              id={button.id}
              label={button.label}
              to={button.to}
              primary={buttonIndex === 0}
            />
          ))}
        </div>
      )
    case 'list':
      return (
        <section className="lesson-section" aria-labelledby={headingId}>
          <h2 className="lesson-heading" id={headingId}>
            {section.heading}
          </h2>
          {section.lead ? <p className="lesson-text">{section.lead}</p> : null}
          <ul className="lesson-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )
    case 'text':
      return (
        <section className="lesson-section" aria-labelledby={headingId}>
          <h2 className="lesson-heading" id={headingId}>
            {section.heading}
          </h2>
          <p className="lesson-text">{section.body}</p>
        </section>
      )
    case 'plans':
      return (
        <section className="lesson-section" aria-labelledby={headingId}>
          <h2 className="lesson-heading" id={headingId}>
            {section.heading}
          </h2>
          <div className={section.plans.length > 1 ? 'lesson-plans cols-2' : 'lesson-plans'}>
            {section.plans.map((plan) => (
              <article key={plan.id} className="lesson-plan">
                <h3 className="lesson-plan-name">{plan.name}</h3>
                <p className="lesson-plan-price">{plan.price}</p>
                <p className="lesson-plan-body">{plan.body}</p>
                {plan.payLabel ? (
                  <p className="lesson-plan-pay">
                    <PayLink id={plan.id} label={plan.payLabel} primary={false} />
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      )
    case 'steps':
      return (
        <section className="lesson-section" aria-labelledby={headingId}>
          <h2 className="lesson-heading" id={headingId}>
            {section.heading}
          </h2>
          <ol className="lesson-steps">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          {section.after ? <p className="lesson-text lesson-steps-after">{section.after}</p> : null}
        </section>
      )
    case 'rules':
      return (
        <section className="lesson-section">
          <details className="lesson-details">
            <summary>{section.heading}</summary>
            <ul className="lesson-list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        </section>
      )
    case 'faq':
      return (
        <section className="lesson-section" aria-labelledby={headingId}>
          <h2 className="lesson-heading" id={headingId}>
            {section.heading}
          </h2>
          <div className="lesson-faq">
            {section.items.map((item) => (
              <details key={item.q} className="lesson-details">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )
    case 'trial':
      return (
        <section className="lesson-section lesson-trial" aria-labelledby={headingId}>
          <h2 className="lesson-heading" id={headingId}>
            {section.heading}
          </h2>
          <p className="lesson-trial-lead">{section.lead}</p>
          <p className="lesson-text">{section.body}</p>
          <ul className="lesson-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link className="btn btn-outline" to={section.to ?? lessonFreeTrialPath}>
            {section.cta}
          </Link>
        </section>
      )
  }
}

export function LessonPage({ copy, lang }: { copy: LessonPageCopy; lang: 'ja' | 'en' }) {
  const { locale } = useI18n()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const previousLocale = useRef(locale)

  usePageTitle(copy.pageTitle)

  useEffect(() => {
    if (previousLocale.current === locale) return
    previousLocale.current = locale
    const target = lessonPathForLocale(locale)
    if (target !== pathname) navigate(target, { replace: true })
  }, [locale, navigate, pathname])

  return (
    <div className="page lesson-page" lang={lang}>
      <header className="page-header">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="page-title">{copy.title}</h1>
        <p className="lesson-tagline">{copy.tagline}</p>
        {copy.intro.map((paragraph) => (
          <p key={paragraph} className="section-lead lesson-intro">
            {paragraph}
          </p>
        ))}
      </header>

      <div className="page-section lesson-body">
        {copy.sections.map((section, index) => (
          <Section key={`${section.kind}-${index}`} section={section} index={index} />
        ))}

        {copy.buttons.length > 0 ? (
          <div className="lesson-actions lesson-actions-stack">
            {copy.buttons.map((button, index) => (
              <PayLink
                key={button.id}
                id={button.id}
                label={button.label}
                to={button.to}
                primary={index === 0}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

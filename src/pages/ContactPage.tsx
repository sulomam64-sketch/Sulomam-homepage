import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { siteConfig } from '../content/config'
import { resolvePlanLabel } from '../content/plans'
import { useI18n } from '../i18n'
import './ContactPage.css'

const lessonPlanLabels: Record<string, { ja: string; en: string }> = {
  'video-chorus': { ja: '動画レッスン（1コーラス）', en: 'One Chorus Lesson' },
  'video-phrase': { ja: '動画レッスン（フレーズ）', en: 'Phrase Lesson' },
  'free-trial-jp': { ja: '無料体験レッスン（動画）', en: 'Free Trial Lesson (Japanese)' },
  'free-trial': { ja: '無料体験レッスン（動画）', en: 'Free Trial Lesson' },
  lesson: { ja: 'Zoomレッスン（曲と日時の連絡）', en: 'Zoom Lesson' },
  'zoom-60': { ja: 'Zoomレッスン60分', en: 'Zoom Lesson 60 min' },
  'zoom-30': { ja: 'Zoomレッスン30分', en: 'Zoom Lesson 30 min' },
}

export function ContactPage() {
  const { t, locale } = useI18n()
  const { contact } = t
  const [searchParams] = useSearchParams()
  const planId = searchParams.get('plan')
  const lessonLabel = planId ? lessonPlanLabels[planId] : undefined
  const planLabel =
    resolvePlanLabel(t, planId) ?? (lessonLabel ? lessonLabel[locale === 'ja' ? 'ja' : 'en'] : null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [draft, setDraft] = useState('')
  const [messageTouched, setMessageTouched] = useState(false)
  const defaultMessage = planLabel ? contact.planPrefill.replaceAll('{plan}', planLabel) : ''
  const message = messageTouched ? draft : defaultMessage

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subjectBits = [contact.mailSubject, planLabel, name || contact.mailUntitled].filter(
      Boolean,
    )
    const subject = encodeURIComponent(subjectBits.join(' — '))
    const body = encodeURIComponent(
      [`${contact.mailName}: ${name}`, `${contact.mailEmail}: ${email}`, '', message].join('\n'),
    )
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`
  }

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">{contact.eyebrow}</p>
        <h1 className="page-title">{contact.title}</h1>
        <p className="section-lead">{contact.lead}</p>
      </header>

      <form className="contact-form" onSubmit={handleSubmit}>
        {planLabel ? (
          <p className="selected-plan">
            {contact.selectedPlan}: <strong>{planLabel}</strong>
          </p>
        ) : null}
        <label className="field">
          <span>{contact.name}</span>
          <input
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="field">
          <span>{contact.email}</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="field">
          <span>{contact.message}</span>
          <textarea
            name="message"
            required
            rows={7}
            value={message}
            onChange={(e) => {
              setMessageTouched(true)
              setDraft(e.target.value)
            }}
          />
        </label>
        <p className="form-note">
          {contact.note} <code>{siteConfig.contactEmail}</code>
        </p>
        <button type="submit" className="btn btn-primary">
          {contact.submit}
        </button>
      </form>
    </div>
  )
}

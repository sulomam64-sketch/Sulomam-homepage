import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { siteConfig } from '../content/config'
import { resolveGuitarPlanLabel } from '../content/guitarPlans'
import { useI18n } from '../i18n'
import './ContactPage.css'

export function ContactPage() {
  const { t } = useI18n()
  const { contact } = t
  const [searchParams] = useSearchParams()
  const planLabel = resolveGuitarPlanLabel(t, searchParams.get('plan'))
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

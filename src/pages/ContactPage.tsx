import { useState, type FormEvent } from 'react'
import { siteConfig } from '../content/config'
import { useI18n } from '../i18n'
import './ContactPage.css'

export function ContactPage() {
  const { t } = useI18n()
  const { contact } = t
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = encodeURIComponent(
      `${contact.mailSubject} — ${name || contact.mailUntitled}`,
    )
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
            onChange={(e) => setMessage(e.target.value)}
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

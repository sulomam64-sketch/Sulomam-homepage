import { useState, type FormEvent } from 'react'
import { siteConfig } from '../../content/config'
import { useI18n } from '../../i18n'
import { around } from './fill'

const FORM_NAME = 'guitar-song-request'

export function SongRequestForm() {
  const { t } = useI18n()
  const copy = t.guitar
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorBefore, errorAfter] = around(copy.formError, 'handle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    if (String(data.get('bot-field') ?? '').trim()) {
      setStatus('sent')
      return
    }
    setStatus('sending')
    try {
      const body = new URLSearchParams()
      for (const [key, value] of data.entries()) {
        body.append(key, String(value))
      }
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error('form failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p className="guitar-thanks" role="status">
        {copy.thanks}
      </p>
    )
  }

  return (
    <form
      className="guitar-form"
      name={FORM_NAME}
      method="POST"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="guitar-hp" hidden>
        <label>
          {copy.honeypot}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      {status === 'error' ? (
        <p className="guitar-form-error" role="alert">
          {errorBefore}
          <a href={siteConfig.instagram.url} target="_blank" rel="noreferrer">
            {siteConfig.instagram.handle}
          </a>
          {errorAfter}
        </p>
      ) : null}
      <label className="guitar-field">
        <span>{copy.song}</span>
        <input name="song" required maxLength={200} autoComplete="off" />
      </label>
      <label className="guitar-field">
        <span>{copy.artist}</span>
        <input name="artist" required maxLength={200} autoComplete="off" />
      </label>
      <label className="guitar-field">
        <span>{copy.handle}</span>
        <input name="handle" maxLength={200} autoComplete="nickname" />
      </label>
      <label className="guitar-field">
        <span>{copy.message}</span>
        <textarea name="message" rows={4} maxLength={2000} />
      </label>
      <button type="submit" className="guitar-submit" disabled={status === 'sending'}>
        {status === 'sending' ? copy.sending : copy.submit}
      </button>
    </form>
  )
}

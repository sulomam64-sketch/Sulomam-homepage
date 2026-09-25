import { useState, type FormEvent } from 'react'
import { siteConfig } from '../../content/config'

const FORM_NAME = 'guitar-song-request'

export function SongRequestForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

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
        Got it. It’s on the list — I’ll read it when I sit down with the guitar.
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
          Don’t fill this out
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      {status === 'error' ? (
        <p className="guitar-form-error" role="alert">
          That didn’t send. Try once more, or message{' '}
          <a href={siteConfig.instagram.url} target="_blank" rel="noreferrer">
            {siteConfig.instagram.handle}
          </a>
          .
        </p>
      ) : null}
      <label className="guitar-field">
        <span>Song</span>
        <input name="song" required maxLength={200} autoComplete="off" />
      </label>
      <label className="guitar-field">
        <span>Artist</span>
        <input name="artist" required maxLength={200} autoComplete="off" />
      </label>
      <label className="guitar-field">
        <span>Name or Instagram (optional)</span>
        <input name="handle" maxLength={200} autoComplete="nickname" />
      </label>
      <label className="guitar-field">
        <span>A note (optional)</span>
        <textarea name="message" rows={4} maxLength={2000} />
      </label>
      <button type="submit" className="guitar-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send it'}
      </button>
    </form>
  )
}

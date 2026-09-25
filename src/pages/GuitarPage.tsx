import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../content/config'
import { getGnaNoteArticles } from '../content/gnaNotes'
import { gnaStoreLinks, guitarStoreUrl } from '../content/guitarGna'
import { guitarTikTok, guitarVideos, youtubeVideoId, type GuitarVideo } from '../content/guitarVideos'
import { contactPathForPlan } from '../content/plans'
import { scalePlatformLabel, scalePracticeVideos } from '../content/scalePractice'
import { localeLabels, locales, useI18n, type Locale } from '../i18n'
import { en } from '../i18n/messages/en'
import { useTheme, type Theme } from '../theme'
import { around, fill } from './guitar/fill'
import { Metronome } from './guitar/Metronome'
import { PracticeRoom } from './guitar/PracticeRoom'
import { SongRequestForm } from './guitar/SongRequestForm'
import './GuitarPage.css'

function isHttpUrl(value: string | undefined): value is string {
  return typeof value === 'string' && /^https?:\/\//i.test(value)
}

function ArrangementCard({ video }: { video: GuitarVideo }) {
  const { t } = useI18n()
  const copy = t.guitar
  const note = copy.notes[video.id] ?? video.note
  const videoId = youtubeVideoId(video.youtube)
  const upcoming = !videoId && video.status === 'upcoming'

  return (
    <article className={upcoming ? 'guitar-card guitar-card-upcoming' : 'guitar-card guitar-card-lesson'}>
      {videoId ? (
        <div className="guitar-embed">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={`${video.title} — ${video.artist}`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      ) : video.thumbnail ? (
        <img src={video.thumbnail} alt="" />
      ) : null}
      <h3 className="guitar-card-title">
        {upcoming ? fill(copy.upNext, { title: video.title, artist: video.artist }) : video.title}
      </h3>
      {upcoming ? null : <p className="guitar-card-artist">{video.artist}</p>}
      {note ? <p className="guitar-card-note">{note}</p> : null}
      {videoId || upcoming ? null : <p className="guitar-lesson-soon">{copy.lessonSoon}</p>}
    </article>
  )
}

export function GuitarPage() {
  const { theme, setTheme } = useTheme()
  const { t, locale, setLocale } = useI18n()
  const copy = t.guitar
  const gna = locale === 'ja' ? t.gna : en.gna
  const tips = (locale === 'ja' ? t : en).site.nav.find((item) => item.to === '/gna')
  const articles = getGnaNoteArticles().flatMap((article) => {
    if (article.substackUrl) {
      return [{ article, href: article.substackUrl, label: gna.openOnSubstack }]
    }
    if (article.noteUrl) {
      return [{ article, href: article.noteUrl, label: gna.openOnNote }]
    }
    return []
  })
  const scales = scalePracticeVideos.filter((video) => isHttpUrl(video.url))
  const ios = guitarStoreUrl(gnaStoreLinks.ios)
  const android = guitarStoreUrl(gnaStoreLinks.android)
  const [tipsBefore, tipsAfter] = around(copy.tipsLine, 'tips')
  const [commissionBefore, commissionAfter] = around(copy.commission, 'solo')

  useEffect(() => {
    const previousTitle = document.title
    document.title = copy.pageTitle
    return () => {
      document.title = previousTitle
    }
  }, [copy.pageTitle])

  useEffect(() => {
    const existing = document.querySelector('meta[name="robots"]')
    const created = !existing
    const meta = existing ?? document.createElement('meta')
    if (!existing) {
      meta.setAttribute('name', 'robots')
      document.head.appendChild(meta)
    }
    const previousContent = meta.getAttribute('content')
    meta.setAttribute('content', 'noindex, nofollow')
    window.scrollTo(0, 0)

    return () => {
      if (created) meta.remove()
      else if (previousContent == null) meta.removeAttribute('content')
      else meta.setAttribute('content', previousContent)
    }
  }, [])

  return (
    <div className="guitar-page">
      <header className="guitar-header">
        <div className="guitar-brand">
          <span className="guitar-brand-name">{siteConfig.brand}</span>
          <span className="guitar-brand-tag">{copy.brandTag}</span>
        </div>
        <div className="guitar-tools">
          <label className="guitar-theme">
            <span>{t.site.languageLabel}</span>
            <select
              value={locale}
              aria-label={t.site.languageLabel}
              onChange={(event) => setLocale(event.target.value as Locale)}
            >
              {locales.map((code) => (
                <option key={code} value={code}>
                  {localeLabels[code]}
                </option>
              ))}
            </select>
          </label>
          <label className="guitar-theme">
            <span>{t.site.themeLabel}</span>
            <select
              value={theme}
              aria-label={t.site.themeLabel}
              onChange={(event) => setTheme(event.target.value as Theme)}
            >
              <option value="light">{t.site.themeLight}</option>
              <option value="dark">{t.site.themeDark}</option>
            </select>
          </label>
        </div>
      </header>

      <main>
        <div className="guitar-wrap guitar-intro">
          <h1 className="guitar-title">{copy.title}</h1>
          <p className="guitar-tagline">{copy.tagline}</p>
          <p className="guitar-intro-copy">{copy.intro}</p>
          <div className="guitar-strings" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <section className="guitar-wrap guitar-section" aria-labelledby="arrangements-title">
          <p className="eyebrow">{copy.arrangementsEyebrow}</p>
          <h2 className="section-title" id="arrangements-title">
            {copy.arrangementsTitle}
          </h2>
          <p className="section-lead">{copy.arrangementsLead}</p>
          <div className="guitar-grid cols-2">
            {guitarVideos.map((video) => (
              <ArrangementCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        <section className="guitar-wrap guitar-section" aria-labelledby="scales-title">
          <p className="eyebrow">{copy.scalesEyebrow}</p>
          <h2 className="section-title" id="scales-title">
            {copy.scalesTitle}
          </h2>
          <p className="section-lead">{copy.scalesLead}</p>
          {scales.length === 0 ? (
            <div className="guitar-soon">
              <p className="eyebrow">{copy.comingSoon}</p>
              <p>{copy.comingSoonBody}</p>
            </div>
          ) : (
            <div className="guitar-grid cols-2">
              {scales.map((video) => (
                <a key={video.id} className="guitar-card" href={video.url} target="_blank" rel="noreferrer">
                  <p className="eyebrow">{scalePlatformLabel(video.url)}</p>
                  <h3 className="guitar-card-title">{video.title}</h3>
                  {video.note ? <p className="guitar-card-note">{video.note}</p> : null}
                  <span className="guitar-watch">{copy.watch}</span>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="guitar-wrap guitar-section" aria-labelledby="gna-title">
          <p className="eyebrow">{copy.gnaEyebrow}</p>
          <h2 className="section-title" id="gna-title">
            {copy.gnaTitle}
          </h2>
          <p className="section-lead">{copy.gnaLead}</p>
          <p className="guitar-aside">{copy.postsNote}</p>
          {articles.length > 0 ? (
            <ul className="guitar-tips">
              {articles.map(({ article, href, label }) => (
                <li key={article.id} className="guitar-tip">
                  <h3>
                    <a href={href} target="_blank" rel="noreferrer">
                      {locale === 'ja' ? article.titleJa : article.titleEn}
                    </a>
                  </h3>
                  {(locale === 'ja' ? article.summaryJa : article.summaryEn) ? (
                    <p>{locale === 'ja' ? article.summaryJa : article.summaryEn}</p>
                  ) : null}
                  <a className="guitar-tip-link" href={href} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          {tips ? (
            <p className="guitar-more">
              {tipsBefore}
              <Link to={tips.to}>{tips.label}</Link>
              {tipsAfter}
            </p>
          ) : null}
          {ios || android ? (
            <p className="guitar-aside guitar-stores">
              {ios ? (
                <a href={ios} target="_blank" rel="noreferrer">
                  {copy.appStore}
                </a>
              ) : null}
              {android ? (
                <a href={android} target="_blank" rel="noreferrer">
                  {copy.googlePlay}
                </a>
              ) : null}
            </p>
          ) : (
            <p className="guitar-aside">{copy.appPending}</p>
          )}
        </section>

        <section className="guitar-wrap guitar-section" aria-labelledby="linger-title">
          <p className="eyebrow">{copy.lingerEyebrow}</p>
          <h2 className="section-title" id="linger-title">
            {copy.lingerTitle}
          </h2>
          <p className="section-lead">{copy.lingerLead}</p>
          <div className="guitar-toys">
            <Metronome />
            <PracticeRoom />
          </div>
        </section>

        <section className="guitar-wrap guitar-section guitar-request" aria-labelledby="request-title">
          <p className="eyebrow">{copy.requestEyebrow}</p>
          <h2 className="section-title" id="request-title">
            {copy.requestTitle}
          </h2>
          <p className="section-lead">{copy.requestLead}</p>
          <SongRequestForm />
          <p className="guitar-quiet">
            {commissionBefore}
            <Link to={contactPathForPlan('solo')}>{copy.soloPlan}</Link>
            {commissionAfter}
          </p>
        </section>
      </main>

      <footer className="guitar-footer">
        <div className="guitar-footer-links">
          <a href={siteConfig.instagram.url} target="_blank" rel="noreferrer">
            {copy.instagram} {siteConfig.instagram.handle}
          </a>
          <a href={guitarTikTok.url} target="_blank" rel="noreferrer">
            {copy.tiktok} {guitarTikTok.handle}
          </a>
          <Link className="guitar-back" to="/">
            {copy.backToStudio}
          </Link>
        </div>
        <p>
          © {new Date().getFullYear()} {siteConfig.brand}
        </p>
      </footer>
    </div>
  )
}

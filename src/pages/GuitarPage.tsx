import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../content/config'
import { getGnaNoteArticles } from '../content/gnaNotes'
import { gnaStoreLinks, guitarStoreUrl } from '../content/guitarGna'
import {
  guitarPlatformName,
  guitarTikTok,
  guitarVideos,
  guitarWatchLabel,
  type GuitarVideo,
} from '../content/guitarVideos'
import { contactPathForPlan } from '../content/plans'
import { scalePlatformLabel, scalePracticeVideos } from '../content/scalePractice'
import { en } from '../i18n/messages/en'
import { useTheme, type Theme } from '../theme'
import { Metronome } from './guitar/Metronome'
import { PracticeRoom } from './guitar/PracticeRoom'
import { SongRequestForm } from './guitar/SongRequestForm'
import './GuitarPage.css'

const PAGE_TITLE = 'Guitar Room | Sulomam'

function isHttpUrl(value: string | undefined): value is string {
  return typeof value === 'string' && /^https?:\/\//i.test(value)
}

function linkedTips() {
  return getGnaNoteArticles().flatMap((article) => {
    if (article.substackUrl) {
      return [{ article, href: article.substackUrl, label: en.gna.openOnSubstack }]
    }
    if (article.noteUrl) {
      return [{ article, href: article.noteUrl, label: en.gna.openOnNote }]
    }
    return []
  })
}

function ArrangementCard({ video }: { video: GuitarVideo }) {
  const upcoming = video.status === 'upcoming'
  const body = (
    <>
      {video.thumbnail ? <img src={video.thumbnail} alt="" /> : null}
      {upcoming ? null : <p className="eyebrow">{guitarPlatformName(video.platform)}</p>}
      <h3 className="guitar-card-title">
        {upcoming ? `Up next: ${video.title} (${video.artist}) solo arrangement` : video.title}
      </h3>
      {upcoming ? null : <p className="guitar-card-artist">{video.artist}</p>}
      {video.note ? <p className="guitar-card-note">{video.note}</p> : null}
      {upcoming || !isHttpUrl(video.url) ? null : (
        <span className="guitar-watch">{guitarWatchLabel(video)}</span>
      )}
    </>
  )

  if (upcoming || !isHttpUrl(video.url)) {
    return <article className="guitar-card guitar-card-upcoming">{body}</article>
  }

  return (
    <a className="guitar-card" href={video.url} target="_blank" rel="noreferrer">
      {body}
    </a>
  )
}

export function GuitarPage() {
  const { theme, setTheme } = useTheme()
  const tips = en.site.nav.find((item) => item.to === '/gna')
  const articles = linkedTips()
  const scales = scalePracticeVideos.filter((video) => isHttpUrl(video.url))
  const ios = guitarStoreUrl(gnaStoreLinks.ios)
  const android = guitarStoreUrl(gnaStoreLinks.android)

  useEffect(() => {
    const previousTitle = document.title
    const previousLang = document.documentElement.lang
    document.title = PAGE_TITLE
    document.documentElement.lang = 'en'

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
      document.title = previousTitle
      document.documentElement.lang = previousLang
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
          <span className="guitar-brand-tag">Guitar room</span>
        </div>
        <label className="guitar-theme">
          <span>{en.site.themeLabel}</span>
          <select
            value={theme}
            aria-label={en.site.themeLabel}
            onChange={(event) => setTheme(event.target.value as Theme)}
          >
            <option value="light">{en.site.themeLight}</option>
            <option value="dark">{en.site.themeDark}</option>
          </select>
        </label>
      </header>

      <main>
        <div className="guitar-wrap guitar-intro">
          <h1 className="guitar-title">Guitar room</h1>
          <p className="guitar-tagline">Hang out, listen, play along.</p>
          <p className="guitar-intro-copy">
            Solo acoustic arrangements, from Sulomam — track maker and guitarist. Stay as long as you like.
          </p>
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
          <p className="eyebrow">Play along</p>
          <h2 className="section-title" id="arrangements-title">
            Solo arrangements
          </h2>
          <p className="section-lead">A few videos. Tap one when you want to play along.</p>
          <div className="guitar-grid cols-2">
            {guitarVideos.map((video) => (
              <ArrangementCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        <section className="guitar-wrap guitar-section" aria-labelledby="scales-title">
          <p className="eyebrow">Woodshed</p>
          <h2 className="section-title" id="scales-title">
            Scale practice
          </h2>
          <p className="section-lead">
            I’ve just started filming these. Short clips, when they’re ready, will sit right here.
          </p>
          {scales.length === 0 ? (
            <div className="guitar-soon">
              <p className="eyebrow">Coming soon</p>
              <p>Nothing to tap yet. They’ll show up in this spot.</p>
            </div>
          ) : (
            <div className="guitar-grid cols-2">
              {scales.map((video) => (
                <a key={video.id} className="guitar-card" href={video.url} target="_blank" rel="noreferrer">
                  <p className="eyebrow">{scalePlatformLabel(video.url)}</p>
                  <h3 className="guitar-card-title">{video.title}</h3>
                  {video.note ? <p className="guitar-card-note">{video.note}</p> : null}
                  <span className="guitar-watch">Watch</span>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="guitar-wrap guitar-section" aria-labelledby="gna-title">
          <p className="eyebrow">Tools & tips</p>
          <h2 className="section-title" id="gna-title">
            For your practice
          </h2>
          <p className="section-lead">
            GNA (Guitar Navigation Assistant) is a small fretboard app for scales, chords, and keys. The how-tos
            are the same Tips — handy beside the app, fine to read on their own.
          </p>
          <p className="guitar-aside">{en.gna.postsNote}</p>
          {articles.length > 0 ? (
            <ul className="guitar-tips">
              {articles.map(({ article, href, label }) => (
                <li key={article.id} className="guitar-tip">
                  <h3>
                    <a href={href} target="_blank" rel="noreferrer">
                      {article.titleEn}
                    </a>
                  </h3>
                  {article.summaryEn ? <p>{article.summaryEn}</p> : null}
                  <a className="guitar-tip-link" href={href} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          {tips ? (
            <p className="guitar-more">
              Full list on <Link to={tips.to}>{tips.label}</Link>.
            </p>
          ) : null}
          {ios || android ? (
            <p className="guitar-aside guitar-stores">
              {ios ? (
                <a href={ios} target="_blank" rel="noreferrer">
                  App Store
                </a>
              ) : null}
              {android ? (
                <a href={android} target="_blank" rel="noreferrer">
                  Google Play
                </a>
              ) : null}
            </p>
          ) : (
            <p className="guitar-aside">The phone app isn’t linked from this page yet.</p>
          )}
        </section>

        <section className="guitar-wrap guitar-section" aria-labelledby="linger-title">
          <p className="eyebrow">Linger</p>
          <h2 className="section-title" id="linger-title">
            While you’re here
          </h2>
          <p className="section-lead">A metronome, and some studio music if the room feels too quiet.</p>
          <div className="guitar-toys">
            <Metronome />
            <PracticeRoom />
          </div>
        </section>

        <section className="guitar-wrap guitar-section guitar-request" aria-labelledby="request-title">
          <p className="eyebrow">Your turn</p>
          <h2 className="section-title" id="request-title">
            Request a song
          </h2>
          <p className="section-lead">
            A song you’d like to hear on solo guitar? Leave it here. I’ll read it when I sit down to arrange.
          </p>
          <SongRequestForm />
          <p className="guitar-quiet">
            Custom solo arrangements can be commissioned. The{' '}
            <Link to={contactPathForPlan('solo')}>Solo plan</Link> is back in the studio.
          </p>
        </section>
      </main>

      <footer className="guitar-footer">
        <div className="guitar-footer-links">
          <a href={siteConfig.instagram.url} target="_blank" rel="noreferrer">
            Instagram {siteConfig.instagram.handle}
          </a>
          <a href={guitarTikTok.url} target="_blank" rel="noreferrer">
            TikTok {guitarTikTok.handle}
          </a>
          <Link className="guitar-back" to="/">
            Back to studio
          </Link>
        </div>
        <p>
          © {new Date().getFullYear()} {siteConfig.brand}
        </p>
      </footer>
    </div>
  )
}

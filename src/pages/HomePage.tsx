import { Link } from 'react-router-dom'
import { AudioPlaylistPlayer } from '../components/AudioPlaylistPlayer'
import { Plans } from '../components/Plans'
import { ServiceList } from '../components/ServiceList'
import { lessonPathForLocale } from '../content/lesson'
import { homePlaylist } from '../content/playlist'
import { useI18n } from '../i18n'
import { lessonEn } from '../i18n/messages/lessonEn'
import { lessonJa } from '../i18n/messages/lessonJa'
import './HomePage.css'

function LessonCard() {
  const { locale } = useI18n()
  const card = locale === 'ja' ? lessonJa.card : lessonEn.card

  return (
    <section className="section lesson-card-section" aria-labelledby="lesson-card-title">
      <div className="section-inner">
        <Link className="lesson-card" to={lessonPathForLocale(locale)}>
          <p className="eyebrow">{card.eyebrow}</p>
          <h2 className="lesson-card-title" id="lesson-card-title">
            {card.title}
          </h2>
          <p className="lesson-card-tagline">{card.tagline}</p>
          <p className="lesson-card-prices">{card.prices}</p>
          <span className="lesson-card-cta">{card.cta}</span>
        </Link>
      </div>
    </section>
  )
}

export function HomePage() {
  const { t } = useI18n()
  const { home, site } = t

  return (
    <>
      <section className="hero" aria-label="ヒーロー">
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="hero-inner">
          <p className="hero-brand">{site.brand}</p>
          <h1 className="hero-headline">{site.headline}</h1>
          {site.description ? <p className="hero-lead">{site.description}</p> : null}
        </div>
      </section>

      <section className="section listen-section" id="listen" aria-labelledby="listen-title">
        <div className="section-inner">
          <p className="eyebrow">{home.listen.eyebrow}</p>
          <h2 className="section-title" id="listen-title">
            {home.listen.title}
          </h2>
          <AudioPlaylistPlayer tracks={homePlaylist} labels={home.listen} />
        </div>
      </section>

      <section className="section intro-section" aria-labelledby="about-title">
        <div className="section-inner">
          <div className="intro-copy">
            <p className="eyebrow">{home.intro.eyebrow}</p>
            <h2 className="section-title" id="about-title">
              {home.intro.title}
            </h2>
            {home.intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="skills-title">
        <div className="section-inner">
          <p className="eyebrow">{home.servicesHeading}</p>
          <h2 className="section-title" id="skills-title">
            {home.servicesHeading}
          </h2>
          <ServiceList services={home.services} />
        </div>
      </section>

      <Plans />

      <LessonCard />

      <section className="section closing-section">
        <div className="section-inner narrow">
          <p className="closing-aside">{home.closing.aside}</p>
          <p className="closing-consult">
            <Link to="/contact">{home.closing.consultNote}</Link>
          </p>
        </div>
      </section>
    </>
  )
}

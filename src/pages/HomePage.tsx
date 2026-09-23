import { Link } from 'react-router-dom'
import { AudioPlaylistPlayer } from '../components/AudioPlaylistPlayer'
import { Plans } from '../components/Plans'
import { ServiceList } from '../components/ServiceList'
import { homePlaylist } from '../content/playlist'
import { useI18n } from '../i18n'
import './HomePage.css'

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
          <div className="hero-actions">
            <a className="btn btn-ghost" href="#plans">
              {home.plansCta}
            </a>
          </div>
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

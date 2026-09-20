import { Link } from 'react-router-dom'
import { AudioPlaylistPlayer } from '../components/AudioPlaylistPlayer'
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
          <p className="hero-lead">{site.description}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/contact">
              {home.consultCta}
            </Link>
            <a className="btn btn-ghost" href="#listen">
              {home.listen.cta}
            </a>
            <Link className="btn btn-ghost" to="/work">
              {home.worksCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="section listen-section" id="listen" aria-labelledby="listen-title">
        <div className="section-inner">
          <p className="eyebrow">{home.listen.eyebrow}</p>
          <h2 className="section-title" id="listen-title">
            {home.listen.title}
          </h2>
          <p className="section-lead">{home.listen.lead}</p>
          <AudioPlaylistPlayer tracks={homePlaylist} labels={home.listen} />
        </div>
      </section>

      <section className="section intro-section">
        <div className="section-inner narrow">
          <p className="eyebrow">{home.intro.eyebrow}</p>
          <h2 className="section-title">{home.intro.title}</h2>
          {home.intro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <p className="eyebrow">{home.consult.eyebrow}</p>
          <h2 className="section-title">{home.consult.title}</h2>
          <p className="section-lead">{home.consult.lead}</p>
          <ul className="consult-points">
            {home.consult.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <h3 className="subhead">{home.servicesHeading}</h3>
          <ServiceList services={home.services} />
          <div className="consult-cta">
            <Link className="btn btn-primary consult-cta-btn" to="/contact">
              {home.consultCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="section closing-section">
        <div className="section-inner narrow">
          <h2 className="section-title">{home.closing.title}</h2>
          <p>{home.closing.body}</p>
          <p className="closing-aside">{home.closing.aside}</p>
          <Link className="btn btn-primary" to="/contact">
            {home.closing.cta}
          </Link>
        </div>
      </section>
    </>
  )
}

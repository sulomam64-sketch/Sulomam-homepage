import { guitarWorkMeta, productionWorkMeta, type WorkMeta } from '../content/config'
import { useI18n } from '../i18n'
import './WorkPage.css'

function WorkList({
  items,
  descriptions,
  subtitles,
}: {
  items: WorkMeta[]
  descriptions: Record<string, string>
  subtitles: Record<string, string>
}) {
  return (
    <ul className="work-list">
      {items.map((item) => (
        <li key={item.id} className="work-item">
          <h3 className="work-title">{item.title}</h3>
          {subtitles[item.id] ? <p className="work-subtitle">{subtitles[item.id]}</p> : null}
          <p className="work-desc">{descriptions[item.id] ?? ''}</p>
          {item.link ? (
            <a className="work-link" href={item.link.href} target="_blank" rel="noreferrer">
              {item.link.label}
            </a>
          ) : null}
          {item.tracks?.length ? (
            <ul className="work-tracks">
              {item.tracks.map((track) => (
                <li key={track}>{track}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export function WorkPage() {
  const { t } = useI18n()
  const { work } = t

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">{work.eyebrow}</p>
        <h1 className="page-title">{work.title}</h1>
        <p className="section-lead">{work.lead}</p>
      </header>

      <section className="page-section">
        <h2 className="page-section-title">{work.production}</h2>
        <WorkList
          items={productionWorkMeta}
          descriptions={work.descriptions}
          subtitles={work.subtitles}
        />
      </section>

      <section className="page-section">
        <h2 className="page-section-title">{work.guitar}</h2>
        <WorkList
          items={guitarWorkMeta}
          descriptions={work.descriptions}
          subtitles={work.subtitles}
        />
      </section>
    </div>
  )
}

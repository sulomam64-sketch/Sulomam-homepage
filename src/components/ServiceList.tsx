import type { ServiceItem } from '../i18n/messages/types'
import './ServiceList.css'

type Props = {
  services: ServiceItem[]
}

export function ServiceList({ services }: Props) {
  return (
    <div className="service-list">
      {services.map((service) => (
        <article key={service.id} className="service-block">
          <h3 className="service-title">{service.title}</h3>
          <p className="service-desc">{service.description}</p>
        </article>
      ))}
    </div>
  )
}

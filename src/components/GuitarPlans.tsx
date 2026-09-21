import { Link } from 'react-router-dom'
import { contactPathForPlan, featuredGuitarPlanId } from '../content/guitarPlans'
import { useI18n } from '../i18n'
import './GuitarPlans.css'

export function GuitarPlans() {
  const { t } = useI18n()
  const { plans } = t.home

  return (
    <section className="section plans-section" id="plans" aria-labelledby="plans-title">
      <div className="section-inner">
        <p className="eyebrow">{plans.eyebrow}</p>
        <h2 className="section-title" id="plans-title">
          {plans.title}
        </h2>
        <p className="section-lead">{plans.lead}</p>

        <div className="plans-callouts">
          <p className="plans-callout plans-callout-credit">{plans.creditCallout}</p>
          <p className="plans-callout plans-callout-tab">{plans.noTabCallout}</p>
        </div>

        <div className="plan-grid">
          {plans.cards.map((card) => {
            const featured = card.id === featuredGuitarPlanId
            return (
              <article
                key={card.id}
                className={featured ? 'plan-card featured' : 'plan-card'}
              >
                {featured ? <p className="plan-badge">{plans.featuredLabel}</p> : null}
                <h3 className="plan-name">{card.name}</h3>
                <p className="plan-price">{card.price}</p>
                <p className="plan-blurb">{card.blurb}</p>

                <h4 className="plan-list-label">{plans.includesLabel}</h4>
                <ul className="plan-list plan-includes">
                  {card.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h4 className="plan-list-label">{plans.excludesLabel}</h4>
                <ul className="plan-list plan-excludes">
                  {card.excludes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="plan-turnaround">
                  <span className="plan-turnaround-label">{plans.turnaroundLabel}</span>
                  {card.turnaround}
                </p>

                <div className="plan-cta">
                  <Link className="btn btn-primary" to={contactPathForPlan(card.id)}>
                    {plans.inquire}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <aside className="plan-commercial">
          <div className="plan-commercial-copy">
            <p className="plan-commercial-kicker">{plans.commercial.price}</p>
            <h3 className="plan-commercial-name">{plans.commercial.name}</h3>
            <p className="plan-commercial-body">{plans.commercial.body}</p>
          </div>
          <Link className="btn btn-outline" to={contactPathForPlan('commercial')}>
            {plans.commercial.inquire}
          </Link>
        </aside>

        <div className="plans-terms">
          <h3 className="plans-terms-heading">{plans.termsHeading}</h3>
          <ul className="plans-terms-list">
            {plans.terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

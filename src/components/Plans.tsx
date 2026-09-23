import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  payCurrencyForLocale,
  payOfferFor,
  stemsPayHref,
  type PayOffer,
} from '../content/paymentLinks'
import {
  contactPathForPlan,
  isFeaturedPlan,
  planTabIds,
  type PlanTabId,
} from '../content/plans'
import { useI18n } from '../i18n'
import type { PlanCard, PlansCopy } from '../i18n/messages/types'
import './Plans.css'

function PayActions({ offer, plans }: { offer: PayOffer; plans: PlansCopy }) {
  if (offer.kind === 'full') {
    return (
      <a className="btn btn-outline" href={offer.href} target="_blank" rel="noopener noreferrer">
        {plans.pay}
      </a>
    )
  }

  return (
    <>
      <a
        className="btn btn-outline"
        href={offer.depositHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        {plans.payDeposit}
      </a>
      <a className="plan-pay-alt" href={offer.fullHref} target="_blank" rel="noopener noreferrer">
        {plans.payFull}
      </a>
      <p className="plan-pay-note">{plans.balanceNote}</p>
    </>
  )
}

function PlanCardView({
  card,
  plans,
  offer,
}: {
  card: PlanCard
  plans: PlansCopy
  offer: PayOffer | null
}) {
  const featured = isFeaturedPlan(card.id)
  return (
    <article className={featured ? 'plan-card featured' : 'plan-card'}>
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
        {offer ? <PayActions offer={offer} plans={plans} /> : null}
      </div>
    </article>
  )
}

function tabFromHash(): PlanTabId {
  if (typeof window === 'undefined') return 'guitar'
  const hash = window.location.hash
  if (hash === '#plans-track') return 'track'
  if (hash === '#plans-mix') return 'mix'
  return 'guitar'
}

export function Plans() {
  const { t, locale } = useI18n()
  const { plans } = t.home
  const currency = payCurrencyForLocale(locale)
  const offerFor = (planId: string) => payOfferFor(planId, currency)
  const fullSongOffer = offerFor('full-song')
  const [tab, setTab] = useState<PlanTabId>(tabFromHash)

  useEffect(() => {
    const onHashChange = () => setTab(tabFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function selectTab(id: PlanTabId) {
    setTab(id)
    const nextHash = `#plans-${id}`
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash)
    }
  }

  return (
    <section className="section plans-section" id="plans" aria-labelledby="plans-title">
      <div className="section-inner">
        <p className="eyebrow">{plans.eyebrow}</p>
        <h2 className="section-title" id="plans-title">
          {plans.title}
        </h2>
        <p className="section-lead">{plans.lead}</p>

        <div className="plan-tabs" role="tablist" aria-label={plans.tablistLabel}>
          {planTabIds.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`plan-tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`plan-panel-${id}`}
              tabIndex={tab === id ? 0 : -1}
              className={tab === id ? 'plan-tab is-active' : 'plan-tab'}
              onClick={() => selectTab(id)}
            >
              {plans.tabs[id]}
            </button>
          ))}
        </div>

        {tab === 'guitar' ? (
          <div
            className="plan-panel"
            role="tabpanel"
            id="plan-panel-guitar"
            aria-labelledby="plan-tab-guitar"
          >
            <p className="plan-category-lead">{plans.guitar.lead}</p>
            <p className="plan-scope-hint">{plans.guitar.scopeHint}</p>
            <div className="plans-callouts">
              <p className="plans-callout plans-callout-credit">{plans.guitar.creditCallout}</p>
              <p className="plans-callout plans-callout-tab">{plans.guitar.noTabCallout}</p>
            </div>
            <div className="plan-grid">
              {plans.guitar.cards.map((card) => (
                <PlanCardView key={card.id} card={card} plans={plans} offer={offerFor(card.id)} />
              ))}
            </div>
            <aside className="plan-commercial">
              <div className="plan-commercial-copy">
                <p className="plan-commercial-kicker">{plans.guitar.commercial.price}</p>
                <h3 className="plan-commercial-name">{plans.guitar.commercial.name}</h3>
                <p className="plan-commercial-body">{plans.guitar.commercial.body}</p>
              </div>
              <Link className="btn btn-outline" to={contactPathForPlan('guitar-commercial')}>
                {plans.guitar.commercial.inquire}
              </Link>
            </aside>
          </div>
        ) : null}

        {tab === 'track' ? (
          <div
            className="plan-panel"
            role="tabpanel"
            id="plan-panel-track"
            aria-labelledby="plan-tab-track"
          >
            <p className="plan-category-lead">{plans.track.lead}</p>
            <div className="plan-grid plan-grid-track">
              {plans.track.cards.map((card) => (
                <PlanCardView key={card.id} card={card} plans={plans} offer={offerFor(card.id)} />
              ))}
            </div>
            <p className="plan-category-hint">{plans.track.hint}</p>

            <div className="plan-group">
              <h3 className="plan-group-title">{plans.vocalEdit.heading}</h3>
              <p className="plan-group-lead">{plans.vocalEdit.lead}</p>
              <div className="plan-grid plan-grid-single">
                <PlanCardView
                  card={plans.vocalEdit.card}
                  plans={plans}
                  offer={offerFor(plans.vocalEdit.card.id)}
                />
              </div>
            </div>

            <div className="plan-group">
              <h3 className="plan-group-title">{plans.fullSong.heading}</h3>
              <p className="plan-group-lead">{plans.fullSong.lead}</p>
              <aside className="plan-commercial">
                <div className="plan-commercial-copy">
                  <p className="plan-commercial-kicker">{plans.fullSong.price}</p>
                  <h3 className="plan-commercial-name">{plans.fullSong.name}</h3>
                  <p className="plan-commercial-body">{plans.fullSong.body}</p>
                  <p className="plan-turnaround plan-turnaround-inline">
                    <span className="plan-turnaround-label">{plans.turnaroundLabel}</span>
                    {plans.fullSong.turnaround}
                  </p>
                </div>
                <div className="plan-commercial-actions">
                  <Link className="btn btn-outline" to={contactPathForPlan('full-song')}>
                    {plans.fullSong.inquire}
                  </Link>
                  {fullSongOffer ? <PayActions offer={fullSongOffer} plans={plans} /> : null}
                </div>
              </aside>
            </div>
          </div>
        ) : null}

        {tab === 'mix' ? (
          <div
            className="plan-panel"
            role="tabpanel"
            id="plan-panel-mix"
            aria-labelledby="plan-tab-mix"
          >
            <p className="plan-category-lead">{plans.mix.lead}</p>
            <div className="plan-grid">
              {plans.mix.cards.map((card) => (
                <PlanCardView key={card.id} card={card} plans={plans} offer={offerFor(card.id)} />
              ))}
            </div>
          </div>
        ) : null}

        <div className="plans-terms">
          <h3 className="plans-terms-heading">{plans.notesHeading}</h3>
          <ul className="plans-terms-list">
            {plans.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="plans-stems-line">
            {plans.stemsOption}{' '}
            <a href={stemsPayHref(currency)} target="_blank" rel="noopener noreferrer">
              {plans.stemsPay}
            </a>
          </p>
          <p className="plans-stripe-footnote">{plans.stripeFootnote}</p>
        </div>

        <section className="plans-faq" aria-labelledby="plans-faq-title">
          <h3 className="plans-terms-heading" id="plans-faq-title">
            {plans.faq.heading}
          </h3>
          <p className="plans-faq-lead">{plans.faq.lead}</p>
          <div className="plans-faq-list">
            {plans.faq.items.map((item) => (
              <details key={item.id} className="plan-faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

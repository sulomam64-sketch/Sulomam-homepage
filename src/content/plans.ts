import type { Messages, PlanCard } from '../i18n/messages/types'

export const planTabIds = ['guitar', 'track', 'mix'] as const

export type PlanTabId = (typeof planTabIds)[number]

export const featuredPlanIds = ['guitar-plus', 'track-standard', 'mix-standard'] as const

const planIdAliases: Record<string, string> = {
  basic: 'guitar-basic',
  plus: 'guitar-plus',
  arrange: 'guitar-arrange',
  solo: 'guitar-solo',
  commercial: 'guitar-commercial',
}

export function canonicalPlanId(planId: string): string {
  return planIdAliases[planId] ?? planId
}

export function isFeaturedPlan(planId: string): boolean {
  return (featuredPlanIds as readonly string[]).includes(canonicalPlanId(planId))
}

function allPlanCards(plans: Messages['home']['plans']): PlanCard[] {
  return [...plans.guitar.cards, ...plans.track.cards, plans.vocalEdit.card, ...plans.mix.cards]
}

export function resolvePlanLabel(t: Messages, planId: string | null): string | null {
  if (!planId) return null
  const id = canonicalPlanId(planId)
  const { plans } = t.home

  if (id === 'guitar-commercial') {
    return `${plans.guitar.categoryName} ${plans.guitar.commercial.name}`
  }
  if (id === 'full-song') return plans.fullSong.name

  const card = allPlanCards(plans).find((item) => item.id === id)
  if (!card) return null

  if (id === 'vocal-edit') return `${plans.vocalEdit.heading}`
  if (id.startsWith('guitar-')) return `${plans.guitar.categoryName} ${card.name}`
  if (id.startsWith('track-')) return `${plans.track.categoryName} ${card.name}`
  if (id.startsWith('mix-')) return `${plans.mix.categoryName} ${card.name}`
  return card.name
}

export function contactPathForPlan(planId: string): string {
  return `/contact?plan=${encodeURIComponent(planId)}`
}

import type { Messages } from '../i18n/messages/types'

export const guitarPlanIds = ['basic', 'plus', 'arrange', 'commercial'] as const

export type GuitarPlanId = (typeof guitarPlanIds)[number]

export const featuredGuitarPlanId = 'plus'

export function resolveGuitarPlanLabel(t: Messages, planId: string | null): string | null {
  if (!planId || !(guitarPlanIds as readonly string[]).includes(planId)) return null
  const { plans } = t.home
  if (planId === 'commercial') return `${plans.categoryName} ${plans.commercial.name}`
  const card = plans.cards.find((item) => item.id === planId)
  return card ? `${plans.categoryName} ${card.name}` : null
}

export function contactPathForPlan(planId: string): string {
  return `/contact?plan=${encodeURIComponent(planId)}`
}

import type { Locale } from '../i18n/locales'

/**
 * Live Stripe Payment Links for guideline tiers.
 * Japanese UI uses JPY. English, and locales that reuse English pricing
 * (zh / ko / es), use USD.
 *
 * Tiers at ¥30,000 / $300 and above default to the 50% deposit link.
 * The matching full-payment link is a secondary action. Balance links
 * stay off the cards — the balance is due before delivery, not as a
 * third equal button. Commercial / label work has no payment link.
 */

export type PayCurrency = 'jpy' | 'usd'

export type PayOffer =
  | { kind: 'full'; href: string }
  | { kind: 'deposit'; depositHref: string; fullHref: string }

const jpy = {
  'guitar-basic': {
    kind: 'full',
    href: 'https://buy.stripe.com/eVq5kC1Zob5w18Q0Bha7C00',
  },
  'guitar-plus': {
    kind: 'full',
    href: 'https://buy.stripe.com/eVq7sK9rQ8Xo3gYes7a7C01',
  },
  'guitar-arrange': {
    kind: 'full',
    href: 'https://buy.stripe.com/9B600i6fEb5wdVC83Ja7C02',
  },
  'track-loop': {
    kind: 'full',
    href: 'https://buy.stripe.com/14A4gyfQe3D4aJq0Bha7C03',
  },
  'track-brush-up': {
    kind: 'full',
    href: 'https://buy.stripe.com/7sY9AS0VkflM6tagAfa7C04',
  },
  'track-standard': {
    kind: 'deposit',
    depositHref: 'https://buy.stripe.com/14A00i1Zo7Tk7xe6ZFa7C0a',
    fullHref: 'https://buy.stripe.com/3cI9AS9rQ2z0dVCcjZa7C09',
  },
  'track-arrange': {
    kind: 'deposit',
    depositHref: 'https://buy.stripe.com/00w6oG0Vk3D42cUcjZa7C0d',
    fullHref: 'https://buy.stripe.com/7sY3cu1Zo0qSaJq97Na7C0c',
  },
  'vocal-edit': {
    kind: 'full',
    href: 'https://buy.stripe.com/7sYdR847w6Pg5p6cjZa7C05',
  },
  'mix-light': {
    kind: 'full',
    href: 'https://buy.stripe.com/3cI14meMab5w3gY5VBa7C0G',
  },
  'mix-standard': {
    kind: 'full',
    href: 'https://buy.stripe.com/8x29ASeMab5w3gYbfVa7C07',
  },
  'mix-full': {
    kind: 'deposit',
    depositHref: 'https://buy.stripe.com/3cI00igUiddEdVC97Na7C0g',
    fullHref: 'https://buy.stripe.com/6oUdR8fQe6Pg4l23Nta7C0f',
  },
  'full-song': {
    kind: 'deposit',
    depositHref: 'https://buy.stripe.com/eVqfZg6fE1uW8Bi2Jpa7C0j',
    fullHref: 'https://buy.stripe.com/14A4gy47wa1s6ta4Rxa7C0i',
  },
  stems: {
    kind: 'full',
    href: 'https://buy.stripe.com/9B67sK9rQflM7xecjZa7C08',
  },
} as const satisfies Record<string, PayOffer>

const usd = {
  'guitar-basic': {
    kind: 'full',
    href: 'https://buy.stripe.com/7sY5kC9rQ3D4aJq97Na7C0l',
  },
  'guitar-plus': {
    kind: 'full',
    href: 'https://buy.stripe.com/4gMeVc5bA3D404M1Fla7C0m',
  },
  'guitar-arrange': {
    kind: 'full',
    href: 'https://buy.stripe.com/7sYfZg1ZogpQcRy3Nta7C0n',
  },
  'track-loop': {
    kind: 'full',
    href: 'https://buy.stripe.com/5kQbJ0eMa3D4dVCfwba7C0o',
  },
  'track-brush-up': {
    kind: 'full',
    href: 'https://buy.stripe.com/14AdR847wb5w9Fmfwba7C0p',
  },
  'track-standard': {
    kind: 'deposit',
    depositHref: 'https://buy.stripe.com/7sYbJ033s8Xo18Qes7a7C0v',
    fullHref: 'https://buy.stripe.com/aFacN433sgpQ8Bido3a7C0u',
  },
  'track-arrange': {
    kind: 'deposit',
    depositHref: 'https://buy.stripe.com/00w28qavU6PgdVC2Jpa7C0y',
    fullHref: 'https://buy.stripe.com/14A6oG6fE2z0dVC0Bha7C0x',
  },
  'vocal-edit': {
    kind: 'full',
    href: 'https://buy.stripe.com/bJe3cubzY6Pgg3K0Bha7C0q',
  },
  'mix-light': {
    kind: 'full',
    href: 'https://buy.stripe.com/fZu3cugUia1s2cU6ZFa7C0H',
  },
  'mix-standard': {
    kind: 'full',
    href: 'https://buy.stripe.com/00w9AS8nM7TkaJq83Ja7C0s',
  },
  'mix-full': {
    kind: 'deposit',
    depositHref: 'https://buy.stripe.com/28E7sKfQe7Tk3gYcjZa7C0B',
    fullHref: 'https://buy.stripe.com/28E28q33sa1sdVC83Ja7C0A',
  },
  'full-song': {
    kind: 'deposit',
    depositHref: 'https://buy.stripe.com/28EaEWgUia1s2cU2Jpa7C0E',
    fullHref: 'https://buy.stripe.com/3cI8wO33sddEcRy0Bha7C0D',
  },
  stems: {
    kind: 'full',
    href: 'https://buy.stripe.com/7sY9AS33sb5w5p6abRa7C0t',
  },
} as const satisfies Record<string, PayOffer>

const links: Record<PayCurrency, Record<string, PayOffer>> = { jpy, usd }

export function payCurrencyForLocale(locale: Locale): PayCurrency {
  return locale === 'ja' ? 'jpy' : 'usd'
}

export function payOfferFor(planId: string, currency: PayCurrency): PayOffer | null {
  return links[currency][planId] ?? null
}

export function stemsPayHref(currency: PayCurrency): string {
  const offer = links[currency].stems
  if (!offer || offer.kind !== 'full') {
    throw new Error('stems payment link is missing')
  }
  return offer.href
}

/**
 * Store links for Guitar Navigation Assistant on /guitar.
 *
 * Tips are NOT copied here. The page uses the header Tips item (`/gna` in
 * `src/i18n/messages/en.ts`) and article URLs from `src/content/gnaNotes.ts`.
 *
 * PLACEHOLDER: this repository has no App Store or Google Play URL.
 * Replace a value with a full https URL when you have one.
 * Anything that is not an http(s) URL is ignored — no broken button.
 */
export const gnaStoreLinks = {
  /** PLACEHOLDER: no iOS App Store URL in the repo. */
  ios: 'PLACEHOLDER',
  /** PLACEHOLDER: no Google Play URL in the repo. */
  android: 'PLACEHOLDER',
} as const

/** Full GNA web app (not the embed iframe). Same host as production games. */
export const gnaWebAppUrl = 'https://guitar-dna-20260711.netlify.app/'

export function guitarStoreUrl(value: string): string | null {
  if (/^https?:\/\//i.test(value)) return value
  return null
}

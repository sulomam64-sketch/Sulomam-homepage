/**
 * Embedded GNA fretboard games on the Guitar Room.
 *
 * One switch: change `gnaGamesBase` to `gnaGamesProductionBase`
 * when https://guitar-dna-20260711.netlify.app/ is serving the embed.
 */
export const gnaGamesPreviewBase = 'https://puzzle-embed--guitar-dna-20260711.netlify.app/'

/** Final production base. Not used until `gnaGamesBase` points here. */
export const gnaGamesProductionBase = 'https://guitar-dna-20260711.netlify.app/'

/** Preview deploy for now. */
export const gnaGamesBase = gnaGamesPreviewBase

export type GnaGameMode = 'puzzle' | 'game'

/** Japanese only when the Guitar Room locale is Japanese. zh / ko / es follow English. */
export function gnaGameLang(locale: string): 'ja' | 'en' {
  return locale === 'ja' ? 'ja' : 'en'
}

export function gnaGameSrc(mode: GnaGameMode, locale: string): string {
  const base = gnaGamesBase.replace(/\/+$/, '')
  return `${base}/?mode=${mode}&embed=1&lang=${gnaGameLang(locale)}`
}

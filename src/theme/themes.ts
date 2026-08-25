export const themes = ['light', 'dark'] as const

export type Theme = (typeof themes)[number]

export const THEME_STORAGE_KEY = 'sulomam-theme'

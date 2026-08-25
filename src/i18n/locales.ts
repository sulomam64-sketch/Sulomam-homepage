export const locales = ['ja', 'en', 'zh', 'ko', 'es'] as const

export type Locale = (typeof locales)[number]

export const localeLabels: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  zh: '中文',
  ko: '한국어',
  es: 'Español',
}

export const localeHtmlLang: Record<Locale, string> = {
  ja: 'ja',
  en: 'en',
  zh: 'zh-CN',
  ko: 'ko',
  es: 'es',
}

export const STORAGE_KEY = 'sulomam-locale'

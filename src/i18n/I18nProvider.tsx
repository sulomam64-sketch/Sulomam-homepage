import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { localeHtmlLang, locales, STORAGE_KEY, type Locale } from './locales'
import { en } from './messages/en'
import { es } from './messages/es'
import { ja } from './messages/ja'
import { ko } from './messages/ko'
import type { Messages } from './messages/types'
import { zh } from './messages/zh'

const catalog: Record<Locale, Messages> = { ja, en, zh, ko, es }

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Messages
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && (locales as readonly string[]).includes(stored)) {
      return stored as Locale
    }
  } catch {
    /* ignore */
  }
  return 'ja'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window === 'undefined' ? 'ja' : readStoredLocale(),
  )

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = localeHtmlLang[locale]
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: catalog[locale],
    }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}

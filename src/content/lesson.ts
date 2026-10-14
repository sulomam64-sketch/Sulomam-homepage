import type { Locale } from '../i18n/locales'

/** WhatsApp chat link for video-lesson buyers. */
export const lessonWhatsAppUrl = 'https://wa.me/message/TT34JD3DZI46D1'

/**
 * PLACEHOLDER: lesson-only LINE official account for Japanese video-lesson buyers.
 * While this is '#', the LINE button on the Japanese thanks page stays hidden.
 */
export const lessonLineUrl: string = '#'

export const lessonPaths = {
  ja: '/lesson',
  jaThanks: '/lesson/thanks',
  en: '/video-lessons',
  enThanks: '/video-lessons/thanks',
} as const

export const lessonFreeTrialPath = '/contact?plan=free-trial'
export const lessonBookingPath = '/contact?plan=lesson'

/** Japanese visitors get the Zoom lessons; every other locale gets the video lessons. */
export function lessonPathForLocale(locale: Locale): string {
  return locale === 'ja' ? lessonPaths.ja : lessonPaths.en
}

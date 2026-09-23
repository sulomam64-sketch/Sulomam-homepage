import { useEffect, useLayoutEffect, useState, type MouseEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { siteConfig } from '../content/config'
import { localeLabels, locales, useI18n, type Locale } from '../i18n'
import { useTheme, type Theme } from '../theme'
import './Layout.css'

type Props = {
  children: React.ReactNode
}

function plansHash(hash: string) {
  return hash.startsWith('#plans')
}

/** True once the Plans section has reached the sticky header, until it scrolls past. */
function plansSectionIsCurrent() {
  const section = document.getElementById('plans')
  if (!section) return false
  const header = document.querySelector('.site-header')
  const headerBottom = header instanceof HTMLElement ? header.getBoundingClientRect().bottom : 0
  const rect = section.getBoundingClientRect()
  return rect.top <= headerBottom + 8 && rect.bottom > headerBottom + 8
}

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.slice(1))
  const target =
    document.getElementById(id) ??
    (id.startsWith('plans') ? document.getElementById('plans') : null)
  if (!target) return false
  target.scrollIntoView()
  return true
}

export function Layout({ children }: Props) {
  const { t, locale, setLocale } = useI18n()
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const [plansInView, setPlansInView] = useState(false)
  const hashPlans = location.pathname === '/' && plansHash(location.hash)
  const onPlans = hashPlans || (location.pathname === '/' && plansInView)
  const onHome = location.pathname === '/' && !onPlans

  function goHome(event: MouseEvent<HTMLAnchorElement>) {
    if (location.pathname === '/' && !plansHash(location.hash)) {
      event.preventDefault()
      window.scrollTo(0, 0)
    }
  }

  useLayoutEffect(() => {
    if (location.hash && scrollToHash(location.hash)) return
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setPlansInView(location.pathname === '/' && plansSectionIsCurrent())
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [location.pathname])

  return (
    <div className="layout">
      <header className="site-header">
        <NavLink to="/" className="brand" end onClick={goHome}>
          <span className="brand-name">{t.site.brand}</span>
          <span className="brand-tag">{t.site.tagline}</span>
        </NavLink>
        <div className="header-tools">
          <nav className="site-nav" aria-label={t.layout.navAria}>
            {t.site.nav.map((item) =>
              item.to === '/' ? (
                <Link
                  key={item.to}
                  to="/"
                  className={onHome ? 'nav-link active' : 'nav-link'}
                  aria-current={onHome ? 'page' : undefined}
                  onClick={goHome}
                >
                  {item.label}
                </Link>
              ) : item.to.includes('#') ? (
                <Link
                  key={item.to}
                  to={item.to}
                  className={onPlans ? 'nav-link active' : 'nav-link'}
                  aria-current={onPlans ? 'location' : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <a
              className="nav-link nav-external"
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noreferrer"
            >
              {t.layout.instagram}
            </a>
          </nav>
          <label className="lang-switch">
            <span className="lang-switch-label">{t.site.languageLabel}</span>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              aria-label={t.site.languageLabel}
            >
              {locales.map((code) => (
                <option key={code} value={code}>
                  {localeLabels[code]}
                </option>
              ))}
            </select>
          </label>
          <label className="lang-switch">
            <span className="lang-switch-label">{t.site.themeLabel}</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as Theme)}
              aria-label={t.site.themeLabel}
            >
              <option value="light">{t.site.themeLight}</option>
              <option value="dark">{t.site.themeDark}</option>
            </select>
          </label>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <a
          className="footer-instagram"
          href={siteConfig.instagram.url}
          target="_blank"
          rel="noreferrer"
        >
          {t.layout.instagram} {siteConfig.instagram.handle}
        </a>
        <p>
          © {new Date().getFullYear()} {siteConfig.brand}
        </p>
      </footer>
    </div>
  )
}

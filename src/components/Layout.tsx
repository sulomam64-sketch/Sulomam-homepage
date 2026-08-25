import { NavLink } from 'react-router-dom'
import { siteConfig } from '../content/config'
import { localeLabels, locales, useI18n, type Locale } from '../i18n'
import { useTheme, type Theme } from '../theme'
import './Layout.css'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  const { t, locale, setLocale } = useI18n()
  const { theme, setTheme } = useTheme()

  return (
    <div className="layout">
      <header className="site-header">
        <NavLink to="/" className="brand" end>
          <span className="brand-name">{t.site.brand}</span>
          <span className="brand-tag">{t.site.tagline}</span>
        </NavLink>
        <div className="header-tools">
          <nav className="site-nav" aria-label={t.layout.navAria}>
            {t.site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {item.label}
              </NavLink>
            ))}
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

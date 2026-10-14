import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])
}

/** Adds `noindex, nofollow` while the page is mounted and restores the previous value after. */
export function useNoIndex() {
  useEffect(() => {
    const existing = document.querySelector('meta[name="robots"]')
    const meta = existing ?? document.createElement('meta')
    if (!existing) {
      meta.setAttribute('name', 'robots')
      document.head.appendChild(meta)
    }
    const previous = meta.getAttribute('content')
    meta.setAttribute('content', 'noindex, nofollow')

    return () => {
      if (!existing) meta.remove()
      else if (previous == null) meta.removeAttribute('content')
      else meta.setAttribute('content', previous)
    }
  }, [])
}

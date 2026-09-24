/**
 * Site-wide blob stores are shared by production and deploy previews.
 * Keep preview/local writes out of the live counters.
 * An unset context is treated as non-production so a misconfigured shell
 * cannot overwrite the live store.
 */
export function playStoreName(context = process.env.CONTEXT || 'dev'): string {
  const normalized = context.toLowerCase().replace(/[^a-z0-9-]/g, '')
  if (normalized === 'production') return 'play-counts'
  const suffix = normalized.slice(0, 48) || 'dev'
  return `play-counts-${suffix}`
}

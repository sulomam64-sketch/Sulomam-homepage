/** Reject browser requests that are clearly coming from another site. */
export function isCrossSite(req: Request): boolean {
  if (req.headers.get('sec-fetch-site') === 'cross-site') return true
  const origin = req.headers.get('origin')
  if (!origin) return false
  const forwarded = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  if (!forwarded) return false
  const host = forwarded.split(',')[0]?.trim()
  if (!host) return false
  try {
    return new URL(origin).host !== host
  } catch {
    return true
  }
}

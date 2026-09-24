import { createHash, timingSafeEqual } from 'node:crypto'

const MAX_KEY_LENGTH = 512

export function credentialFromRequest(req: Request): string | null {
  const header = req.headers.get('x-play-stats-key')
  if (header) return header.trim()
  const authorization = req.headers.get('authorization')
  if (authorization) {
    const match = /^Bearer\s+(\S+)\s*$/i.exec(authorization)
    return match?.[1] ?? null
  }
  return new URL(req.url).searchParams.get('key')
}

/** True only when a configured secret matches. Missing or empty secrets never match. */
export function isAuthorized(provided: string | null, expected: string | undefined): boolean {
  if (!expected || !provided) return false
  if (provided.length > MAX_KEY_LENGTH || expected.length > MAX_KEY_LENGTH) return false
  const left = createHash('sha256').update(provided).digest()
  const right = createHash('sha256').update(expected).digest()
  return timingSafeEqual(left, right)
}

export function requestIsAuthorized(req: Request): boolean {
  return isAuthorized(credentialFromRequest(req), process.env.PLAY_STATS_KEY)
}

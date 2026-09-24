import { blobCounterStore } from '../lib/blob-store.ts'
import { badRequest, methodNotAllowed, privateHeaders } from '../lib/http.ts'
import { parsePlayRequest } from '../lib/parse-play-request.ts'
import { isCrossSite } from '../lib/request-guards.ts'
import { incrementTrack } from '../lib/stats.ts'

const MAX_BODY = 1024

export default async function play(req: Request): Promise<Response> {
  if (req.method !== 'POST') return methodNotAllowed('POST')
  if (isCrossSite(req)) return badRequest()

  const contentType = req.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) return badRequest()

  const declaredLength = Number(req.headers.get('content-length') ?? '0')
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY) return badRequest()

  let text: string
  try {
    text = await req.text()
  } catch {
    return badRequest()
  }
  if (text.length === 0 || text.length > MAX_BODY) return badRequest()

  let body: unknown
  try {
    body = JSON.parse(text) as unknown
  } catch {
    return badRequest()
  }

  const playRequest = parsePlayRequest(body)
  if (!playRequest) return badRequest()

  try {
    await incrementTrack(blobCounterStore(), playRequest.trackId, playRequest.event)
  } catch (error) {
    console.error('play counter increment failed')
    console.error(error)
    return new Response(null, { status: 500, headers: privateHeaders })
  }

  return new Response(null, { status: 204, headers: privateHeaders })
}

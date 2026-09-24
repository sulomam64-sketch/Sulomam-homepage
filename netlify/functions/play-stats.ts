import { requestIsAuthorized } from '../lib/auth.ts'
import { blobCounterStore } from '../lib/blob-store.ts'
import { methodNotAllowed, notFound, privateHeaders } from '../lib/http.ts'
import { loadReport } from '../lib/stats.ts'

export default async function playStats(req: Request): Promise<Response> {
  if (!requestIsAuthorized(req)) return notFound()
  if (req.method !== 'GET') return methodNotAllowed('GET')

  try {
    const report = await loadReport(blobCounterStore())
    return new Response(JSON.stringify(report), {
      status: 200,
      headers: {
        ...privateHeaders,
        'content-type': 'application/json; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('play stats read failed')
    console.error(error)
    return new Response(null, { status: 500, headers: privateHeaders })
  }
}

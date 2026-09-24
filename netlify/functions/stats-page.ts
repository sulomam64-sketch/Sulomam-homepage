import { requestIsAuthorized } from '../lib/auth.ts'
import { blobCounterStore } from '../lib/blob-store.ts'
import { methodNotAllowed, notFound, privateHeaders } from '../lib/http.ts'
import { loadReport } from '../lib/stats.ts'
import { renderStatsPage } from '../lib/stats-page.ts'

export default async function statsPage(req: Request): Promise<Response> {
  if (!requestIsAuthorized(req)) return notFound()
  if (req.method !== 'GET') return methodNotAllowed('GET')

  try {
    const report = await loadReport(blobCounterStore())
    return new Response(renderStatsPage(report), {
      status: 200,
      headers: {
        ...privateHeaders,
        'content-type': 'text/html; charset=utf-8',
        'content-security-policy':
          "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'",
      },
    })
  } catch (error) {
    console.error('play stats page failed')
    console.error(error)
    return new Response(null, { status: 500, headers: privateHeaders })
  }
}

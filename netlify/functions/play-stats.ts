import { requestIsAuthorized } from '../lib/auth.ts'
import { blobCounterStore } from '../lib/blob-store.ts'
import { methodNotAllowed, notFound, privateHeaders } from '../lib/http.ts'
import { loadReport } from '../lib/stats.ts'
import { readDeployContext, type NetlifyHandlerContext } from '../lib/store-name.ts'

export default async function playStats(req: Request, context: NetlifyHandlerContext): Promise<Response> {
  if (!requestIsAuthorized(req)) return notFound()
  if (req.method !== 'GET') return methodNotAllowed('GET')

  try {
    const deployContext = readDeployContext(context)
    const report = await loadReport(blobCounterStore(deployContext), new Date(), deployContext)
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

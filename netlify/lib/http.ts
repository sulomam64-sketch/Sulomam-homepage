export const privateHeaders = {
  'cache-control': 'no-store',
  'netlify-cdn-cache-control': 'no-store',
  'x-robots-tag': 'noindex, nofollow',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer',
}

export function notFound(): Response {
  return new Response('Not found', {
    status: 404,
    headers: {
      ...privateHeaders,
      'content-type': 'text/plain; charset=utf-8',
    },
  })
}

export function methodNotAllowed(allow: string): Response {
  return new Response('Method not allowed', {
    status: 405,
    headers: {
      ...privateHeaders,
      allow,
      'content-type': 'text/plain; charset=utf-8',
    },
  })
}

export function badRequest(): Response {
  return new Response(null, { status: 400, headers: privateHeaders })
}

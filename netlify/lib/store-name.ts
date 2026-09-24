/**
 * Site-wide blob stores are shared by every deploy of the site.
 * Production and deploy previews must use different store names.
 *
 * `CONTEXT` is a build-time variable and is not set on the function at
 * runtime. The live value is `Netlify.context.deploy.context` (Functions v2),
 * which is the same object passed as the handler's second argument.
 */
export type NetlifyHandlerContext = {
  deploy?: {
    context?: string
  }
}

type NetlifyRuntime = {
  context?: NetlifyHandlerContext | null
}

function contextName(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return trimmed
}

function netlifyRuntimeContext(): string | undefined {
  const runtime = (globalThis as { Netlify?: NetlifyRuntime }).Netlify
  return contextName(runtime?.context?.deploy?.context)
}

export function readDeployContext(handlerContext?: NetlifyHandlerContext | null): string {
  return (
    contextName(handlerContext?.deploy?.context) ??
    netlifyRuntimeContext() ??
    'dev'
  )
}

export function playStoreName(context = readDeployContext()): string {
  const normalized = context.toLowerCase().replace(/[^a-z0-9-]/g, '')
  if (normalized === 'production') return 'play-counts'
  const suffix = normalized.slice(0, 48) || 'dev'
  return `play-counts-${suffix}`
}

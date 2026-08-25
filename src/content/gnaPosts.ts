import { marked } from 'marked'

export type GnaPostMeta = {
  slug: string
  title: string
  date: string
  summary: string
  draft: boolean
}

export type GnaPost = GnaPostMeta & {
  html: string
}

type Frontmatter = {
  title?: string
  date?: string
  summary?: string
  draft?: boolean
}

const rawModules = import.meta.glob('../../content/gna/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function parseFrontmatter(raw: string): { data: Frontmatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data: Frontmatter = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (key === 'draft') {
      data.draft = value === 'true'
    } else if (key === 'title') {
      data.title = value
    } else if (key === 'date') {
      data.date = value
    } else if (key === 'summary') {
      data.summary = value
    }
  }

  return { data, content: match[2] }
}

function slugFromPath(path: string): string {
  const file = path.split('/').pop() ?? path
  return file.replace(/\.md$/, '')
}

function parsePost(path: string, raw: string): GnaPost {
  const { data, content } = parseFrontmatter(raw)
  return {
    slug: slugFromPath(path),
    title: data.title?.trim() || slugFromPath(path),
    date: (data.date ?? '').slice(0, 10),
    summary: data.summary?.trim() || '',
    draft: Boolean(data.draft),
    html: marked.parse(content.trim(), { async: false }) as string,
  }
}

const allPosts: GnaPost[] = Object.entries(rawModules)
  .map(([path, raw]) => parsePost(path, raw))
  .filter((post) => !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'ja'))

export function getGnaPosts(): GnaPostMeta[] {
  return allPosts.map(({ html: _html, ...meta }) => meta)
}

export function getGnaPost(slug: string): GnaPost | undefined {
  return allPosts.find((post) => post.slug === slug)
}

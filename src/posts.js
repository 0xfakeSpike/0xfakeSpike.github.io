const rawByPath = import.meta.glob('./content/articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function dateFromFilename(name) {
  const m = name.match(/^(\d{4}-\d{2}-\d{2})-/)
  return m ? m[1] : null
}

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function parseArticle(path, raw) {
  const filename = path.split('/').pop()
  let dateStr = dateFromFilename(filename)
  if (!dateStr) dateStr = new Date().toISOString().slice(0, 10)

  const lines = raw.split('\n')
  let title = ''
  let bodyStart = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.startsWith('#')) {
      title = line.replace(/^#+\s*/, '')
      bodyStart = i + 1
      break
    }
  }
  if (!title) {
    title = filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
  }

  let slug = titleToSlug(title)
  const body = lines.slice(bodyStart).join('\n')

  let excerpt = ''
  const contentLines = body.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#'))
  excerpt = contentLines.slice(0, 2).join(' ').slice(0, 150)
  if (body.length > excerpt.length) excerpt += '...'

  const id = path.replace(/\.md$/, '').replace(/[^a-zA-Z0-9]/g, '-')

  return { id, slug, title, date: dateStr, excerpt, content: body }
}

const map = new Map()
for (const path of Object.keys(rawByPath)) {
  const post = parseArticle(path, rawByPath[path])
  if (map.has(post.slug)) post.slug = `${post.slug}-${post.id.slice(-8)}`
  map.set(post.slug, post)
}

export const posts = [...map.values()]
  .filter((p) => {
    if (!p.date) return true
    const d = new Date(p.date)
    return !Number.isNaN(d.getTime()) && d <= new Date()
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function findPost(slug) {
  return posts.find((p) => p.slug === slug)
}

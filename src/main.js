import './style.css'
import { renderMarkdown } from './md.js'
import { posts, findPost } from './posts.js'
import aboutRaw from './content/about.md?raw'

const app = document.getElementById('app')

function parseAbout() {
  const lines = aboutRaw.split('\n')
  const titleLine = lines.find((l) => l.trim().startsWith('#'))
  const title = titleLine ? titleLine.replace(/^#+\s*/, '') : '关于'
  const body = lines
    .filter((l) => !l.trim().startsWith('#'))
    .join('\n')
    .trim()
  return { title, body }
}

function route() {
  const raw = (window.location.hash || '#/').replace(/^#/, '') || '/'
  const path = raw.startsWith('/') ? raw : `/${raw}`
  if (path === '/' || path === '') return { type: 'home' }
  const slug = path.slice(1)
  return { type: 'post', slug }
}

function layout(inner) {
  return `
    <div class="page">
      <header class="top">
        <div class="wrap">
          <a class="brand" href="#/">Spike</a>
        </div>
      </header>
      <main class="wrap main">${inner}</main>
      <footer class="foot">
        <div class="wrap muted">&copy; ${new Date().getFullYear()} Spike</div>
      </footer>
    </div>
  `
}

function renderHome() {
  const { title, body } = parseAbout()
  const list = posts
    .map(
      (p) => `
      <li>
        <a href="#/${p.slug}">${escapeHtml(p.title)}</a>
        <span class="muted">${p.date}</span>
      </li>`,
    )
    .join('')

  return layout(`
    <h1 class="hero">Hey, here is Spike</h1>
    <section class="block">
      <h2>${escapeHtml(title)}</h2>
      <div class="md">${renderMarkdown(body)}</div>
    </section>
    <section class="block">
      <h2>文章</h2>
      <ul class="posts">${list}</ul>
    </section>
  `)
}

function renderPost(slug) {
  const post = findPost(slug)
  if (!post) {
    return layout(`
      <p>未找到这篇文章。</p>
      <p><a href="#/">返回首页</a></p>
    `)
  }
  return layout(`
    <p class="back"><a href="#/">← 返回</a></p>
    <article class="block post">
      <h1>${escapeHtml(post.title)}</h1>
      <p class="muted date">${post.date}</p>
      <div class="md">${renderMarkdown(post.content)}</div>
    </article>
  `)
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function render() {
  const r = route()
  app.innerHTML = r.type === 'home' ? renderHome() : renderPost(r.slug)
  if (r.type === 'home') {
    document.title = 'Spike'
    return
  }
  const post = findPost(r.slug)
  document.title = post ? `${post.title} · Spike` : '未找到 · Spike'
}

window.addEventListener('hashchange', render)
if (!window.location.hash) window.location.hash = '#/'
render()

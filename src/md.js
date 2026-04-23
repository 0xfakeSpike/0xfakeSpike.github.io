import MarkdownIt from 'markdown-it'
import texmath from 'markdown-it-texmath'
import katex from 'katex'
import 'katex/dist/katex.min.css'

const md = new MarkdownIt({ html: false, linkify: true, typographer: true }).use(
  texmath,
  {
    engine: katex,
    delimiters: 'dollars',
  },
)

export function renderMarkdown(source) {
  return md.render(source)
}

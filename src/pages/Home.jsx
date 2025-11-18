import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { posts } from '../data/posts'
import aboutContent from '../content/about.md?raw'
import './Home.css'

function Home() {
  // 从 Markdown 内容中提取标题和正文
  const lines = aboutContent.split('\n')
  const titleLine = lines.find(line => line.trim().startsWith('#'))
  const title = titleLine ? titleLine.replace(/^#+\s*/, '') : '关于我'
  const content = lines
    .filter(line => !line.trim().startsWith('#'))
    .join('\n')
    .trim()

  return (
    <div className="home">
      <div className="container">
        <section className="hero">
          <div className="hero-content">
            <h1>Hey, here is Spike</h1>
          </div>
        </section>

        <section className="about">
          <h2>{title}</h2>
          <div className="about-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </section>

        <section className="recent-posts">
          <h2>所有文章</h2>
          <div className="post-grid">
            {posts.map((post) => (
              <Link key={post.id} to={`/${post.slug}`} className="post-card">
                <h3>{post.title}</h3>
                <p className="post-date">{String(post.date)}</p>
                <p className="post-excerpt">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home


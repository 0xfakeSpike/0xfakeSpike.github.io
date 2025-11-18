import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { posts } from '../data/posts'
import 'katex/dist/katex.min.css'
import './PostDetail.css'

function PostDetail() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="post-detail">
        <div className="container">
          <h1>文章未找到</h1>
          <Link to="/">返回首页</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="post-detail">
      <div className="container">
        <Link to="/" className="back-link">← 返回首页</Link>
        <article>
          <header className="post-header">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="date">{String(post.date)}</span>
              {post.venue && <span className="venue">{post.venue}</span>}
              {post.tags && post.tags.length > 0 && (
                <div className="tags">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>
          <div className="post-content markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  )
}

export default PostDetail


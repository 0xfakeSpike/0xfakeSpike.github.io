// 加载所有文章（统一从 articles 目录加载）
const articleModules = import.meta.glob('../content/articles/*.md', { 
  eager: true 
})

function getDateFromFilename(filename) {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-/)
  return match ? match[1] : null
}

// 从标题生成友好的 slug
function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .trim()
}

function processMarkdownFile(path, modules) {
  const filename = path.split('/').pop()
  const rawContent = modules[path].default
  
  // 从文件名提取日期
  let dateStr = getDateFromFilename(filename)
  if (!dateStr) {
    dateStr = new Date().toISOString().split('T')[0]
  }
  
  // 从内容第一行提取标题（第一行应该是 # 标题）
  const lines = rawContent.split('\n')
  let title = ''
  let contentStartIndex = 0
  
  // 查找第一个以 # 开头的行作为标题
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line && line.startsWith('#')) {
      title = line.replace(/^#+\s*/, '')
      contentStartIndex = i + 1
      break
    }
  }
  
  // 如果没有找到标题，使用文件名
  if (!title) {
    title = filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
  }
  
  // 从标题生成 slug
  const slug = titleToSlug(title)
  
  // 提取内容（跳过标题行）
  const markdownContent = lines.slice(contentStartIndex).join('\n')
  
  // 从内容中提取 excerpt（跳过标题和空行）
  let excerpt = ''
  if (markdownContent) {
    const contentLines = markdownContent
      .split('\n')
      .filter(line => line.trim() && !line.trim().startsWith('#'))
    excerpt = contentLines.slice(0, 2).join(' ').substring(0, 150)
    if (excerpt.length < markdownContent.length) {
      excerpt += '...'
    }
  }
  
  // 使用路径作为唯一标识符，避免重复的 slug
  const uniqueId = path.replace(/\.md$/, '').replace(/[^a-zA-Z0-9]/g, '-')
  
  return {
    id: uniqueId, // 唯一标识符
    slug,
    title,
    date: dateStr, // 确保是字符串
    tags: [],
    excerpt: excerpt || '',
    content: markdownContent,
    venue: '',
  }
}

// 处理所有文章，使用 Map 去重（基于 slug）
const postsMap = new Map()

Object.keys(articleModules).forEach(path => {
  const post = processMarkdownFile(path, articleModules)
  // 如果 slug 已存在，添加路径信息使其唯一
  if (postsMap.has(post.slug)) {
    post.slug = `${post.slug}-${post.id.slice(-8)}`
  }
  postsMap.set(post.slug, post)
})

export const posts = Array.from(postsMap.values())
  .filter(post => {
    // 过滤掉未来日期的文章
    if (!post.date) return true // 如果没有日期，保留
    const postDate = new Date(post.date)
    return !isNaN(postDate.getTime()) && postDate <= new Date()
  })
  .sort((a, b) => {
    // 按日期排序，没有日期的排在最后
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date) - new Date(a.date)
  })



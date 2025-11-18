# Spike's Personal Homepage

基于 React + Vite 构建的简洁个人主页，部署在 GitHub Pages。

## 功能特性

- 🎨 现代化、简洁的 UI 设计
- 📱 完全响应式布局
- 📝 文章展示（首页显示所有文章，点击查看详情）
- 🔍 Markdown 支持（包括数学公式）
- ⚡ 基于 Vite 的快速开发体验

## 技术栈

- **React 18** - UI 框架
- **Vite** - 构建工具
- **React Router** - 路由管理
- **React Markdown** - Markdown 渲染
- **KaTeX** - 数学公式渲染

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 部署到 GitHub Pages

### 方法 1: 使用 gh-pages 包（推荐）

```bash
npm run deploy
```

这会自动构建项目并推送到 `gh-pages` 分支。

### 方法 2: 手动部署

1. 构建项目：
   ```bash
   npm run build
   ```

2. 将 `dist` 目录的内容推送到 `gh-pages` 分支

3. 在 GitHub 仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支

## 项目结构

```
.
├── src/
│   ├── components/     # React 组件
│   ├── pages/          # 页面组件
│   ├── content/        # Markdown 内容文件
│   │   └── articles/   # 所有文章（统一管理）
│   ├── data/           # 数据加载逻辑
│   ├── App.jsx         # 主应用组件
│   ├── main.jsx        # 入口文件
│   └── index.css       # 全局样式
├── public/             # 静态资源
│   ├── images/         # 图片文件
│   ├── talk2/          # 演讲相关资源
│   └── talk6/          # 演讲相关资源
├── index.html          # HTML 模板
├── vite.config.js      # Vite 配置
└── package.json        # 项目配置
```

## 添加内容

### 添加文章

所有内容都统一显示为"文章"。在 `src/content/articles/` 目录下创建 Markdown 文件。

文件名格式：`YYYY-MM-DD-文章标题.md`

文件开头需要包含 front matter（YAML 格式）：

```markdown
---
title: "文章标题"
date: 2024-01-01
tags:
  - 标签1
  - 标签2
excerpt: "文章摘要（可选）"
location: "地点（可选，用于演讲）"
venue: "活动名称（可选，用于演讲）"
---

这里是 Markdown 正文内容...
```

**注意**：
- 如果文件名包含日期前缀（如 `2024-01-01-xxx.md`），系统会自动提取日期
- 如果没有 front matter，系统会从文件名自动生成 slug 和日期
- 未来日期的文章会被自动过滤
- 所有文章统一显示在文章列表中

### 文件命名规范

- **所有文章**: `YYYY-MM-DD-文章标题.md`

系统会自动：
- 从文件名提取日期
- 从 front matter 或标题生成 slug
- 如果没有 front matter，从内容第一行提取标题

## 许可证

MIT

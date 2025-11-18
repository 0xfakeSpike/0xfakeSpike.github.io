import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 自定义插件：将 Markdown 文件作为原始文本导入
    {
      name: 'markdown-loader',
      load(id) {
        if (id.endsWith('.md')) {
          return `export default ${JSON.stringify(readFileSync(id, 'utf-8'))}`
        }
      },
    },
  ],
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@content': resolve(__dirname, 'src/content'),
    },
  },
})

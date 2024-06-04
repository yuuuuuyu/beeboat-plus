import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}

// 设置别名
const alias: Record<string, string> = {
  '@': pathResolve('src'),
  '/@': pathResolve('src'),
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias,
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          `@use "@beeboat/bee-theme/src/scss/var.scss" as *;`,
        ].join('\n'),
      },
    },
  },
  server: {
    host: '0.0.0.0',
  },
})

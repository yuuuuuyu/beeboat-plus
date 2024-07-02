import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

// 路径查找
const pathResolve = (dir: string): string => {
    return resolve(__dirname, '.', dir)
}

// 设置别名
const alias: Record<string, string> = {
    '@': pathResolve('src'),
    '/@': pathResolve('src'),
}

/*
 * 创建HTML页面插件
 */
function createViteHtmlPlugin() {
    return createHtmlPlugin({
        minify: true,
        entry: '/src/main.ts',
        template: 'index.html',
        inject: {
            data: {
                title: '首页',
                injectScript: ``,
            },
            tags: [
                {
                    injectTo: 'body-prepend',
                    tag: 'div',
                    attrs: {
                        id: `app-example`,
                        class: 'btp-app',
                    },
                },
            ],
        },
    })
}

export default defineConfig({
    resolve: {
        alias,
    },
    plugins: [vue(), createViteHtmlPlugin()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: [
                    `@use "@beeboat/beeboat-theme/src/themes/scss/var.scss" as *;`,
                ].join('\n'),
            },
        },
    },
    server: {
        host: '0.0.0.0',
    },
})

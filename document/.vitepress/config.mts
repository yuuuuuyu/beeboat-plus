import { defineConfig } from 'vitepress'
import nav from './config/nav'
import sidebar from './config/sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Beeboat Plus',
    description: 'A VitePress Site',
    lang: 'zh-CN',
    // base: './',
    // outDir: './dist',
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        lastUpdated: {
            text: '最近更新时间',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium',
            },
        },
        nav: nav,
        logo: '/logo.png',
        footer: {
            copyright: 'Copyright © 2024-present yuzhiyong',
        },
        sidebar: sidebar,

        // socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    },
})

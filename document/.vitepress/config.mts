import { defineConfig } from 'vitepress'

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
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' },
        ],
        logo: '/logo.png',
        footer: {
            copyright: 'Copyright © 2024-present yuzhiyong',
        },
        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    },
})

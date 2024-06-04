import { UserConfig } from 'vitepress'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'
import nav from './config/nav.json'
import sidebar from './config/sidebar.json'

const config: UserConfig = {
  themeConfig: {
    nav,
    sidebar,
    logo: '/logo.png',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present mickey',
    },
  },

  title: 'BeeboatUI',
  lang: 'zh-CN',
  description: '一个vue3组件库',

  markdown: {
    config: (md) => {
      md.use(demoBlockPlugin, {
        customStyleTagName: 'style lang="scss"', // style标签会解析为<style lang="scss"><style>
      })
    },
  },
}

export default config

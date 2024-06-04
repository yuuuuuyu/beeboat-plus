import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@beeboat/theme/src/index.scss'
import './styles/global.scss'

import * as components from '@beeboat/components'
import * as directives from '@beeboat/directives'
import { createI18n } from 'vue-i18n'
import VueCookies from 'vue-cookies'
import BtApplication from '@beeboat/core/app'
const app = createApp(App)
app.use(createPinia())
Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
})
Object.entries(directives).forEach(([name, component]) => {
    app.directive(name, component)
})

// 验证解决bttable报警告i18n
const btApp = new BtApplication({
    appTemplate: App,
    env: import.meta.env,
    constRoutes: [],
    whiteList: [],
    componentKit: [],
    directive: [],
    config: {},
    handlers: [],
})
btApp.$app = app

const i18n = createI18n({
    globalInjection: true,
    legacy: false,
    locale: 'zh-CN',
    fallbackLocale: 'zh-CN',
    messages: {
        'zh-CN': {
            PageTablePage: 'hello world',
        },
    },
})
app.use(router).use(ElementPlus).use(i18n).use(VueCookies).mount('#app')

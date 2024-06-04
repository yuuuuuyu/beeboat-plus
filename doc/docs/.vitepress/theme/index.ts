import DefaultTheme from 'vitepress/theme'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useComponents } from './useComponents'
import useBeeTheme from './useBeeTheme'
import * as components from '@beeboat/components'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import 'element-plus/dist/index.css'
import '@beeboat/theme/src/index.scss'
import './styles/index.css'

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        const pinia = createPinia()
        DefaultTheme.enhanceApp(ctx)

        ctx.app.use(pinia)
        ctx.app.use(ElementPlus)
        // ctx.app.use(BeeboatUI)
        //全局加载 自定义组件
        useComponents(ctx.app)
        Object.entries(components).forEach(([name, component]) => {
            ctx.app.component(name, component)
        })
        Object.entries(ElementPlusIconsVue).forEach(([name, component]) => {
            ctx.app.component(name, component)
        })
        useBeeTheme(ctx.app)
    },
}

import type { App } from 'vue'
import * as components from '@beeboat/components'

const install = (app: App) => {
    Object.entries(components).forEach(([name, component]) => {
        app.component(name, component)
    })
}
export default { install }

// 可以实现按需加载
export * from '@beeboat/components'
export * from '@beeboat/core'

import type { App } from 'vue'
import * as components from '@beeboat/components'
const install = (app: App) => {
    Object.entries(components).forEach(([name, component]) => {
        app.component(name, component)
    })
}

export default { install }

export * from '@beeboat/components'
export * from '@beeboat/core'

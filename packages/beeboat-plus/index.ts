import type { App } from 'vue'
import { BtpButton } from '@beeboat/components'

const install = (app: App) => {
    // Object.entries(components).forEach(([name, component]) => {
    //     app.component(name, component)
    // })
    app.component(BtpButton.name, BtpButton)
}

export default { install }

// 可以实现按需加载
export * from '@beeboat/components'
export * from '@beeboat/core'

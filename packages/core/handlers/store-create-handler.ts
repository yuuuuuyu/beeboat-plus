import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import BtBaseSetupHandler from '../base/base-setup-handler'

/**
 * 状态管理对象创建处理类
 * @author Enmaai
 */
export default class BtStoreCreateHandler extends BtBaseSetupHandler {
    readonly className: string = 'BtStoreCreateHandler'

    handle() {
        // this.getVueApp().use(createPinia().use(piniaPluginPersistedstate))
        this.getVueApp().use(createPinia())
    }
}

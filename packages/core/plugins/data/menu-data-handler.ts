import { BtBaseHandler } from '../../base'
import { BtUseAppStore } from '../../store'
import { listToTree } from '../../utils/utils'

/**
 * 用户菜单加载对象
 * @author Enmaai
 */
class BtMenuDataHandler extends BtBaseHandler {
    readonly className: string = 'BtMenuDataHandler'
    constructor() {
        super()
        this._rank = 10
        this._loadType = 'api'
    }

    async handle() {
        const appStore = BtUseAppStore()
        const microEnv = (window as any).__MICRO_APP_ENVIRONMENT__

        if (this.getApp().options?.autoLoadMicroAppData && microEnv) {
            const microApp = (window as any).microApp
            const microAppData = microApp.getData() ?? {}
            appStore.setMenuData(
                microAppData.appData?.menuList || [],
                microAppData.appData?.menuTree || [],
            )
        } else {
            const api = this.getApp().options.config?.menuLoadApi
            const data = await this.getApp().$http.post(api, { t: Math.random() * 1000 + 1 })

            appStore.setMenuData(data.data, listToTree(data.data))
        }
    }
}

export default BtMenuDataHandler

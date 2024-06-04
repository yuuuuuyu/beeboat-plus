import { BtBaseHandler } from '../../base'
import { BtUseAppStore } from '../../store/'

/**
 * 数据字典数据加载对象
 * @author Enmaai
 */
class BtUserDataHandler extends BtBaseHandler {
    readonly className: string = 'BtUserDataHandler'
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
            appStore.setUserTokenData(microAppData.appData?.userTokenData)
        } else {
            const api = this.getApp().options.config?.userInfoLoadApi
            const data = await this.getApp().$http.post(api, { t: Math.random() * 1000 + 1 })
            const result = data.data.userToken
            if (result) {
                const userInfo = result
                appStore.setUserTokenData(userInfo)
            }
        }
    }
}

export default BtUserDataHandler

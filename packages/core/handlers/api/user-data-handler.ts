import { BTPBaseApiHandler } from '../base'
import { BtUseAppStore } from '../../store/'

/**
 * 数据字典数据加载对象
 * @author Enmaai
 */
export default class BTPUserDataHandler extends BTPBaseApiHandler {
    readonly className: string = 'BTPUserDataHandler'
    constructor() {
        super()
        this._rank = 10
    }

    async handle() {
        const appStore = BtUseAppStore()

        if (this.getApp().options?.autoLoadMicroAppData && this.isMicroApp()) {
            appStore.setUserTokenData(this.getMicroAppData().appData?.userTokenData)
        } else {
            const api = this.getApp().options.env?.userInfoLoadApi
            const data = await this.getApp().$http.post(api, { t: Math.random() * 1000 + 1 })
            const result = data.data.userToken

            if (result) {
                const userInfo = result
                appStore.setUserTokenData(userInfo)
            }
        }
    }
}

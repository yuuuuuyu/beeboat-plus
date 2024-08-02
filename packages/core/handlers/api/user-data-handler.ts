import { BTPBaseApiHandler } from '../base'

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
        if (this.getApp().options?.autoLoadMicroAppData && this.isMicroApp()) {
            this.getCacheManager().setToken(this.getMicroAppData().appData?.userTokenData)
        } else {
            const data = await this.getApp().$http.post(this.getEnv('VITE_GLOBAL_USERDATA_API'), {
                t: Math.random() * 1000 + 1,
            })
            if (data?.data?.userToken) {
                this.getCacheManager().setToken(data.data.userToken)
            }
        }
    }
}

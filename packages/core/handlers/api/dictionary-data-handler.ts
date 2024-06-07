import { BTPBaseApiHandler } from '../base'
import { BtUseAppStore } from '../../store'

/**
 * 数据字典数据加载对象
 * @author Enmaai
 */
export default class BTPDictDataHandler extends BTPBaseApiHandler {
    readonly className: string = 'BTPDictDataHandler'

    constructor() {
        super()
        this._rank = 10
    }
    async handle() {
        const appStore = BtUseAppStore()

        if (this.getApp().options?.autoLoadMicroAppData && this.isMicroApp()) {
            appStore.setDictData(this.getMicroAppData().appData?.dictList || [])
        } else {
            const api = this.getApp().options.env?.dictLoadApi
            const data = await this.getApp().$http.post(api, { t: Math.random() * 1000 + 1 })

            appStore.setDictData(data.data || [])
        }
    }
}

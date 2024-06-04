import { BtBaseHandler } from '../../base'
import { BtUseAppStore } from '../../store'

/**
 * 数据字典数据加载对象
 * @author Enmaai
 */
class BtDictDataHandler extends BtBaseHandler {
    readonly className: string = 'BtDictionaryDataHandler'
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
            appStore.setDictData(microAppData.appData?.dictList || [])
        } else {
            const api = this.getApp().options.config?.dictLoadApi
            const data = await this.getApp().$http.post(api, { t: Math.random() * 1000 + 1 })

            appStore.setDictData(data.data || [])
        }
    }
}

export default BtDictDataHandler

import { BTPBaseApiHandler } from '../base'
import Utils from '../../utils-ex/utils'

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
        if (this.getApp().options?.autoLoadMicroAppData && this.isMicroApp()) {
            this.getCacheManager().setDictMap(
                this.formatDictData(this.getMicroAppData().appData?.dictList || []),
            )
        } else {
            const data = await this.getApp().$http.post(this.getEnv('VITE_GLOBAL_DICT_API'), {
                t: Math.random() * 1000 + 1,
            })
            this.getCacheManager().setDictMap(this.formatDictData(data.data || []))
        }
    }

    /**
     * @description 格式化树数据
     * @param dataList 数据
     * @returns 树数据
     */
    formatDictData(dataList: any): any {
        return Utils.listToTree(dataList)
    }
}

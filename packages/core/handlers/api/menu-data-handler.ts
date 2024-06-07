import { BTPBaseApiHandler } from '../base'
import { BtUseAppStore } from '../../store'
import { listToTree } from '../../utils/utils'

/**
 * 用户菜单加载对象
 * @author Enmaai
 */
export default class BTPMenuDataHandler extends BTPBaseApiHandler {
    readonly className: string = 'BTPMenuDataHandler'
    constructor() {
        super()
        this._rank = 10
    }

    async handle() {
        const appStore = BtUseAppStore()

        if (this.getApp().options?.autoLoadMicroAppData && this.isMicroApp()) {
            const microAppData = this.getMicroAppData()
            appStore.setMenuData(
                microAppData.appData?.menuList || [],
                microAppData.appData?.menuTree || [],
            )
        } else {
            const data = await this.getApp().$http.post(this.getApp().options.env?.menuLoadApi, {
                t: Math.random() * 1000 + 1,
            })
            appStore.setMenuData(data.data, listToTree(data.data))
        }
    }
}

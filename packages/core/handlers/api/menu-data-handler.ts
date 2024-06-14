import { BTPBaseApiHandler } from '../base'

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
        if (this.getApp().options?.autoLoadMicroAppData && this.isMicroApp()) {
            const microAppData = this.getMicroAppData()
            this.getCacheManager().setMenuTreeList(microAppData.appData?.menuTree || [])
        } else {
            const data = await this.getApp().$http.post(this.getEnv('VITE_GLOBAL_MENU_API'), {
                t: Math.random() * 1000 + 1,
            })
            this.getCacheManager().setMenuTreeList(data.data)
        }
    }
}

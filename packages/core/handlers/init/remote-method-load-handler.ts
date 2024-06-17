import { BTPBaseInitHandler } from '../base/index'

import BTGlobalAppManager from '../../view/global-manager'

/**
 * 路由创建对象
 * @author Enmaai
 */
export default class BTPRemoteMethodLoadHandler extends BTPBaseInitHandler {
    readonly className = 'BTPRemoteMethodLoadHandler'

     async handle() {
        const data = await BTGlobalAppManager.getHandler().loadMethodList()

        this.getCacheManager().cacheMethodList(data)
    }
}

import { BTPBaseInitHandler } from '../base/index'
import BTPUtils from '../../utils-ex/utils-ex'

/**
 * 路由创建对象
 * @author Enmaai
 */
export default class BTPRemoteMethodLoadHandler extends BTPBaseInitHandler {
    readonly className = 'BTPRemoteMethodLoadHandler'

     async handle() {
        const data = await BTPUtils.getAppManager().loadMethodList()

        this.getCacheManager().cacheMethodList(data)
    }
}

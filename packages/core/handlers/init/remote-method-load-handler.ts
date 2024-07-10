import { BTPBaseInitHandler } from '../base/index'
import BTPUtils from '../../utils/btp-utils'

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

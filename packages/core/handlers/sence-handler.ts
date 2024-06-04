import { BtBaseHandler } from '../base'

/**
 * 应用挂载处理对象
 * @author Enmaai
 */
export default class BtSenceHandler extends BtBaseHandler {
    readonly className: string = 'BtSenceHandler'
    constructor() {
        super()
        this._rank = 100
        this._loadType = 'api'
    }
    getSence(_id: string) {
        return new Promise(resolve => {
            resolve(null)
        })
    }
    saveSence(_id: string, _sence: Object) {
        return new Promise(resolve => {
            resolve({ code: 0 })
        })
    }
}

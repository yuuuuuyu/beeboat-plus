import BtBaseHandler from './base-handler'

/**
 * Mount Handler基类
 * @author Enmaai
 */
export default class BtBaseMountHandler extends BtBaseHandler {
    constructor() {
        super()
        this._loadType = 'mount'
    }
}

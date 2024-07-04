import BTPBaseHandler from './base-handler'

/**
 * Mount Handler基类
 * @author Enmaai
 */
export default class BTPBaseMountHandler extends BTPBaseHandler {
    constructor() {
        super()
        this._loadType = 'mount'
    }
}

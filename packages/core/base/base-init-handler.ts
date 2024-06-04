import BtBaseHandler from './base-handler'

/**
 * Init Handler基类
 * @author Enmaai
 */
export default class BtBaseInitHandler extends BtBaseHandler {
    constructor() {
        super()
        this._loadType = 'init'
    }
}

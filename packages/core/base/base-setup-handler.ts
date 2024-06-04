import BtBaseHandler from './base-handler'

/**
 * Setup Handler基类
 * @author Enmaai
 */
export default class BtBaseSetupHandler extends BtBaseHandler {
    constructor() {
        super()
        this._loadType = 'setup'
    }
}

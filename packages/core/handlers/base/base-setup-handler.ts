import BTPBaseHandler from './base-handler'

/**
 * Setup Handler基类
 * @author Enmaai
 */
export default class BTPBaseSetupHandler extends BTPBaseHandler {
    constructor() {
        super()
        this._loadType = 'setup'
    }
}

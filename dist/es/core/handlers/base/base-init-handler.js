import BTPBaseHandler from './base-handler';
/**
 * Init Handler基类
 * @author Enmaai
 */
export default class BTPBaseInitHandler extends BTPBaseHandler {
    constructor() {
        super();
        this._loadType = 'init';
    }
}

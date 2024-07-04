import BtBaseHandler from './base-handler';
/**
 * Api Handler基类
 * @author Enmaai
 */
export default class BTPBaseApiHandler extends BtBaseHandler {
    constructor() {
        super();
        this._loadType = 'api';
    }
}

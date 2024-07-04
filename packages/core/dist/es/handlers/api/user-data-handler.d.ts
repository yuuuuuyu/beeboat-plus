import { BTPBaseApiHandler } from '../base';
/**
 * 数据字典数据加载对象
 * @author Enmaai
 */
export default class BTPUserDataHandler extends BTPBaseApiHandler {
    readonly className: string;
    constructor();
    handle(): Promise<void>;
}

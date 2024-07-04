import { BTPBaseApiHandler } from '../base';
/**
 * 用户菜单加载对象
 * @author Enmaai
 */
export default class BTPMenuDataHandler extends BTPBaseApiHandler {
    readonly className: string;
    constructor();
    handle(): Promise<void>;
}

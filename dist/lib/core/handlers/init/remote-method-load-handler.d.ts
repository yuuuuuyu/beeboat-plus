import { BTPBaseInitHandler } from '../base/index';
/**
 * 路由创建对象
 * @author Enmaai
 */
export default class BTPRemoteMethodLoadHandler extends BTPBaseInitHandler {
    readonly className = "BTPRemoteMethodLoadHandler";
    handle(): Promise<void>;
}

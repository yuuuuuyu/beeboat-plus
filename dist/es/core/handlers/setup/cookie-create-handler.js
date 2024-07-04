import { BTPBaseSetupHandler } from '../base';
import VueCookies from 'vue-cookies';
/**
 * cookie加载处理对象
 * @author Enmaai
 */
export default class BTPCookieCreateHandler extends BTPBaseSetupHandler {
    constructor() {
        super(...arguments);
        this.className = 'BTPCookieCreateHandler';
    }
    handle() {
        this.getVueApp().use(VueCookies);
    }
}

import BtBaseSetupHandler from '../base/base-setup-handler'
import VueCookies from 'vue-cookies'

/**
 * cookie加载处理对象
 * @author Enmaai
 */
export default class BtCookieCreateHandler extends BtBaseSetupHandler {
    readonly className: string = 'BtCookieCreateHandler'

    handle() {
        this.getVueApp().use(VueCookies)
    }
}

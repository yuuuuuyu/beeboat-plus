import { createPinia } from 'pinia';
import { BTPBaseSetupHandler } from '../base';
/**
 * 状态管理对象创建处理类
 * @author Enmaai
 */
export default class BTPStoreCreateHandler extends BTPBaseSetupHandler {
    constructor() {
        super(...arguments);
        this.className = 'BTPStoreCreateHandler';
    }
    handle() {
        this.getVueApp().use(createPinia());
    }
}

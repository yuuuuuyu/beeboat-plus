"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinia_1 = require("pinia");
const base_1 = require("../base");
/**
 * 状态管理对象创建处理类
 * @author Enmaai
 */
class BTPStoreCreateHandler extends base_1.BTPBaseSetupHandler {
    constructor() {
        super(...arguments);
        this.className = 'BTPStoreCreateHandler';
    }
    handle() {
        this.getVueApp().use((0, pinia_1.createPinia)());
    }
}
exports.default = BTPStoreCreateHandler;

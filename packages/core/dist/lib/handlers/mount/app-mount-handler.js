"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
/**
 * 应用挂载处理对象
 * @author Enmaai
 */
class BTPAppMountHandler extends base_1.BTPBaseMountHandler {
    constructor() {
        super(...arguments);
        this.className = 'BTPAppMountHandler';
    }
    handle() {
        // 加载组件
        if (this.getApp().options.component) {
            Object.entries(this.getApp().options.component).forEach(([name, component]) => {
                this.getVueApp().component(name, component);
            });
        }
        // 加载指令
        if (this.getApp().options.directive) {
            Object.entries(this.getApp().options.directive).forEach(([name, component]) => {
                this.getVueApp().directive(name, component);
            });
        }
        // 加载组件库
        if (this.getApp().options.componentKit) {
            this.getApp().options.componentKit.forEach(kit => {
                this.getVueApp().use(kit);
            });
        }
    }
}
exports.default = BTPAppMountHandler;

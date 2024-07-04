"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 处理类基类
 * @author Enmaai
 */
class BtBaseHandler {
    constructor() {
        /**
         * 加载类型
         */
        this._loadType = 'setup';
        /**
         * 排序 默认100
         */
        this._rank = 100;
    }
    /**
     * 初始化应用程序入口
     * @param app createApp()对象
     */
    init(app) {
        this.app = app;
    }
    getApp() {
        return this.app;
    }
    getCacheManager() {
        return this.getApp().getCacheManager();
    }
    getEnv(key) {
        return this.getApp().getEnv(key);
    }
    getVueApp() {
        return this.app.$app;
    }
    isType(loadType) {
        return this._loadType == loadType;
    }
    isMicroApp() {
        return Reflect.has(window, '__MICRO_APP_ENVIRONMENT__');
    }
    getMicroAppData() {
        var _a, _b;
        return (_b = (_a = window.microApp) === null || _a === void 0 ? void 0 : _a.getData()) !== null && _b !== void 0 ? _b : {};
    }
    handle(params) {
        console.log(`${params}处理对象未实现`);
    }
}
exports.default = BtBaseHandler;

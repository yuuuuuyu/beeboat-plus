"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const app_1 = require("../app");
const websocket_observer_1 = __importDefault(require("./websocket-observer"));
class BTPUtils {
    /**
     * @description 获取应用程序对象
     * @returns 应用程序对象
     */
    static getApp() {
        return app_1.BTPApplication.getInstance();
    }
    /**
     * @description 获取应用管理对象
     * @returns 应用管理对象
     */
    static getAppManager() {
        return this.getApp().getAppManager();
    }
    /**
     * @description 获取应用缓存对象
     * @returns 应用缓存对象
     */
    static getCacheManager() {
        return this.getApp().getCacheManager();
    }
    /**
     * @description 获取消息弹框管理对象
     * @returns 消息弹框管理对象
     */
    static getMessageBoxManager() {
        return this.getApp().getMessageBoxManager();
    }
    /**
     * 显示消息<如果指定了options,则会忽略message和type参数>
     * @param message 消息文本
     * @param type 消息类型
     * @param options 详细参数
     */
    static message(message, type, options = null) {
        this.getMessageBoxManager().message(message, type, options);
    }
    /**
     * @description 创建一个新的uuidv4
     * @returns uuid
     */
    static uuid() {
        return (0, uuid_1.v4)();
    }
    /**
     * @description 创建websocket客户端
     * @param url 地址
     * @param listener 监听器
     * @param retry 重连时间默认10000
     * @returns websocket客户端
     */
    static createSocket(url, listener, retry = 10000) {
        return new websocket_observer_1.default(url, listener, retry);
    }
}
exports.default = BTPUtils;

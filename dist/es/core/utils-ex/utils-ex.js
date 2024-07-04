import { v4 as uuidv4 } from 'uuid';
import { BTPApplication } from '../app';
import BTPWebsocketObserver from './websocket-observer';
export default class BTPUtils {
    /**
     * @description 获取应用程序对象
     * @returns 应用程序对象
     */
    static getApp() {
        return BTPApplication.getInstance();
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
        return uuidv4();
    }
    /**
     * @description 创建websocket客户端
     * @param url 地址
     * @param listener 监听器
     * @param retry 重连时间默认10000
     * @returns websocket客户端
     */
    static createSocket(url, listener, retry = 10000) {
        return new BTPWebsocketObserver(url, listener, retry);
    }
}

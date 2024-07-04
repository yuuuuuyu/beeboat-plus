import BTPBaseApplication from './base-application';
export default class BTPApplication extends BTPBaseApplication {
    constructor(options: any);
    /**
     * 静态方法 获取应用实例对象
     * @returns 应用实例
     */
    static getInstance(): BTPApplication;
    /**
     * 获取微应用事件
     * @returns 微应用事件
     */
    getMicroAppEvent(): any;
    mount(): Promise<void>;
    /**
     * 卸载应用
     */
    unmount(): void;
    /**
     * 初始化微应用
     */
    initMicroApp(): void;
}

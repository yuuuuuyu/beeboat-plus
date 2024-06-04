import BtApplication from '../app'

/**
 * init:初始加载插件，setup 启动加载插件，api加载插件
 */
export type LoadTypes = 'setup' | 'init' | 'api' | 'mount'

/**
 * 处理类基类
 * @author Enmaai
 */
export default class BtBaseHandler {
    /**
     * 应用程序对象
     */
    protected app!: BtApplication
    /**
     * 加载类型 init api setup 默认 setup
     */
    protected _loadType: LoadTypes = 'setup'

    /**
     * 排序 默认100
     */
    protected _rank = 100

    /**
     * 初始化应用程序入口
     * @param app createApp()对象
     */
    init(app: BtApplication) {
        this.app = app
    }

    getEnv() {
        return this.app.env
    }
    getApp() {
        return this.app
    }

    getVueApp() {
        return this.app.$app
    }

    isType(loadType: LoadTypes) {
        return this._loadType == loadType
    }

    handle(params: any): void {
        console.log(`${params}处理对象未实现`)
    }
}

import { App, createApp } from 'vue'
// 默认加载的基础插件
import {
    BtHttpCreateHandler,
    BtCookieCreateHandler,
    BtStoreCreateHandler,
    BtRouterCreateHandler,
    BtAppMountHandler,
    BtSenceHandler,
} from '../handlers'
// 默认加载的api请求插件
import { BtDictDataHandler, BtMenuDataHandler, BtUserDataHandler } from '../plugins'
import { uniq } from '../utils/uniq'
// import { BtUseAppStore } from '../store/'

import { IAppOptions, AxiosInstance, Router, VueCookies } from './typing'

let applicationInstance: BtApplication
/**
 * 应用程序对象
 */
export default class BtApplication {
    /**
     * 应用程序唯一ID
     */
    appId!: string

    /**
     * 应用程序名称标识
     */
    appCode!: string

    /**
     * VUE应用对象
     */
    $app!: App<Element>

    /**
     * 应用程序配置信息
     */
    options!: IAppOptions
    /**
     * 环境信息
     */
    env!: any
    /**
     * 默认网络请求
     */
    $http!: AxiosInstance

    $router!: Router

    /**
     * 全部处理对象
     */
    pluginsHandlers: any

    /**
     * 构造函数 先执行第一步init()
     * @param options 选项
     */
    constructor(options: IAppOptions) {
        this.init(options)
    }
    /**
     * 静态方法 设置应用实例对象
     * @param instance 实例
     */
    private static setInstance(instance: BtApplication) {
        applicationInstance = instance
    }
    /**
     * 静态方法 获取应用实例对象
     * @returns 应用实例
     */
    public static getInstance(): BtApplication {
        return applicationInstance
    }

    /**
     * 默认插件列表
     */
    defaultHandlerPlugin = () => {
        return [
            new BtHttpCreateHandler(),
            new BtRouterCreateHandler(),
            new BtUserDataHandler(),
            new BtMenuDataHandler(),
            new BtDictDataHandler(),
            new BtCookieCreateHandler(),
            new BtStoreCreateHandler(),
            new BtAppMountHandler(),
            new BtSenceHandler(),
        ]
    }
    /**
     * 第一步 初始化全局变量，插件注入全局变量
     * @param options
     */
    init(options: IAppOptions) {
        this.options = options
        this.env = options ? options.env : {}
        this.appId = this.env.VITE_MAIN_APP_ID
            ? this.env.VITE_MAIN_APP_ID
            : this.env.VUE_MAIN_APP_ID
        this.appId += this.env.VITE_MODE
            ? this.env.VITE_MODE
            : this.env.VUE_MODE
            ? this.env.VUE_MODE
            : ''
        this.appCode = this.env.VITE_APP_CODE ? this.env.VITE_APP_CODE : this.env.VUE_APP_CODE
        BtApplication.setInstance(this)

        this.pluginsHandlers = [
            ...(options ? options.handlers : []),
            ...this.defaultHandlerPlugin(),
        ]
        // 插件注入BTApplication全局参数
        //插件去重
        this.pluginsHandlers = uniq(this.pluginsHandlers, { key: 'className' })
        //插件排序
        this.pluginsHandlers = this.pluginsHandlers.sort((cur, next) => cur._rank - next._rank)
        this.pluginsHandlers.forEach(item => {
            item.init(this)
        })
        this.loadHandler('init')
    }

    /**
     * 第二步 加载应用程序对象
     * @param app VUE应用对象
     * @param options 应用程序配置信息
     */
    setup(app: App<Element>) {
        this.$app = app
        this.$app.config.globalProperties.$btApplication = this
        this.loadHandler('setup')
        return new Promise(resolve => resolve(true))
    }

    /**
     * 第三步执行 启动创建vue.mount(),并加载mount相关插件
     */
    create(): void {
        this.mount()
    }

    async mount() {
        if (this.getMicroAppEvent()) {
            this.initMicroApp()
        }
        this.$app = createApp(this.options.appTemplate)
        await this.setup(this.$app)
        this.$app.use(this.$router)
        // ====== 判断是否存在token,存在执行api加载 ======
        if (this.getToken()) {
            // 可重写需要加载的缓存数据
            await this.mountedCustomCatchData()
        }
        if (!this.isMicroApp()) {
            await this.$router.isReady()
        }

        // BtUseAppStore().setApp(this)
        this.loadHandler('mount')

        this.$app.mount(`#${this.env.VITE_APP_MOUNT_NAME}`)
    }
    /**
     * 重写自定义缓存数据
     */
    async mountedCustomCatchData() {
        await this.loadCacheData()
    }

    /**
     * 卸载应用
     */
    unmount(): void {
        this.$app?.unmount()
        this.getMicroAppEvent()?.clearDataListener()
        //TODO 强制清空
        this.$app = null as any
        this.$router = null as any
    }

    /**
     * 初始化微应用
     */
    initMicroApp(): void {
        let status = false
        this.getMicroAppEvent()?.addDataListener(data => {
            const router = this.$router
            if (data.path && typeof data.path === 'string') {
                data.path = data.path.replace(/^#/, '')
                if (status) {
                    router.push(data.path)
                } else {
                    //TODO 此处延迟代码又缺陷
                    setTimeout(() => {
                        router.push(data.path)
                        status = true
                    }, 800)
                }
            }
        }, true)
        window.addEventListener('unmount', () => {
            this.unmount()
        })
    }
    /**
     * 插件加载处理器
     * @param loadType init、setup、mount
     */
    loadHandler(loadType) {
        this.pluginsHandlers.forEach(item => {
            if (item.isType(loadType)) {
                item.handle()
            }
        })
    }

    /**
     * 方法要是同步请求，加载缓存数据，例如当前用户信息、部门信息、数据字典信息等
     */
    async loadCacheData(): Promise<any> {
        for (const item of this.pluginsHandlers) {
            if (item.isType('api')) {
                await item.handle()
            }
        }
        return new Promise(resolve => {
            resolve(true)
        })
    }

    /**
     * 判断是否微应用模式
     * @returns 是否微应用模式
     */
    isMicroApp(): boolean {
        return (
            (window as any)?.__MICRO_APP_BASE_APPLICATION__ ||
            (window as any)?.__MICRO_APP_PROXY_WINDOW__
        )
    }

    /**
     * 获取微应用事件
     * @returns 微应用事件
     */
    getMicroAppEvent(): any {
        const eventName = this.env.VITE_APP_CHILD_EVENT_NAME.toString()
        return (window as any)[eventName] || (window as any).microApp
    }

    /**
     * 获取路由对象
     */
    getRouter(): Router {
        return this.$router
    }

    /**
     * 设置路由对象
     */
    setRouter(router: Router): void {
        this.$router = router
    }

    /**
     * 获取应用程序唯一标识
     */
    getAppId(): string {
        return this.appId
    }

    /**
     * 获取应用程序标识
     */
    getAppCode(): string {
        return this.appCode
    }
    /**
     * 设置Http请求对象
     * @param http AxiosInstance
     */
    setHttp(http: AxiosInstance): void {
        this.$http = http
        this.$app.config.globalProperties.$http = http
    }
    /**
     * 获取Http请求对象
     */
    getHttp(): AxiosInstance {
        return this.$http
    }

    /**
     * 获取环境变量
     * @param key
     */
    getEnv(key: string): any {
        return this.env ? this.env[key] : ''
    }

    /**
     * 获取App应用配置
     * @param key 键
     * @param defaultValue 默认值
     */
    getConfig(key: string, defaultValue: string) {
        if (this.options?.config) {
            const value = this.options.config[key]
            if (!value) {
                return defaultValue
            }
            return value
        }
        return ''
    }

    /**
     * 获取Cookie对象
     */
    getCookie(): VueCookies {
        return this.$app.config.globalProperties.$cookies
    }

    /**
     * 获取当前登录用户Token字符串
     */
    getToken(): string {
        const value = this.getCookie().get(this.getAppId())
        if (!value) {
            return this.getCookie().get(this.env.VITE_MAIN_APP_ID)
        }
        return value
    }

    /**
     * 保存token
     * @param token
     */
    setToken(token): void {
        this.getCookie().set(this.getAppId(), token)
        this.getCookie().set(this.env.VITE_MAIN_APP_ID, token)
    }

    /**
     * 删除token
     * @param boolean
     */
    removeToken(): boolean {
        return (
            this.getCookie().remove(this.getAppId()) &&
            this.getCookie().remove(this.env.VITE_MAIN_APP_ID)
        )
    }

    /**
     * 获取插件对象
     * @param handlerName 插件名称
     * @returns 插件
     */
    getHandler(handlerName: string): any {
        return this.pluginsHandlers.find(item => {
            return item.className === handlerName
        })
    }
    /**
     * 获取i18n的$t
     */
    getI18n(): any {
        return this.$app.config.globalProperties.$t
    }
}

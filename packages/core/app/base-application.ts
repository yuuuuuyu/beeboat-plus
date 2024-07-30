import { App } from 'vue'
import { Router } from 'vue-router'
import { AxiosInstance } from 'axios'
import { VueCookies } from 'vue-cookies'

import {
    BTPDictDataHandler,
    BTPMenuDataHandler,
    BTPUserDataHandler,
    BTPRouterCreateHandler,
    BTPRemoteMethodLoadHandler,
    BTPAppMountHandler,
    BTPCookieCreateHandler,
    BTPHttpCreateHandler,
    BTPStoreCreateHandler,
} from '../handlers/index'
import BTPAppCacheManager from '../cache/app-cache-manager'
import BTPAppMessageBoxManager from '../hook/global-message-manager'
import { BTPGlobalAppManager } from '../view'

let applicationInstance: BTPBaseApplication

export default class BTPBaseApplication {
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
    options!: any

    /**
     * 默认网络请求
     */
    $http!: AxiosInstance

    /**
     * 路由对象
     */
    $router!: Router

    /**
     * 插件
     */
    pluginHandlers: any
    /**
     * 应用管理对象
     */
    appManager: any

    /**
     * 缓存管理对象
     */
    cacheManager: any

    /**
     * 消息弹框管理对象
     */
    messageBoxManager: any

    constructor(options: any) {
        this.options = options
        this.appId = this.getEnv('VITE_MAIN_APP_ID') + this.getEnv('VITE_MODE')
        this.appCode = this.getEnv('VITE_APP_CODE')
        this.pluginHandlers = this.getDefaultHandlers()
        this.formatPluginHandlers()
        this.appManager = new BTPGlobalAppManager()
        this.cacheManager = new BTPAppCacheManager()
        this.messageBoxManager = new BTPAppMessageBoxManager()
    }

    async init() {
        await this.loadHandler('init')
        return new Promise(resolve => {
            resolve(true)
        })
    }

    /**
     * 静态方法 设置应用实例对象
     * @param instance 实例
     */
    protected static setInstance(instance: BTPBaseApplication) {
        applicationInstance = instance
    }
    /**
     * 静态方法 获取应用实例对象
     * @returns 应用实例
     */
    public static getInstance(): BTPBaseApplication {
        return applicationInstance
    }

    /**
     * 获取应用管理对象
     * @returns 应用管理对象
     */
    getAppManager(): BTPGlobalAppManager {
        return this.appManager
    }

    /**
     * 获取缓存管理对象
     * @returns 缓存管理对象
     */
    getCacheManager(): BTPAppCacheManager {
        return this.cacheManager
    }

    /**
     * 获取消息弹框管理对象
     * @returns 消息弹框管理对象
     */
    getMessageBoxManager(): BTPAppMessageBoxManager {
        return this.messageBoxManager
    }

    /**
     * @description 获取路由对象
     */
    getRouter(): any {
        return this.$router
    }

    /**
     * @description 设置路由对象
     */
    setRouter(router: Router): void {
        this.$router = router
    }

    /**
     * @description 获取应用程序唯一标识
     */
    getAppId(): string {
        return this.appId
    }

    /**
     * @description 获取应用程序标识
     */
    getAppCode(): string {
        return this.appCode
    }

    /**
     * @description 设置Http请求对象
     * @param http AxiosInstance
     */
    setHttp(http: AxiosInstance): void {
        this.$http = http
        this.$app.config.globalProperties.$http = http
    }

    /**
     * @description 获取Http请求对象
     */
    getHttp(): any {
        return this.$http
    }

    /**
     * @description 获取环境变量
     * @param key
     */
    getEnv(key: string): any {
        return this.options?.env ? this.options?.env[key] : ''
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
            return this.getCookie().get(this.getEnv('VITE_MAIN_APP_ID'))
        }
        return value
    }

    /**
     * 保存token
     * @param token
     */
    setToken(token): void {
        this.getCookie().set(this.getAppId(), token)
        this.getCookie().set(this.getEnv('VITE_MAIN_APP_ID'), token)
    }

    /**
     * 删除token
     * @param boolean
     */
    removeToken(): boolean {
        this.getCacheManager().clear()
        return (
            this.getCookie().remove(this.getAppId()) &&
            this.getCookie().remove(this.getEnv('VITE_MAIN_APP_ID'))
        )
    }

    /**
     * 注册插件
     * @param handlers 插件
     */
    registerHandlers(handlers: any) {
        this.pluginHandlers.unshift(...handlers)
        this.formatPluginHandlers()
    }

    /**
     * 默认插件列表
     */
    getDefaultHandlers() {
        return [
            new BTPDictDataHandler(),
            new BTPMenuDataHandler(),
            new BTPUserDataHandler(),
            new BTPRouterCreateHandler(),
            new BTPRemoteMethodLoadHandler(),
            new BTPAppMountHandler(),
            new BTPCookieCreateHandler(),
            new BTPHttpCreateHandler(),
            new BTPStoreCreateHandler(),
        ]
    }

    /**
     * 方法要是同步请求，加载缓存数据，例如当前用户信息、部门信息、数据字典信息等
     */
    async loadCacheData(): Promise<any> {
        return this.loadHandler('api')
    }

    /**
     * 插件加载处理器
     * @param loadType init、setup、mount
     */
    async loadHandler(loadType) {
        for (let i = 0; i < this.pluginHandlers.length; i++) {
            const item = this.pluginHandlers[i]
            if (item.isType(loadType)) {
                await item.handle()
            }
        }
        return new Promise(resolve => {
            resolve(true)
        })
    }

    formatPluginHandlers() {
        this.pluginHandlers = this.uniq(this.pluginHandlers, { key: 'className' })
        //插件排序
        this.pluginHandlers = this.pluginHandlers.sort((cur, next) => cur._rank - next._rank)
        this.pluginHandlers.forEach(item => {
            item.init(this)
        })
    }

    uniq(arr, params) {
        if (!Array.isArray(arr)) {
            return arr
        }
        if (params) {
            const obj = {}
            const newArr = arr.reduce((perv, cur) => {
                obj[cur[params.key]] ? '' : (obj[cur[params.key]] = true && perv.push(cur))
                return perv
            }, [])
            return newArr
        } else {
            return Array.from(new Set(arr))
        }
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
     * @description 获取登录页面路由地址
     * @returns 登录页面路由地址
     */
    getLoginUrl() {
        return this.getEnv('VITE_LOGIN_URL') || '/login'
    }

    /**
     * @description 注销并退出到登录页面
     */
    logout(): void {
        this.removeToken()
        this.getRouter().push(this.getLoginUrl())
    }
}

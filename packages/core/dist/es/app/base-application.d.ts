import { App } from 'vue';
import { Router } from 'vue-router';
import { AxiosInstance } from 'axios';
import { VueCookies } from 'vue-cookies';
import { BTPDictDataHandler, BTPMenuDataHandler, BTPUserDataHandler, BTPRouterCreateHandler, BTPRemoteMethodLoadHandler, BTPAppMountHandler, BTPCookieCreateHandler, BTPHttpCreateHandler, BTPStoreCreateHandler } from '../handlers/index';
import BTPAppCacheManager from '../cache/app-cache-manager';
import BTPAppMessageBoxManager from '../hook/global-message-manager';
import { BTPGlobalAppManager } from '../view';
export default class BTPBaseApplication {
    /**
     * 应用程序唯一ID
     */
    appId: string;
    /**
     * 应用程序名称标识
     */
    appCode: string;
    /**
     * VUE应用对象
     */
    $app: App<Element>;
    /**
     * 应用程序配置信息
     */
    options: any;
    /**
     * 默认网络请求
     */
    $http: AxiosInstance;
    /**
     * 路由对象
     */
    $router: Router;
    /**
     * 插件
     */
    pluginHandlers: any;
    /**
     * 应用管理对象
     */
    appManager: any;
    /**
     * 缓存管理对象
     */
    cacheManager: any;
    /**
     * 消息弹框管理对象
     */
    messageBoxManager: any;
    constructor(options: any);
    init(): Promise<unknown>;
    /**
     * 静态方法 设置应用实例对象
     * @param instance 实例
     */
    protected static setInstance(instance: BTPBaseApplication): void;
    /**
     * 静态方法 获取应用实例对象
     * @returns 应用实例
     */
    static getInstance(): BTPBaseApplication;
    /**
     * 获取应用管理对象
     * @returns 应用管理对象
     */
    getAppManager(): BTPGlobalAppManager;
    /**
     * 获取缓存管理对象
     * @returns 缓存管理对象
     */
    getCacheManager(): BTPAppCacheManager;
    /**
     * 获取消息弹框管理对象
     * @returns 消息弹框管理对象
     */
    getMessageBoxManager(): BTPAppMessageBoxManager;
    /**
     * @description 获取路由对象
     */
    getRouter(): Router;
    /**
     * @description 设置路由对象
     */
    setRouter(router: Router): void;
    /**
     * @description 获取应用程序唯一标识
     */
    getAppId(): string;
    /**
     * @description 获取应用程序标识
     */
    getAppCode(): string;
    /**
     * @description 设置Http请求对象
     * @param http AxiosInstance
     */
    setHttp(http: AxiosInstance): void;
    /**
     * @description 获取Http请求对象
     */
    getHttp(): AxiosInstance;
    /**
     * @description 获取环境变量
     * @param key
     */
    getEnv(key: string): any;
    /**
     * 获取Cookie对象
     */
    getCookie(): VueCookies;
    /**
     * 获取当前登录用户Token字符串
     */
    getToken(): string;
    /**
     * 保存token
     * @param token
     */
    setToken(token: any): void;
    /**
     * 删除token
     * @param boolean
     */
    removeToken(): boolean;
    /**
     * 注册插件
     * @param handlers 插件
     */
    registerHandlers(handlers: any): void;
    /**
     * 默认插件列表
     */
    getDefaultHandlers(): (BTPDictDataHandler | BTPMenuDataHandler | BTPUserDataHandler | BTPRouterCreateHandler | BTPRemoteMethodLoadHandler | BTPAppMountHandler | BTPCookieCreateHandler | BTPHttpCreateHandler | BTPStoreCreateHandler)[];
    /**
     * 方法要是同步请求，加载缓存数据，例如当前用户信息、部门信息、数据字典信息等
     */
    loadCacheData(): Promise<any>;
    /**
     * 插件加载处理器
     * @param loadType init、setup、mount
     */
    loadHandler(loadType: any): Promise<unknown>;
    formatPluginHandlers(): void;
    uniq(arr: any, params: any): any;
    /**
     * 判断是否微应用模式
     * @returns 是否微应用模式
     */
    isMicroApp(): boolean;
}

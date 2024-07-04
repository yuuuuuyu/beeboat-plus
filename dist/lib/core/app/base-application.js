"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../handlers/index");
const app_cache_manager_1 = __importDefault(require("../cache/app-cache-manager"));
const global_message_manager_1 = __importDefault(require("../hook/global-message-manager"));
const view_1 = require("../view");
let applicationInstance;
class BTPBaseApplication {
    constructor(options) {
        this.options = options;
        this.appId = this.getEnv('VITE_MAIN_APP_ID') + this.getEnv('VITE_MODE');
        this.appCode = this.getEnv('VITE_APP_CODE');
        this.pluginHandlers = this.getDefaultHandlers();
        this.formatPluginHandlers();
        this.appManager = new view_1.BTPGlobalAppManager();
        this.cacheManager = new app_cache_manager_1.default();
        this.messageBoxManager = new global_message_manager_1.default();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadHandler('init');
            return new Promise(resolve => {
                resolve(true);
            });
        });
    }
    /**
     * 静态方法 设置应用实例对象
     * @param instance 实例
     */
    static setInstance(instance) {
        applicationInstance = instance;
    }
    /**
     * 静态方法 获取应用实例对象
     * @returns 应用实例
     */
    static getInstance() {
        return applicationInstance;
    }
    /**
     * 获取应用管理对象
     * @returns 应用管理对象
     */
    getAppManager() {
        return this.appManager;
    }
    /**
     * 获取缓存管理对象
     * @returns 缓存管理对象
     */
    getCacheManager() {
        return this.cacheManager;
    }
    /**
     * 获取消息弹框管理对象
     * @returns 消息弹框管理对象
     */
    getMessageBoxManager() {
        return this.messageBoxManager;
    }
    /**
     * @description 获取路由对象
     */
    getRouter() {
        return this.$router;
    }
    /**
     * @description 设置路由对象
     */
    setRouter(router) {
        this.$router = router;
    }
    /**
     * @description 获取应用程序唯一标识
     */
    getAppId() {
        return this.appId;
    }
    /**
     * @description 获取应用程序标识
     */
    getAppCode() {
        return this.appCode;
    }
    /**
     * @description 设置Http请求对象
     * @param http AxiosInstance
     */
    setHttp(http) {
        this.$http = http;
        this.$app.config.globalProperties.$http = http;
    }
    /**
     * @description 获取Http请求对象
     */
    getHttp() {
        return this.$http;
    }
    /**
     * @description 获取环境变量
     * @param key
     */
    getEnv(key) {
        var _a, _b;
        return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.env) ? (_b = this.options) === null || _b === void 0 ? void 0 : _b.env[key] : '';
    }
    /**
     * 获取Cookie对象
     */
    getCookie() {
        return this.$app.config.globalProperties.$cookies;
    }
    /**
     * 获取当前登录用户Token字符串
     */
    getToken() {
        const value = this.getCookie().get(this.getAppId());
        if (!value) {
            return this.getCookie().get(this.getEnv('VITE_MAIN_APP_ID'));
        }
        return value;
    }
    /**
     * 保存token
     * @param token
     */
    setToken(token) {
        this.getCookie().set(this.getAppId(), token);
        this.getCookie().set(this.getEnv('VITE_MAIN_APP_ID'), token);
    }
    /**
     * 删除token
     * @param boolean
     */
    removeToken() {
        this.getCacheManager().clear();
        return (this.getCookie().remove(this.getAppId()) &&
            this.getCookie().remove(this.getEnv('VITE_MAIN_APP_ID')));
    }
    /**
     * 注册插件
     * @param handlers 插件
     */
    registerHandlers(handlers) {
        this.pluginHandlers.unshift(...handlers);
        this.formatPluginHandlers();
    }
    /**
     * 默认插件列表
     */
    getDefaultHandlers() {
        return [
            new index_1.BTPDictDataHandler(),
            new index_1.BTPMenuDataHandler(),
            new index_1.BTPUserDataHandler(),
            new index_1.BTPRouterCreateHandler(),
            new index_1.BTPRemoteMethodLoadHandler(),
            new index_1.BTPAppMountHandler(),
            new index_1.BTPCookieCreateHandler(),
            new index_1.BTPHttpCreateHandler(),
            new index_1.BTPStoreCreateHandler(),
        ];
    }
    /**
     * 方法要是同步请求，加载缓存数据，例如当前用户信息、部门信息、数据字典信息等
     */
    loadCacheData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.loadHandler('api');
        });
    }
    /**
     * 插件加载处理器
     * @param loadType init、setup、mount
     */
    loadHandler(loadType) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.pluginHandlers.length; i++) {
                const item = this.pluginHandlers[i];
                if (item.isType(loadType)) {
                    yield item.handle();
                }
            }
            return new Promise(resolve => {
                resolve(true);
            });
        });
    }
    formatPluginHandlers() {
        this.pluginHandlers = this.uniq(this.pluginHandlers, { key: 'className' });
        //插件排序
        this.pluginHandlers = this.pluginHandlers.sort((cur, next) => cur._rank - next._rank);
        this.pluginHandlers.forEach(item => {
            item.init(this);
        });
    }
    uniq(arr, params) {
        if (!Array.isArray(arr)) {
            return arr;
        }
        if (params) {
            const obj = {};
            const newArr = arr.reduce((perv, cur) => {
                obj[cur[params.key]] ? '' : (obj[cur[params.key]] = true && perv.push(cur));
                return perv;
            }, []);
            return newArr;
        }
        else {
            return Array.from(new Set(arr));
        }
    }
    /**
     * 判断是否微应用模式
     * @returns 是否微应用模式
     */
    isMicroApp() {
        return ((window === null || window === void 0 ? void 0 : window.__MICRO_APP_BASE_APPLICATION__) ||
            (window === null || window === void 0 ? void 0 : window.__MICRO_APP_PROXY_WINDOW__));
    }
}
exports.default = BTPBaseApplication;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const base_1 = require("../base");
/**
 * http(axios)加载处理对象
 */
class BTPHttpCreateHandler extends base_1.BTPBaseSetupHandler {
    constructor() {
        super(...arguments);
        this.className = 'BTPHttpCreateHandler';
        /**
         * 请求队列
         */
        this.pending = [];
        /**
         * 是否开启错误通知
         */
        this.enabledNotification = false;
    }
    handle(params = {}) {
        this.$http = this.createAxios(params);
        this.initReqInterceptors(this.$http);
        this.initRespInterceptors(this.$http);
        this.getApp().setHttp(this.$http);
    }
    /**
     * 获取后台根路径
     * 默认从window对象中获取
     * @returns 根URL
     */
    getBaseUrl() {
        const env = this.getApp().options.env;
        if (!env.DEV && env.VITE_SAMEORIGN == 'true') {
            return `${window.location.origin}/api/`;
        }
        return `${env.VITE_APP_BEG}://${env.VITE_PROXY_DOMAIN_REAL}`;
    }
    createAxios(params = {}) {
        return axios_1.default.create(Object.assign({
            baseURL: this.getBaseUrl(),
            withCredentials: true,
            timeout: 60000,
        }, params));
    }
    /**
     * 初始化请求拦截器
     * @param axiosInstance 请求实例
     */
    initReqInterceptors(axiosInstance) {
        axiosInstance.interceptors.request.use((config) => {
            const $config = config;
            $config.headers['Authorization'] =
                $config.headers['Authorization'] || this.getApp().getToken();
            return $config;
        }, error => {
            debugger;
            const $error = error;
            return Promise.reject({
                msg: $error.statusText || '网络异常',
            });
        });
    }
    /**
     * 初始化响应拦截器
     * @param axiosInstance 请求实例
     */
    initRespInterceptors(axiosInstance) {
        axiosInstance.interceptors.response.use(response => {
            const { data, config } = response;
            try {
                //文件请求,直接返回原始响应数据
                if ((config === null || config === void 0 ? void 0 : config.responseType) == 'blob' || (config === null || config === void 0 ? void 0 : config.responseType) == 'arraybuffer') {
                    return response;
                }
                const code = data.code.toString();
                if (code === '0') {
                    return data;
                }
            }
            catch (error) {
                debugger;
            }
        }, error => { });
    }
}
exports.default = BTPHttpCreateHandler;

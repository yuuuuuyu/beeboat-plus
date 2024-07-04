import { AxiosInstance } from 'axios';
import { BTPBaseSetupHandler } from '../base';
/**
 * http(axios)加载处理对象
 */
export default class BTPHttpCreateHandler extends BTPBaseSetupHandler {
    readonly className: string;
    /**
     * 应用请求对象
     */
    protected $http: AxiosInstance;
    /**
     * 请求队列
     */
    protected pending: any;
    /**
     * 是否开启错误通知
     */
    protected enabledNotification: boolean;
    handle(params?: any): void;
    /**
     * 获取后台根路径
     * 默认从window对象中获取
     * @returns 根URL
     */
    getBaseUrl(): string;
    createAxios(params?: any): AxiosInstance;
    /**
     * 初始化请求拦截器
     * @param axiosInstance 请求实例
     */
    initReqInterceptors(axiosInstance: AxiosInstance): void;
    /**
     * 初始化响应拦截器
     * @param axiosInstance 请求实例
     */
    initRespInterceptors(axiosInstance: AxiosInstance): void;
}

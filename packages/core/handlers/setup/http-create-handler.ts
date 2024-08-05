import Axios, { AxiosInstance } from 'axios'
import { BTPBaseSetupHandler } from '../base'
import BTPUtils from '../../utils/btp-utils'

/**
 * http(axios)加载处理对象
 */
export default class BTPHttpCreateHandler extends BTPBaseSetupHandler {
    readonly className: string = 'BTPHttpCreateHandler'

    /**
     * 应用请求对象
     */
    protected $http!: AxiosInstance

    /**
     * 请求队列
     */
    protected pending = [] as any

    /**
     * 是否开启全局错误通知
     */
    protected enabledGlobalIntercept = true

    handle(params: any = {}) {
        this.$http = this.createAxios(params)
        this.initReqInterceptors(this.$http)
        this.initRespInterceptors(this.$http)
        this.getApp().setHttp(this.$http)
    }

    /**
     * 切换全局响应拦截开关
     */
    toggleGlobalIntercept(): void {
        this.enabledGlobalIntercept = !this.enabledGlobalIntercept
    }

    /**
     * 获取后台根路径
     * 默认从window对象中获取
     * @returns 根URL
     */
    getBaseUrl() {
        const env = this.getApp().options.env
        if (!env.DEV && env.VITE_SAMEORIGN == 'true') {
            return `${window.location.origin}/api/`
        }
        return `${env.VITE_APP_BEG}://${env.VITE_PROXY_DOMAIN_REAL}`
    }

    createAxios(params: any = {}) {
        return Axios.create(
            Object.assign(
                {
                    baseURL: this.getBaseUrl(),
                    withCredentials: true,
                    timeout: 60000,
                },
                params,
            ),
        )
    }

    /**
     * 初始化请求拦截器
     * @param axiosInstance 请求实例
     */
    initReqInterceptors(axiosInstance: AxiosInstance) {
        axiosInstance.interceptors.request.use(
            (config: any) => {
                config.headers['Authorization'] =
                    config.headers['Authorization'] || this.getApp().getToken()
                return config
            },
            error => {
                return Promise.reject({
                    msg: error.statusText || '网络异常',
                })
            },
        )
    }
    /**
     * 初始化响应拦截器
     * @param axiosInstance 请求实例
     */
    initRespInterceptors(axiosInstance: AxiosInstance) {
        axiosInstance.interceptors.response.use(
            response => {
                const { data, config } = response
                try {
                    //文件请求,直接返回原始响应数据
                    if (config?.responseType == 'blob' || config?.responseType == 'arraybuffer') {
                        return response
                    }
                    const code = data.code.toString()

                    if (code === '0') {
                        return data
                    }
                    // 拦截非0响应
                    // 登录过期
                    if (this.isAuthExpired(data)) {
                        this.getApp().logout()
                        return this.reject(
                            response,
                            data.msg ?? data.stackMsg ?? (response.statusText || '网络异常'),
                        )
                    }
                    // 如果未启用了全局拦截则抛出异常由用户自己catch处理
                    if (this.enabledGlobalIntercept) {
                        // 启用全局拦截由beeboat-plus提供拦截
                        BTPUtils.message({
                            message: data.msg || data.stackMsg,
                            type: 'error',
                        })
                        return this.reject(
                            response,
                            data.msg ?? data.stackMsg ?? (response.statusText || '网络异常'),
                        )
                    }
                    return this.reject(
                        response,
                        data.msg ?? data.stackMsg ?? (response.statusText || '网络异常'),
                    )
                } catch (error) {
                    return Promise.reject(error)
                }
            },
            error => {
                return this.reject(error, error.statusText || '网络异常')
            },
        )
    }

    /**
     * 判断是否过期登录
     * @param result 响应
     * @returns 是否过期登录
     * '用户未登录' = 130001,'操作未授权' = 130002,'数据未授权' = 130003,'用户登录过期' = 130004,'token' = 130005,
     */
    isAuthExpired(result): boolean {
        return ['130001', '130002', '130003', '130004', '130005'].includes(`${result.code}`)
    }

    /**
     * 统一拦截拒绝
     * @param response
     * @param message
     * @returns
     */
    reject(response: any, message: string): Promise<any> {
        return Promise.reject({
            ...response,
            msg: message,
        })
    }
}

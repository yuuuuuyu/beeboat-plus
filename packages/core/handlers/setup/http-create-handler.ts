import Axios, { AxiosInstance } from 'axios'
import { BTPBaseSetupHandler } from '../base'
import { BtUseAppStore } from '../../store'
import BtNProgress from '../../utils/nprogress'
import { tokenErrorCode } from '../../utils/error-code'
import { ElNotification, ElMessageBox } from 'element-plus'

const logoutState = false // 判断登录token失效时的参数
const { CancelToken } = Axios

/**
 * http(axios)加载处理对象
 */
export default class BTPHttpCreateHandler extends BTPBaseSetupHandler {
    readonly className: string = 'BTPHttpCreateHandler'

    /**
     * 进度条
     */
    protected nprogress = new BtNProgress()
    /**
     * 应用请求对象
     */
    protected $http!: AxiosInstance

    /**
     * 请求队列
     */
    protected pending = [] as any

    /**
     * 是否开启错误通知
     */
    protected enabledNotification = false

    handle(params: any = {}) {
        this.$http = this.createAxios(params)
        this.initReqInterceptors(this.$http)
        this.initRespInterceptors(this.$http)
        this.getApp().setHttp(this.$http)
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
                const $config = config

                $config.headers['Authorization'] =
                    $config.headers['Authorization'] || this.getApp().getToken()
                return $config
            },
            error => {
                debugger
                const $error = error
                return Promise.reject({
                    msg: $error.statusText || '网络异常',
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
                } catch (error) {
                    debugger
                }
            },
            error => {},
        )
    }
}

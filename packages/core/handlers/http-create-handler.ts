import Axios, { AxiosInstance } from 'axios'
import BtBaseSetupHandler from '../base/base-setup-handler'
import { BtUseAppStore } from '../store'
import BtNProgress from '../utils/nprogress'
import { tokenErrorCode } from '../utils/error-code'
import { ElNotification, ElMessageBox } from 'element-plus'

let logoutState = false // 判断登录token失效时的参数
const { CancelToken } = Axios

/**
 * http(axios)加载处理对象
 */
export default class BtHttpCreateHandler extends BtBaseSetupHandler {
    readonly className: string = 'BtHttpCreateHandler'

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
        const env = this.getEnv()
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
                // 开启进度条动画
                this.onReqStart(config)
                // const app = BtUseAppStore().getApp()
                const $config = config

                $config.headers['RouteId'] = this.getApp()?.$router?.currentRoute.value.meta?.id
                $config.headers['MenuId'] = this.getApp()?.$router?.currentRoute.value.name
                $config.headers['Authorization'] =
                    $config.headers['Authorization'] || this.getApp().getToken()
                this.appendRequestHeader($config)
                this.onRemoveReqSequence($config)
                config.cancelToken = new CancelToken(c => {
                    const { url, method, params, data } = config
                    this.onAppendReqSequence({ url, method: method, params, data, cancel: c })
                })
                return $config
            },
            error => {
                const $error = error
                return Promise.reject({
                    msg: $error.statusText || '网络异常',
                })
            },
        )
    }
    /**
     * 附加请求头参数，可重写
     * @param _config config
     */
    appendRequestHeader(_config: any) {}
    /**
     * 初始化响应拦截器
     * @param axiosInstance 请求实例
     */
    initRespInterceptors(axiosInstance: AxiosInstance) {
        axiosInstance.interceptors.response.use(
            response => {
                const appStore = BtUseAppStore()
                // 关闭进度条动画
                this.onReqDone(response)
                const { data, config } = response
                this.onRemoveReqSequence(config)

                try {
                    //文件请求,直接返回原始响应数据
                    if (config?.responseType == 'blob' || config?.responseType == 'arraybuffer') {
                        return response
                    }
                    const code = data.code.toString()
                    if (code === '0') {
                        return data
                    }

                    if (this.isUnAuth(data)) {
                        if (!logoutState) {
                            logoutState = true
                            const app = this.app
                            this.showUnAuthMessage(data, () => {
                                app.removeToken()
                                appStore.setUserTokenData(null)
                                this.redirectToLogin()
                            })
                            setTimeout(() => {
                                logoutState = false
                            }, 1000)
                        }
                        const CancelToken = Axios.CancelToken
                        const source = CancelToken.source()
                        source.cancel('登陆超时，已关闭连接')
                        return
                    }
                    if (this.enabledNotification) {
                        this.showMessage(data)
                    }
                    if (code != '130004') {
                        return Promise.reject({
                            ...response,
                            msg: data.msg || data.stackMsg || '网络异常',
                        })
                    }
                } catch (error) {
                    if (this.enabledNotification) {
                        this.showMessage({ code: -1, msg: '网络异常' })
                    }
                    const code = data.code.toString()
                    if (code != '130004') {
                        return Promise.reject({
                            ...response,
                            msg: data.msg ?? data.stackMsg ?? (response.statusText || '网络异常'),
                        })
                    }
                }
            },
            error => {
                const $error = error
                $error.isCancelRequest = Axios.isCancel($error)
                // 关闭进度条动画
                this.onReqDone(error)
                if ($error.isCancelRequest) {
                    if (this.enabledNotification) {
                        this.showMessage({ code: -1, msg: '重复请求' })
                    }
                    return new Promise(() => {})
                } else {
                    if (this.enabledNotification) {
                        this.showMessage({ code: -1, msg: '网络异常' })
                    }
                    // 所有的响应异常 区分来源为取消请求/非取消请求
                    return Promise.reject({
                        ...$error,
                        msg: $error.statusText || '网络异常',
                    })
                }
            },
        )
    }
    onAppendReqSequence(config) {
        this.pending.push(config)
    }
    onRemoveReqSequence(config) {
        for (const key in this.pending) {
            const item = +key
            const list = this.pending[key]
            // 当前请求在数组中存在时执行函数体
            if (
                list.url === config.url &&
                list.method === config.method &&
                JSON.stringify(list.params) === JSON.stringify(config.params) &&
                JSON.stringify(list.data) === JSON.stringify(config.data)
            ) {
                // 执行取消操作
                list.cancel(`操作频繁已取消:${list.url},${JSON.stringify(list.data)}`)
                // 从数组中移除记录
                this.pending.splice(item, 1)
            }
        }
    }

    onReqStart(_config: any) {
        this.nprogress.start()
    }

    onReqDone(_response: any) {
        this.nprogress.done()
    }

    showUnAuthMessage(data: any, callback) {
        ElMessageBox({
            title: '身份验证失效',
            message: '您的身份验证信息错误或失效，请单击“确定”重新登录！',
            showClose: false,
            closeOnClickModal: false,
            closeOnHashChange: false,
            closeOnPressEscape: false,
            confirmButtonText: '确定',
            callback: () => {
                if (callback) {
                    callback()
                }
            },
        })
    }

    showMessage(data: any) {
        ElNotification({
            title: '错误提示',
            message: data.msg || data.stackMsg || 'Error',
            type: 'error',
        })
    }

    isUnAuth(data: any) {
        return tokenErrorCode.includes(data.code.toString())
    }
    /**
     * 跳转登录
     */
    redirectToLogin() {
        try {
            if (this.getApp().isMicroApp()) {
                this.getApp().getMicroAppEvent().dispatch({
                    authError: true,
                    dataType: 'logout',
                })
            } else {
                this.getApp().$router.push('/login')
            }
        } catch (error) {
            this.getApp().$router.push('/login')
            throw error
        }
    }
}

import Axios, { AxiosInstance } from 'axios'
// import { tokenErrorCode } from '../utils/error-code'
import { ElNotification } from 'element-plus'

// const logoutState = false // 判断登录token失效时的参数
const { CancelToken } = Axios
// 取消重复请求
const pending = [] as any
// 移除重复请求
const removePending = config => {
    // debugger
    for (const key in pending) {
        const item = +key
        const list = pending[key]
        // 当前请求在数组中存在时执行函数体
        if (
            list.url === config.url &&
            list.method === config.method &&
            JSON.stringify(list.params) === JSON.stringify(config.params) &&
            JSON.stringify(list.data) === JSON.stringify(config.data)
        ) {
            // 执行取消操作
            list.cancel(
                `操作频繁已取消:${list.url},get:${JSON.stringify(
                    list.params,
                )},post:${JSON.stringify(list.data)}`,
            )
            // 从数组中移除记录
            pending.splice(item, 1)
        }
    }
}
/**
 * http(axios)加载处理对象
 */
class BtHttp {
    readonly className: string = 'BtHttp'
    $http = Axios.create(
        Object.assign({
            baseURL: '/',
            withCredentials: true,
            timeout: 60000,
        }),
    )
    constructor() {
        this.initReqInterceptors(this.$http)
        this.initRespInterceptors(this.$http)
    }

    /**
     * 初始化请求拦截器
     * @param axiosInstance 请求实例
     */
    initReqInterceptors(axiosInstance: AxiosInstance) {
        axiosInstance.interceptors.request.use(
            (config: any) => {
                // debugger
                const $config = config
                // 开启进度条动画
                // NProgress.start()
                $config.headers['Authorization'] =
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJBQ0NPVU5UX0lEIjoiZWJhNjQ4MmYtMGY4My00ZDBkLWJkZWQtNGE4ZTBhY2FjZmE5IiwiQ0xJRU5UX0lEIjoiM2Y1ZDQ2NGZhYzQ4NDRmOWI2YmFhMjJlZGY0NzQ0MjAiLCJVU0VSSUQiOiI2Y2ZhODAzNy02OGIxLTRiNjYtODc3MS0yZjcyNzg2MTJjZDAiLCJURU5BTlRfSUQiOiIifQ.IwXU5uxhcUkV1DxUjdiiz0cYQhqPg8FvjU9owmU_9vc'
                removePending($config)
                config.cancelToken = new CancelToken(c => {
                    const { url, method, params, data } = config
                    pending.push({ url, method: method, params, data, cancel: c })
                })
                return $config
            },
            error => {
                const $error = error
                // $error.isCancelRequest = Axios.isCancel($error)
                return Promise.reject($error)
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
                // 关闭进度条动画
                // NProgress.done()
                const { data, config } = response
                removePending(config)
                try {
                    console.log(config, response.headers['content-disposition'], 'config....')
                    if (config?.responseType == 'blob' || config?.responseType == 'arraybuffer') {
                        return response
                    } else {
                        if (response.config.method == 'post') {
                            const code = data.code.toString()
                            // 正常响应判断
                            if (code === '0') {
                                return data
                            }
                            // token错误响应判断,跳转登录逻辑
                            // if (tokenErrorCode.includes(data.code.toString())) {
                            //     if (!logoutState) {
                            //         logoutState = true
                            //         const app = this.app
                            //         ElMessageBox({
                            //             title: 'No Authentication',
                            //             message: '您的身份验证信息错误或失效，请单击“OK”重新登录！',
                            //             showClose: false,
                            //             closeOnClickModal: false,
                            //             closeOnHashChange: false,
                            //             closeOnPressEscape: false,
                            //             confirmButtonText: 'OK',
                            //             callback: _action => {
                            //                 // 删除token
                            //                 app.removeToken()
                            //                 //判断环境跳转登录页面
                            //                 if (app.isMicroApp()) {
                            //                     //返回authError告知基座应用token无效，重新登录
                            //                     app.getMicroAppEvent().dispatch({
                            //                         authError: true,
                            //                     })
                            //                 } else {
                            //                     app.$router.push('/login')
                            //                 }
                            //             },
                            //         })
                            //         setTimeout(() => {
                            //             logoutState = false
                            //         }, 1000)
                            //     }

                            //     return Promise.reject(response)
                            // }

                            if (code != '0') {
                                ElNotification({
                                    title: '错误提示',
                                    message: data.stackMsg || data.msg || 'Error',
                                    type: 'error',
                                })
                                return Promise.reject(response)
                            }
                        } else if (response.config.method == 'get') {
                            if (data?.code) {
                                ElNotification({
                                    title: '错误提示',
                                    message: data.stackMsg || data.msg || 'Error',
                                    type: 'error',
                                })
                                return Promise.reject(response)
                            } else {
                                return data
                            }
                        } else {
                            return response
                        }
                    }
                } catch (error) {
                    return Promise.reject(response)
                }
            },
            error => {
                const $error = error
                $error.isCancelRequest = Axios.isCancel($error)

                if ($error.isCancelRequest) {
                    console.error($error.message)
                    return new Promise(() => {})
                } else {
                    // 所有的响应异常 区分来源为取消请求/非取消请求
                    return Promise.reject($error)
                }
                // return Promise.reject($error)
                // 关闭进度条动画
                // NProgress.done()
            },
        )
    }
}
export default BtHttp
export { BtHttp }

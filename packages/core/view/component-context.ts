import BTPUtils from '../utils/btp-utils'

export default class BTPComponentContext {
    /**
     * @description 获取路由对象
     * @returns 路由对象
     */
    getRouter() {
        return BTPUtils.getRouter()
    }

    /**
     * @description 从params获取路由参数
     * @param paramName 参数名称
     * @returns 路由params参数值
     */
    getRouteParamValue(paramName: string): string {
        return BTPUtils.getRouteParamValue(paramName)
    }

    /**
     * @description 调用内置后台接口
     * @param methodId 接口标识
     * @param params 参数
     * @param timestamp 是否添加时间戳
     * @returns
     */
    executeMethodApi(methodId, params, timestamp = false) {
        params = params || {}
        if (timestamp) {
            params['__t__'] = Date.now()
        }
        const method = BTPUtils.getCacheManager().getMethod(methodId)
        return BTPUtils.getHttp().post(method.url, params)
    }

    /**
     * @description 进行页面跳转
     * @param url 地址
     * @param mode 模式  url 打开浏览器分页  route 进行路由跳转
     * @param queryParams 路由跳转参数
     */
    redirect(url, mode = 'url', queryParams = {}) {
        if (mode == 'url') {
            if (url.startsWith('http')) {
                window.open(url, '_blank')
            } else {
                const routeUrl = this.getRouter().resolve({
                    path: url,
                })
                window.open(routeUrl.href, '_blank')
            }
        } else if (mode == 'route') {
            BTPUtils.getRouter().push({ path: url, query: queryParams })
        }
    }
}

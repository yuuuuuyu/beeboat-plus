import BTPUtils from '../utils/btp-utils'

export default class BTPComponentContext {
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
}

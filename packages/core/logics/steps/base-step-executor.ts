import BTPUtils from '../../utils/btp-utils'
export default class BTPBaseStepExecutor {
    public executor

    constructor(executor) {
        this.executor = executor
    }

    getRouter() {
        return BTPUtils.getRouter()
    }

    /**
     * 从临时变量中获取值
     * @param key 键
     * @param defaultValue 默认值
     * @returns
     */
    lv(key, defaultValue = null) {
        return this.executor.lv(key, defaultValue)
    }

    /**
     * 从入参变量中获取值
     * @param key 键
     * @param defaultValue 默认值
     * @returns
     */
    v(key, defaultValue = null) {
        return this.executor.v(key, defaultValue)
    }
    /**
     * 从全局变量中获取值
     * @param key 键
     * @param defaultValue 默认值
     * @returns
     */
    gv(key, defaultValue = null) {
        return this.executor.gv(key, defaultValue)
    }

    /**
     * 从当前路由参数中获取值
     * @param key 键
     * @param defaultValue 默认值
     * @returns
     */
    rv(key, defaultValue = null) {
        return this.executor.rv(key, defaultValue)
    }
}

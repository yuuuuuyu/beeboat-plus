import { BTPUtils } from 'beeboat-plus'
export default class BTPBaseStepExecutor {
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
        return null
    }

    /**
     * 从入参变量中获取值
     * @param key 键
     * @param defaultValue 默认值
     * @returns
     */
    v(key, defaultValue = null) {
        return null
    }
    /**
     * 从全局变量中获取值
     * @param key 键
     * @param defaultValue 默认值
     * @returns
     */
    gv(key, defaultValue = null) {
        return null
    }
}

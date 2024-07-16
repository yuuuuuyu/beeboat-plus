import BTPUtils from '../../utils/btp-utils'
import BTPBaseStepExecutor from './base-step-executor'

/**
 * 变量定义步骤执行器
 */
export default class BTPStepParamAllocExecutor extends BTPBaseStepExecutor {
    constructor(executor) {
        super(executor)
    }
    execute(step) {
        this.allocParams(null, step.children)
        return null
    }

    allocParams(parentCode, paramList) {
        if (BTPUtils.isEmptyArray(paramList)) {
            return
        }
        for (let i = 0; i < paramList.length; i++) {
            const param = paramList[i]
            const key = parentCode ? `${parentCode}.${param.code}` : param.code
            BTPUtils.setObjectValue(this.executor.internalParams, key, this.getDefaultValue(param))

            this.allocParams(key, param.children)
        }
    }

    getDefaultValue(options) {
        const defaultConfig = options.defaultValue
        if (defaultConfig.type == 'const') {
            return defaultConfig.value || null
        }
        if (defaultConfig.type == 'props') {
            //
            return null
        }
        if (defaultConfig.type == 'route') {
            return BTPUtils.getRouteParamValue(defaultConfig.routeKey)
        }
        return null
    }
}

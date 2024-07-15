import BTPUtils from '../utils/btp-utils'
import { BTPStepRedirectExecutor, BTPStepParamAllocExecutor } from './steps/index'
export default class BTPBaseLogicExecutor {
    public __steps__ = {}
    /**
     * 事件配置信息
     */
    public bptLogicOptions = {
        /**
         * 上下文
         */
        viewContext: null,
        /**
         * 组件信息
         */
        component: null,
        /**
         * 事件信息
         */
        event: null as any,
        /**
         * 事件名称
         */
        eventName: '',
    } as any
    /**
     * 内部临时变量
     */
    public internalParams = {}

    /**
     * @description 创建对象
     * @param viewContext 页面上下文
     * @param component 组件信息
     * @param event 事件信息
     * @param eventName 事件名称
     * @param params 调用参数数组
     */
    constructor(viewContext, component, event, eventName, params) {
        this.__steps__['redirect'] = new BTPStepRedirectExecutor(this)
        this.__steps__['alloc'] = new BTPStepParamAllocExecutor(this)
        this.bptLogicOptions.viewContext = viewContext
        this.bptLogicOptions.component = component
        this.bptLogicOptions.event = event
        this.bptLogicOptions.eventName = eventName

        if (Array.isArray(event.params)) {
            event.params.forEach((param, index) => {
                this[param.value] = params[index]
            })
        }
    }

    /**
     * 执行事件
     * @returns 未知
     */
    execute() {
        const logics = this.bptLogicOptions.event?.logics
        for (let i = 0; i < logics.length; i++) {
            this.__steps__[logics[i].type].execute(logics[i])
        }

        return null
    }

    /**
     * @description 是否是指定组件的事件
     * @param eventName 事件名称
     * @param componentCode 组件标识
     * @returns 是否是指定组件的事件
     */
    isEvent(eventName, componentCode = null): boolean {
        if (componentCode) {
            return this.isComponent(componentCode) && this.isEventName(eventName)
        } else {
            return this.isEventName(eventName)
        }
    }

    /**
     * @description 是否是指定组件
     * @param componentCode 组件标识
     * @returns 是否是指定组件
     */
    isComponent(componentCode): boolean {
        return this.bptLogicOptions.component.code == componentCode
    }

    /**
     * @description 是否是指定事件名称
     * @param eventName 事件名称
     * @returns 是否是指定事件
     */
    isEventName(eventName): boolean {
        return this.bptLogicOptions.eventName == eventName
    }

    /**
     * 根据ref值获取组件对象
     * @param ref ref值
     * @returns 组件对象
     */
    getRef(ref: string) {
        return this.bptLogicOptions.viewContext.getRef(ref)
    }

    /**
     * 从临时变量中获取值
     * @param key 键
     * @param defaultValue 默认值
     * @returns
     */
    lv(key, defaultValue = null) {
        return BTPUtils.getObjectValue(key, this.internalParams) || defaultValue
    }

    /**
     * 从入参变量中获取值
     * @param key 键
     * @param defaultValue 默认值
     * @returns
     */
    v(_key, _defaultValue = null) {
        return null
    }
    /**
     * 从全局变量中获取值
     * @param key 键
     * @param defaultValue 默认值
     * @returns
     */
    gv(_key, _defaultValue = null) {
        return null
    }

    /**
     * 从当前路由参数中获取值
     * @param key 键
     * @param defaultValue 默认值
     * @returns
     */
    rv(key, defaultValue = null) {
        return BTPUtils.getRouteParamValue(key) || defaultValue
    }
}

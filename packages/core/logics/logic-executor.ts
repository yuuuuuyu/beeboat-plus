export default class BTPLogicExecutor {
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
        event: null,
        /**
         * 事件名称
         */
        eventName: '',
    }

    /**
     * @description 创建对象
     * @param viewContext 页面上下文
     * @param component 组件信息
     * @param event 事件信息
     * @param eventName 事件名称
     * @param params 调用参数数组
     */
    constructor(viewContext, component, event, eventName, params) {
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
}

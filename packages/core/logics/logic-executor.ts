import BTPBaseLogicExecutor from './base-logic-executor'
export default class BTPLogicExecutor extends BTPBaseLogicExecutor {
    /**
     * @description 创建对象
     * @param viewContext 页面上下文
     * @param component 组件信息
     * @param event 事件信息
     * @param eventName 事件名称
     * @param params 调用参数数组
     */
    constructor(viewContext, component, event, eventName, params) {
        super(viewContext, component, event, eventName, params)
    }
}

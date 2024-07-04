import { ComponentInternalInstance } from 'vue'

import BTPApplication from '../app/application'
import BTPBaseViewContext from './base-view-context'
import BTPUtils from '../utils-ex/utils-ex'
import BTPLogicExecutor from '../logics/logic-executor'

export default class BTPViewContext extends BTPBaseViewContext {
    /**
     * VUE组件实例对象
     */
    public vueInstance?: ComponentInternalInstance

    /**
     * @description 父级页面对象
     */
    parentViewContext: any

    /**
     * 视图唯一ID
     */
    public viewId: string

    /**
     * 视图模型唯一ID
     */
    public viewModelId: string

    constructor(vueInstance?: any, viewId?: string, viewModelId?: string, parentViewContext?: any) {
        super()
        this.vueInstance = vueInstance
        this.parentViewContext = parentViewContext

        this.viewId = viewId || vueInstance.type.props.uniqueId
        this.viewModelId = viewModelId || vueInstance.type.props.viewModelId

        if (this.viewModelId) {
            BTPUtils.getAppManager()
                .getView(this.viewModelId)
                .then(res => {
                    this.buildView(res)
                })
        } else {
            console.log('无法获取参数', BTPApplication.getInstance().getRouter().currentRoute)
        }
    }

    /**
     * @description 创建视图的ViewContext对象
     * @param vueInstance 实例
     * @param viewId 视图ID
     * @param viewModelId 视图配置ID
     * @param parentViewContext 上级页面
     * @returns 对象
     */
    public static createInstance(
        vueInstance?: any,
        viewId?: string,
        viewModelId?: string,
        parentViewContext?: any,
    ): any {
        return new BTPViewContext(vueInstance, viewId, viewModelId, parentViewContext)
    }

    /**
     * 获取Ref对象引用
     * @param name ref名称
     * @returns 实例
     */
    getRef(name): any {
        const refs = this.vueInstance?.refs[name]
        return Array.isArray(refs) ? refs[0] : refs
    }

    /**
     * 获取暴露方法
     * @returns 暴露方法
     */
    getExpose(): any {
        return {
            getViewContext: () => {
                return this
            },
        }
    }

    /**
     * 绘制组件对象
     * @param component 组件信息
     * @returns 组件
     */
    render(component: any): any {
        return component.type
    }
    /**
     * 绘制组件对象
     * @param component 组件信息
     * @returns 组件
     */
    buildView(data: any): void {
        this.viewModel.refers = data.refers
        this.viewModel.components = data.components
        this.buildProps(this.viewModel.components)
        this.buildDataModel(this.viewModel.components)
        this.buildEvents(this.viewModel.components)
    }

    buildProps(data: any): void {
        const componentList = BTPUtils.getAppManager().parseComponentList(data)
        componentList.forEach(item => {
            if (item.props?.rules) {
                item.props.rules.forEach(item => {
                    if (item.pattern) {
                        item.pattern = new RegExp(item.pattern)
                    }
                })
            }
        })
    }

    buildDataModel(data: any): void {
        const componentList = BTPUtils.getAppManager().parseComponentList(data)
        componentList.forEach(item => {
            if (item.model?.prop?.length > 0) {
                this.dataModelProxy[item.model?.prop] = item.model?.defaultValue || undefined
            }
        })
    }

    buildEvents(components): void {
        const viewContext = this
        const componentList = BTPUtils.getAppManager().parseComponentList(components)

        componentList.forEach(item => {
            item.events = {}
            item.props.propEvents = {}
            if (item.actions) {
                Object.keys(item.actions).forEach(eventName => {
                    const action = item.actions[eventName]
                    if (action.propEvent) {
                        item.props.propEvents[eventName] = (p1, p2, p3, p4, p5, p6, p7) => {
                            const executor = new BTPLogicExecutor(
                                viewContext,
                                item,
                                action,
                                eventName,
                                [p1, p2, p3, p4, p5, p6, p7],
                            )
                            this.executeAction(executor)
                        }
                    } else {
                        item.events[eventName] = (p1, p2, p3, p4, p5, p6, p7) => {
                            const executor = new BTPLogicExecutor(
                                viewContext,
                                item,
                                action,
                                eventName,
                                [p1, p2, p3, p4, p5, p6, p7],
                            )
                            this.executeAction(executor)
                        }
                    }
                })
            }
            if (item.children) {
                this.buildEvents(item.children)
            }
        })
    }

    executeAction(executor) {
        console.log('执行事件', executor)
        return executor.execute()
    }
}

import { ComponentInternalInstance } from 'vue'
import BtBaseContext from './base-context'
/**
 * 组件逻辑处理基类
 * @author Enmaai
 */
export default class BtComponentContext extends BtBaseContext {
    /**
     * 页面上下文对象
     */
    public pageContext
    /**
     * 页面上下文对象
     */
    public pageCtx
    /**
     * 构造函数
     * @param vueInstance 当前组件实例
     */
    constructor(vueInstance?: ComponentInternalInstance) {
        super(vueInstance)
    }

    /**
     * 初始化对象
     * @param vueInstance 当前VUE实例
     * @param pageContext 所属页面逻辑对象
     */
    init(vueInstance: ComponentInternalInstance, pageContext: any): void {
        this.vueInstance = vueInstance
        this.pageContext = pageContext
    }

    /**
     * 页面Context对象
     * @returns 所在页面Context对象
     */
    getPageCtx() {
        return this.pageContext || this.pageCtx
    }

    /**
     * 加载组件数据
     * @param params 参数
     */
    loadComponentData(params: any): void {
        console.log('调用组件[loadComponentData]方法', params)
    }
    /**
     * 刷新组件
     * @param componentName 组件名称
     */
    refreshComponent(componentName: string): void {
        console.log('调用页面的刷新方法', componentName)
        if (this.getPageCtx()) {
            this.getPageCtx().refreshComponent(componentName)
        }
    }
}

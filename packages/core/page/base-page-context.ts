import { ComponentInternalInstance } from 'vue'
import BtBaseComponentContext from './base-component-context'
/**
 * 页面逻辑处理基类
 * @author Enmaai
 */
export default class BtBasePageContext extends BtBaseComponentContext {
    public parentPageContext

    constructor(parentPageContext: any, vueInstance?: ComponentInternalInstance) {
        super(vueInstance)
        this.parentPageContext = parentPageContext
    }

    /**
     * 组件上下文实例集合
     */
    public ctxMap: any = {}

    /**
     * 注册组件上下文实例
     * @param componentCode 组件代码
     * @param ctxInstance 上下文对象实例
     */
    public regComponentContext(componentCode: string, ctxInstance: any) {
        ctxInstance.pageCtx = this
        this.ctxMap[componentCode] = ctxInstance
    }

    /**
     * 获取组件上下文实例
     * @param componentCode 组件代码
     * @returns 上下文实例
     */
    public getCtx(componentCode: string) {
        return this.ctxMap[componentCode]
    }

    /**
     * 获取关联页面上下文实例
     * @returns 上下文实例
     */
    getParentCtx() {
        return this.parentPageContext
    }

    onRefresh(params: any): void {
        Object.keys(this.ctxMap).forEach(key => {
            this.getCtx(key).refresh(params)
            this.getRef(key)?.refresh()
        })
    }

    onReset(params: any): void {
        Object.keys(this.ctxMap).forEach(key => {
            this.getCtx(key).reset(params)
        })
    }

    /**
     * 刷新组件
     * @param componentName 组件名称
     */
    refreshComponent(componentName: string): void {
        let context = this.getCtx(componentName)
        if (!context) {
            if (this.getParentCtx()) {
                context = this.getParentCtx().getCtx(componentName)
            }
        }
        if (context) {
            context.refresh()
        }
    }
}

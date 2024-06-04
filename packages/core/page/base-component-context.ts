import { Router } from 'vue-router'
import { BtUseAppStore } from '../store'
import { reactive, ComponentInternalInstance } from 'vue'
import BtApplication from '../app'
import { UseEventBus } from '../hook/useEventBus'
/**
 * 页面逻辑处理基类
 * @author Enmaai
 */
export default class BtBaseComponentContext extends UseEventBus {
    /**
     * 生命周期 => 组件初始化执行
     */
    public componentInit() {}
    /**
     * 重写 生命周期 => 组件初始化执行
     */
    public onComponentInit() {}
    /**
     * 生命周期 => 组件挂载时执行
     */
    public componentMount() {}
    /**
     * 重写 生命周期 => 组件挂载时执行
     */
    protected onComponentMount() {}
    /**
     * 生命周期 => 组件更新时执行
     */
    public componentUpdate() {}
    /**
     * 重写 生命周期 => 组件更新时执行
     */
    public onComponentUpdate() {}
    /**
     * 生命周期 => 组件卸载时执行
     */
    public componentUnMount() {}
    /**
     * 重写 生命周期 => 组件卸载时执行
     */
    public onComponentUnMount() {}
    /**
     * VUE组件实例对象
     */
    public vueInstance?: ComponentInternalInstance

    /**
     * 页面逻辑对象
     */
    public pageCtx: any

    /**
     * 组件内置响应值对象
     */
    public viewData: any

    /**
     * 组件Ref标识
     */
    public uniqueId: string
    /**
     * 属性对象
     */
    public propsMap: any
    /**
     * 事件对象
     */
    public eventsMap: any

    constructor(vueInstance?: ComponentInternalInstance) {
        super()
        this.vueInstance = vueInstance
        this.uniqueId = ''
        this.viewData = reactive({})
        this.propsMap = reactive({})
        this.eventsMap = reactive({})
    }

    /**
     * 获取当前上下文对象
     * @returns 返回当前
     */
    getSelf() {
        return this
    }

    /**
     * 校验组件是否显示
     * @param _componentName  `{string}` 组件唯一名称
     * @param _arg 扩展参数 arg1,arg2,arg3..
     * @returns 是否显示
     */
    checkVisible(_componentName: string, ..._arg: any[]): boolean {
        if (this.propsMap[_componentName]) {
            if (this.propsMap[_componentName].hidden) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }

    /**
     * 获取组件绑定属性
     * @param _componentName 组件唯一名称
     * @returns
     */
    getBindProps(_componentName: string) {
        if (this.propsMap[_componentName]) {
            return this.propsMap[_componentName]
        }
        return {}
    }

    /**
     * 获取组件绑定事件
     * @param _componentName 组件唯一名称
     * @returns
     */
    getBindEvents(_componentName: string) {
        if (this.eventsMap[_componentName]) {
            return this.eventsMap[_componentName]
        }
        return {}
    }

    /**
     * 获取App对象
     * @returns 获取App对象
     */
    getApp(): BtApplication {
        return BtUseAppStore().getApp()
    }

    /**
     * 获取路由对象
     * @returns 路由对象
     */
    getRouter(): Router {
        return this.getApp().$router
    }

    /**
     * 获取暴露方法
     * @returns 暴露方法
     */
    getExpose(): any {
        return {
            getCtx: () => {
                return this
            },
        }
    }

    /**
     * 获取事件列表
     * @returns 事件列表
     */
    getEmitEvents(): Array<String> {
        return ['DialogClosed']
    }

    /**
     * 获取Ref对象引用
     * @param name ref名称
     * @returns 实例
     */
    getRef(name): any {
        return this.vueInstance?.refs[name]
    }

    /**
     * 获取Props属性
     * @returns Props属性
     */
    getProps(): any {
        return this.vueInstance?.props
    }

    /**
     * 触发事件
     * @param eventName 事件名称
     * @param params 参数
     */
    emitEvent(eventName: string, params = {}): void {
        this.vueInstance?.emit(eventName, params)
    }

    /**
     * 刷新页面
     * @param params 参数
     */
    refresh = (params = {}): void => {
        this.onRefresh(params)
    }

    /**
     * [可重写]刷新页面
     * @param params 参数
     */
    onRefresh(params): void {
        console.log('页面刷新', params)
    }

    /**
     * 重置组件
     * @param params 参数
     */
    reset = (params = {}): void => {
        this.onReset(params)
    }

    /**
     * [可重写]重置组件
     * @param params 参数
     */
    onReset(params): void {
        console.log('重置组件', params)
    }

    /**
     * 获取页面逻辑对象
     * @returns 页面逻辑对象
     */
    getPageCtx() {
        return this.pageCtx
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
    /**
     * 加载组件数据
     * @param params 参数
     */
    loadComponentData(params: any): void {
        console.log('加载组件数据', params)
    }

    /**
     * 提交
     */
    submit = () => {
        this.onSubmit()
    }

    /**
     * 执行提交
     */
    onSubmit() {}
    /**
     * 清空ViewData数据
     * @param nonemptyList `{string[]?}`非空参数列表，可空参数
     */
    clearViewData(nonemptyList?: string[]) {
        Object.keys(this.viewData || {})?.forEach(key => {
            if (nonemptyList && nonemptyList.includes(key)) {
                if (
                    this.viewData[key] ||
                    this.viewData[key] === false ||
                    this.viewData[key] === 0
                ) {
                    this.viewData[key] = this.viewData[key]
                } else {
                    this.viewData[key] = undefined
                }
            } else {
                this.viewData[key] = undefined
            }
        })
    }
}

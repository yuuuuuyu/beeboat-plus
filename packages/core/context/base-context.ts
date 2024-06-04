import { Router, RouteParams } from 'vue-router'
import { reactive, ComponentInternalInstance } from 'vue'
import BtApplication from '../app'
/**
 *逻辑处理基类
 * @author Enmaai
 */
export default class BtBaseContext {
    /**
     * VUE组件实例对象
     */
    public vueInstance?: ComponentInternalInstance

    /**
     * 组件Ref标识
     */
    public uniqueId?: string
    /**
     * 属性对象
     */
    public propsMap: any
    /**
     * 事件对象
     */
    public eventsMap: any
    /**
     * 组件配置信息
     */
    public compConfig: any

    /**
     * 组件内置响应值对象
     */
    public viewData: any

    /**
     * 初始化数据
     */
    public initCacheData = {} as any

    constructor(vueInstance?: ComponentInternalInstance) {
        this.vueInstance = vueInstance
        this.propsMap = reactive({})
        this.eventsMap = reactive({})
        this.compConfig = reactive({})
    }

    /**
     * 缓存初始化数据副本
     * <p> 主要解决Form弹窗再次打开的时候多余值未重置
     * @param key 键
     * @param data 值
     */
    cacheInitData(key: string, data: any) {
        this.initCacheData[key] = data
    }

    /**
     * 获取缓存初始化数据副本
     * <p> 主要解决Form弹窗再次打开的时候多余值未重置
     * @param key 键
     * @returns 获取缓存初始化数据副本
     */
    getCacheInitData(key: string): any {
        return this.initCacheData[key] || {}
    }

    /**
     * 获取App对象
     * @returns 获取App对象
     */
    getApp(): BtApplication {
        return BtApplication.getInstance()
    }

    /**
     * 获取路由对象
     * @returns 路由对象
     */
    getRouter(): Router {
        return this.getApp().getRouter()
    }

    /**
     * 获取路由对象中的参数
     * @returns 路由对象的params
     */
    getRouterParams(): RouteParams {
        return this.getApp().getRouter().currentRoute.value.params
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
     * 获取组件绑定属性
     * @param _componentName 组件唯一名称
     * @param _parentComponentName 父组件唯一名称
     * @returns
     */
    getBindProps2(
        _componentName: string,
        _componentList?: any,
        _param1?: any,
        _param2?: any,
        _param3?: any,
        _param4?: any,
    ) {
        if (!_componentList) {
            return null
        }
        const fieldConfig = _componentList?.find(item => {
            return item.prop == _componentName
        })
        if (fieldConfig) {
            return fieldConfig.props || {}
        } else {
            for (let i = 0; i < _componentList.length; i++) {
                const childFieldConfig = this.getBindProps2(
                    _componentName,
                    _componentList[i].children,
                    _param1,
                    _param2,
                    _param3,
                    _param4,
                )
                if (childFieldConfig) {
                    return childFieldConfig
                }
            }
        }
        return null
    }

    /**
     * 获取组件绑定属性
     * @param _componentName 组件唯一名称
     * @param _parentComponentName 父组件唯一名称
     * @returns
     */
    getBindProps(
        _componentName: string,
        _parentComponentName = null,
        _param1 = null,
        _param2 = null,
        _param3 = null,
        _param4 = null,
    ) {
        if (_parentComponentName) {
            const children = [] as any
            Object.keys(this.compConfig).forEach(key => {
                children.push(this.compConfig[key])
            })
            return (
                this.getBindProps2(_componentName, children, _param1, _param2, _param3, _param4) ||
                {}
            )
        } else {
            if (this.propsMap[_componentName]) {
                return this.propsMap[_componentName]
            }
            if (this.compConfig[_componentName]) {
                const config = this.compConfig[_componentName]
                if (config && config.props) {
                    return config.props
                }
            }
        }
        return {}
    }

    /**
     * 获取组件绑定事件
     * @param _componentName 组件唯一名称
     * @param _parentComponentName 父组件唯一名称
     * @returns
     */
    getBindEvents(
        _componentName: string,
        _parentComponentName = null,
        _param1 = null,
        _param2 = null,
        _param3 = null,
        _param4 = null,
    ) {
        if (_parentComponentName) {
            if (
                this.compConfig[_parentComponentName] &&
                this.compConfig[_parentComponentName].children
            ) {
                const fieldConfig = this.compConfig[_parentComponentName].children.find(item => {
                    return item.prop == _componentName
                })
                if (fieldConfig) {
                    return fieldConfig.events || {}
                }
            }
        } else {
            if (this.eventsMap[_componentName]) {
                return this.eventsMap[_componentName]
            }
            if (this.compConfig[_componentName]) {
                const config = this.compConfig[_componentName]
                if (config && config.events) {
                    return config.events
                }
            }
        }
        return {}
    }
    /**
     * 获取组件绑定的校验规则
     * @param _componentName 组件唯一名称
     * @param _parentComponentName 父组件唯一名称
     * @returns
     */
    getItemRule(_componentName: string, _parentComponentName: string) {
        if (_parentComponentName) {
            if (
                this.compConfig[_parentComponentName] &&
                this.compConfig[_parentComponentName].children
            ) {
                const fieldConfig = this.compConfig[_parentComponentName].children.find(item => {
                    return item.prop == _componentName
                })
                if (fieldConfig) {
                    return fieldConfig.rules
                }
            }
        } else {
            if (this.compConfig[_componentName]) {
                return this.compConfig[_componentName].rules || []
            }
        }
        return []
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
     * 校验组件是否显示
     * @deprecated 后期考虑废弃
     * @param componentName 组件唯一名称
     * @param _param1 参数1
     * @param _param2 参数2
     * @param _param3 参数3
     * @returns 是否显示
     */
    checkVisible(_componentName: string, _param1?: any, _param2?: any, _param3?: any): boolean {
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
     * 刷新页面
     * @param params 参数
     */
    refresh = (name: string, params = {}): void => {
        this.onRefresh(name, params)
    }

    /**
     * [可重写]刷新页面
     * @param params 参数
     */
    onRefresh(name, params): void {
        this.getRef(name)?.refresh(params)
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
     * 清空V-MODEL中多余值
     * @param formKey 表单数据键
     * @param formData 表单数据
     */
    resetFormData(formKey: string, formData: any): void {
        //清空V-MODEL中多余值
        const keys = this.getCacheInitData(formKey)
        Object.keys(formData).forEach(key => {
            if (keys.indexOf(key) == -1) {
                delete formData[key]
            } else {
                formData[key] = null
            }
        })
    }
}

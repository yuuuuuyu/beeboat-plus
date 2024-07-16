import { v4 as uuidv4 } from 'uuid'
import { BTPApplication } from '../app'
import BTPWebsocketObserver from './websocket-observer'

export default class BTPUtils {
    /**
     * @description 获取应用程序对象
     * @returns 应用程序对象
     */
    static getApp() {
        return BTPApplication.getInstance()
    }

    /**
     * @description 获取路由对象
     * @returns 路由对象
     */
    static getRouter() {
        return BTPApplication.getInstance().getRouter() as any
    }

    /**
     * @description 获取应用管理对象
     * @returns 应用管理对象
     */
    static getAppManager() {
        return this.getApp().getAppManager()
    }

    /**
     * @description 获取应用缓存对象
     * @returns 应用缓存对象
     */
    static getCacheManager() {
        return this.getApp().getCacheManager()
    }

    /**
     * @description 获取消息弹框管理对象
     * @returns 消息弹框管理对象
     */
    static getMessageBoxManager() {
        return this.getApp().getMessageBoxManager()
    }

    /**
     * 显示消息<如果指定了options,则会忽略message和type参数>
     * @param message 消息文本
     * @param type 消息类型
     * @param options 详细参数
     */
    static message(message: any, type: any, options = null as any): void {
        this.getMessageBoxManager().message(message, type, options)
    }
    /**
     * @description 创建一个新的uuidv4
     * @returns uuid
     */
    static uuid(): string {
        return uuidv4()
    }

    /**
     * @description 创建websocket客户端
     * @param url 地址
     * @param listener 监听器
     * @param retry 重连时间默认10000
     * @returns websocket客户端
     */
    static createSocket(url, listener, retry = 10000) {
        return new BTPWebsocketObserver(url, listener, retry)
    }

    /**
     * @description 判断数组是否为空
     * @returns 是否为空
     */
    static isEmptyArray(array) {
        return !array || array.length == 0
    }

    /**
     * @description 判断字符串是否为空
     * @returns 是否为空
     */
    static isEmpty(str) {
        return !str || str.length == 0
    }

    /**
     * @description 判断两个字符串
     * @returns 是否相同
     */
    static isEqual(str1, str2) {
        return str1 == str2
    }

    /**
     * @description 判断对象是否为空
     * @returns 是否为空
     */
    static isNull(val): boolean {
        return val == null || val == undefined
    }

    /**
     * @description 返回第一个不为空的字符串
     * @returns 返回第一个不为空的字符串
     */
    static nvl(str1, str2) {
        return str1 || str2
    }

    /**
     * @description 将普通列表转换成树列表数据
     * @param list 列表
     * @param childName 子节点名称
     * @returns 树列表数据
     */
    static listToTree(list: any, childName = 'children'): any {
        const res = [] as any
        const map = list.reduce((res, v) => ((res[v.id] = v), res), {})
        for (const item of list) {
            if (item.parentId === null || item.parentId === '') {
                res.push(item)
                continue
            }
            if (item.parentId in map) {
                const parent = map[item.parentId]
                parent[childName] = parent[childName] || []
                parent[childName].push(item)
            }
        }
        return res
    }

    /**
     * @description 将树列表数据转换成普通列表
     * @param list 树列表数据
     * @param childName 子节点名称
     * @returns 普通列表
     */
    static treeToList(dataTreeList, childName = 'children') {
        if (!Array.isArray(dataTreeList)) {
            return []
        }
        return dataTreeList.reduce(
            (prev, cur) => prev.concat([cur], this.treeToList(cur[childName] || [])),
            [],
        )
    }

    /**
     * @description 转字符串为驼峰字符串
     * @param str 字符串
     * @returns 驼峰字符串
     */
    static varName(str: any): string {
        if (str && str.length > 0) {
            return str[0].toLowerCase() + str.slice(1)
        }
        return str
    }

    /**
     * @description 从params获取路由参数
     * @param paramName 参数名称
     * @returns 路由params参数值
     */
    static getRouteParamValue(paramName: string): string {
        const params = this.getRouter().currentRoute?.value?.params || {}
        const value = params[paramName]
        if (typeof value === 'string') {
            return value
        } else {
            return ''
        }
    }

    /**
     * @description 从query获取路由参数
     * @param paramName 参数名称
     * @returns 路由query参数值
     */
    static getRouteQueryValue(paramName: string): string {
        const params = this.getRouter().currentRoute?.value?.query || {}
        const value = params[paramName]
        if (typeof value === 'string') {
            return value
        } else {
            return ''
        }
    }

    /**
     * @description 递归获取对象键对应的值
     * @param key 键
     * @param data 数据对象
     * @returns 值
     */
    static getObjectValue(key, data) {
        let lastObject = data
        const keys = key.split('.')
        for (let i = 0; i < keys.length; i++) {
            const val = keys[i]
            if (i == keys.length - 1) {
                return lastObject[val]
            } else {
                if (Reflect.has(lastObject, val)) {
                    lastObject = lastObject[val]
                } else {
                    return null
                }
            }
        }
        return null
    }

    /**
     * @description 递归给对象的某个键设置值
     * @param key 键
     * @param data 数据对象
     */
    static setObjectValue(data, key: string, value): void {
        let lastObject = data
        const keys = key.split('.')

        for (let i = 0; i < keys.length; i++) {
            const val = keys[i]
            if (i == keys.length - 1) {
                lastObject[val] = value
            } else {
                if (!Reflect.has(lastObject, val)) {
                    lastObject[val] = {}
                }
                lastObject = lastObject[val]
            }
        }
    }
    /**
     * @description 递归获取ref对象
     * @param name ref名称
     * @param vueInstance vue内置对象
     * @returns ref对象
     */
    static getRef(name, vueInstance) {
        const startTime = new Date().getTime()
        //判断组件是否可穿透获取ref
        const injectable = ref => {
            return ref.$options?.btpInject || false
        }
        const formatRef = refs => {
            return Array.isArray(refs) ? refs[0] : refs
        }
        const findRef = (name, refs) => {
            const ref = refs[name]
            if (ref) {
                return formatRef(ref)
            } else {
                const keys = Object.keys(refs)
                for (let i = 0; i < keys.length; i++) {
                    const child = formatRef(refs[keys[i]])
                    if (injectable(child)) {
                        const refx = findRef(name, child.$refs)
                        if (refx) {
                            return formatRef(refx)
                        }
                    }
                }
            }
            return null
        }
        const findedRef = findRef(name, vueInstance?.refs)
        console.log(`查找组件${name}的ref对象耗时${new Date().getTime() - startTime}毫秒`)
        return findedRef
    }
}

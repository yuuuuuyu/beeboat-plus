import { reactive } from 'vue'

export default class BTPBaseViewContext {
    /**
     * @description 页面配置模型
     */
    public viewModel: any

    /**
     * @description 双向绑定数据
     */
    public dataModel: any

    /**
     * @description 双向绑定数据代理
     */
    public dataModelProxy: ProxyConstructor

    constructor() {
        this.viewModel = this.initViewModel()
        this.dataModel = this.initDataModel()
        this.dataModelProxy = this.initDataModelProxy(this.dataModel)
    }

    /**
     * @description 初始化视图配置模型
     * @returns 配置
     */
    initViewModel(): any {
        return reactive({ components: [] })
    }

    /**
     * @description 构建视图的V-Model数据
     */
    initDataModel(): any {
        return reactive({})
    }

    /**
     * @description 构建视图的V-Model数据代理
     */
    initDataModelProxy(dataModel: any): ProxyConstructor {
        return new Proxy(dataModel, {
            get(target, key: string) {
                if (key == '__v_isRef') {
                    return false
                }
                let lastObject = target
                const keys = key.split('.')

                for (let i = 0; i < keys.length; i++) {
                    const val = keys[i]
                    if (i == keys.length - 1) {
                        return lastObject[val]
                    } else {
                        if (!Reflect.has(lastObject, val)) {
                            lastObject[val] = {}
                        } else {
                            lastObject = lastObject[val]
                        }
                    }
                }
                return null
            },
            set(target, key: string, value) {
                let lastObject = target
                const keys = key.split('.')

                for (let i = 0; i < keys.length; i++) {
                    const val = keys[i]
                    if (i == keys.length - 1) {
                        lastObject[val] = value
                    } else {
                        if (!Reflect.has(lastObject, val)) {
                            lastObject[val] = {}
                        } else {
                            lastObject = lastObject[val]
                        }
                    }
                }
                return true
            },
        })
    }
}

import { cloneDeep } from 'lodash'
import BTPViewContext from './view-context'
import BTPDialogViewContext from './dialog-view-context'
import BTPUtils from '../utils-ex/utils-ex'

export default class BTPGlobalAppManager {
    layoutView = null as any
    components = [] as any
    page = {} as any

    viewContext = {} as any

    /**
     * 注册组件
     */
    register(pageUid: String, componentUid: String, component: Object): void {
        this.components.push({
            pageUid: pageUid,
            componentUid: componentUid,
            component: component,
        })
    }

    /**
     * 注册页面
     * @param pageUid
     * @param component
     */
    registerPage(pageUid: any, component: Object): void {
        this.page[pageUid] = component
    }

    registerViewContext(pageUid: any, contextClazz): void {
        this.viewContext[pageUid] = contextClazz
    }

    createViewContext(
        vueInstance?: any,
        viewId?: string,
        viewModelId?: string,
        dialogMode = false,
        parentViewContext?: any,
    ) {
        const realViewId = viewId || vueInstance.type.props.viewId
        if (realViewId && this.viewContext[realViewId]) {
            return new this.viewContext[realViewId](
                vueInstance,
                realViewId,
                viewModelId,
                parentViewContext,
            )
        } else {
            if (dialogMode) {
                return new BTPDialogViewContext(
                    vueInstance,
                    realViewId,
                    viewModelId,
                    parentViewContext,
                )
            } else {
                return new BTPViewContext(vueInstance, realViewId, viewModelId, parentViewContext)
            }
        }
    }

    /**
     * @description 获取网关地址
     * @returns 网关地址
     */
    public getGatewayUrl(): String {
        return BTPUtils.getApp().getEnv('VITE_GATEWAY_URL')
    }

    /**
     * @description 获取页面信息
     * @param pageUid 页面标识
     * @param pageConfigId 页面配置
     * @returns 页面对象
     */
    getPage(viewId: any, viewModelId: any) {
        const data = cloneDeep(this.page[viewId] || this.layoutView)
        data.props = data.props || {}
        data.props.viewId = viewId
        data.props.viewModelId = viewModelId

        return data
    }

    getView(viewModelId: string): any {
        const url = `${this.getGatewayUrl()}runtime/api/view/config?id=${viewModelId}`
        return new Promise(resolve => {
            fetch(url, { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    resolve(data.data)
                })
        })
    }

    /**
     * @description 获取远程路由数据
     * @returns 路由数据
     */
    loadRemoteRouteData(): Promise<any> {
        //服务ID
        const serviceId = BTPUtils.getApp().getEnv('VITE_APP_ID')
        //拼接地址
        const url = `${this.getGatewayUrl()}runtime/api/route/tree?serviceId=${serviceId}`

        return new Promise(resolve => {
            fetch(url, { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    resolve(data.data)
                })
        })
    }

    /**
     * @description 获取系统全部接口数据
     */
    loadMethodList(): Promise<any> {
        //项目ID
        const solutionId = BTPUtils.getApp().getEnv('VITE_MAIN_APP_ID')
        //拼接地址
        const url = `${this.getGatewayUrl()}runtime/api/method/list?solutionId=${solutionId}`
        return new Promise(resolve => {
            fetch(url, { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    resolve(data.data)
                })
        })
    }

    /**
     * @description 将组件树转换成组件列表
     * @param componentList 组件树
     * @returns 组件列表
     */
    parseComponentList(componentList: any): Array<any> {
        if (!componentList) {
            return []
        }
        const datas = [] as any
        datas.push(...componentList)
        componentList.forEach(element => {
            datas.push(...this.parseComponentList((element && element.children) || []))
            if (element.toolbar?.children) {
                datas.push(...this.parseComponentList(element.toolbar?.children))
            }
            if (element.advsearchbar?.children) {
                datas.push(...this.parseComponentList(element.advsearchbar?.children))
            }
            if (element.dock?.children) {
                datas.push(...this.parseComponentList(element.dock?.children))
            }
            if (element.dockcontent?.children) {
                datas.push(...this.parseComponentList(element.dockcontent?.children))
            }
        })
        return datas
    }
}

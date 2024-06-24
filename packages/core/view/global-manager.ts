import { cloneDeep } from 'lodash'
import BTPViewContext from './view-context'
import BTPDialogViewContext from './dialog-view-context'

export default class BTPGlobalAppManager {
    static DYNAMIC_VIEW = undefined as any
    static components = [] as any
    static page = {} as any

    static viewContext = {} as any

    static handler = undefined as any

    static registerHandler(handler){
        this.handler = handler
    }

    /**
     * 注册组件
     */
    static register(pageUid: String, componentUid: String, component: Object): void {
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
    static registerPage(pageUid: any, component: Object): void {
        this.page[pageUid] = component
    }

    static registerViewContext(pageUid: any, contextClazz): void {
        this.viewContext[pageUid] = contextClazz
    }

    static createViewContext(
        vueInstance?: any,
        viewId?: string,
        viewModelId?: string,
        dialogMode = false,
        parentViewContext?: any,
    ) {
        const realViewId = viewId || vueInstance.type.props.viewId
        if (realViewId && this.viewContext[realViewId]) {
            return this.viewContext[realViewId].createInstance(
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
     * @description 获取页面信息
     * @param pageUid 页面标识
     * @param pageConfigId 页面配置
     * @returns 页面对象
     */
    static getPage(viewId: any, viewModelId: any) {
        const data = cloneDeep(this.page[viewId] || this.DYNAMIC_VIEW)
        data.props = data.props || {}
        data.props.viewId = viewId
        data.props.viewModelId = viewModelId

        return data
    }

    static getView(viewModelId: string): any {
        return this.handler.getView(viewModelId)
    }

    /**
     * @description 将组件树转换成组件列表
     * @param componentList 组件树
     * @returns 组件列表
     */
    static parseComponentList(componentList: any): Array<any> {
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

    static getHandler(){
        return this.handler
    }
}

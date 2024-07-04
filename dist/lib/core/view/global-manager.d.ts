export default class BTPGlobalAppManager {
    layoutView: any;
    components: any;
    page: any;
    viewContext: any;
    /**
     * 注册组件
     */
    register(pageUid: String, componentUid: String, component: Object): void;
    /**
     * 注册页面
     * @param pageUid
     * @param component
     */
    registerPage(pageUid: any, component: Object): void;
    registerViewContext(pageUid: any, contextClazz: any): void;
    createViewContext(vueInstance?: any, viewId?: string, viewModelId?: string, dialogMode?: boolean, parentViewContext?: any): any;
    /**
     * @description 获取网关地址
     * @returns 网关地址
     */
    getGatewayUrl(): String;
    /**
     * @description 获取页面信息
     * @param pageUid 页面标识
     * @param pageConfigId 页面配置
     * @returns 页面对象
     */
    getPage(viewId: any, viewModelId: any): any;
    getView(viewModelId: string): any;
    /**
     * @description 获取远程路由数据
     * @returns 路由数据
     */
    loadRemoteRouteData(): Promise<any>;
    /**
     * @description 获取系统全部接口数据
     */
    loadMethodList(): Promise<any>;
    /**
     * @description 将组件树转换成组件列表
     * @param componentList 组件树
     * @returns 组件列表
     */
    parseComponentList(componentList: any): Array<any>;
}

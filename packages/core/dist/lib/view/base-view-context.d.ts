export default class BTPBaseViewContext {
    /**
     * @description 页面配置模型
     */
    viewModel: any;
    /**
     * @description 双向绑定数据
     */
    dataModel: any;
    /**
     * @description 双向绑定数据代理
     */
    dataModelProxy: ProxyConstructor;
    constructor();
    /**
     * @description 初始化视图配置模型
     * @returns 配置
     */
    initViewModel(): any;
    /**
     * @description 构建视图的V-Model数据
     */
    initDataModel(): any;
    /**
     * @description 构建视图的V-Model数据代理
     */
    initDataModelProxy(dataModel: any): ProxyConstructor;
}

import BTPViewContext from './view-context';
export default class BTPDialogViewContext extends BTPViewContext {
    constructor(vueInstance?: any, viewId?: string, viewModelId?: string, parentViewContext?: any);
    /**
     * @description 创建视图的ViewContext对象
     * @param vueInstance 实例
     * @param viewId 视图ID
     * @param viewModelId 视图配置ID
     * @param parentViewContext 上级页面
     * @returns 对象
     */
    static createInstance(vueInstance?: any, viewId?: string, viewModelId?: string, parentViewContext?: any): any;
    getDialogRef(): any;
    openDialog(): void;
    closeDialog(): void;
    getExpose(): any;
}

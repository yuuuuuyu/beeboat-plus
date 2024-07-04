import { ComponentInternalInstance } from 'vue';
import BTPBaseViewContext from './base-view-context';
export default class BTPViewContext extends BTPBaseViewContext {
    /**
     * VUE组件实例对象
     */
    vueInstance?: ComponentInternalInstance;
    /**
     * @description 父级页面对象
     */
    parentViewContext: any;
    /**
     * 视图唯一ID
     */
    viewId: string;
    /**
     * 视图模型唯一ID
     */
    viewModelId: string;
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
    /**
     * 获取Ref对象引用
     * @param name ref名称
     * @returns 实例
     */
    getRef(name: any): any;
    /**
     * 获取暴露方法
     * @returns 暴露方法
     */
    getExpose(): any;
    /**
     * 绘制组件对象
     * @param component 组件信息
     * @returns 组件
     */
    render(component: any): any;
    /**
     * 绘制组件对象
     * @param component 组件信息
     * @returns 组件
     */
    buildView(data: any): void;
    buildProps(data: any): void;
    buildDataModel(data: any): void;
    buildEvents(components: any): void;
    executeAction(executor: any): any;
}

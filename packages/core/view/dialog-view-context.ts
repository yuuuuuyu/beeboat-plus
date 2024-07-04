import BTPViewContext from './view-context'

export default class BTPDialogViewContext extends BTPViewContext {
    constructor(vueInstance?: any, viewId?: string, viewModelId?: string, parentViewContext?: any) {
        super(vueInstance, viewId, viewModelId, parentViewContext)
    }

    /**
     * @description 创建视图的ViewContext对象
     * @param vueInstance 实例
     * @param viewId 视图ID
     * @param viewModelId 视图配置ID
     * @param parentViewContext 上级页面
     * @returns 对象
     */
    public static createInstance(
        vueInstance?: any,
        viewId?: string,
        viewModelId?: string,
        parentViewContext?: any,
    ): any {
        return new BTPDialogViewContext(vueInstance, viewId, viewModelId, parentViewContext)
    }

    getDialogRef() {
        return this.getRef(this.viewModel.components[0].props.ref)
    }

    openDialog() {
        this.getDialogRef()?.openDialog()
    }

    closeDialog() {
        console.log('view context close dialog')
    }

    getExpose() {
        return {
            ...super.getExpose(),
            openDialog: () => {
                this.openDialog()
            },
            closeDialog: () => {
                this.closeDialog()
            },
        }
    }
}

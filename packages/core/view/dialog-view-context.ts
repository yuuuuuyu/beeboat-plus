import { nextTick } from 'vue'
import BTPViewContext from './view-context'

export default class BTPDialogViewContext extends BTPViewContext {
    constructor(vueInstance?: any, viewId?: string, viewModelId?: string, parentViewContext?: any) {
        super(vueInstance, viewId, viewModelId, parentViewContext)
    }

    /**
     * @description 初始化视图配置模型
     * @returns 配置
     */
    initViewModel() {
        const viewModel = super.initViewModel()
        viewModel.dialog = { visible: false, title: '' }
        return viewModel
    }
    /**
     * @description 获取弹窗的Ref对象
     */
    getDialogRef() {
        return this.getRef(this.viewModel.components[0].props.ref)
    }

    /**
     * @description 打开弹窗
     * @param title 标题
     * @param params 参数
     */
    openDialog(title = '', params = {}): void {
        this.viewModel.dialog.title = title
        this.viewModel.dialog.visible = true
        if (this.viewModel.components[0].events['onOpenDialog']) {
            nextTick(() => {
                this.viewModel.components[0].events['onOpenDialog'](params)
            })
        }
    }

    /**
     * @description 关闭窗口
     * @param direct 是否直接关闭,不触发关闭事件
     */
    closeDialog(direct: boolean): void {
        this.viewModel.dialog.visible = false
        if (!direct) {
            if (this.viewModel.components[0].events['onCloseDialog']) {
                this.viewModel.components[0].events['onCloseDialog'](direct)
            }
        }
    }

    getExpose() {
        return {
            ...super.getExpose(),
            openDialog: (title = '', params = {}) => {
                this.openDialog(title, params)
            },
            closeDialog: (direct: boolean) => {
                this.closeDialog(direct)
            },
        }
    }
}

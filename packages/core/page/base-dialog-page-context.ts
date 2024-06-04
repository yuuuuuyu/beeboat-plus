import { ComponentInternalInstance } from 'vue'
import BtBasePageContext from './base-page-context'
/**
 * 弹窗页面逻辑处理基类
 * @author Enmaai
 */
export default class BtBaseDialogPageContext extends BtBasePageContext {
    constructor(parentPageContext: any, vueInstance?: ComponentInternalInstance) {
        super(parentPageContext, vueInstance)
        Object.assign(this.viewData, {
            dialogVisible: false,
            dialogTitle: '添加编辑页面',
            dialogParams: {},
        })
        // this.viewData.dialogVisible = false
        // this.viewData.dialogTitle = '添加编辑页面'
        // this.viewData.dialogParams = {}
    }

    getExpose(): any {
        return Object.assign(super.getExpose(), {
            openDialog: this.openDialog,
            closeDialog: this.closeDialog,
        })
    }

    /**
     * 打开弹窗页面
     * @param params 参数
     */
    openDialog = (params = {}): void => {
        this.onOpenDialog(params)
    }

    /**
     * [可重写]打开弹窗页面
     * @param params 参数
     */
    onOpenDialog(params): void {
        this.viewData.dialogVisible = true
        console.log(params)
    }

    /**
     * 关闭页面
     * @param params 参数
     */
    closeDialog = (params = {}): void => {
        this.onCloseDialog(params)
    }

    /**
     * [可重写]关闭页面
     * @param params 参数
     */
    onCloseDialog(params = {}): void {
        this.viewData.dialogVisible = false
        this.viewData.dialogParams = params || {}
        console.log(params)
    }

    /**
     * 弹框的取消按钮点击事件
     */
    dialogCancelBtnClick = () => {
        this.onDialogCancelBtnClick()
    }

    /**
     * [可重写]弹框的取消按钮点击事件
     */
    onDialogCancelBtnClick() {
        this.closeDialog()
    }
    /**
     * 弹框的保存按钮点击事件
     */
    dialogSaveBtnClick = () => {
        this.onDialogSaveBtnClick()
    }

    /**
     * [可重写]弹框的保存按钮点击事件
     */
    onDialogSaveBtnClick() {
        this.closeDialog()
    }

    /**
     * 弹窗关闭前事件
     */
    dialogBeforeClose = () => {
        this.onDialogBeforeClose()
    }
    /**
     * [可重写]弹窗关闭前事件
     */
    onDialogBeforeClose() {
        console.log('onDialogBeforeClose')
        this.reset()
    }
}

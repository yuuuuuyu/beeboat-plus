import { ComponentInternalInstance } from 'vue'
import { ElMessage } from 'element-plus'
import BtDialogPageContext from './base-dialog-page-context'
/**
 * 弹窗页面逻辑处理基类
 * @author Enmaai
 */
export default class BtPickerDialogPageContext extends BtDialogPageContext {
    /**
     * 回调函数
     */
    public callbackFunction: Function = (selection: any) => {
        console.log(selection)
    }

    /**
     * 数据源组件Ref标识
     */
    public datasourceRefId: String = ''

    /**
     * 数据选择模式
     */
    public selectionMode: String = 'multiple'

    /**
     * 值属性
     */
    public valueProps: any = 'id'

    /**
     * 显示文本属性
     */
    public textValueProps: any = 'name'

    constructor(parentPageContext: any, vueInstance?: ComponentInternalInstance) {
        super(parentPageContext, vueInstance)
    }

    /**
     * [不可重写]打开弹窗
     * @param callback 回调
     */
    openDialogForPickData = (callback: Function) => {
        this.callbackFunction = callback
        this.openDialog({}, this.dialogData.dialogTitle, this.dialogData.dialogType)
    }

    /**
     * [可重写]关闭弹窗
     * @param immediate 立即关闭不触发Before方法
     */
    pickData = (immediate: Boolean) => {
        if (this.datasourceRefId) {
            const selection = this.getRef(this.datasourceRefId).getSelection()
            if (selection?.length == 0) {
                ElMessage({
                    message: '未选择数据',
                    type: 'warning',
                })
                return
            }
            if (this.selectionMode == 'single' && selection.length > 1) {
                ElMessage({
                    message: '请选择一条数据',
                    type: 'warning',
                })
                return
            }
            if (this.callbackFunction) {
                this.callbackFunction(this.getValue(selection), this.getText(selection))
            }
            this.closeDialog(immediate)
        } else {
            ElMessage({
                message: '系统异常，未绑定数据源组件',
                type: 'error',
            })
        }
    }

    getText(selection: any) {
        const texts = [] as any
        selection.forEach((item: any) => {
            texts.push(item[this.textValueProps])
        })
        return texts.join(',')
    }

    getValue(selection: any) {
        const values = [] as any
        selection.forEach((item: any) => {
            values.push(item[this.valueProps])
        })
        return values.join(',')
    }

    /**
     * [可重写]获取暴露方法
     * @returns 暴露的方法对象
     */
    getExpose(): any {
        return {
            ...super.getExpose(),
            openDialogForPickData: this.openDialogForPickData,
            pickData: this.pickData,
        }
    }
}

import { reactive, ComponentInternalInstance } from 'vue'
import BtPageContext from './base-page-context'
/**
 * 弹窗页面逻辑处理基类
 * @author Enmaai
 */
export default class BtDialogPageContext extends BtPageContext {
    /**
     * 弹窗页面数据对象
     */
    public dialogData = reactive({
        /**标题 */
        dialogTitle: '' as String,
        /**是否显示 */
        dialogVisible: false,
        /**弹窗类型 add/edit/view */
        dialogType: 'view' as String,
    })

    /**
     * 构造函数
     * @param pageContext 上级页面上下文
     * @param vueInstance 当前组件实例
     */
    constructor(parentPageContext: any, vueInstance?: ComponentInternalInstance) {
        super(parentPageContext, vueInstance)
    }
    /**
     * [不可重写]打开弹窗
     * @param _params 参数
     * @param title 标题
     */
    openDialog = (_params: any, title: String, type: String) => {
        this.onOpenDialog(_params, title, type)
    }

    /**
     * [可重写]打开弹窗
     * @param _params 参数
     * @param title 标题
     */
    onOpenDialog(_params: any, title: String, type: String): void {
        this.dialogData.dialogVisible = true
        this.dialogData.dialogTitle = title || ''
        this.dialogData.dialogType = type || 'view'
        Object.keys(this.ctxMap).forEach(key => {
            const componentCTX = this.ctxMap[key]
            if (componentCTX && componentCTX.loadComponentData) {
                let loadTimer = 0
                const timer = setInterval(() => {
                    loadTimer++
                    if (loadTimer > 100) {
                        console.error('组件加载超时,请查看代码')
                        clearInterval(timer)
                    } else {
                        if (componentCTX.vueInstance && componentCTX.vueInstance.isMounted) {
                            componentCTX.loadComponentData(_params)
                            clearInterval(timer)
                        }
                    }
                }, 1)
            }
        })
    }

    /**
     * [可重写]关闭弹窗
     * @param immediate 立即关闭不触发Before方法
     */
    closeDialog = (immediate: Boolean) => {
        if (immediate || this.onBeforeCloseDialog()) {
            this.dialogData.dialogVisible = false
            this.dialogData.dialogTitle = ''
        }
    }

    /**
     * [不可重写]点击右上角X号事件
     * @param done 关闭回调
     */
    dialogBeforeClose = (done: Function) => {
        if (this.onBeforeCloseDialog() && done) {
            done.apply(this)
        }
    }

    /**
     * [可重写]关闭弹窗之前执行
     * 可以进行数据是否修改等操作的校验
     * @returns 是否可以关闭弹窗
     */
    onBeforeCloseDialog(): Boolean {
        return true
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
        Object.keys(this.ctxMap).forEach(key => {
            this.ctxMap[key]?.submit()
        })
    }

    /**
     * 弹窗取消按钮点击事件
     */
    dialogCancelBtnClick() {
        this.closeDialog(true)
    }

    /**
     * [可重写]获取暴露方法
     * @returns 暴露的方法对象
     */
    getExpose(): any {
        return {
            openDialog: this.openDialog,
            closeDialog: this.closeDialog,
        }
    }
}

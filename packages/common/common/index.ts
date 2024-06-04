import { ElMessageBox } from 'element-plus/es'
/**
 * MessageBox 帮助类
 */
export class BtCommon {
    /**
     * 弹出确认框
     * @param content 消息内容
     * @param callback 回调函数
     */
    static confirm(content: string, callback: Function): void {
        this.confirmEx('警告', content, callback)
    }

    /**
     * 弹出确认框
     * @param title 标题
     * @param content 消息内容
     * @param callback 回调函数
     */
    static confirmEx(title: string, content: string, callback: Function): void {
        ElMessageBox.confirm(content, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                if (callback) {
                    callback(true)
                }
            })
            .catch(() => {
                if (callback) {
                    callback(false)
                }
            })
    }
}

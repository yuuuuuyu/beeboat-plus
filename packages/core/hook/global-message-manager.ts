import { ElMessage } from 'element-plus'

/**
 * 全局消息弹窗管理对象
 */
export default class BTPAppMessageBoxManager {
    /**
     * 显示消息<如果指定了options,则会忽略message和type参数>
     * @param message 消息文本
     * @param type 消息类型
     * @param options 详细参数
     */
    message(message: any, type: any, options = null as any): void {
        if(options) {
            ElMessage(options)
        }else{
            ElMessage({
                message:message,
                type:type,
            })
        }
    }
}

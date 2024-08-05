import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import type {
    ElMessageBoxOptions,
    MessageBoxData,
    MessageParams,
    NotificationParams,
    NotificationHandle,
} from 'element-plus'
import type { AppContext, VNode } from 'vue'
import { BtpMessageBoxOptions } from './mount-function2class'

/**
 * 全局消息弹窗管理对象
 */
export default class BTPAppMessageBoxManager {
    MessageTypes = [
        'success',
        'info',
        'warning',
        'error',
        'confirm',
        'alert',
        'prompt',
        'close',
        'cancel',
    ]
    /**
     * ElMessage同款options配置
     * @param options
     * @param appContext
     */
    message(options?: MessageParams, appContext?: null | AppContext): void {
        options && ElMessage(options)
    }

    /**
     * ElMessageBox同款options配置
     * @param message
     * @param title
     * @param options
     * @param appContext
     * @returns
     */
    messageBox(
        message?: undefined | string | VNode,
        title?: string | ElMessageBoxOptions,
        options?: BtpMessageBoxOptions,
        appContext?: AppContext | null,
    ): Promise<MessageBoxData> | void {
        if (this.MessageTypes.includes((options?.messageType as any) || '')) {
            return (
                options?.messageType &&
                ElMessageBox[options?.messageType](message, title, options, appContext)
            )
        } else {
            // ElMessageBox默认调用confirm
            if (arguments.length === 1) {
                return ElMessageBox(arguments[0] as ElMessageBoxOptions)
            }
        }
    }

    /**
     * ElNotification同款配置
     * @param options
     * @returns
     */
    notification(options?: NotificationParams): NotificationHandle | undefined | '' {
        return options ? ElNotification(options) : void 0
    }
}

import BTPUtils from '../utils/btp-utils'
import type { AppContext, ComponentPublicInstance, VNode } from 'vue'
import type { ElMessageBoxOptions, MessageParams, messageType } from 'element-plus'
import { ElMessageBox, messageTypes } from 'element-plus'
import { isObject } from '../utils'

export const MessageTypes: messageType[] = ['success', 'info', 'warning', 'error']
MessageTypes.forEach((type: string) => {
    /**
     * 为Message挂载['success', 'info', 'warning', 'error']方法，提供简便方式
     * @param message
     * @returns
     */
    BTPUtils.message[type] = (message: string) => {
        return BTPUtils.getMessageCtrl().message({ type: type as messageType, message: message })
    }

    /**
     * 为Notification挂载['success', 'info', 'warning', 'error']方法，提供简便方式
     * @param options
     * @returns
     */
    BTPUtils.notification[type] = (options: string | object) => {
        options =
            (!isObject(options) && {
                type: type as messageType,
                message: options,
            }) ||
            Object.assign(options, { type })
        return BTPUtils.getMessageCtrl().notification(options)
    }
})

export interface BtpMessageBoxOptions extends ElMessageBoxOptions {
    messageType?: string
}
export const MessageBoxTypes = ['confirm', 'alert', 'prompt', 'close', 'cancel']
MessageBoxTypes.forEach(messageType => {
    /**
     * 为MessageBox挂载['confirm', 'alert', 'prompt']方法，提供简便方式
     * @param message
     * @param title
     * @param options
     * @param appContext
     * @returns
     */
    BTPUtils.messageBox[messageType] = (
        message: string | VNode,
        title: string | ElMessageBoxOptions,
        options?: BtpMessageBoxOptions,
        appContext?: AppContext | null,
    ) => {
        options = Object.assign(options || {}, { messageType })
        return BTPUtils.getMessageCtrl().messageBox(message, title, options, appContext)
    }
})

export default BTPUtils

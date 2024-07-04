"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_plus_1 = require("element-plus");
/**
 * 全局消息弹窗管理对象
 */
class BTPAppMessageBoxManager {
    /**
     * 显示消息<如果指定了options,则会忽略message和type参数>
     * @param message 消息文本
     * @param type 消息类型
     * @param options 详细参数
     */
    message(message, type, options = null) {
        if (options) {
            (0, element_plus_1.ElMessage)(options);
        }
        else {
            (0, element_plus_1.ElMessage)({
                message: message,
                type: type
            });
        }
    }
}
exports.default = BTPAppMessageBoxManager;

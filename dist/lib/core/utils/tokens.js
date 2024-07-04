"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.btFormItemContextKey = exports.btFormContextKey = exports.splitterContextKey = void 0;
/**
 * 容器间隙key
 */
exports.splitterContextKey = Symbol('splitterContextKey');
// interface BtFormContext {
//     columns: ComputedRef<number>
//     inline: ComputedRef<boolean>
// }
// export const btFormContextKey: InjectionKey<BtFormContext> = Symbol('btFormContextKey')
/**
 * BtForm表单组件key
 */
exports.btFormContextKey = Symbol('btFormContextKey');
/**
 * BtFormItem表单组件key
 */
exports.btFormItemContextKey = Symbol('btFormItemContextKey');

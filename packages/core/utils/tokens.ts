import type { ComputedRef, InjectionKey } from 'vue'
interface SplitterContext {
    gutter: ComputedRef<number>
    mode?: ComputedRef<'horizontal' | 'vertical'>
}

/**
 * 容器间隙key
 */
export const splitterContextKey: InjectionKey<SplitterContext> = Symbol('splitterContextKey')

// interface BtFormContext {
//     columns: ComputedRef<number>
//     inline: ComputedRef<boolean>
// }
// export const btFormContextKey: InjectionKey<BtFormContext> = Symbol('btFormContextKey')
/**
 * BtForm表单组件key
 */
export const btFormContextKey: InjectionKey<Record<string, any>> = Symbol('btFormContextKey')

/**
 * BtFormItem表单组件key
 */
export const btFormItemContextKey: InjectionKey<Record<string, any>> =
    Symbol('btFormItemContextKey')

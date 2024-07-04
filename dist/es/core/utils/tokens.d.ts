import type { ComputedRef, InjectionKey } from 'vue';
interface SplitterContext {
    gutter: ComputedRef<number>;
    mode?: ComputedRef<'horizontal' | 'vertical'>;
}
/**
 * 容器间隙key
 */
export declare const splitterContextKey: InjectionKey<SplitterContext>;
/**
 * BtForm表单组件key
 */
export declare const btFormContextKey: InjectionKey<Record<string, any>>;
/**
 * BtFormItem表单组件key
 */
export declare const btFormItemContextKey: InjectionKey<Record<string, any>>;
export {};

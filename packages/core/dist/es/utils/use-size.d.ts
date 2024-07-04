import { InjectionKey } from 'vue';
export interface SizeContext {
    size: any;
}
export declare const SIZE_INJECTION_KEY: InjectionKey<SizeContext>;
export declare const useGlobalSize: () => import("vue").ComputedRef<any>;

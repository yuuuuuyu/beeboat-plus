import type { Directive } from 'vue';
import type { AppContext, Plugin } from 'vue';
export type SFCWithInstall<T> = T & Plugin;
export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
    _context: AppContext | null;
};
/**
 * 定义withInstall方法处理以下组件类型问题
 * @param main
 * @param extra
 * @returns
 */
export declare const withInstall: <T, E extends Record<string, any>>(main: T, extra?: E) => SFCWithInstall<T> & E;
export declare const withInstallFunction: <T>(fn: T, name: string) => SFCInstallWithContext<T>;
export declare const withInstallDirective: <T extends Directive<any, any>>(directive: T, name: string) => SFCWithInstall<T>;

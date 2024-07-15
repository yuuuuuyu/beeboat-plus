/* eslint-disable @typescript-eslint/no-extra-semi */

import type { App, Directive } from 'vue'
import type { AppContext, Plugin } from 'vue'

// 类型必须导出否则生成不了.d.ts文件
export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
    _context: AppContext | null
}
/**
 * 定义withInstall方法处理以下组件类型问题
 * @param main
 * @param extra
 * @returns
 */
export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
    ;(main as SFCWithInstall<T>).install = (app): void => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            app.component(comp.name, comp)
        }
    }

    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            ;(main as any)[key] = comp
        }
    }
    return main as SFCWithInstall<T> & E
}

export const withInstallFunction = <T>(fn: T, name: string) => {
    ;(fn as SFCWithInstall<T>).install = (app: App) => {
        ;(fn as SFCInstallWithContext<T>)._context = app._context
        app.config.globalProperties[name] = fn
    }

    return fn as SFCInstallWithContext<T>
}

export const withInstallDirective = <T extends Directive>(directive: T, name: string) => {
    ;(directive as SFCWithInstall<T>).install = (app: App): void => {
        app.directive(name, directive)
    }

    return directive as SFCWithInstall<T>
}

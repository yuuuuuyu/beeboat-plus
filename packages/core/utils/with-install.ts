import type { App, Directive, AppContext, Plugin } from 'vue'

// 类型必须导出否则生成不了.d.ts文件
export type SFCWithInstall<T> = T & Plugin
export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
    _context: AppContext | null
}

/**
 * 注册组件
 * @param main
 * @param extra
 * @returns
 */
export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
    (main as SFCWithInstall<T>).install = (app): void => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            app.component(comp.name, comp)
        }
    }
    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            (main as any)[key] = comp
        }
    }
    return main as SFCWithInstall<T> & E
}

/**
 * 注册函数
 * @param fn
 * @param name
 * @returns
 */
export const withInstallFunction = <T>(fn: T, name: string) => {
    (fn as SFCWithInstall<T>).install = (app: App) => {
        (fn as SFCInstallWithContext<T>)._context = app._context
        app.config.globalProperties[name] = fn
    }
    return fn as SFCInstallWithContext<T>
}

/**
 * 注册指令
 * @param directive
 * @param name
 * @returns
 */
export const withInstallDirective = <T extends Directive>(directive: T, name: string) => {
    (directive as SFCWithInstall<T>).install = (app: App): void => {
        app.directive(name, directive)
    }
    return directive as SFCWithInstall<T>
}

/**
 * installer构造
 * @param components
 * @returns
 */
export const makeInstaller = (components: Plugin[] = []) => {
    const install = (app: App) => {
        components.forEach(c => app.use(c))
    }
    return {
        install,
    }
}

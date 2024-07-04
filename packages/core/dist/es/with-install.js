/* eslint-disable @typescript-eslint/no-extra-semi */
/**
 * 定义withInstall方法处理以下组件类型问题
 * @param main
 * @param extra
 * @returns
 */
export const withInstall = (main, extra) => {
    ;
    main.install = (app) => {
        for (const comp of [main, ...Object.values(extra !== null && extra !== void 0 ? extra : {})]) {
            app.component(comp.name, comp);
        }
    };
    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            ;
            main[key] = comp;
        }
    }
    return main;
};
export const withInstallFunction = (fn, name) => {
    ;
    fn.install = (app) => {
        ;
        fn._context = app._context;
        app.config.globalProperties[name] = fn;
    };
    return fn;
};
export const withInstallDirective = (directive, name) => {
    ;
    directive.install = (app) => {
        app.directive(name, directive);
    };
    return directive;
};

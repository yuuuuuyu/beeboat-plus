"use strict";
/* eslint-disable @typescript-eslint/no-extra-semi */
Object.defineProperty(exports, "__esModule", { value: true });
exports.withInstallDirective = exports.withInstallFunction = exports.withInstall = void 0;
/**
 * 定义withInstall方法处理以下组件类型问题
 * @param main
 * @param extra
 * @returns
 */
const withInstall = (main, extra) => {
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
exports.withInstall = withInstall;
const withInstallFunction = (fn, name) => {
    ;
    fn.install = (app) => {
        ;
        fn._context = app._context;
        app.config.globalProperties[name] = fn;
    };
    return fn;
};
exports.withInstallFunction = withInstallFunction;
const withInstallDirective = (directive, name) => {
    ;
    directive.install = (app) => {
        app.directive(name, directive);
    };
    return directive;
};
exports.withInstallDirective = withInstallDirective;

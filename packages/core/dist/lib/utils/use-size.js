"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobalSize = exports.SIZE_INJECTION_KEY = void 0;
const vue_1 = require("vue");
exports.SIZE_INJECTION_KEY = Symbol('size');
const useGlobalSize = () => {
    const injectedSize = (0, vue_1.inject)(exports.SIZE_INJECTION_KEY, {});
    return (0, vue_1.computed)(() => {
        return (0, vue_1.unref)(injectedSize.size) || '';
    });
};
exports.useGlobalSize = useGlobalSize;

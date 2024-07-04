"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEverBaseCss = void 0;
const utils_1 = require("../utils");
function getEverBaseCss(config) {
    let textCss = '';
    for (const key in config) {
        if (typeof config[key] == 'object') {
            for (const k in config[key]) {
                textCss += `--ever-${(0, utils_1.formatToLine)(key, '-')}-${(0, utils_1.formatToLine)(k, '-')}: ${config[key][k]};`;
            }
        }
    }
    return textCss;
}
exports.getEverBaseCss = getEverBaseCss;

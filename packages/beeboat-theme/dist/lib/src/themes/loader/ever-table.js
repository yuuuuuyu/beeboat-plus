"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEverTableCss = void 0;
const tinycolor_1 = require("@ctrl/tinycolor");
function getEverTableCss(config) {
    const color1 = new tinycolor_1.TinyColor(config.color.primary);
    const color2 = new tinycolor_1.TinyColor(config.color.white);
    let cssText = '';
    cssText += `
            --ever-table-color-head-bg: ${color1.mix(color2, 92).toHexString()};
            `;
    return cssText;
}
exports.getEverTableCss = getEverTableCss;

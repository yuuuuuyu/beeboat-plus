"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEverLayoutVarCss = void 0;
const tinycolor_1 = require("@ctrl/tinycolor");
function getEverLayoutVarCss(config) {
    const colorPrimary = new tinycolor_1.TinyColor(config.color.primary);
    const colorWhite = new tinycolor_1.TinyColor(config.color.white);
    let cssText = '';
    // 大小比例
    const sizeOrg = {
        small: 0.75,
        default: 1,
        large: 1.25,
    };
    // 间隔大小 基数
    const baseSize = 4;
    cssText += `
            --ever-color-bg: ${config.color.gutter};
            --ever-color-bg-head: ${config.color.navBg};
            --ever-color-bg-head-active: ${colorPrimary.mix(colorWhite, 10).toHexString()};
            `;
    for (let i = 1; i <= 20; i++) {
        cssText += `--ever-gap-s${i}: ${i * baseSize * sizeOrg[config.layout.size]}px;`;
    }
    return cssText;
}
exports.getEverLayoutVarCss = getEverLayoutVarCss;

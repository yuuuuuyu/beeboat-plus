"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEverButtonVarCss = void 0;
const utils_1 = require("../utils");
const tinycolor_1 = require("@ctrl/tinycolor");
function getEverButtonVarCss(config) {
    const colorPrimary = new tinycolor_1.TinyColor(config.color.primary);
    const colorWhite = new tinycolor_1.TinyColor(config.color.white);
    let cssText = '';
    // 主按钮
    const everButtonBgColorPrimary = config.color.primary;
    const hoverBgColorPrimary = (0, utils_1.calculationColor)(everButtonBgColorPrimary, 0, 10, -5);
    const activeBgColorPrimary = (0, utils_1.calculationColor)(everButtonBgColorPrimary, 0, 20, -10);
    cssText += `--btp-button-hover-bg-color-primary: ${hoverBgColorPrimary};`;
    cssText += `--btp-button-active-bg-color-primary: ${activeBgColorPrimary};`;
    // 次级按钮
    const buttonSecondaryColor = colorPrimary.mix(colorWhite, 85).toHexString();
    const hoverColorSecondary = (0, utils_1.calculationColor)(buttonSecondaryColor, 0, 10, -5);
    const activeBgColorSecondary = (0, utils_1.calculationColor)(buttonSecondaryColor, 0, 20, -10);
    cssText += `--btp-button-bg-color-secondary: ${buttonSecondaryColor};`;
    cssText += `--btp-button-hover-bg-color-secondary: ${hoverColorSecondary};`;
    cssText += `--btp-button-hover-text-color-secondary: ${hoverColorSecondary};`;
    cssText += `--btp-button-active-bg-color-secondary: ${activeBgColorSecondary};`;
    cssText += `--btp-button-active-text-color-secondary: ${activeBgColorSecondary};`;
    // 警告按钮
    const buttonWarningColor = config.color.warning;
    const hoverColorWarning = (0, utils_1.calculationColor)(buttonWarningColor, 0, 10, -5);
    const activeBgColorWarning = (0, utils_1.calculationColor)(buttonWarningColor, 0, 20, -10);
    cssText += `--btp-button-hover-bg-color-warning: ${hoverColorWarning};`;
    cssText += `--btp-button-active-bg-color-warning: ${activeBgColorWarning};`;
    // 警示按钮
    const buttonDangerColor = config.color.danger;
    const hoverColorDanger = (0, utils_1.calculationColor)(buttonDangerColor, 0, 10, -5);
    const activeBgColorDanger = (0, utils_1.calculationColor)(buttonDangerColor, 0, 20, -10);
    cssText += `--btp-button-hover-bg-color-danger: ${hoverColorDanger};`;
    cssText += `--btp-button-active-bg-color-danger: ${activeBgColorDanger};`;
    // 无效按钮
    const disableBgColor = config.color.buttonDisable;
    cssText += `--btp-button-disabled-bg-color: ${disableBgColor};`;
    return cssText;
}
exports.getEverButtonVarCss = getEverButtonVarCss;

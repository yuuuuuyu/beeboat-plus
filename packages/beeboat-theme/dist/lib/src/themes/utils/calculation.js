"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculationColor = exports.calculationClickColor = exports.calculationHoverColor = void 0;
const color_1 = require("./color");
function calculationHoverColor(color) {
    const rgb = (0, color_1.hexToRGB)(color);
    const hsb = (0, color_1.RGBToHSB)(rgb[0], rgb[1], rgb[2]);
    const rgbNew = (0, color_1.HSBToRGB)(hsb[0], hsb[1] + 10 > 100 ? 100 : hsb[1] + 10, hsb[2] - 5);
    const colorNew = (0, color_1.RGBToHex)(rgbNew[0], rgbNew[1], rgbNew[2]);
    return colorNew;
}
exports.calculationHoverColor = calculationHoverColor;
function calculationClickColor(color) {
    const rgb = (0, color_1.hexToRGB)(color);
    const hsb = (0, color_1.RGBToHSB)(rgb[0], rgb[1], rgb[2]);
    const rgbNew = (0, color_1.HSBToRGB)(hsb[0], hsb[1] + 20 > 100 ? 100 : hsb[1] + 20, hsb[2] - 10);
    const colorNew = (0, color_1.RGBToHex)(rgbNew[0], rgbNew[1], rgbNew[2]);
    return colorNew;
}
exports.calculationClickColor = calculationClickColor;
function calculationColor(color, h = 0, s = 0, b = 0) {
    const rgb = (0, color_1.hexToRGB)(color);
    const hsb = (0, color_1.RGBToHSB)(rgb[0], rgb[1], rgb[2]);
    // 10-17 s和b 值不能大于100
    const rgbNew = (0, color_1.HSBToRGB)(hsb[0] + h, hsb[1] + s > 100 ? 100 : hsb[1] + s, hsb[2] + b > 100 ? 100 : hsb[2] + b);
    const colorNew = (0, color_1.RGBToHex)(rgbNew[0], rgbNew[1], rgbNew[2]);
    return colorNew;
}
exports.calculationColor = calculationColor;

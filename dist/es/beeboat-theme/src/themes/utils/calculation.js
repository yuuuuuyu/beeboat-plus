import { hexToRGB, RGBToHSB, HSBToRGB, RGBToHex } from './color';
export function calculationHoverColor(color) {
    const rgb = hexToRGB(color);
    const hsb = RGBToHSB(rgb[0], rgb[1], rgb[2]);
    const rgbNew = HSBToRGB(hsb[0], hsb[1] + 10 > 100 ? 100 : hsb[1] + 10, hsb[2] - 5);
    const colorNew = RGBToHex(rgbNew[0], rgbNew[1], rgbNew[2]);
    return colorNew;
}
export function calculationClickColor(color) {
    const rgb = hexToRGB(color);
    const hsb = RGBToHSB(rgb[0], rgb[1], rgb[2]);
    const rgbNew = HSBToRGB(hsb[0], hsb[1] + 20 > 100 ? 100 : hsb[1] + 20, hsb[2] - 10);
    const colorNew = RGBToHex(rgbNew[0], rgbNew[1], rgbNew[2]);
    return colorNew;
}
export function calculationColor(color, h = 0, s = 0, b = 0) {
    const rgb = hexToRGB(color);
    const hsb = RGBToHSB(rgb[0], rgb[1], rgb[2]);
    // 10-17 s和b 值不能大于100
    const rgbNew = HSBToRGB(hsb[0] + h, hsb[1] + s > 100 ? 100 : hsb[1] + s, hsb[2] + b > 100 ? 100 : hsb[2] + b);
    const colorNew = RGBToHex(rgbNew[0], rgbNew[1], rgbNew[2]);
    return colorNew;
}

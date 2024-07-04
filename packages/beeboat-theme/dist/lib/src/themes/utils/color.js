"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHSLArray = exports.changeLightness = exports.HSLToRGB = exports.RGBToHSL = exports.HSBToRGB = exports.RGBToHSB = exports.toRGBArray = exports.hexToRGB = exports.toRGBObject = exports.extendHex = exports.RGBToHex = void 0;
//RGB转十六进制
function RGBToHex(r, g, b) {
    r = Number(r.toFixed());
    g = Number(g.toFixed());
    b = Number(b.toFixed());
    return `#${((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')}`;
}
exports.RGBToHex = RGBToHex;
//将 十六进制 3 位颜色扩展为 6 位颜色
function extendHex(shortHex) {
    return `#${shortHex}`
        .slice(shortHex.startsWith('#') ? 1 : 0)
        .split('')
        .map(x => x + x)
        .join('');
}
exports.extendHex = extendHex;
// 将rgb()颜色字符串转换为具有每种颜色值的对象。
function toRGBObject(rgbStr) {
    const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
    return { red, green, blue };
}
exports.toRGBObject = toRGBObject;
//十六进制转RGB
function hexToRGB(hex) {
    let alpha = false;
    let h = hex.slice(hex.startsWith('#') ? 1 : 0);
    if (h.length === 3) {
        h = [...h].map(x => x + x).join('');
    }
    else if (h.length === 8) {
        alpha = true;
    }
    else {
        h = parseInt(h, 16);
    }
    return [
        h >>> (alpha ? 24 : 16),
        (h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8),
        (h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0),
        alpha ? `, ${h & 0x000000ff}` : 1,
    ];
    // return (
    //     "rgb" + (alpha ? "a" : "") +
    //     "(" +
    //         (h >>> (alpha ? 24 : 16)) +
    //     ", " +
    //         ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    //     ", " +
    //         ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    //     (alpha ? `, ${h & 0x000000ff}` : "") +
    //     ")"
    // );
}
exports.hexToRGB = hexToRGB;
//将 rgb()颜色字符串转换为数组
function toRGBArray(rgbStr) {
    return rgbStr.match(/\d+/g).map(Number);
}
exports.toRGBArray = toRGBArray;
// 将 RGB 颜色元组转换为 HSB 格式。
function RGBToHSB(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const v = Math.max(r, g, b);
    const n = v - Math.min(r, g, b);
    const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
    return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
}
exports.RGBToHSB = RGBToHSB;
// 将 HSB 颜色元组转换为 RGB 格式。
function HSBToRGB(h, s, b) {
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return [255 * f(5), 255 * f(3), 255 * f(1)];
}
exports.HSBToRGB = HSBToRGB;
//将 RGB 颜色元组转换为 HSL 格式。
function RGBToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;
    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
    ];
}
exports.RGBToHSL = RGBToHSL;
//将 HSL 颜色元组转换为 RGB 格式。
function HSLToRGB(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
}
exports.HSLToRGB = HSLToRGB;
//更改hsl()颜色字符串的亮度值。
function changeLightness(delta, hslStr) {
    const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
    const newLightness = Math.max(0, Math.min(100, lightness + parseFloat(delta)));
    return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
}
exports.changeLightness = changeLightness;
// 将hsl()颜色字符串转换为值数组。
function toHSLArray(hslStr) {
    return hslStr.match(/\d+/g).map(Number);
}
exports.toHSLArray = toHSLArray;

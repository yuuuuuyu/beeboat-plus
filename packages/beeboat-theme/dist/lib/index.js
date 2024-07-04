"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loader_1 = require("./src/themes/loader");
const theme_1 = require("./src/themes/theme");
/**
 * 添加主题
 */
function addTheme(theme) {
    const themeMap = (0, theme_1.getThemeAll)();
    if (typeof theme != 'object') {
        console.error('主题格式不正确');
        return;
    }
    if (theme.name == undefined) {
        console.error('主题名称不能为空');
        return;
    }
    if (theme.name in themeMap) {
        console.error('主题名称重复请修改');
        return;
    }
    (0, theme_1.setTheme)(theme);
}
/**
 * 初始化
 * @param theme
 */
function start(theme) {
    const themeConfig = (0, theme_1.getTheme)(theme);
    // 加载 css变量
    (0, loader_1.loaderTheme)(themeConfig);
}
/**
 * 切换主题
 * @param theme
 */
function switchTheme(theme) {
    start(theme);
}
/**
 * 获取所有主题
 * @returns Theme.ThemeConfig[]
 */
function getBtTheme() {
    const themMap = (0, theme_1.getThemeAll)();
    const themeArray = [];
    for (const key in themMap) {
        themeArray.push(themMap[key]);
    }
    return themeArray;
}
exports.default = { start, switchTheme, addTheme, getBtTheme };

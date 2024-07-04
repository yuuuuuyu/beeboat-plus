"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTheme = exports.getThemeAll = exports.getTheme = void 0;
const default_1 = require("./default");
const theme1_1 = require("./theme1");
const theme2_1 = require("./theme2");
const theme3_1 = require("./theme3");
const theme5_1 = require("./theme5");
const theme6_1 = require("./theme6");
const themeMap = {
    [default_1.defaultTheme.name]: default_1.defaultTheme,
    [theme1_1.theme1Theme.name]: theme1_1.theme1Theme,
    [theme2_1.theme2Theme.name]: theme2_1.theme2Theme,
    [theme3_1.theme3Theme.name]: theme3_1.theme3Theme,
    [theme5_1.theme5Theme.name]: theme5_1.theme5Theme,
    [theme6_1.theme6Theme.name]: theme6_1.theme6Theme,
};
/**
 * 合并主题
 * @param theme 主题
 * @returns 返回合并完成的主题
 */
function merge(theme) {
    const themeConfig = default_1.defaultTheme;
    themeConfig.name = 'custom';
    for (const key in default_1.defaultTheme.color) {
        if (theme.color && theme.color[key]) {
            default_1.defaultTheme.color[key] = theme.color[key];
        }
    }
    for (const key in default_1.defaultTheme.layout) {
        if (theme.layout && theme.layout[key]) {
            default_1.defaultTheme.layout[key] = theme.layout[key];
        }
    }
    return themeConfig;
}
/**
 * 获取主题
 * @param type
 * @returns
 */
function getTheme(type) {
    let theme = default_1.defaultTheme;
    if (typeof type == 'string' && type in themeMap) {
        theme = themeMap[type];
    }
    return theme;
}
exports.getTheme = getTheme;
/**
 * 添加主题
 * @param theme
 * @returns
 */
function setTheme(theme) {
    const themeConfig = merge(theme);
    themeMap[themeConfig.name] = themeConfig;
}
exports.setTheme = setTheme;
function getThemeAll() {
    return themeMap;
}
exports.getThemeAll = getThemeAll;

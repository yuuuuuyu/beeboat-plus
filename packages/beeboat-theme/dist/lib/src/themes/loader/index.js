"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loaderTheme = void 0;
const element_1 = require("./element");
const btp_button_1 = require("./btp-button");
const ever_layout_1 = require("./ever-layout");
const ever_base_1 = require("./ever-base");
const ever_table_1 = require("./ever-table");
const css_1 = __importDefault(require("../theme/common/css"));
function setCss(text, themeConfig) {
    const id = 'ever-h3-bee-theme';
    const el = document.documentElement;
    const oldStyle = document.getElementById(id);
    if (oldStyle) {
        el.removeChild(oldStyle);
    }
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = id;
    style.textContent = `:root {${text}}`;
    style.textContent += css_1.default;
    style.textContent += `${themeConfig.cssExtra}`;
    el.appendChild(style);
    el.setAttribute('ever-theme', themeConfig.name);
}
function loaderTheme(themeConfig) {
    const el = document.documentElement;
    const themeName = el.getAttribute('ever-theme');
    if (themeName == themeConfig.name) {
        return;
    }
    let cssText = '';
    cssText +=
        (0, element_1.getElementVarCss)(themeConfig) +
            (0, btp_button_1.getEverButtonVarCss)(themeConfig) +
            (0, ever_layout_1.getEverLayoutVarCss)(themeConfig) +
            (0, ever_base_1.getEverBaseCss)(themeConfig) +
            (0, ever_table_1.getEverTableCss)(themeConfig);
    setCss(cssText, themeConfig);
}
exports.loaderTheme = loaderTheme;

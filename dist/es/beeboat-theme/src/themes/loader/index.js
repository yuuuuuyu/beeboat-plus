import { getElementVarCss } from './element';
import { getEverButtonVarCss } from './btp-button';
import { getEverLayoutVarCss } from './ever-layout';
import { getEverBaseCss } from './ever-base';
import { getEverTableCss } from './ever-table';
import commonCss from '../theme/common/css';
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
    style.textContent += commonCss;
    style.textContent += `${themeConfig.cssExtra}`;
    el.appendChild(style);
    el.setAttribute('ever-theme', themeConfig.name);
}
export function loaderTheme(themeConfig) {
    const el = document.documentElement;
    const themeName = el.getAttribute('ever-theme');
    if (themeName == themeConfig.name) {
        return;
    }
    let cssText = '';
    cssText +=
        getElementVarCss(themeConfig) +
            getEverButtonVarCss(themeConfig) +
            getEverLayoutVarCss(themeConfig) +
            getEverBaseCss(themeConfig) +
            getEverTableCss(themeConfig);
    setCss(cssText, themeConfig);
}

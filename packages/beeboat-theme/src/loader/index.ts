import { eleCssVariableGenerator } from './btp-element'
import { buttonCssVariableGenerator } from './btp-button'
import { layoutCssVariableGenerator } from './btp-layout'
import { baseCssVariableGenerator } from './btp-base'
import { tableCssVariableGenerator } from './btp-table'

// TODO 考虑是否有必要存在
import commonCss from '../theme/common/css'

/**
 * 设置主题对应的css变量
 * @param text
 * @param themeConfig
 */
function setCss(text: string, themeConfig: Theme.ThemeConfig) {
    const id = 'ever-h3-bee-theme'
    const el = document.documentElement

    const oldStyle = document.getElementById(id)
    if (oldStyle) {
        el.removeChild(oldStyle)
    }
    const style = document.createElement('style')
    style.type = 'text/css'
    style.id = id
    style.textContent = `:root {${text}}`
    style.textContent += commonCss
    style.textContent += `${themeConfig.cssExtra}`
    el.appendChild(style)
    el.setAttribute('ever-theme', themeConfig.name)
}

/**
 * 加载主题相关变量
 * @param themeConfig 主题配置信息
 * @returns
 */
export function loaderTheme(themeConfig: Theme.ThemeConfig): void {
    const el = document.documentElement
    const themeName = el.getAttribute('ever-theme')
    if (themeName == themeConfig.name) {
        return
    }

    let cssText = ''
    cssText +=
        eleCssVariableGenerator(themeConfig) +
        buttonCssVariableGenerator(themeConfig) +
        layoutCssVariableGenerator(themeConfig) +
        baseCssVariableGenerator(themeConfig) +
        tableCssVariableGenerator(themeConfig)

    setCss(cssText, themeConfig)
}

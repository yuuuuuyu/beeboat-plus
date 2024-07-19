import { TinyColor } from '@ctrl/tinycolor'

/**
 * 表格Css变量生成器
 * @param config 主题配置信息
 * @returns
 */
// TODO 主题包btp-table类动态生成，替代scss下的variable.scss
function tableCssVariableGenerator(config: Theme.ThemeConfig): string {
    const color1 = new TinyColor(config.color.primary)
    const color2 = new TinyColor(config.color.white)
    let cssText = ''
    cssText += `
            --btp-table-color-head-bg: ${color1.mix(color2, 92).toHexString()};
            `
    return cssText
}

export { tableCssVariableGenerator }

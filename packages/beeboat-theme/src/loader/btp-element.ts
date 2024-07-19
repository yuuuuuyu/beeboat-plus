import { TinyColor } from '@ctrl/tinycolor'

function colorMix(name: string, baseColor: string, whiteColor: string, blackColor: string): string {
    const primaryTiny = new TinyColor(baseColor)
    const prefixName = '--el-color'
    const { r, g, b } = primaryTiny.toRgb()
    let cssString = ''

    cssString += `${prefixName}-${name}: ${baseColor};`
    cssString += `${prefixName}-${name}-rgb: ${r},${g},${b};`

    for (let i = 1; i <= 9; i++) {
        cssString += `${prefixName}-${name}-light-${i}: ${primaryTiny
            .mix(whiteColor, i * 10)
            .toHexString()};`
    }
    cssString += `${prefixName}-${name}-dark-2: ${primaryTiny.mix(blackColor, 20).toHexString()};`

    return cssString
}

/**
 * 饿了么Css变量生成器/覆盖elementplus同名
 * @param config 主题配置信息
 * @returns
 */
function eleCssVariableGenerator(config: Theme.ThemeConfig): string {
    const white = config.color.white
    const black = config.color.black
    let cssString = ''

    cssString += `--el-color-white: ${white};`
    cssString += `--el-color-black: ${black};`
    cssString += `--el-text-color-primary: ${config.color.font};`
    cssString += `--el-text-color-regular: ${config.color.font};`

    cssString += colorMix('primary', config.color.primary, white, black)
    cssString += colorMix('success', config.color.success, white, black)
    cssString += colorMix('warning', config.color.warning, white, black)
    cssString += colorMix('danger', config.color.danger, white, black)
    cssString += colorMix('error', config.color.danger, white, black)
    cssString += colorMix('info', config.color.font, white, black)

    cssString += `--el-border-color: ${config.color.line};`
    cssString += `--el-disabled-border-color: ${config.color.formDisableEdge};`
    cssString += `--el-disabled-text-color: ${config.color.formDisableText};`
    cssString += `--el-text-color-placeholder: ${config.color.formInfo};`
    cssString += `--el-disabled-bg-color: ${config.color.formDisable};`
    cssString += `--el-button-text-color: ${config.color.link};`

    return cssString
}

export { eleCssVariableGenerator }

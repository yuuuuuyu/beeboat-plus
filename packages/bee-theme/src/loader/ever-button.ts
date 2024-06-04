import { calculationColor } from '../utils'
import { TinyColor } from '@ctrl/tinycolor'

export function getEverButtonVarCss(config: Theme.ThemeConfig): string {
    const colorPrimary = new TinyColor(config.color.primary)
    const colorWhite = new TinyColor(config.color.white)
    let cssText = ''

    // 主按钮
    const everButtonBgColorPrimary = config.color.primary
    const hoverBgColorPrimary = calculationColor(everButtonBgColorPrimary, 0, 10, -5)
    const activeBgColorPrimary = calculationColor(everButtonBgColorPrimary, 0, 20, -10)
    cssText += `--ever-button-hover-bg-color-primary: ${hoverBgColorPrimary};`
    cssText += `--ever-button-active-bg-color-primary: ${activeBgColorPrimary};`

    // 次级按钮
    const buttonSecondaryColor = colorPrimary.mix(colorWhite, 85).toHexString()
    const hoverColorSecondary = calculationColor(buttonSecondaryColor, 0, 10, -5)
    const activeBgColorSecondary = calculationColor(buttonSecondaryColor, 0, 20, -10)
    cssText += `--ever-button-bg-color-secondary: ${buttonSecondaryColor};`
    cssText += `--ever-button-hover-bg-color-secondary: ${hoverColorSecondary};`
    cssText += `--ever-button-active-bg-color-secondary: ${activeBgColorSecondary};`

    // 警告按钮
    // TODO 计算格式有问题
    const buttonWarningColor = config.color.warning
    const hoverColorWarning = calculationColor(buttonWarningColor, 0, 10, -5)
    const activeBgColorWarning = calculationColor(buttonWarningColor, 0, 20, -10)
    cssText += `--ever-button-hover-bg-color-warning: ${hoverColorWarning};`
    cssText += `--ever-button-active-bg-color-warning: ${activeBgColorWarning};`

    // 警示按钮
    const buttonDangerColor = config.color.danger
    const hoverColorDanger = calculationColor(buttonDangerColor, 0, 10, -5)
    const activeBgColorDanger = calculationColor(buttonDangerColor, 0, 20, -10)
    cssText += `--ever-button-hover-bg-color-danger: ${hoverColorDanger};`
    cssText += `--ever-button-active-bg-color-danger: ${activeBgColorDanger};`

    // 无效按钮
    const disableBgColor = config.color.buttonDisable
    cssText += `--ever-button-disabled-bg-color: ${disableBgColor};`

    return cssText
}

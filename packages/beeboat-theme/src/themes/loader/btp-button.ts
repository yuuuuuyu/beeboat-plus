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
    cssText += `--btp-button-hover-bg-color-primary: ${hoverBgColorPrimary};`
    cssText += `--btp-button-active-bg-color-primary: ${activeBgColorPrimary};`

    // 次级按钮
    const buttonSecondaryColor = colorPrimary.mix(colorWhite, 85).toHexString()
    const hoverColorSecondary = calculationColor(buttonSecondaryColor, 0, 10, -5)
    const activeBgColorSecondary = calculationColor(buttonSecondaryColor, 0, 20, -10)
    cssText += `--btp-button-bg-color-secondary: ${buttonSecondaryColor};`
    cssText += `--btp-button-hover-bg-color-secondary: ${hoverColorSecondary};`
    cssText += `--btp-button-hover-text-color-secondary: ${hoverColorSecondary};`
    cssText += `--btp-button-active-bg-color-secondary: ${activeBgColorSecondary};`
    cssText += `--btp-button-active-text-color-secondary: ${activeBgColorSecondary};`

    // 警告按钮
    const buttonWarningColor = config.color.warning
    const hoverColorWarning = calculationColor(buttonWarningColor, 0, 10, -5)
    const activeBgColorWarning = calculationColor(buttonWarningColor, 0, 20, -10)
    cssText += `--btp-button-hover-bg-color-warning: ${hoverColorWarning};`
    cssText += `--btp-button-active-bg-color-warning: ${activeBgColorWarning};`

    // 警示按钮
    const buttonDangerColor = config.color.danger
    const hoverColorDanger = calculationColor(buttonDangerColor, 0, 10, -5)
    const activeBgColorDanger = calculationColor(buttonDangerColor, 0, 20, -10)
    cssText += `--btp-button-hover-bg-color-danger: ${hoverColorDanger};`
    cssText += `--btp-button-active-bg-color-danger: ${activeBgColorDanger};`

    // 无效按钮
    const disableBgColor = config.color.buttonDisable
    cssText += `--btp-button-disabled-bg-color: ${disableBgColor};`

    return cssText
}

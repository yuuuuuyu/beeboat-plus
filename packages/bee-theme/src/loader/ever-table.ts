import { TinyColor } from '@ctrl/tinycolor'

function getEverTableCss(config: Theme.ThemeConfig): string {
    const color1 = new TinyColor(config.color.primary)
    const color2 = new TinyColor(config.color.white)
    let cssText = ''
    cssText += `
            --ever-table-color-head-bg: ${color1.mix(color2, 92).toHexString()};
            `
    return cssText
}

export { getEverTableCss }

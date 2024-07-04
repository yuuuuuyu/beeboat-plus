import { defaultTheme } from './default'
import { theme1Theme } from './theme1'
import { theme2Theme } from './theme2'
import { theme3Theme } from './theme3'
import { theme5Theme } from './theme5'
import { theme6Theme } from './theme6'

const themeMap = {
    [defaultTheme.name]: defaultTheme,
    [theme1Theme.name]: theme1Theme,
    [theme2Theme.name]: theme2Theme,
    [theme3Theme.name]: theme3Theme,
    [theme5Theme.name]: theme5Theme,
    [theme6Theme.name]: theme6Theme,
}

/**
 * 合并主题
 * @param theme 主题
 * @returns 返回合并完成的主题
 */
function merge(theme: Theme.ThemeConfig): Theme.ThemeConfig {
    const themeConfig = defaultTheme

    themeConfig.name = 'custom'
    for (const key in defaultTheme.color) {
        if (theme.color && theme.color[key]) {
            defaultTheme.color[key] = theme.color[key]
        }
    }
    for (const key in defaultTheme.layout) {
        if (theme.layout && theme.layout[key]) {
            defaultTheme.layout[key] = theme.layout[key]
        }
    }
    return themeConfig
}

/**
 * 获取主题
 * @param type
 * @returns
 */
function getTheme(type: Theme.ThemeType | undefined): Theme.ThemeConfig {
    let theme: Theme.ThemeConfig = defaultTheme
    if (typeof type == 'string' && type in themeMap) {
        theme = themeMap[type]
    }
    return theme
}

/**
 * 添加主题
 * @param theme
 * @returns
 */
function setTheme(theme: Theme.ThemeConfig): void {
    const themeConfig = merge(theme)
    themeMap[themeConfig.name] = themeConfig
}

function getThemeAll() {
    return themeMap
}

export { getTheme, getThemeAll, setTheme }

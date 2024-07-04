import { loaderTheme } from './src/themes/loader'
import { getTheme, setTheme, getThemeAll } from './src/themes/theme'

/**
 * 添加主题
 */
function addTheme(theme: Theme.ThemeConfig): void {
    const themeMap = getThemeAll()
    if (typeof theme != 'object') {
        console.error('主题格式不正确')
        return
    }
    if (theme.name == undefined) {
        console.error('主题名称不能为空')
        return
    }
    if (theme.name in themeMap) {
        console.error('主题名称重复请修改')
        return
    }
    setTheme(theme)
}

/**
 * 初始化
 * @param theme
 */
function start(theme?: Theme.ThemeType): void {
    const themeConfig: Theme.ThemeConfig = getTheme(theme)
    // 加载 css变量
    loaderTheme(themeConfig)
}

/**
 * 切换主题
 * @param theme
 */
function switchTheme(theme?: Theme.ThemeType): void {
    start(theme)
}

/**
 * 获取所有主题
 * @returns Theme.ThemeConfig[]
 */
function getBtTheme(): Theme.ThemeConfig[] {
    const themMap = getThemeAll()
    const themeArray: Theme.ThemeConfig[] = []
    for (const key in themMap) {
        themeArray.push(themMap[key])
    }
    return themeArray
}

export default { start, switchTheme, addTheme, getBtTheme }

import './components/btp-adv-searchbar-dialog.scss';import './components/btp-adv-searchbar-item.scss';import './components/btp-adv-searchbar.scss';import './components/btp-button.scss';import './components/btp-card.scss';import './components/btp-dialog.scss';import './components/btp-dockpanel.scss';import './components/btp-pagination.scss';import './components/btp-table-editor.scss';import './components/btp-table-setting.scss';import './components/btp-table.scss';import './components/btp-tabs-anchor.scss';import './components/btp-tabs.scss';import './components/btp-tree.scss';import './components/index.scss';
// SCSS imports
import { loaderTheme } from './loader'
import { getTheme, setTheme, getThemeAll } from './theme/index'
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
function start(themeddd?: Theme.ThemeType): void {
    const themeConfig: Theme.ThemeConfig = getTheme(themeddd)
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

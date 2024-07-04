/**
 * 添加主题
 */
declare function addTheme(theme: Theme.ThemeConfig): void;
/**
 * 初始化
 * @param theme
 */
declare function start(theme?: Theme.ThemeType): void;
/**
 * 切换主题
 * @param theme
 */
declare function switchTheme(theme?: Theme.ThemeType): void;
/**
 * 获取所有主题
 * @returns Theme.ThemeConfig[]
 */
declare function getBtTheme(): Theme.ThemeConfig[];
declare const _default: {
    start: typeof start;
    switchTheme: typeof switchTheme;
    addTheme: typeof addTheme;
    getBtTheme: typeof getBtTheme;
};
export default _default;

/**
 * 获取主题
 * @param type
 * @returns
 */
declare function getTheme(type: Theme.ThemeType | undefined): Theme.ThemeConfig;
/**
 * 添加主题
 * @param theme
 * @returns
 */
declare function setTheme(theme: Theme.ThemeConfig): void;
declare function getThemeAll(): {
    [x: string]: Theme.ThemeConfig;
};
export { getTheme, getThemeAll, setTheme };

import { formatToLine } from '../utils'

/**
 * 基础Css变量生成器
 * @param config 主题配置信息
 * @returns
 */
export function baseCssVariableGenerator(config: Theme.ThemeConfig): string {
    let textCss = ''
    for (const key in config) {
        if (typeof config[key] == 'object') {
            for (const k in config[key]) {
                textCss += `--btp-${formatToLine(key, '-')}-${formatToLine(k, '-')}: ${
                    config[key][k]
                };`
            }
        }
    }
    return textCss
}

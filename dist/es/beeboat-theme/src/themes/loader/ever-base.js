import { formatToLine } from '../utils';
export function getEverBaseCss(config) {
    let textCss = '';
    for (const key in config) {
        if (typeof config[key] == 'object') {
            for (const k in config[key]) {
                textCss += `--ever-${formatToLine(key, '-')}-${formatToLine(k, '-')}: ${config[key][k]};`;
            }
        }
    }
    return textCss;
}

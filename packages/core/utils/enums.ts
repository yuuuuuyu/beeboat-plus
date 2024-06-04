/** *工具类型 */
export enum ToolboxType {
    vertical = 'vertical',
    horizontal = 'horizontal',
    copy = 'copy',
    add = 'add',
    remove = 'remove',
}
/** *固定颜色 */
export enum FixedColor {
    'blue' = '#0087FE',
    'red' = '#F44E3B',
    'yellow' = '#FE9200',
}
/** *错误代码 */
export enum TokenError {
    '用户未登录' = 130001,
    '操作未授权' = 130002,
    '数据未授权' = 130003,
    '用户登录过期' = 13004,
    'token' = 13005,
}

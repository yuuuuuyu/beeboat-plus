import css from './css'
export const theme2Theme: Theme.ThemeConfig = {
    /** 名称 */
    name: 'theme2',
    color: {
        /** 主色 */
        primary: '#1BBCFF',
        /** 辅助类 白色 */
        white: '#ffffff',
        /** 辅助类 黑色 */
        black: '#000000',
        /** 顶部导航栏 背景色 */
        navBg: '#1BBCFF',
        /** 辅助色（成功） */
        success: '#2CBF77',
        /** 辅助色（警示） */
        warning: '#FE9800',
        /** 辅助色 (错误) */
        danger: '#FF524C',
        /** 链接类信息 */
        link: '#2880EA',
        /** 水槽颜色 */
        gutter: '#E2EAF7',
        /** 文字主色 */
        font: '#3E4A6B',
        /** 按钮禁用状态 */
        buttonDisable: '#D1D6E3',
        /** 线、输入框边、分割线 */
        line: '#DCE4F2',
        /** 表单内提示信息 */
        formInfo: '#A5B3CF',
        /** 表单禁用填充 */
        formDisable: '#F5F6FA',
        /** 表单禁用描边 */
        formDisableEdge: '#EBF0F8',
        /** 表单禁用文字 */
        formDisableText: '#6C758F',
    },
    layout: {
        /** element 组件尺寸 */
        size: 'default',
    },
    cssExtra: css,
}

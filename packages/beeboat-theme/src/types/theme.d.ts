declare namespace Theme {
    type ThemeType = 'blue' | 'defaultTheme' | 'green' | string
    type ThemeSize = 'default' | 'small' | 'large'

    interface ThemeConfig {
        name: string;
        color: {
            /** 主色 */
            primary: string,
            /** 辅助类 白色 */
            white: string,
            /** 辅助类 黑色 */
            black: string,
            /** 顶部导航栏 背景色 */
            navBg: string,
            /** 辅助色（成功） */
            success: string,
            /** 辅助色（警示） */
            warning: string,
            /** 辅助色 (错误) */
            danger: string,
            /** 链接类信息 */
            link: string,
            /** 水槽颜色 */
            gutter: string,
            /** 文字主色 */
            font: string,
            /** 按钮禁用状态 */
            buttonDisable: string,
            /** 线、输入框边、分割线 */
            line: string,
            /** 表单内提示信息 */
            formInfo: string,
            /** 表单禁用填充 */
            formDisable: string,
            /** 表单禁用描边 */
            formDisableEdge: string,
            /** 表单禁用文字 */
            formDisableText: string,
        },
        layout: {
            /** element 组件尺寸 */
            size: ThemeSize;
        },
        /** 额外的css样式 */
        cssExtra: string
    }
}

export const PropsType = {
    /** 内容 */
    text: {
        type: String,
        require: true,
    },
    /** 字体大小的class样式 */
    className: {
        type: String,
        require: false,
    },
    /** 标记 */
    mark: {
        type: [Boolean, Number],
        require: false,
    },
    /** 代码 */
    code: {
        type: [Boolean, Number],
        require: false,
    },
    /** 删除线 */
    deleteLine: {
        type: [Boolean, Number],
        require: false,
    },
    /** 下划线 */
    underline: {
        type: [Boolean, Number],
        require: false,
    },
    /** 是否加粗 */
    strong: {
        type: [Boolean, Number],
        require: false,
    },
}

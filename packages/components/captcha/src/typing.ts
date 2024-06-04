export const PropsType = {
    /** 宽度 */
    width: {
        type: Number,
        require: false,
        default: 80,
    },
    /** 高度 */
    height: {
        type: Number,
        required: false,
        default: 40,
    },
    /** 字体大小  */
    size: {
        type: [String, Number],
        required: false,
        default: 26,
    },
    /** 背景特效 */
    backEffects: {
        type: Boolean,
        required: false,
        default: true,
    },
}

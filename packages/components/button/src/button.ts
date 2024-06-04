import { PropType } from 'vue'
import { ButtonType } from './typing'

export const buttonProps = {
    /** 大小 */
    size: {
        type: String,
        default: '',
    },
    /** 类型 */
    type: {
        type: String as PropType<ButtonType>,
        default: '',
    },
    /** 是否显示 分割线  */
    divider: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    /** 是否为加载状态 */
    loading: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    /** 是否禁用 */
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    /** link */
    link: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
}

import { PropType } from 'vue'
import { IPropsSize } from './type'
export const PropsType = {
    /** icon name */
    icon: {
        type: String,
        require: true,
        default: '',
    },
    /** 类型 */
    size: {
        type: [String, Number] as PropType<IPropsSize>,
        required: false,
        default: '16',
    },
    /** 是否显示 分割线  */
    color: {
        type: String,
        required: false,
    },
}

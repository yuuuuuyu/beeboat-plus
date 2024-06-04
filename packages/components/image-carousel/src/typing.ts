import { PropType } from 'vue'

export const PropsType = {
    /**
     * 要展示的图片
     */
    images: {
        type: Array as PropType<any[]>,
        default: [],
        required: true,
    },
    /**
     * 轮播图的数量
     */
    showSize: {
        type: Number,
        default: 3,
    },
    /**
     * 禁用删除
     */
    disabledDelete: {
        type: [Boolean, Number],
        default: false,
    },
    /**
     * 禁用预览
     */
    disabledPreView: {
        type: [Boolean, Number],
        default: false,
    },
    /**
     * 是否自动轮播
     */
    autoSlide: {
        type: [Boolean, Number],
        default: false,
    },
    /**
     * 开启自动轮播时，切换图片的时间间隔
     */
    autoSlideInterval: {
        type: Number,
        default: 3000,
        validator: value => value >= 500,
    },
    /**
     * 选择展示的模式，有水平模式和垂直模式
     */
    mode: {
        type: String,
        default: 'horizontal',
        validator: value => ['horizontal', 'vertical'].includes(value),
    },
    /**
     * 切换图片过程中动画的时间,默认300ms
     */
    slideTime: {
        type: Number,
        default: 300,
        validator: value => value >= 16,
    },
    width: {
        type: Number,
        default: 176,
    },
    height: {
        type: Number,
        default: 132,
    },
}

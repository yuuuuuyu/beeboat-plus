<template>
    <div :class="[`bt-splitter ${props.mode}`, props?.customClass]" :style="style">
        <slot></slot>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtSplitter',
}
</script>
<script setup lang="ts">
import { splitterContextKey } from '@beeboat/core/utils/tokens'
import { computed, CSSProperties, provide } from 'vue'

interface IProps {
    mode: 'horizontal' | 'vertical'
    gutter?: number
    // justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly'
    // align?: 'top' | 'middle' | 'bottom'
    backgroundColor?: 'transparent' | string
    backgroundImage?: string // 背景图片
    borderLineWidth?: number //边线宽度
    borderLineColor?: string // 边线颜色
    borderRadius?: number // 边框圆角
    customClass?: string // 自定义 class
}
const props = withDefaults(defineProps<IProps>(), {
    mode: 'horizontal',
    gutter: 0,
    borderLineWidth: 0,
    borderLineColor: '#dcdfe6',
    borderRadius: 0,
})

// const alignment = computed(() => {
//     const className = `bt-justify-${props.justify} bt-align-item-${props.align}`
//     return className
// })

const gutter = computed(() => props.gutter)
const mode = computed(() => props.mode)
provide(splitterContextKey, {
    gutter,
    mode,
})
const style = computed(() => {
    const styles: CSSProperties = {
        backgroundColor: props.backgroundColor,
        marginLeft: '',
        marginRight: '',
    }

    // 设置间隙
    if (props.gutter) {
        // if (['horizontal'].includes(props.mode ?? 'horizontal')) {
        //     styles.marginLeft = `-${props.gutter / 2}px`
        //     styles.marginRight = styles.marginLeft
        // } else {
        //     styles.marginTop = `-${props.gutter / 2}px`
        //     styles.marginBottom = styles.marginTop
        // }
        styles.gap = `${props.gutter}px`
    }
    // 边框宽度
    if (props.borderLineWidth > 0) {
        styles.border = `${props.borderLineWidth}px solid ${props.borderLineColor}`
    }
    // 边框圆角
    if (props.borderRadius > 0) {
        styles.borderRadius = `${props.borderRadius}px`
    }
    // 背景图片
    if (props.backgroundImage) {
        styles.background = `url(${props.backgroundImage})
                repeat center center`
        styles.backgroundSize = 'cover'
    }
    return styles
})
</script>

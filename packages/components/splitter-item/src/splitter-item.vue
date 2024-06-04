<template>
    <div :class="[`bt-splitter-item ${mode || 'horizontal'}`, props?.customClass]" :style="style">
        <slot></slot>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtSplitterItem',
}
</script>
<script setup lang="ts">
import { splitterContextKey } from '@beeboat/core/utils/tokens'
import { computed, CSSProperties, inject, reactive } from 'vue'
const stores = reactive({
    px: {
        minWidth: 100,
        minHeight: 100,
    },
    '%': {
        minWidth: 10,
        minHeight: 10,
    },
    vw: {
        minWidth: 10,
        minHeight: 10,
    },
})
interface IProps {
    // 宽度单位类型
    unitType?: 'px' | '%' | 'vw' | 'vh' | 'auto'
    // 默认宽度
    defaultWidth?: string | number
    // 默认高度
    defaultHeight?: string | number
    customClass?: string // 自定义 class
}
const props = withDefaults(defineProps<IProps>(), {
    unitType: 'auto',
    defaultWidth: 0,
    defaultHeight: 0,
})
const { mode } = inject(splitterContextKey, { gutter: computed(() => 0) })
const hasHorizontalMode = () => {
    return ['horizontal'].includes(mode?.value ?? 'horizontal')
}
const style = computed(() => {
    const styles: CSSProperties = {}
    // if (gutter.value) {
    //     if (['horizontal'].includes(mode?.value ?? 'horizontal')) {
    //         styles.paddingLeft = `${gutter.value / 2}px`
    //         styles.paddingRight = `${gutter.value / 2}px`
    //     } else {
    //         styles.paddingTop = `${gutter.value / 2}px`
    //         styles.paddingBottom = `${gutter.value / 2}px`
    //     }
    // }
    // 宽度+单位
    if (props.unitType == 'auto') {
        styles.flex = '1'
    } else {
        if (hasHorizontalMode()) {
            styles.width =
                stores[props.unitType].minWidth > Number(props.defaultWidth)
                    ? stores[props.unitType].minWidth
                    : props.defaultWidth + props.unitType
        } else {
            styles.height =
                stores[props.unitType].minHeight > Number(props.defaultHeight)
                    ? stores[props.unitType].minHeight
                    : props.defaultHeight + props.unitType
        }
    }

    return styles
})
</script>

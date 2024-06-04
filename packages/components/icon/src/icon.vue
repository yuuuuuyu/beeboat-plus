<template>
    <i :class="iconClass" style="cursor: pointer" :style="style">
        <slot></slot>
    </i>
</template>
<script lang="ts">
export default {
    name: 'BtIcon',
    inheritAttrs: false,
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import { PropsType } from './icon'

const props = defineProps(PropsType)
const style = computed(() => {
    if (!props.size && !props.color) {
        return {}
    }
    return {
        ...(props.size ? { 'font-size': `${props.size}px` } : {}),
        ...(props.color ? { color: props.color } : {}),
    }
})

const iconClass = computed(() => {
    if (!props.icon) {
        return 'bt-icon'
    }
    return `bt-icon ${props.icon}`
})
</script>

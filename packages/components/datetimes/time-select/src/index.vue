<template>
    <el-time-select ref="timeSelectRef" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
    /**
     * @description 视图动态配置
     */
    btConfig: {
        type: Object,
        default: undefined,
    },
    /**
     * @description 视图动态配置
     */
    btViewContext: {
        type: Object,
        default: undefined,
    },
})
const timeSelectRef = ref()

defineExpose({
    focus: () => {
        timeSelectRef.value.focus()
    },
    blur: () => {
        timeSelectRef.value.blur()
    },
})
</script>

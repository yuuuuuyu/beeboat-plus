<template>
    <el-time-picker class="btp-time-picker" ref="timePickerRef" />
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
const timePickerRef = ref()

defineExpose({
    focus: () => {
        timePickerRef.value.focus()
    },
    blur: () => {
        timePickerRef.value.blur()
    },
    handleOpen: () => {
        timePickerRef.value.handleOpen()
    },
    handleClose: () => {
        timePickerRef.value.handleClose()
    },
})
</script>

<template>
    <el-date-picker class="btp-date-picker" ref="datePickerRef">
        <template v-if="$slots.default" #default="cell">
            <slot name="default" :cell="cell" />
        </template>
        <template v-if="$slots['range-separator']" #range-separator>
            <slot name="range-separator" />
        </template>
    </el-date-picker>
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
const datePickerRef = ref()

defineExpose({
    focus: () => {
        datePickerRef.value.focus()
    },
    handleOpen: () => {
        datePickerRef.value.handleOpen()
    },
    handleClose: () => {
        datePickerRef.value.handleClose()
    },
})
</script>

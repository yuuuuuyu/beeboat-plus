<template>
    <el-input-number ref="inputNumberRef" class="btp-input-number">
        <template v-if="$slots['decrease-icon']"><slot name="decrease-icon" /></template>
        <template v-if="$slots['increase-icon']"><slot name="increase-icon" /></template>
    </el-input-number>
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

const inputNumberRef = ref()

defineExpose({
    focus: () => {
        inputNumberRef.value.focus()
    },
    blur: () => {
        inputNumberRef.value.blur()
    },
})
</script>

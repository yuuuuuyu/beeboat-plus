<template>
    <el-input class="btp-input" ref="inputRef">
        <template v-if="$slots.prefix"><slot name="prefix" /></template>
        <template v-if="$slots.suffix"><slot name="suffix" /></template>
        <template v-if="$slots.prepend"><slot name="prepend" /></template>
        <template v-if="$slots.append"><slot name="append" /></template>
    </el-input>
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

const inputRef = ref()

defineExpose({
    focus: () => {
        inputRef.value.focus()
    },
    blur: () => {
        inputRef.value.blur()
    },
    clear: () => {
        inputRef.value.clear()
    },
})
</script>

<template>
    <el-switch class="btp-switch" ref="switchRef">
        <template #active-action><slot name="active-action" /></template>
        <template #inactive-action>
            <slot name="inactive-action" />
        </template>
    </el-switch>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const switchRef = ref()

/**
 * 将ElementPlus的内置方法继续暴露出去
 */
defineExpose({
    focus: () => {
        switchRef.value.focus()
    },
})
</script>

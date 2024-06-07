<template>
    <el-switch ref="switchRef">
        <template v-if="$slots['active-action']" #active-action>
            <slot name="active-action" />
        </template>
        <template v-if="$slots['inactive-action']" #inactive-action>
            <slot name="inactive-action" />
        </template>
    </el-switch>
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

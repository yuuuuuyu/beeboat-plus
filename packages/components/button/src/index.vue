<template>
    <el-button class="btp-button">
        <slot>{{ btConfig?.name || '' }}</slot>
        <template v-if="$slots.icon"><slot name="icon"></slot></template>
        <template v-if="$slots.loading"><slot name="loading"></slot></template>
    </el-button>
</template>
<script lang="ts" setup>
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
</script>

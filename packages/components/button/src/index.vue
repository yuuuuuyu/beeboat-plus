<template>
    <el-button class="btp-button" @click.stop="onClick">
        <slot>{{ btConfig?.name || '' }}</slot>
        <template v-if="$slots.icon"><slot name="icon"></slot></template>
        <template v-if="$slots.loading"><slot name="loading"></slot></template>
    </el-button>
</template>
<script lang="ts" setup>
const props = defineProps({
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
    /**
     * @description 嵌套在子插槽中的scope数据
     */
    btParentScope: {
        type: Array<any>,
        default: undefined,
    },
})

const emits = defineEmits(['click'])

const onClick = () => {
    if (props.btParentScope && Array.isArray(props.btParentScope)) {
        emits('click', ...props.btParentScope)
    } else {
        emits('click')
    }
}
</script>

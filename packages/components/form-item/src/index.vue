<template>
    <el-form-item>
        <template v-if="$slots.default"><slot /></template>
        <template v-else>
            <template :key="component.id" v-for="component in btConfig?.children">
                <component
                    :is="btViewContext.render(component)"
                    :style="component.styles"
                    :bt-view-context="btViewContext"
                    :bt-config="component"
                    v-on="component.events"
                    v-bind="component.props"
                    v-model="btViewContext.dataModelProxy[component.model?.prop]"
                />
            </template>
        </template>
    </el-form-item>
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

<template>
    <el-tabs class="btp-tabs">
        <slot name="default">
            <template v-for="component in btConfig?.children" :key="component.id">
                <component
                    :is="btViewContext.render(component)"
                    :style="component.styles"
                    :bt-view-context="btViewContext"
                    :bt-config="component"
                    v-bind="component.props"
                />
            </template>
        </slot>
    </el-tabs>
</template>
<script lang="ts">
export default {
    name: 'BtpTabs',
    btpInject: true,
}
</script>
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

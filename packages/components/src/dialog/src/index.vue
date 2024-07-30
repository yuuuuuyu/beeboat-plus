<template>
    <el-dialog
        v-model="btViewContext.viewModel.dialog.visible"
        class="btp-dialog"
        :title="btViewContext.viewModel.dialog.title"
        v-bind="btConfig.props"
        v-on="btConfig?.events"
    >
        <template v-for="component in btConfig?.children" :key="component.id">
            <component
                :is="btViewContext.render(component)"
                v-bind="component.props"
                v-model="btViewContext.dataModelProxy[component.model?.prop]"
                :style="component.styles"
                :bt-view-context="btViewContext"
                :bt-config="component"
                v-on="component.events"
            ></component>
        </template>
        <!-- TODO: 使用插槽 -->
        <template v-if="$slots.footer" #footer><slot name="footer"></slot></template>
        <template v-else-if="btConfig?.footer?.children?.length" #footer>
            <template v-for="component in btConfig?.footer?.children" :key="component.id">
                <component
                    :is="btViewContext.render(component)"
                    v-bind="component.props"
                    v-model="btViewContext.dataModelProxy[component.model?.prop]"
                    :style="component.styles"
                    :bt-view-context="btViewContext"
                    :bt-config="component"
                    v-on="component.events"
                ></component>
            </template>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
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

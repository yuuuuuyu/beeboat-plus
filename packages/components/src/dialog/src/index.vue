<template>
    <el-dialog
        class="btp-dialog"
        :title="btViewContext.viewModel.dialog.title"
        v-model="btViewContext.viewModel.dialog.visible"
        v-bind="btConfig.props"
        v-on="btConfig?.events"
    >
        <template :key="component.id" v-for="component in btConfig?.children">
            <component
                :is="btViewContext.render(component)"
                :style="component.styles"
                :bt-view-context="btViewContext"
                :bt-config="component"
                v-on="component.events"
                v-bind="component.props"
                v-model="btViewContext.dataModelProxy[component.model?.prop]"
            ></component>
        </template>
        <!-- TODO: 使用插槽 -->
        <template v-if="$slots.footer" #footer><slot name="footer"></slot></template>
        <template v-else-if="btConfig?.footer?.children?.length" #footer>
            <template :key="component.id" v-for="component in btConfig?.footer?.children">
                <component
                    :is="btViewContext.render(component)"
                    :style="component.styles"
                    :bt-view-context="btViewContext"
                    :bt-config="component"
                    v-on="component.events"
                    v-bind="component.props"
                    v-model="btViewContext.dataModelProxy[component.model?.prop]"
                ></component> </template
        ></template>
    </el-dialog>
</template>
<script setup lang="ts">
const prop = defineProps({
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

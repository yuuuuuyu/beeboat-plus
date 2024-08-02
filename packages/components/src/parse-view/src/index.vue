<template>
    <template :key="component.id" v-for="component in btViewContext.viewModel.components">
        <component
            v-if="component.type == 'BTPMicroAppRouterView'"
            :is="btViewContext.render(component)"
            :style="component.styles"
            :bt-view-context="btViewContext"
            :bt-config="component"
        ></component>
        <component
            v-else
            :is="btViewContext.render(component)"
            :style="component.styles"
            :bt-view-context="btViewContext"
            :bt-config="component"
            v-on="component.events"
            v-bind="component.props"
            v-model="btViewContext.dataModelProxy[component.model?.prop]"
        ></component>
    </template>
    <template :key="refer.id" v-for="refer in btViewContext.viewModel.refers">
        <div>
            <BTPView
                :ref="refer.referId"
                :dialogMode="true"
                :viewId="refer.viewId"
                :viewModelId="refer.viewModelId"
                :parentViewContext="btViewContext"
            ></BTPView>
        </div>
    </template>
</template>
<script lang="ts">
export default {
    name: 'BTPView',
    btpInject: true,
}
</script>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { BTPUtils } from '@beeboat/core'

const props = defineProps({
    dialogMode: {
        type: Boolean,
        default: false,
    },
    viewId: {
        type: String,
        default: undefined,
    },
    viewModelId: {
        type: String,
        default: undefined,
    },
    /**
     * @description 父级页面对象
     */
    parentViewContext: {
        type: Object,
        default: undefined,
    },
})
const btViewContext = BTPUtils.getAppManager().createViewContext(
    getCurrentInstance(),
    props.viewId,
    props.viewModelId,
    props.dialogMode,
    props.parentViewContext,
)
defineExpose(btViewContext.getExpose())
</script>

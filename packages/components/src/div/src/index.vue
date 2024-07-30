<template>
    <div class="btp-div">
        <slot>
            <template v-for="component in btConfig?.children" :key="component.id">
                <component
                    :is="btViewContext.render(component)"
                    v-bind="component.props"
                    v-model="btViewContext.dataModelProxy[component.model?.prop]"
                    :style="component.styles"
                    :bt-view-context="btViewContext"
                    :bt-config="component"
                    v-on="component.events"
                />
            </template>
        </slot>
    </div>
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

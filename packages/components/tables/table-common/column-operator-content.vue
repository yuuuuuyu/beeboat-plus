<template>
    <template v-if="column.children && column.children.length > 0">
        <template v-for="component in column.children" :key="component.id">
            <template v-if="btViewContext">
                <component
                    ref="formRef"
                    :is="btViewContext.render(component)"
                    :style="component.styles"
                    :bt-view-context="btViewContext"
                    :bt-config="component"
                    :bt-parent-scope="[scope.row, scope]"
                    v-on="component.events"
                    v-bind="component.props"
                ></component>
            </template>
        </template>
    </template>
</template>
<script lang="ts">
export default {
    name: 'BtpTableOperator',
    btpInject: true,
}
</script>
<script setup lang="ts">
defineProps({
    column: {
        type: Object,
        default: null,
    },
    scope: {
        type: Object,
        default: null,
    },
    manager: {
        type: Object,
        default: null,
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

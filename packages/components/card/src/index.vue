<template>
    <el-card class="bt-card">
        <slot name="default">
            <template :key="component.id" v-for="component in btConfig?.children">
                <component
                    :is="btViewContext.render(component)"
                    :style="component.styles"
                    :bt-view-context="btViewContext"
                    :bt-config="component"
                    v-on="component.actions"
                    v-bind="component.props"
                    v-model="btViewContext.dataModelProxy[component.model?.prop]"
                />
            </template>
        </slot>
        <template v-if="$slots.header"><slot name="header" /></template>
        <template
            v-if="$slots.header == undefined && btConfig?.toolbar?.children?.length > 0"
            #header
        >
            <div class="bt-card-header">
                <span class="bt-card-header--title">{{ $attrs.header }}</span>
                <span class="bt-card-header--toolbar">
                    <template :key="component.id" v-for="component in btConfig?.toolbar?.children">
                        <component
                            :is="btViewContext.render(component)"
                            :style="component.styles"
                            :bt-view-context="btViewContext"
                            :bt-config="component"
                            v-on="component.actions"
                            v-bind="component.props"
                            v-model="btViewContext.dataModelProxy[component.model?.prop]"
                        />
                    </template>
                </span>
            </div>
        </template>
        <template v-if="$slots.footer"><slot name="footer" /></template>
        <template
            v-if="$slots.footer == undefined && btConfig?.footer?.children?.length > 0"
            #footer
        >
            <div class="bt-card-footer">
                <span class="bt-card-footer--title">{{ $attrs.footer }}</span>
                <span class="bt-card-footer--toolbar">
                    <template :key="component.id" v-for="component in btConfig?.footer?.children">
                        <component
                            :is="btViewContext.render(component)"
                            :style="component.styles"
                            :bt-view-context="btViewContext"
                            :bt-config="component"
                            v-on="component.actions"
                            v-bind="component.props"
                            v-model="btViewContext.dataModelProxy[component.model?.prop]"
                        />
                    </template>
                </span>
            </div>
        </template>
    </el-card>
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

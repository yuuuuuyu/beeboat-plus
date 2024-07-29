<template>
    <el-card class="btp-card">
        <slot name="default">
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
        </slot>
        <template #header>
            <slot name="header">
                <div class="btp-card-header">
                    <span class="btp-card-header--title">{{ $attrs.header }}</span>
                    <template v-if="btConfig?.toolbar?.children?.lengt > 0">
                        <span class="btp-card-header--toolbar">
                            <template
                                :key="component.id"
                                v-for="component in btConfig.toolbar.children"
                            >
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
                        </span>
                    </template>
                </div>
            </slot>
        </template>
        <template v-if="$slots.footer"><slot name="footer" /></template>
        <template
            v-if="$slots.footer == undefined && btConfig?.footer?.children?.length > 0"
            #footer
        >
            <div class="btp-card-footer">
                <span class="btp-card-footer--title">{{ $attrs.footer }}</span>
                <span class="btp-card-footer--toolbar">
                    <template :key="component.id" v-for="component in btConfig?.footer?.children">
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
                </span>
            </div>
        </template>
    </el-card>
</template>
<script lang="ts">
export default {
    name: 'BtpCard',
    btpInject: true,
}
</script>
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
})
console.log(props)
</script>

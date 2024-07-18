<template>
    <template v-if="$attrs.model">
        <el-form ref="formRef" :model="$attrs.model">
            <slot>
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
        </el-form>
    </template>
    <template v-else>
        <el-form ref="formRef" :model="btViewContext?.dataModelProxy[Utils.varName(btConfig.code)]">
            <slot>
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
        </el-form>
    </template>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Utils from '@beeboat/core/utils/btp-utils'

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
const formRef = ref()

defineExpose({
    formRef,
    validate: callback => {
        formRef.value.validate(callback)
    },
    validateField: (props, callback) => {
        return formRef.value.resetFields(props, callback)
    },
    resetFields: props => {
        formRef.value.resetFields(props)
    },
    scrollToField: prop => {
        formRef.value.scrollToField(prop)
    },
    clearValidate: props => {
        formRef.value.clearValidate(props)
    },
    fields: () => {
        return formRef.value.fields
    },
})
</script>

<template name="button">
    <el-button
        v-bind="{ ...$props, ...$attrs }"
        :class="className"
        :type="buttonType"
        :plain="props.type === 'secondary' ? true : $attrs.plain ? $attrs.plain : false"
        :size="getButtonSize()"
    >
        <slot></slot>
    </el-button>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { buttonProps } from './button'
import { useGlobalSize } from '@beeboat/core/utils/use-size'
const globalSize = useGlobalSize()

const props = defineProps(buttonProps)

let className = ref<string>('')
let buttonType = ref<any>('')

const getButtonSize = () => {
    return props.size || globalSize.value
}

watch(
    () => [props.type, props.link],
    val => {
        const type = val[0]
        const link = val[1]
        buttonType = type ? type : 'primary'
        switch (type) {
            case 'secondary':
                className.value = link ? '' : 'ever-button ever-button--secondary'
                break
            case 'blank':
                className.value = link ? '' : 'ever-button ever-button-blank'
                break
            default:
                // 兼容btTable的type=text
                if (<unknown>type === 'text') {
                    className.value = link ? '' : 'ever-button el-button el-button--primary is-link'
                } else {
                    className.value = 'ever-button'
                }
                break
        }
    },
    { immediate: true },
)
</script>

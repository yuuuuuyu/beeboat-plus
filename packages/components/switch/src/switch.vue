<template>
    <div class="bt-switch">
        <el-switch
            v-model="props.defaultValue"
            :disabled="Boolean(props.disabled)"
            :size="props.size"
            :width="props.width"
            :active-text="props.activeText"
            :inactive-text="props.inactiveText"
            :inline-prompt="Boolean(props.inlinePrompt)"
            :active-value="props.activeValue"
            :inactive-value="props.inactiveValue"
            :loading="props.loading"
            :border-color="props.borderColor"
            :active-color="props.activeColor"
            :inactive-color="props.inactiveColor"
            v-bind="mergePropsBind"
            @change="handleValueChange"
        />
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtSwitch',
}
</script>
<script setup lang="ts">
import { watch } from 'vue'
import { useMergeBind } from '@beeboat/core/hook/useMergeBind'
const emit = defineEmits(['onPropChange', 'change'])
let { mergePropsBind } = useMergeBind()
watch(
    () => mergePropsBind.value?.modelValue,
    () => {
        emit('onPropChange', mergePropsBind.value?.config?.prop || 'unknown')
    },
)

interface baseState {
    defaultValue?: boolean | string | number // 默认值
    size?: any // 'large' | 'default' | 'small'
    width?: number | string
    activeText?: string
    inactiveText?: string
    disabled?: boolean
    inlinePrompt?: boolean
    activeValue?: boolean | string | number
    inactiveValue?: boolean | string | number
    loading?: boolean
    activeColor?: string
    inactiveColor?: string
    borderColor?: string
}
const props = withDefaults(defineProps<baseState>(), {
    defaultValue: 0,
    activeValue: 1,
    inactiveValue: 0,
    disabled: false,
})

const handleValueChange = val => {
    emit('change', { val: val })
}
</script>

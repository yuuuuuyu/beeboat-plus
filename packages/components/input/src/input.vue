<template>
    <div class="bt-input">
        <el-input
            v-if="props.type !== 'number'"
            v-model="data.inputData"
            v-bind="mergePropsBind"
            :type="props.type"
            :maxlength="props.maxlength"
            :minlength="props.minlength"
            :disabled="Boolean(props.disabled)"
            :show-word-limit="Boolean(props.showWordLimit)"
            :placeholder="props.placeholder"
            :clearable="Boolean(props.clearable)"
            :show-password="Boolean(props.showPassword)"
            :size="props.size"
            :prefix-icon="props.prefixIcon"
            :suffix-icon="props.suffixIcon"
            :rows="props.rows"
            :autosize="Boolean(props.autosize)"
            :autocomplete="props.autocomplete"
            :name="props.name"
            :readonly="Boolean(props.readonly)"
            :max="props.max"
            :min="props.min"
            :step="props.step"
            :resize="props.resize"
            :autofocus="Boolean(props.autofocus)"
            :tabindex="props.tabindex"
            :validate-event="props.validateEvent"
            :input-style="props.inputStyle"
            @blur="blur"
            @focus="focus"
            @change="change"
            @input="input"
            @clear="clear"
        >
            <template v-for="(_slotValue, slotKey, index) in slotsList" #[slotKey] :key="index">
                <slot :name="slotKey"></slot>
            </template>
        </el-input>
        <el-input-number
            v-else
            v-bind="{ ...$props, ...$attrs }"
            @blur="blur"
            @focus="focus"
            @change="change"
        />
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtInput',
}
</script>
<script setup lang="ts">
import { reactive, watch, useSlots } from 'vue'
import { useMergeBind } from '@beeboat/core/hook/useMergeBind'

const emit = defineEmits(['onPropChange', 'blur', 'focus', 'change', 'input', 'clear'])
const slotsList = useSlots()
console.log(slotsList, 'slotsList....')

let { mergePropsBind } = useMergeBind()

watch(
    () => mergePropsBind.value?.modelValue,
    () => {
        emit('onPropChange', mergePropsBind.value?.config?.prop || 'unknown')
    },
)

interface baseState {
    type?: string
    inputData?: any // 输入内容
    maxlength?: any
    minlength?: any
    showWordLimit?: boolean | number // 是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效
    placeholder?: string
    clearable?: boolean | number
    showPassword?: boolean | number
    disabled?: boolean | number
    size?: string // 'large' | 'default' | 'small'  输入框尺寸，只在 type 不为 'textarea' 时有效
    suffixIcon?: any
    prefixIcon?: any
    rows?: number // 输入框行数，仅 type 为 'textarea' 时有效
    autosize?: boolean | number // textarea 高度是否自适应，仅 type 为 'textarea' 时生效。 可以接受一个对象，比如: { minRows: 2, maxRows: 6 }
    autocomplete?: string // 原生 autocomplete 属性
    name?: string
    readonly?: boolean | number
    max?: any
    min?: any
    step?: any
    resize?: string // 'none' | 'both' | 'horizontal' | 'vertical'
    autofocus?: boolean | number
    tabindex?: any
    validateEvent?: boolean
    inputStyle?: string | object // obj: CSSProperties | CSSProperties[] | string[]
    showPrepend?: boolean
    showAppend?: boolean
}
const props = withDefaults(defineProps<baseState>(), {
    type: 'text',
    inputData: '',
    disabled: false,
    clearable: true,
    placeholder: '请输入',
    readonly: false,
    showPrepend: false,
    showAppend: false,
})
const data = reactive({ ...props })

const blur = () => {
    emit('blur', { val: data.inputData })
}
const focus = () => {
    emit('focus', { val: data.inputData })
}
const change = () => {
    emit('change', { val: data.inputData })
}
const input = () => {
    emit('input', { val: data.inputData })
}
const clear = () => {
    emit('clear', {})
}
</script>

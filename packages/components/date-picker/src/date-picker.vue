<template>
    <div class="bt-date-picker">
        <el-date-picker
            :id="props.id"
            v-model="props.defaultValue"
            :type="props.dateType"
            :placeholder="props.placeholder"
            :size="props.size"
            :shortcuts="props.shortcuts"
            :disabled-date="props.disabledDate"
            :editable="Boolean(props.editable)"
            :format="props.dateFormat"
            :value-format="props.valueFormat"
            :range-separator="props.rangeSeparator"
            :start-placeholder="props.startPlaceholder"
            :end-placeholder="props.endPlaceholder"
            :unlink-panels="Boolean(props.unlinkPanels)"
            :default-time="props.defaultTime"
            :prefix-icon="props.customPrefix"
            :readonly="Boolean(props.readonly)"
            :clearable="Boolean(props.clearable)"
            :name="props.name"
            :clear-icon="props.clearIcon"
            :validate-event="props.validateEvent"
            :teleported="props.teleported"
            v-bind="mergePropsBind"
            @change="change"
            @blur="blur"
            @focus="focus"
            @visible-change="visibleChange"
            @panel-change="panelChange"
            @handleOpen="handleOpen"
            @handleClose="handleClose"
        >
            <template #default="cell">
                <slot name="cell" :slot-data="cell"></slot>
            </template>
        </el-date-picker>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtInput',
}
</script>
<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useMergeBind } from '@beeboat/core/hook/useMergeBind'
const emit = defineEmits([
    'onPropChange',
    'change',
    'blur',
    'focus',
    'visibleChange',
    'panelChange',
    'handleOpen',
    'handleClose',
])
let { mergePropsBind } = useMergeBind()
watch(
    () => mergePropsBind.value?.modelValue,
    () => {
        emit('onPropChange', mergePropsBind.value?.config?.prop || 'unknown')
    },
)

interface baseState {
    date?: string
    size?: string // 'default' | 'large' | 'small'
    dateType?: string
    placeholder?: string
    shortcuts?: any
    disabledDate?: any
    dateFormat?: string
    valueFormat?: string
    rangeSeparator?: string
    startPlaceholder?: string
    endPlaceholder?: string
    unlinkPanels?: boolean | number
    defaultValue?: any
    defaultTime?: any
    customPrefix?: any
    readonly?: boolean | number
    clearable?: boolean | number
    id?: any
    name?: string
    clearIcon?: any
    validateEvent?: boolean
    teleported?: boolean
    editable?: boolean | number
}
const props = withDefaults(defineProps<baseState>(), {
    date: '',
    dateType: 'date',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    clearable: true,
})
const data = reactive({ ...props })

const change = () => {
    emit('change', { val: data.date })
}
const blur = () => {
    emit('blur', { val: data.date })
}
const focus = () => {
    emit('focus', { val: data.date })
}
const visibleChange = val => {
    emit('visibleChange', { val: val })
}
const panelChange = (date, mode, view) => {
    emit('panelChange', { date: date, mode: mode, view: view })
}
const handleOpen = () => {
    emit('handleOpen')
}
const handleClose = () => {
    emit('handleClose')
}
</script>

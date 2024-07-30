<template>
    <el-input
        v-model:value="state.textValue"
        class="btp-data-picker"
        readonly
        clearable
        @clear="onClearData"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @click="onPickDataClick"
    >
        <template #suffix>
            <div @click="onPickDataClick"><i class="bt-icon bt-icon-hand" /></div>
        </template>
        <slot />
    </el-input>
</template>
<script setup lang="ts">
import { reactive, watch, getCurrentInstance } from 'vue'

const emits = defineEmits([
    'update:modelValue',
    'update:textValue',
    'change',
    'clear',
    'blur',
    'focus',
])

const props = defineProps({
    parentCtx: Object,
    relativeRefId: String,
    relativeRef: Object,
})

const instance = getCurrentInstance()

//定义V-Model响应值
const state = reactive({
    value: instance?.attrs.modelValue as any,
    textValue: instance?.attrs.textValue as any,
})

/**
 * 进行V-Model监控
 */
watch(
    () => state.value,
    value => {
        state.value = value
        instance?.emit('update:modelValue', state.value)
    },
    { immediate: true },
)

/**
 * 进行V-Model监控
 */
watch(
    () => state.textValue,
    value => {
        state.textValue = value
        instance?.emit('update:textValue', state.textValue)
    },
    { immediate: true },
)

const onPickDataClick = () => {
    if (instance?.attrs.disabled != undefined && instance?.attrs.disabled != false) {
        return
    }
    const pickPageRef = getPickPageRef()
    if (!pickPageRef) {
        console.log('弹窗选择组件未配置或未找到弹窗页面')
        return
    }
    if (!pickPageRef.openDialogForPickData) {
        console.log('弹窗选择组件未配置的弹窗页面未提供openDialogForPickData方法')
        return
    }
    pickPageRef.openDialogForPickData((value, textValue) => {
        state.value = value
        state.textValue = textValue
        emits('change', state.value)
    })
}

const getPickPageRef = () => {
    if (props.relativeRef) {
        return props.relativeRef
    }
    if (props.relativeRefId && props.parentCtx && props.parentCtx.getRef) {
        return props.parentCtx.getRef(props.relativeRefId)
    }
    return null
}

const onClearData = () => {
    state.value = ''
    state.textValue = ''
    emits('clear')
    emits('change', state.value)
}
</script>

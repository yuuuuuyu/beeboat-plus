<template>
    <el-select
        ref="selectRef"
        v-bind="{ ...$props, ...$attrs }"
        v-model="state.value"
        class="bt-select"
        @change="$emit('update:modelValue', $event), $emit('change', $event)"
        @visible-change="$emit('visible-change', $event)"
        @remove-tag="$emit('remove-tag', $event)"
        @clear="$emit('clear', $event)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
    >
        <slot>
            <el-option
                v-for="item in state.options"
                :key="item.id"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
            />
        </slot>
        <template v-if="$slots.prefix" #prefix>
            <slot name="prefix"></slot>
        </template>
        <template v-if="$slots.empty" #empty>
            <slot name="empty"></slot>
        </template>
    </el-select>
</template>
<script lang="ts">
export default {
    name: 'BtSelect',
}
</script>
<script lang="ts" setup>
import { ref, watch, reactive, getCurrentInstance } from 'vue'
import { BtUseAppStore } from '@beeboat/core/store'

defineEmits([
    'update:modelValue',
    'change',
    'visible-change',
    'remove-tag',
    'clear',
    'blur',
    'focus',
])
const selectRef = ref()
const instance = getCurrentInstance()
const appStore = BtUseAppStore()

interface BtSelectProps {
    dictId?: string
    dataApi?: Function
    props?: any
}
const props = withDefaults(defineProps<BtSelectProps>(), {
    dictId: undefined,
    dataApi: undefined,
    props: { label: 'name', value: 'id' },
})

//定义V-Model响应值
const state = reactive({
    value: instance?.attrs.modelValue as any,
    props: (instance?.attrs.props as any) || {},
    options: [] as any,
})

watch(
    () => props.dictId,
    () => {
        loadOptionData()
    },
)
watch(
    () => props.dataApi,
    val => {
        loadOptionData()
    },
)
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

const clearApi = fn => {
    fn()
}
/**
 * 将ElementPlus的内置方法继续暴露出去
 */

defineExpose({
    selectRef,
    refresh: () => {
        loadOptionData()
    },
    clearApi,
})

/**
 * 加载动态选项数据
 */
const loadOptionData = () => {
    state.options = []
    if (props.dictId) {
        state.options = appStore.getDictById(props.dictId as string) || []
        state.options.forEach((item: any) => {
            item.label = item.name
            item.value = isNaN(parseInt(item.value)) ? item.value : parseInt(item.value)
        })
    } else if (props.dataApi) {
        props.dataApi().then((res: any) => {
            res.data.forEach((item: any) => {
                item.label = item[props.props.label]
                item.value = item[props.props.value]
            })
            state.options = res.data
        })
    }
}

//初始化数据
loadOptionData()
</script>

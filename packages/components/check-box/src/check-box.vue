<template>
    <el-checkbox-group
        v-bind="{ ...$props, ...$attrs }"
        v-model="state.value"
        @change="$emit('update:modelValue', $event), $emit('change', $event)"
    >
        <template v-if="!$slots.default">
            <el-checkbox v-for="item in state.options" :key="item.value" :label="item.value">
                {{ item.name }}
            </el-checkbox>
        </template>
        <slot></slot>
    </el-checkbox-group>
</template>
<script lang="ts">
export default {
    name: 'BtCheckboxGroup',
}
</script>
<script lang="ts" setup>
import { watch, reactive, getCurrentInstance } from 'vue'
import { BtUseAppStore } from '@beeboat/core/store'

defineEmits(['update:modelValue', 'change'])
const appStore = BtUseAppStore()
const instance = getCurrentInstance()

interface BtCheckboxGroupProps {
    dictId?: string
    dataApi?: Function
    props?: any
}
const props = withDefaults(defineProps<BtCheckboxGroupProps>(), {
    dictId: undefined,
    dataApi: undefined,
    props: { label: 'name', value: 'id' },
})
watch(
    () => props.dictId,
    () => {
        loadOptionData()
    },
)
watch(
    () => props.dataApi,
    () => {
        loadOptionData()
    },
)

const state = reactive({
    value: instance?.attrs.modelValue as any,
    options: [] as any,
})
//进行V-Model监控
watch(
    () => instance?.props.modelValue,
    value => {
        state.value = value
    },
)
/**
 * 加载动态选项数据
 */
const loadOptionData = () => {
    state.options = []
    if (props.dictId) {
        state.options = appStore.getDictById(props.dictId as string) || []
    } else if (props.dataApi) {
        props.dataApi().then((res: any) => {
            res.data.forEach((item: any) => {
                item.name = `${item[props.props.label]}`
                item.value = `${item[props.props.value]}`
            })
            state.options = res.data
        })
    }
}
//初始化数据
if (props.dictId || props.dataApi) {
    loadOptionData()
}
</script>

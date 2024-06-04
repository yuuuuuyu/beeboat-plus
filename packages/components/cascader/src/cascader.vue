<template>
    <el-cascader
        ref="cascaderRef"
        v-bind="{ ...$props, ...$attrs }"
        v-model="state.value"
        :options="props.options || state.options"
        @change="$emit('update:modelValue', $event), $emit('change', $event)"
        @expand-change="$emit('expand-change', $event)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @visible-change="$emit('visible-change', $event)"
        @remove-tag="$emit('remove-tag', $event)"
    >
        <template v-if="$slots.default" #default="{ node, data }">
            <component :is="render(node, data)" />
        </template>
    </el-cascader>
</template>
<script lang="ts">
export default {
    name: 'BtCascader',
}
</script>
<script lang="ts" setup>
import { h, ref, onMounted, watch, reactive, getCurrentInstance } from 'vue'
import { BtUseAppStore } from '@beeboat/core/store'

defineEmits([
    'update:modelValue',
    'change',
    'expand-change',
    'blur',
    'focus',
    'visible-change',
    'remove-tag',
])
const cascaderRef = ref()
const contentRef = ref()
const cascaderPanelRef = ref()
const instance = getCurrentInstance()
const appStore = BtUseAppStore()

interface BtCascaderProps {
    options?: any
    dictId?: string
    dataApi?: Function
    props?: any
}
const props = withDefaults(defineProps<BtCascaderProps>(), {
    dictId: undefined,
    dataApi: undefined,
    props: { label: 'name', value: 'id' },
    options: undefined,
})

/**
 * 继续绘制自定义插槽
 * @param node 节点
 * @param data 数据
 */
const render = (node, data) => {
    if (instance?.slots.default) {
        return h('span', {}, instance.slots.default({ node, data }))
    }
    return null
}
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
    () => {
        loadOptionData()
    },
)
/**
 * 进行V-Model监控
 */
watch(
    () => instance?.props.modelValue,
    value => {
        state.value = value
    },
)

onMounted(() => {
    //复制ElementPlus内置Ref对象
    contentRef.value = cascaderRef.value.contentRef
    cascaderPanelRef.value = cascaderRef.value.contentRef
})

/**
 * 将ElementPlus的内置方法继续暴露出去
 */
defineExpose({
    getCheckedNodes: () => {
        return cascaderRef.value.getCheckedNodes()
    },
    togglePopperVisible: () => {
        return cascaderRef.value.togglePopperVisible()
    },
    cascaderRef,
    contentRef,
    cascaderPanelRef,
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
                item.label = `${item[props.props.label]}`
                item.value = `${item[props.props.value]}`
            })
            state.options = res.data
        })
    }
}

//初始化数据
loadOptionData()
</script>

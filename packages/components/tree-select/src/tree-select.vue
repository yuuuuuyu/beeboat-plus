<template>
    <el-tree-select
        ref="treeSelectRef"
        v-bind="{ ...$props, ...$attrs }"
        v-model="state.value"
        :data="props.data || state.data"
        @change="$emit('update:modelValue', $event), $emit('change', $event)"
        @clear="$emit('clear')"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @visible-change="visibleChange"
        @remove-tag="removeTag"
        @node-click="nodeClick"
        @node-contextmenu="nodeContextmenu"
        @check-change="checkChange"
        @check="check"
        @current-change="currentChange"
        @node-expand="nodeExpand"
        @node-collapse="nodeCollapse"
        @node-drag-start="nodeDragStart"
        @node-drag-enter="nodeDragEnter"
        @node-drag-leave="nodeDragLeave"
        @node-drag-over="nodeDragOver"
        @node-drag-end="nodeDragEnd"
        @node-drop="nodeDrop"
    >
        <template v-if="$slots.default" #default="{ node, data }">
            <component :is="render(node, data)" />
        </template>
    </el-tree-select>
</template>
<script lang="ts">
export default {
    name: 'BtTreeSelect',
}
</script>
<script lang="ts" setup>
import { h, ref, onMounted, watch, reactive, getCurrentInstance } from 'vue'
import { BtUseAppStore } from '@beeboat/core/store'

const emits = defineEmits([
    'update:modelValue',
    'change',
    'clear',
    'blur',
    'focus',
    'visible-change',
    'remove-tag',
    'node-click',
    'node-contextmenu',
    'check-change',
    'check',
    'current-change',
    'node-expand',
    'node-collapse',
    'node-drag-start',
    'node-drag-enter',
    'node-drag-leave',
    'node-drag-over',
    'node-drag-end',
    'node-drop',
])
const treeSelectRef = ref()
const instance = getCurrentInstance()
const appStore = BtUseAppStore()

interface BtCascaderProps {
    data?: any
    dictId?: string
    dataApi?: Function
    props?: any
}
const props = withDefaults(defineProps<BtCascaderProps>(), {
    dictId: undefined,
    dataApi: undefined,
    props: { label: 'name', value: 'id' },
    data: undefined,
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
    data: [] as any,
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
})

/**
 * 将ElementPlus的内置方法继续暴露出去
 */
defineExpose({
    treeSelectRef,
})

/**
 * 加载动态选项数据
 */
const loadOptionData = () => {
    state.data = []
    if (props.dictId) {
        state.data = appStore.getDictById(props.dictId as string) || []
        state.data.forEach((item: any) => {
            item.label = item.name
            item.value = isNaN(parseInt(item.value)) ? item.value : parseInt(item.value)
        })
    } else if (props.dataApi) {
        props.dataApi().then((res: any) => {
            res.data.forEach((item: any) => {
                item.label = `${item[props.props.label]}`
                item.value = `${item[props.props.value]}`
            })
            state.data = res.data
        })
    }
}

//初始化数据
loadOptionData()

// 下拉框出现/隐藏时触发
const visibleChange = val => {
    emits('visible-change', val)
}
// 多选模式下移除tag时触发
const removeTag = val => {
    emits('remove-tag', val)
}
// 当节点被点击的时候触发
const nodeClick = (data, node, treeNode, event) => {
    emits('node-click', data, node, treeNode, event)
}
// 当某一节点被鼠标右键点击时会触发该事件
const nodeContextmenu = (event, data, node, self) => {
    emits('node-contextmenu', event, data, node, self)
}
// 当复选框被点击的时候触发
const checkChange = (data, selfCheck, childrenCheck) => {
    emits('check-change', data, selfCheck, childrenCheck)
}
// 点击节点复选框之后触发
const check = (data, selectObj) => {
    emits('check', data, selectObj)
}
// 当前选中节点变化时触发的事件
const currentChange = (data, node) => {
    emits('current-change', data, node)
}
// 节点被展开时触发的事件
const nodeExpand = (data, node, self) => {
    emits('node-expand', data, node, self)
}
// 节点被关闭时触发的事件
const nodeCollapse = (data, node, self) => {
    emits('node-collapse', data, node, self)
}
// 节点开始拖拽时触发的事件
const nodeDragStart = (node, event) => {
    emits('node-drag-start', node, event)
}
// 拖拽进入其他节点时触发的事件
const nodeDragEnter = (dragNode, node, event) => {
    emits('node-drag-enter', dragNode, node, event)
}
// 拖拽离开某个节点时触发的事件
const nodeDragLeave = (dragNode, node, event) => {
    emits('node-drag-leave', dragNode, node, event)
}
// 在拖拽节点时触发的事件
const nodeDragOver = (dragNode, node, event) => {
    emits('node-drag-over', dragNode, node, event)
}
// 拖拽结束时（可能未成功）触发的事件
const nodeDragEnd = (dragNode, node, position, event) => {
    emits('node-drag-end', dragNode, node, position, event)
}
// 拖拽结束时（可能未成功）触发的事件
const nodeDrop = (dragNode, node, position, event) => {
    emits('node-drop', dragNode, node, position, event)
}
</script>

<template>
    <div class="bt-tree">
        <!--搜索栏-->
        <slot name="treeSearchbar">
            <div v-if="props.showFilterInput" class="bt-tree--searchbar">
                <el-input
                    v-model.trim="state.searchText"
                    :placeholder="props.placeholder"
                    clearable
                    @keyup.enter="onEnterClick"
                >
                    <template #suffix>
                        <el-button link>
                            <em class="bt-icon bt-icon-search" @click="onEnterClick"></em>
                        </el-button>
                    </template>
                </el-input>
            </div>
        </slot>
        <!--按钮栏-->
        <div class="bt-tree--toolbar">
            <slot name="treeToolbar"></slot>
        </div>
        <div class="bt-tree--content">
            <el-scrollbar>
                <el-tree
                    ref="elTreeRef"
                    :key="keyRandom"
                    v-bind="{ ...$props, ...$attrs }"
                    :data="props.data || state.data"
                    :filter-node-method="filterNode"
                    :default-expanded-keys="expandedKeys"
                    node-key="id"
                    @node-click="(v1, v2, v3, v4) => emits('node-click', v1, v2, v3, v4)"
                    @node-contextmenu="
                        (v1, v2, v3, v4) => $emit('node-contextmenu', v1, v2, v3, v4)
                    "
                    @check-change="(v1, v2, v3) => $emit('check-change', v1, v2, v3)"
                    @check="(v1, v2) => $emit('check', v1, v2)"
                    @current-change="(v1, v2) => $emit('current-change', v1, v2)"
                    @node-expand="nodeExpand"
                    @node-collapse="nodeCollapse"
                    @node-drag-start="(v1, v2) => $emit('node-drag-start', v1, v2)"
                    @node-drag-enter="(v1, v2, v3) => $emit('node-drag-enter', v1, v2, v3)"
                    @node-drag-leave="(v1, v2, v3) => $emit('node-drag-leave', v1, v2, v3)"
                    @node-drag-over="(v1, v2, v3) => $emit('node-drag-over', v1, v2, v3)"
                    @node-drag-end="(v1, v2, v3, v4) => $emit('node-drag-end', v1, v2, v3, v4)"
                    @node-drop="(v1, v2, v3, v4) => $emit('node-drop', v1, v2, v3, v4)"
                >
                    <template #default="{ node, data }">
                        <slot :node="node" :data="data">
                            <!--内容前插槽-->
                            <slot name="prepend" :node="node" :data="data"></slot>
                            <!--文本插槽-->
                            <slot name="content" :node="node" :data="data">
                                <span class="bt-tree-node__label">
                                    {{ data[props.props.label || 'name'] }}
                                </span>
                            </slot>
                            <!--内容后插槽-->
                            <span v-show="showToolbar(node)">
                                <slot name="append" :node="node" :data="data"></slot>
                            </span>
                        </slot>
                    </template>
                </el-tree>
            </el-scrollbar>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtTree',
}
</script>
<script lang="ts" setup>
import { useAttrs, ref, onMounted, watch, reactive, getCurrentInstance } from 'vue'
import { BtUseAppStore } from '@beeboat/core/store'

const emits = defineEmits([
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

    'sync-expanded',
    'clear',
])
const attrs = useAttrs()
const elTreeRef = ref()
const keyRandom = ref()
const instance = getCurrentInstance()
const appStore = BtUseAppStore()

interface BtTreeProps {
    toolbarMode: string
    data?: any
    nodeKey?: string
    dictId?: string
    dataApi?: Function
    props?: any
    showFilterInput: boolean
    placeholder: string
}
const props = withDefaults(defineProps<BtTreeProps>(), {
    toolbarMode: 'select',
    data: undefined,
    nodeKey: 'id',
    dictId: undefined,
    dataApi: undefined,
    props: { label: 'name', value: 'id', children: 'children' },
    showFilterInput: true,
    placeholder: '请输入',
})

//定义V-Model响应值
const state = reactive({
    props: (instance?.attrs.props as any) || {},
    data: [] as any,
    searchText: '',
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
watch(
    () => state.searchText,
    value => {
        value == '' && loadOptionData()
        emits('clear')
    },
)
onMounted(() => {
    //复制ElementPlus内置Ref对象
})

/**
 * 是否展示工具栏按钮
 * @param node 节点
 */
const showToolbar = node => {
    return (props.toolbarMode == 'select' && node.isCurrent) || props.toolbarMode == 'always'
}
//执行过滤搜索
const onEnterClick = () => {
    elTreeRef.value!.filter(state.searchText)
}
/**
 * 过滤显示数据
 * @param value 值
 * @param data 数据
 */
const filterNode = (value: string, data: any) => {
    if (attrs['filter-node-method']) {
        return (attrs['filter-node-method'] as any)(value, data)
    } else {
        return !value || data[props.props.label]?.includes(value)
    }
}

/**
 * 递归查询主键
 * @param dataList 数据
 * @param keyList 主键列表
 */
const recursionKeys = (dataList, keyList: any) => {
    if (dataList) {
        dataList.forEach(item => {
            keyList.push(item[props.props.value])
            recursionKeys(item[props.props.children], keyList)
        })
    }
    return keyList
}
/**
 * 选中所有节点
 */
const checkAll = () => {
    elTreeRef.value.setCheckedKeys(recursionKeys(state.data, []), false)
}

/**
 * 收集展开的节点
 */
const expandedKeys = ref([]) as any
const nodeExpand = (v1, v2, v3) => {
    expandedKeys.value.push(v1.id)
    emits('node-expand', v1, v2, v3)
    emits('sync-expanded', expandedKeys)
}
const nodeCollapse = (v1, v2, v3) => {
    const _index = expandedKeys.value.findIndex(v => v == v1.id)
    if (_index != -1) {
        expandedKeys.value.splice(_index, 1)
    }
    emits('node-collapse', v1, v2, v3)
    emits('sync-expanded', expandedKeys)
}
const setSyncExpanded = (expanded: Array<any>) => {
    expandedKeys.value = [...expanded.value]
    // 处理左右树联动
    keyRandom.value = Math.random()
}
/**
 * 将ElementPlus的内置方法继续暴露出去
 */
defineExpose({
    elTreeRef,
    getData: () => {
        return state.data
    },
    checkAll: () => {
        checkAll()
    },
    filter: value => {
        elTreeRef.value.filter(value)
    },
    updateKeyChildren: (key, data) => {
        elTreeRef.value.updateKeyChildren(key, data)
    },
    getCheckedNodes: (leafOnly, includeHalfChecked) => {
        return elTreeRef.value.getCheckedNodes(leafOnly, includeHalfChecked)
    },
    setCheckedNodes: value => {
        elTreeRef.value.setCheckedNodes(value)
    },
    getCheckedKeys: leafOnly => {
        return elTreeRef.value.getCheckedKeys(leafOnly)
    },
    setCheckedKeys: (keys, leafOnly) => {
        elTreeRef.value.setCheckedKeys(keys, leafOnly)
    },
    setChecked: (data, checked, deep) => {
        elTreeRef.value.setChecked(data, checked, deep)
    },
    getHalfCheckedNodes: () => {
        return elTreeRef.value.getHalfCheckedNodes()
    },
    getHalfCheckedKeys: () => {
        return elTreeRef.value.getHalfCheckedKeys()
    },
    getCurrentKey: () => {
        return elTreeRef.value.getCurrentKey()
    },
    getCurrentNode: () => {
        return elTreeRef.value.getCurrentNode()
    },
    setCurrentKey: (key, shouldAutoExpandParent) => {
        elTreeRef.value.setCurrentKey(key, shouldAutoExpandParent)
    },
    setCurrentNode: (node, shouldAutoExpandParent) => {
        elTreeRef.value.setCurrentNode(node, shouldAutoExpandParent)
    },
    getNode: data => {
        return elTreeRef.value.getNode(data)
    },
    remove: data => {
        elTreeRef.value.remove(data)
    },
    append: (data, parentNode) => {
        elTreeRef.value.append(data, parentNode)
    },
    insertBefore: (data, refNode) => {
        elTreeRef.value.insertBefore(data, refNode)
    },
    insertAfter: (data, refNode) => {
        elTreeRef.value.insertAfter(data, refNode)
    },
    refresh: () => {
        loadOptionData()
    },
    setSyncExpanded,
})

/**
 * 加载动态选项数据
 */
const loadOptionData = () => {
    if (props.dictId) {
        state.data = appStore.getDictById(props.dictId as string) || []
        state.data.forEach((item: any) => {
            item.label = item.name
        })
    } else if (props.dataApi) {
        state.data = []
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
</script>

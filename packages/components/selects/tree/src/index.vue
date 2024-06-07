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
                            <em class="bt-icon bt-icon-search" @click="onEnterClick" />
                        </el-button>
                    </template>
                </el-input>
            </div>
        </slot>
        <!--按钮栏-->
        <div class="bt-tree--toolbar">
            <slot name="treeToolbar">
                <template v-if="btConfig?.toolbar?.children?.length > 0">
                    <template :key="component.id" v-for="component in btConfig?.toolbar?.children">
                        <component
                            :is="btViewContext.render(component)"
                            :style="component.styles"
                            :bt-view-context="btViewContext"
                            :bt-config="component"
                            v-on="component.actions"
                            v-bind="component.props"
                        />
                    </template>
                </template>
            </slot>
        </div>
        <div class="bt-tree--content">
            <el-scrollbar>
                <el-tree
                    ref="elTreeRef"
                    v-bind="{ ...$props, ...$attrs }"
                    :data="props.data || state.options"
                    :filter-node-method="filterNode"
                    :default-expanded-keys="expandedKeys"
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
                            <slot name="prepend" :node="node" :data="data" />
                            <!--文本插槽-->
                            <slot name="content" :node="node" :data="data">
                                <span class="bt-tree-node__label">
                                    {{ data[props.props.label || 'name'] }}
                                </span>
                            </slot>
                            <!--内容后插槽-->
                            <span v-show="showToolbar(node)">
                                <slot name="append" :node="node" :data="data">
                                    <template v-if="btConfig?.children?.length > 0">
                                        <template
                                            :key="component.id"
                                            v-for="component in btConfig?.children"
                                        >
                                            <component
                                                :is="btViewContext.render(component)"
                                                :style="component.styles"
                                                :bt-view-context="btViewContext"
                                                :bt-config="component"
                                                v-on="component.actions"
                                                v-bind="component.props"
                                            />
                                        </template>
                                    </template>
                                </slot>
                            </span>
                        </slot>
                    </template>
                </el-tree>
            </el-scrollbar>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, useAttrs } from 'vue'
import { useSelects } from '../../use-selects'

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

const props = defineProps({
    /**
     * @description 节点工具栏模式
     */
    data: {
        type: Array,
        default: undefined,
    },
    /**
     * @description 节点工具栏模式
     */
    nodeKey: {
        type: String,
        default: 'id',
    },
    /**
     * @description 节点工具栏模式
     */
    toolbarMode: {
        type: String,
        default: 'select',
    },
    /**
     * @description 是否显示过滤文本框
     */
    showFilterInput: {
        type: Boolean,
        default: true,
    },
    /**
     * @description 过滤框placeholder
     */
    placeholder: {
        type: String,
        default: '请输入',
    },
    /**
     * @description 数据字典标识
     */
    dictId: {
        type: String,
        default: undefined,
    },
    /**
     * @description 动态数据接口
     */
    dataApi: {
        type: Object,
        default: undefined,
    },
    /**
     * @description 动态数据接口属性
     */
    props: {
        type: Object,
        default() {
            return { label: 'name', value: 'id', children: 'children' }
        },
    },
    /**
     * @description 视图动态配置
     */
    btConfig: {
        type: Object,
        default: undefined,
    },
    /**
     * @description 视图动态配置
     */
    btViewContext: {
        type: Object,
        default: undefined,
    },
})
const attrs = useAttrs()
const elTreeRef = ref()
const expandedKeys = ref([]) as any

//定义V-Model响应值
const state = reactive({
    options: [] as any,
    searchText: '',
})

const { loadOptionData } = useSelects(state, props)

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
    elTreeRef.value.setCheckedKeys(recursionKeys(state.options, []), false)
}

/**
 * 收集展开的节点
 */
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

loadOptionData()

/**
 * 将ElementPlus的内置方法继续暴露出去
 */
defineExpose({
    elTreeRef,
    getData: () => {
        return state.options
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
</script>

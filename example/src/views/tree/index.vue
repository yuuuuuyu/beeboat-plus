<template>
    <div>
        <div>树组件</div>
        <el-input v-model="filterText" placeholder="Filter keyword" @input="inputFilterText" />
        <BtTree
            ref="btTree"
            v-slot="scope"
            :filter-text="filterText"
            :tree-data="treeData"
            :default-tree-props="baseState.defaultTreeProps"
            :accordion="baseState.accordion"
            :show-checkbox="baseState.showCheckBox"
            :default-expand-all="baseState.defaultExpandAll"
            :node-key="`${baseState.defaultTreeProps.id}`"
            :default-expanded-keys="baseState.defaultExpandedKeys"
            :default-checked-keys="baseState.defaultCheckedKeys"
            @node-click="nodeClick"
            @check-change="checkChange"
        >
            <div>
                {{ scope.slotData.data[`${baseState.defaultTreeProps.label}`] }}
                <el-icon @click.stop="clickPlus"><Plus /></el-icon>
                <el-icon><EditPen /></el-icon>
                <el-icon><Delete /></el-icon>
            </div>
        </BtTree>
    </div>
</template>

<script lang="ts" setup>
import { Plus, EditPen, Delete } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

const btTree = ref()
// 过滤节点内容
const filterText = ref('')
const baseState = reactive({
    accordion: false, //非必填
    showCheckBox: 0, //非必填
    defaultExpandAll: false, // 非必填-- 是否展开全部
    defaultExpandedKeys: [1, 4, 6], //非必填-- 默认展开节点
    defaultCheckedKeys: [6], //非必填-- 默认选中节点
    defaultTreeProps: {
        label: 'name', //非必填-- 默认label
        children: 'children', //非必填-- 节点
        disabled: 'disabled', //非必填-- 禁用
        id: 'id', //非必填-- 节点数据中的一个字段名，该字段在整棵树中是唯一的。
    },
})

const clickPlus = () => {
    console.log('点击了添加按钮')
}

// 点击节点获取信息
const nodeClick = val => {
    console.log('------------', val.data, val.node)
}

// 开启节点选择时--->选择节点返回信息
const checkChange = val => {
    console.log('checkChange-----------', val.data, val.checked, val.indeterminate)
}

// 节点过滤信息
const inputFilterText = () => {
    console.log('filterText-------------', filterText.value)
}

// 树数据
const treeData = [
    {
        name: 'Level one 1',
        disabled: true,
        id: 1,
        children: [
            {
                name: 'Level two 1-1',
                id: 4,
                children: [
                    {
                        name: 'Level three 1-1-1',
                        id: 9,
                    },
                ],
            },
        ],
    },
    {
        name: 'Level one 2',
        id: 2,
        children: [
            {
                name: 'Level two 2-1',
                id: 5,
                children: [
                    {
                        name: 'Level three 2-1-1',
                        id: 6,
                        children: [
                            {
                                name: 'xxxxxxxxxx',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Level two 2-2',
                id: 7,
                children: [
                    {
                        name: 'Level three 2-2-1',
                    },
                ],
            },
        ],
    },
    {
        name: 'Level one 3',
        id: 11,
        children: [
            {
                name: 'Level two 3-1',
                children: [
                    {
                        name: 'Level three 3-1-1',
                    },
                ],
            },
            {
                name: 'Level two 3-2',
                children: [
                    {
                        name: 'Level three 3-2-1',
                    },
                ],
            },
        ],
    },
]
</script>

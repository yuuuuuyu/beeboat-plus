<template>
    <div style="display: flex; flex-direction: column; width: 100%; height: 100%">
        <div style="height: 200px">12</div>
        <div style="flex: 1; overflow: hidden">
            <BtTree
                ref="btTree"
                :data-api="abcdde"
                :show-checkbox="true"
                :props="defaultProps"
                node-key="id"
                :check-strictly="true"
                @node-click="handleNodeClick"
            >
                <template #treeToolbar>
                    <el-space>
                        <el-button @click="abc"> Append </el-button>
                        <el-button style="margin-left: 8px"> Delete </el-button>
                    </el-space>
                </template>
                <template #prepend="{ node, data }">
                    <span class="custom-tree-node">
                        <span>
                            <a @click="abc"> Append </a>
                            <a style="margin-left: 8px"> Delete </a>
                        </span>
                    </span>
                </template>
                <template #append="{ node, data }">
                    <span class="custom-tree-node">
                        <span>
                            <el-button link @click="abc"> Append </el-button>
                            <el-button link style="margin-left: 8px"> Delete </el-button>
                        </span>
                    </span>
                </template>
            </BtTree>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
const btTree = ref()
onMounted(() => {
    btTree.value.setCheckedKeys(['1-1', '2-2'], true)
})
interface Tree {
    id: string
    label2: string
    children?: Tree[]
}
const abcdde = () => {
    return new Promise(resolve => {
        resolve({ code: 0, data: data })
    })
}
const abc = () => {
    console.log('1111111111111111')
}
const handleNodeClick = (data, data2, data3, data4, data5) => {
    console.log(data)
    console.log(data2)
    console.log(data3)
    console.log(data4)
    console.log(data5)
}

const data: Tree[] = [
    {
        label2: 'Level one 1',
        id: '1',
        children: [
            {
                label2: 'Level two 1-1',
                id: '1-1',
                children: [
                    {
                        id: '1-1-1',
                        label2: 'Level three 1-1-1',
                    },
                ],
            },
        ],
    },
    {
        label2: 'Level one 2',
        id: '2',
        children: [
            {
                label2: 'Level two 2-1',
                id: '2-2',
                children: [
                    {
                        id: '2-2-2',
                        label2: 'Level three 2-1-1',
                    },
                ],
            },
        ],
    },
]

const defaultProps = {
    children: 'children',
    label: 'label2',
    class: 'abcdefgh',
}
</script>

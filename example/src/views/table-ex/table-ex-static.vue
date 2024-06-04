<template>
    <el-button @click="addColumn">加列</el-button>
    <el-button @click="getSelect">获取选中</el-button>
    <div style="box-sizing: border-box; width: 100%; height: 100%; padding: 50px">
        <BtTableEx
            ref="tableRef"
            v-bind="tableConfig"
            :columns="state.columnList"
            :data="staticData"
            :reserve-selection="true"
        />
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useSearchData } from './data-static'
const { tableConfig, columnList, staticData } = useSearchData()

const state = reactive({
    columnList: JSON.parse(JSON.stringify(columnList)),
})
let newIndex = 1
const tableRef = ref()
const addColumn = () => {
    newIndex++
    state.columnList.push({
        id: `idx${newIndex}`,
        label: `新列${newIndex}`,
        prop: `entityName${newIndex}`,
        columnType: 3,
        searchProps: {
            searchVisible: false,
            enable: true,
            componentType: 'date',
            supportConditionList: ['ne', 'like', 'eq', 'isNull', 'notlike', 'isNotNull', 'gele'],
        },
    })
    tableRef.value.doLayout()
}
const getSelect = () => {
  console.log(tableRef.value.getSelection(), '1111')
}
</script>

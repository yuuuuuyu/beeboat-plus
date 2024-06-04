<template>
    <div style="box-sizing: border-box; width: 100%; height: 100%; padding: 50px">
      <el-button @click="test">功能测试</el-button>
        <BtTableEx
            v-bind="tableConfig"
            ref="btTableEx"
            :columns="columnList"
            :request-api="dataApi"
            :init-loading="true"
            border
            :highlight-current-row="true"
            :init-param="initParam"
            :selectable="row => true"
            :reserve-selection="true"
            @edit-change="editChange"
            @search="search"
            @row-click="rowClick"
            @selection-change="selectionChange"
        >
            <template #tableHeaderSearch>
                <bt-table-screen-item label="审批单号1">
                    <el-input v-model="initParam.code" clearable placeholder="请输入" autosize />
                </bt-table-screen-item>
            </template>
            <!-- <template #BtTableExColumnoperateContent="scope">
                <bt-button type="primary" :link="true" @click="edit(scope)"> 编辑 </bt-button>
                <bt-button type="primary" :link="true" @click="save(scope)"> 保存 </bt-button>
                <bt-button type="danger" :link="true" @click="cancel(scope)"> 取消 </bt-button>
            </template> -->
            <template #tableHeaderLeft="scope">
                <el-space>
                    <bt-button type="danger" @click="getSelectionRow">获取选中数据</bt-button>
                    <bt-button type="danger" @click="reset">重置分页器</bt-button>
                    <!-- <bt-button ref="addService" class="addService" type="primary" @click="clear">
                        清除勾选
                    </bt-button> -->
                    <!-- 内置按钮位置 -->
                    <!-- <bt-button type="primary" @click="edit(scope)"> 编辑 </bt-button>
                    <bt-button type="primary" @click="save(scope)"> 保存 </bt-button>
                    <bt-button type="danger" @click="cancel(scope)"> 取消 </bt-button> -->
                </el-space>
            </template>
            <template #tableHeaderRight="scope">
                <el-space>
                    <el-button type="primary" @click="add(scope, 'top')"> 添加 </el-button>
                    <el-button type="primary" @click="add(scope, 'selection')">
                        勾选位置添加
                    </el-button>
                </el-space>
            </template>
            <!-- <template #operate="scope">
                <el-table-column v-bind="column" label="操作">
                    <el-space>
                        <bt-button> 编辑 </bt-button>
                    </el-space>
                </el-table-column>
            </template> -->
        </BtTableEx>
    </div>
</template>
<script setup lang="ts">
import { useSearchData } from './data'
import { useDataLoader } from './api'
import { ref } from 'vue'
const { tableConfig, columnList, staticData } = useSearchData()
console.log(tableConfig, '-----')

const { dataApi } = useDataLoader(staticData)

const btTableEx = ref()
const initParam = ref({
    code: '',
})

setTimeout(() => {
    btTableEx.value.setCurrentRow(staticData[0])
}, 4000)

const editChange = val => {
    console.log(val, '-----')
}
const reset = val => {
    console.log('重置', val)
    // val.pageNumber = 3
    console.log(btTableEx.value.paginationRef.resetPagination())
}
const search = () => {
    console.log('高级搜索')
}
const rowClick = () => {}
const selectionChange = selection => {
    console.log(selection)
}
const add = (data, position) => {
    btTableEx.value.todoEdit(columnList, { type: 'add', position: position })
}
// const onBeforeQuery = param => {
//     console.log('请求参数', param)
//     return false
// }

const getSelectionRow = () => {
    console.log(btTableEx.value.getSelectionRows(), '-----')
}
const clear = () => {
    btTableEx.value.clearSelection()
}
const test = () => {
  console.log(btTableEx.value.getSelection(), '1111')
}
</script>

<template>
    <div style="height: 600px">
        <BtpTable
            ref="tableRef"
            :search="search"
            :columns="columns.children"
            :pagination="pagination"
            :editProps="editProps"
            v-bind="table"
        >
            <template #index13>
                <el-table-column label="222"></el-table-column>
            </template>
            <template #toolbar>
                <el-button @click="onClick">123</el-button>
                <el-button @click="onSaveClick">保存</el-button>
            </template>
        </BtpTable>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDataLoader, columns, pagination, search, editProps } from './table-data'

const { dataApi } = useDataLoader()
const tableRef = ref()
const onClick = () => {
    tableRef.value.editor.cancelAll()
}
const onSaveClick = () => {
    tableRef.value.editor.saveAll()
}

const table = {
    id: '123',
    columnSetting: true,
    dataApi: dataApi,
    rowKey: 'id',
    border: true,
}
</script>

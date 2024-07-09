<template>
    <div style="width: 500px; height: 500px; background: lightblue">
        <btp-tabs
            class="btp-tabs"
            v-model="state.value"
            style="width: 100%; height: 100%; padding: 9px"
        >
            <el-tab-pane label="User" name="first">
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
            </el-tab-pane>
            <el-tab-pane label="Config" name="second">Config</el-tab-pane>
            <el-tab-pane label="Role" name="third">Role</el-tab-pane>
            <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
        </btp-tabs>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useDataLoader, columns, pagination, search, editProps } from '../tables/table-data'

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

const state = reactive({
    value: 'second',
    value2: 2,
})

</script>

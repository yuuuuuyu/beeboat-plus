<template>
    <el-dialog
        v-model="ctx.dialogData.dialogVisible"
        title="111"
        :append-to-body="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="1500"
        height="800px"
    >
        <div style="box-sizing: border-box; width: 100%; height: 400px; padding: 10px">
            <BtTableEx
                ref="tableRef"
                v-bind="tableConfig"
                :columns="state.columnList"
                :data="staticData"
                :reserve-selection="true"
            />
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="ctx.closeDialog(true)">Cancel</el-button>
                <el-button type="primary" @click="onOkClick"> Confirm </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, provide, inject, getCurrentInstance } from 'vue'
import BaseUnitInfoEditPageContext from './index'
import { useSearchData } from '../table-ex/data-static'
const { tableConfig, columnList, staticData } = useSearchData()

const state = reactive({
    columnList: JSON.parse(JSON.stringify(columnList)),
})

const ctx = new BaseUnitInfoEditPageContext(inject('ctx'), getCurrentInstance())
provide('ctx', ctx)
defineExpose(ctx.getExpose())

const onOkClick = () => {
    ctx.pickData()
}
</script>

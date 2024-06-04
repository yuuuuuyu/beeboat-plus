<template>
  <el-button @click="rest">功能测试</el-button>
    <bt-table-v2 v-bind="tableConfig"  :columns="columnList" :request-api="dataApi"
    ref="tableRef"
    />
</template>

<script lang="ts" setup>
import { useSearchData } from './data'
import { useDataLoader } from './api'
import {ref} from "vue";

const { tableConfig, columnList, staticData } = useSearchData()

const { dataApi } = useDataLoader(staticData)
const tableRef = ref()

const rest = ()=>{
  tableRef.value.getSelection()
}
</script>

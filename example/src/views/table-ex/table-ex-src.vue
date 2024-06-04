<template>
  <div style="box-sizing: border-box; width: 100%; height: 100%; padding: 50px">
    <BtTableEx
        ref="tableRef"
        v-bind="tableConfig"
        :columns="columnList"
        :data="staticData"
    />
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import { useSearchData } from './data-src'
const { tableConfig, columnList, staticData } = useSearchData()


let newIndex = 1
const tableRef = ref()

</script>


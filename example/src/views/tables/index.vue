<template>
    <div class="aa">123{{ vv.pageSize }}--{{ vv.currentPage }}</div>
    <btp-button>123</btp-button>
    <btp-pagination
    :current-row="vv.currentRow"
    :current-page="vv.currentPage"
    :page-size="vv.pageSize"
    :selection="vv.selection"
    :total="vv.total"
    @size-change="onChange"
    @current-change="onChange"
    @change="onChange2"
    @prev-click="onChange"
    @next-click="onChange"
    />
    <btp-adv-searchbar :enableAdvSearch="true"></btp-adv-searchbar>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const vv = reactive({
    selection:[],
    pageNumber:1,
    pageSize:20,
    total:1000,
    currentPage:2,
    currentRow:{},
})
const onChange = (v1,v2)=>{
    console.log(v1,v2)
    vv.currentPage = 3
}
const onChange2 = (v1,v2)=>{
    console.log(v1,v2)
}
</script>
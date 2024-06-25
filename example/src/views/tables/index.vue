<template>
    <btp-button :btConfig="vv.btconfig" :loading="true">33
        <template #loading>
            <div class="custom-loading">
                <svg class="circular" viewBox="-10, -10, 50, 50">
                <path
                    class="path"
                    d="
                    M 30 15
                    L 28 17
                    M 25.61 25.61
                    A 15 15, 0, 0, 1, 15 30
                    A 15 15, 0, 1, 1, 27.99 7.5
                    L 15 15
                "
                    style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
                />
                </svg>
            </div>
            </template>
    </btp-button>
    <div class="aa">123{{ vv.pageSize }}--{{ vv.currentPage }}</div>
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
    btconfig:{name:'1234bbbbb'},
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
<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Table 表格</span>
            </div>
        </template>
        <div>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="12"><table1 /></el-col>
                <el-col :span="12"><table2 /></el-col>
            </el-row>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="12"><table3 /></el-col>
                <el-col :span="12"><table4 /></el-col>
            </el-row>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="12"><table5 /></el-col>
                <el-col :span="12"><table6 /></el-col>
            </el-row>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="12"><table7 /></el-col>
                <el-col :span="12"><table8 /></el-col>
            </el-row>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="12"><table9 /></el-col>
                <el-col :span="12"><table10 /></el-col>
            </el-row>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="12"><table11 /></el-col>
                <el-col :span="12"><table12 /></el-col>
            </el-row>
        </div>
    </el-card>
</template>
<script setup lang="ts">
import table1 from './ever-el-table/01.vue'
import table2 from './ever-el-table/02.vue'
import table3 from './ever-el-table/03.vue'
import table4 from './ever-el-table/04.vue'
import table5 from './ever-el-table/05.vue'
import table6 from './ever-el-table/06.vue'
import table7 from './ever-el-table/07.vue'
import table8 from './ever-el-table/08.vue'
import table9 from './ever-el-table/09.vue'
import table10 from './ever-el-table/10.vue'
import table11 from './ever-el-table/11.vue'
import table12 from './ever-el-table/12.vue'
</script>

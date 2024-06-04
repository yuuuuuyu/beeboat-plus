<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Tag 标签</span>
            </div>
        </template>
        <div>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="12"><tag1 /></el-col>
                <el-col :span="12"><tag2 /></el-col>
            </el-row>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="12"><tag3 /></el-col>
                <el-col :span="12"><tag4 /></el-col>
            </el-row>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="12"><tag5 /></el-col>
                <el-col :span="12"><tag6 /></el-col>
            </el-row>
        </div>
    </el-card>
</template>
<script setup lang="ts">
import tag1 from './ever-el-tag/01.vue'
import tag2 from './ever-el-tag/02.vue'
import tag3 from './ever-el-tag/03.vue'
import tag4 from './ever-el-tag/04.vue'
import tag5 from './ever-el-tag/05.vue'
import tag6 from './ever-el-tag/06.vue'
</script>

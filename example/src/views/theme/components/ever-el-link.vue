<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Link 链接</span>
            </div>
        </template>
        <div>
            <el-divider content-position="left">基础用法</el-divider>
            <el-row class="ever-el-row">
                <el-link href="https://element.eleme.io" target="_blank">default</el-link>
                <el-link type="primary">primary</el-link>
                <el-link type="success">success</el-link>
                <el-link type="warning">warning</el-link>
                <el-link type="danger">danger</el-link>
                <el-link type="info">info</el-link>
            </el-row>
        </div>
        <div>
            <el-divider content-position="left">禁用状态</el-divider>
            <el-row class="ever-el-row">
                <el-link disabled>default</el-link>
                <el-link type="primary" disabled>primary</el-link>
                <el-link type="success" disabled>success</el-link>
                <el-link type="warning" disabled>warning</el-link>
                <el-link type="danger" disabled>danger</el-link>
                <el-link type="info" disabled>info</el-link>
            </el-row>
        </div>
        <div>
            <el-divider content-position="left">下划线</el-divider>
            <el-row class="ever-el-row">
                <el-link :underline="false">Without Underline</el-link>
                <el-link>With Underline</el-link>
            </el-row>
        </div>
        <div>
            <el-divider content-position="left">图标</el-divider>
            <el-row class="ever-el-row">
                <el-link :icon="Edit">Edit</el-link>
                <el-link>
                    Check<el-icon class="el-icon--right"><icon-view /></el-icon>
                </el-link>
            </el-row>
        </div>
    </el-card>
</template>
<script setup lang="ts">
import { Edit, View as IconView } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-link {
    margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
    vertical-align: text-bottom;
}
</style>

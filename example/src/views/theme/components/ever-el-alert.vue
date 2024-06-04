<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Alert 提示</span>
            </div>
        </template>
        <div>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="12">
                    <el-alert title="success alert" type="success" />
                    <el-alert title="info alert" type="info" />
                    <el-alert title="warning alert" type="warning" />
                    <el-alert title="error alert" type="error" />
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>
<script setup lang="ts"></script>

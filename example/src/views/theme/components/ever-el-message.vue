<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Message 消息提示</span>
            </div>
        </template>
        <div>
            <el-button :plain="true" @click="open2">success</el-button>
            <el-button :plain="true" @click="open3">warning</el-button>
            <el-button :plain="true" @click="open1">message</el-button>
            <el-button :plain="true" @click="open4">error</el-button>
        </div>
    </el-card>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'

const open1 = () => {
    ElMessage('this is a message.')
}
const open2 = () => {
    ElMessage({
        message: 'Congrats, this is a success message.',
        type: 'success',
    })
}
const open3 = () => {
    ElMessage({
        message: 'Warning, this is a warning message.',
        type: 'warning',
    })
}
const open4 = () => {
    ElMessage.error('Oops, this is a error message.')
}
</script>

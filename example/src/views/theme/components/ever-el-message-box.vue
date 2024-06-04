<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Message 消息提示</span>
            </div>
        </template>
        <div>
            <el-button text @click="open">Click to open the Message Box</el-button>
        </div>
    </el-card>
</template>
<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'

const open = () => {
    ElMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
    })
        .then(() => {
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}
</script>

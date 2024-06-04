<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Calendar 日历</span>
            </div>
        </template>
        <div>
            <el-calendar v-model="value" />
        </div>
    </el-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date())
</script>

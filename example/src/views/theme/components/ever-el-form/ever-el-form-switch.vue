<template>
    <el-divider content-position="center">Switch 开关</el-divider>
    <el-form
        ref="formRef"
        style="width: 100%"
        :model="form"
        label-width="120px"
        label-position="top"
        :rules="rules"
    >
        <el-form-item label="开关">
            <el-switch v-model="form.switch" />
        </el-form-item>
        <el-form-item label="开关-自定义颜色">
            <el-switch
                v-model="form.switch"
                class="ml-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            />
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const form = ref({
    switch: true,
    range: [2, 5],
})
const rules = {}
</script>

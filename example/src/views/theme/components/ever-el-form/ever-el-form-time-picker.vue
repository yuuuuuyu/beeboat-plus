<template>
    <el-divider content-position="center">TimePicker 时间选择器</el-divider>
    <el-form
        ref="formRef"
        style="width: 100%"
        :model="form"
        label-width="120px"
        label-position="top"
        :rules="rules"
    >
        <el-form-item label="时间选择器">
            <el-time-picker v-model="form.value1" placeholder="Arbitrary time" />
        </el-form-item>
        <el-form-item label="时间选择器">
            <el-time-picker v-model="form.value2" arrow-control placeholder="Arbitrary time" />
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const form = ref({
    value1: undefined,
    value2: undefined,
})
const rules = {}
</script>

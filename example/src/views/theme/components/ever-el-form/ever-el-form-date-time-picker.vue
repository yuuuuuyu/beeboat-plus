<template>
    <el-divider content-position="center">DateTimePicker 日期时间选择器</el-divider>
    <el-form
        ref="formRef"
        style="width: 100%"
        :model="form"
        label-width="120px"
        label-position="top"
        :rules="rules"
    >
        <el-form-item label="时间选择器">
            <el-date-picker
                v-model="form.value1"
                type="datetime"
                placeholder="Select date and time"
            />
        </el-form-item>
        <el-form-item label="时间选择器">
            <el-date-picker
                v-model="form.value2"
                type="datetime"
                placeholder="Select date and time"
                :shortcuts="shortcuts"
            />
        </el-form-item>
        <el-form-item label="时间选择器">
            <el-date-picker
                v-model="form.value3"
                type="datetime"
                placeholder="Select date and time"
                :default-time="defaultTime"
            />
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const form = ref({
    value1: '',
    value2: '',
    value3: '',
})

const shortcuts = [
    {
        text: 'Today',
        value: new Date(),
    },
    {
        text: 'Yesterday',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: 'A week ago',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
        },
    },
]
const rules = {}
</script>

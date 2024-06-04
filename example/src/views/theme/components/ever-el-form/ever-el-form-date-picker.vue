<template>
    <el-divider content-position="center">DatePicker 日期选择器</el-divider>
    <el-form
        ref="formRef"
        style="width: 100%"
        :model="form"
        label-width="120px"
        label-position="top"
        :rules="rules"
    >
        <el-form-item label="日期选择器">
            <el-date-picker v-model="form.value1" type="date" placeholder="Pick a day" />
        </el-form-item>
        <el-form-item label="日期选择器">
            <el-date-picker
                v-model="form.value2"
                type="date"
                placeholder="Pick a day"
                :disabled-date="disabledDate"
                :shortcuts="shortcuts"
            />
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

const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
</script>

<template>
    <el-divider content-position="center">TimeSelect 时间选择</el-divider>
    <el-form
        ref="formRef"
        style="width: 100%"
        :model="form"
        label-width="120px"
        label-position="top"
        :rules="rules"
    >
        <el-form-item label="时间选择器">
            <el-time-select
                v-model="form.value"
                start="08:30"
                step="00:15"
                end="18:30"
                placeholder="Select time"
            />
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const form = ref({
    value: undefined,
})
const rules = {}
</script>

<template>
    <el-divider content-position="center">Slider 滑块</el-divider>
    <el-form
        ref="formRef"
        style="width: 100%"
        :model="form"
        label-width="120px"
        label-position="top"
        :rules="rules"
    >
        <el-form-item label="滑块">
            <el-slider v-model="form.slider" />
        </el-form-item>
        <el-form-item label="滑块-禁用">
            <el-slider v-model="form.slider" disabled />
        </el-form-item>
        <el-form-item label="滑块-离散值">
            <el-slider v-model="form.slider" :step="10" show-stops />
        </el-form-item>
        <el-form-item label="滑块-带输入框">
            <el-slider v-model="form.slider" :step="10" show-input />
        </el-form-item>
        <el-form-item label="滑块-带输入框">
            <el-slider v-model="form.range" range show-stops :max="10" />
        </el-form-item>
        <el-form-item label="滑块-标记">
            <el-slider v-model="form.slider" :marks="marks" />
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const form = ref({
    slider: 10,
    range: [2, 5],
})
const rules = {}
const marks = {
    0: '0°C',
    8: '8°C',
    37: '37°C',
    50: {
        style: { color: '#1989FA' },
        label: '50%',
    },
}
</script>

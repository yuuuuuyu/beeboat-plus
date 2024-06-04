<template>
    <el-divider content-position="center">Checkbox 多选框</el-divider>
    <el-form
        ref="formRef"
        style="width: 100%"
        :model="form"
        label-width="120px"
        label-position="top"
        :rules="rules"
    >
        <el-form-item label="多选">
            <el-checkbox-group v-model="form.checkList">
                <el-checkbox label="Option1" />
                <el-checkbox label="Option2" />
                <el-checkbox label="Option3" />
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="多选-按钮样式">
            <el-checkbox-group v-model="form.checkList">
                <el-checkbox-button label="Option1" />
                <el-checkbox-button label="Option2" />
                <el-checkbox-button label="Option3" />
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="多选-边框">
            <el-checkbox-group v-model="form.checkList">
                <el-checkbox label="Option1" :border="true" />
                <el-checkbox label="Option2" :border="true" />
                <el-checkbox label="Option3" :border="true" />
            </el-checkbox-group>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const form = ref({
    checkList: ['Option1'],
})
const rules = {}
// const marks = {
//     0: '0°C',
//     8: '8°C',
//     37: '37°C',
//     50: {
//         style: { color: '#1989FA' },
//         label: '50%',
//     },
// }
</script>

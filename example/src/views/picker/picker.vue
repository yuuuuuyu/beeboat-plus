<template>
    <div>123</div>
    <div>这是存储值：{{ state.value }}</div>
    <div>这是显示值：{{ state.textValue }}</div>
    <p></p>
    <p></p>
    <el-form>
        <el-form-item prop="value" label="123" disabled>
            <BtDataPicker
                v-model="state.value"
                v-model:textValue="state.textValue"
                :disabled="false"
                placeholder="222"
                :relative-ref="dialogRef"
            />
        </el-form-item>
    </el-form>

    <DialogV ref="dialogRef" />
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import DialogV from './dialog.vue'

const state = reactive({
    value: '111',
    textValue: '333',
})

const dialogRef = ref()
</script>

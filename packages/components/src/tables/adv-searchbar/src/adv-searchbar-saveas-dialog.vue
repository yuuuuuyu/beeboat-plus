<template>
    <el-dialog
        v-model="state.dialogVisible"
        class="btp-adv-searchbar-saveas-dialog"
        title="另存方案"
        :append-to-body="true"
        draggable
    >
        <el-form
            ref="formRef"
            :model="state"
            :rules="{ sceneName: [{ required: true, message: '请输入方案名称', trigger: 'blur' }] }"
            label-width="120px"
            label-position="top"
            :status-icon="true"
        >
            <el-form-item label="方案名称" prop="sceneName">
                <el-input v-model="state.sceneName"></el-input>
            </el-form-item>
            <span class="btp-adv-searchbar-saveas-dialog-desc">
                说明：对页面配置的筛选条件进行另存方案
            </span>
        </el-form>
        <template #footer>
            <el-button type="info" @click="state.dialogVisible = false">取消</el-button>
            <el-button @click="onSaveAsClick">确 定</el-button>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'

const formRef = ref()
const state = reactive({
    dialogVisible: false,
    sceneName: '',
    callback: (sceneName: string) => {},
})

const onSaveAsClick = () => {
    formRef.value.validate(valid => {
        if (valid) {
            state.dialogVisible = false
            if (state.callback) {
                state.callback(state.sceneName)
            }
        }
    })
}
const openDialog = callback => {
    state.dialogVisible = true
    state.sceneName = ''
    state.callback = callback
}
defineExpose({
    openDialog,
})
</script>

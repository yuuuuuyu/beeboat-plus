<template>
    <div>
        <div>弹窗组件</div>
        <el-button type="primary" @click="open1">打开dialog</el-button>
        <el-button type="primary" @click="open">打开</el-button>
        <el-dialog v-model="state.visible1" title="123" :draggable="true">
            <div>eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</div>
            <div>eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</div>
            <template #footer>
                <el-button @click="handleClose1">取消</el-button>
                <el-button type="primary" @click="handleConfirm">确认</el-button>
            </template>
        </el-dialog>
        <el-dialog v-model="state.visible" title="123" :fullscreen="true" class="bt-drawer-dialog">
            <div>eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</div>
            <div>eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</div>
            <template #footer>
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleConfirm">确认</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
    visible: false,
    visible1: false,
    title: '标题111',
    fullScreen: true,
    width: 400,
})
const open1 = () => {
    state.visible1 = true
}
const open = () => {
    console.log()
    state.visible = true
}

const handleClose1 = () => {
    state.visible1 = false
}
const handleClose = () => {
    state.visible = false
}

const handleConfirm = () => {
    state.visible = false
    // todo....
}
</script>

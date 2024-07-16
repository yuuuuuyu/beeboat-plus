<template>
    <h1>BtpDialog</h1>
    <btp-button type="primary" @click="open">打开弹窗</btp-button>
    <btp-dialog :btViewContext="model" :btConfig="btConfig" @close="close">
        <template #footer>
            <el-button>取消</el-button>
            <el-button>确定</el-button>
        </template>
    </btp-dialog>
</template>

<script setup>
import { reactive } from 'vue'
const model = reactive({
    viewModel: {
        dialog: { title: '弹窗标题', visible: false },
    },
})

//
const btConfig = reactive({
    props: {},
    footer: {},
})
const open = () => {
    model.viewModel.dialog.visible = true
}
const close = () => {
    model.viewModel.dialog.visible = false
}
</script>

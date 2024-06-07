<template>
    <div>
        <el-dialog title="123" v-model="state.dialogVisible" :append-to-body="true">
            <span>This is a message</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="state.dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click.stop="demo"> Confirm </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

defineProps({
    /**
     * @description 视图动态配置
     */
    btConfig: {
        type: Object,
        default: undefined,
    },
    /**
     * @description 视图动态配置
     */
    btViewContext: {
        type: Object,
        default: undefined,
    },
})

const state = reactive({
    dialogVisible: false,
})
const demo = () => {}
defineExpose({
    openDialog: () => {
        state.dialogVisible = true
    },
})
</script>

<template>
    <div>
        <slot>
            <el-button type="primary" @click="open">
                导入<el-icon v-if="props.hideIcon" class="el-icon--right"><Upload /></el-icon>
            </el-button>
        </slot>
        <div v-if="showDialog">
            <div
                v-show="!data.ismini"
                class="bt-dialog-export-upload"
                :class="data.ismini ? 'bt-dialog-point' : ''"
            >
                <el-dialog
                    v-model="showDialog"
                    :modal="data.ismini ? false : true"
                    :show-close="false"
                    :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    width="560"
                    @closed="data.ismini = false"
                >
                    <template #header="{ titleId, titleClass }">
                        <div class="bt-dialog-header">
                            <div :id="titleId" :class="titleClass">{{ data.dialogTitle }}</div>
                            <div>
                                <Minus v-if="!data.ismini" class="bt-icon-sty" @click="toMini" />
                                <em
                                    v-if="data.ismini"
                                    class="bt-icon bt-icon-max1 bt-icon-sty"
                                    @click="toMax"
                                ></em>
                                <Close class="bt-icon-sty bt-ml" @click="closeDialog" />
                            </div>
                        </div>
                    </template>
                    <div class="el-top">
                        <ImportData @changeDisable="changeDisable" />
                    </div>
                    <template #footer>
                        <span class="bt-dialog-footer">
                            <el-button
                                v-show="data.ifShowConfirm !== 1"
                                type="primary"
                                @click="closeDialog"
                            >
                                确定
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
            <div v-if="data.ismini" class="bt-hide bt-flex-space">
                <div>导入</div>
                <div>
                    <em class="bt-icon bt-icon-max1 bt-hide-icon bt-mr" @click="toMax"></em>
                    <em class="bt-icon bt-icon-close bt-hide-icon" @click="closeDialog"></em>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtSimpleExcelImport',
}
</script>
<script setup lang="ts">
import { Minus, Close } from '@element-plus/icons-vue'
import { provide, reactive, ref } from 'vue'
import ImportData from './import-data.vue'

interface baseState {
    // 弹窗标题
    dialogTitle: string
    // 最小化
    ismini?: boolean
    // 是否显示确定按钮
    ifShowConfirm?: number
    requestApi?: (params: any) => Promise<any> // 上传文件的 api 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可 ==> 非必传
    downLoadUrl?: string
    downErrorDataUrl?: string
    hideIcon?: boolean
}

const props = withDefaults(defineProps<baseState>(), {
    dialogTitle: '导入',
    ismini: false,
    ifShowConfirm: 1,
    downLoadUrl: '',
    downErrorDataUrl: '',
    hideIcon: false,
})

provide('requestApi', { api: props.requestApi })
provide('downLoadUrl', props.downLoadUrl)
provide('downErrorDataUrl', props.downErrorDataUrl)
const data = reactive({ ...props })

const showDialog = ref(false)
const open = () => (showDialog.value = true)
const close = () => (showDialog.value = true)

// 弹窗最小化
const toMini = () => {
    data.ismini = true
}

// 弹窗恢复
const toMax = () => {
    data.ismini = false
}

const closeDialog = () => {
    showDialog.value = false
    Object.assign(data, props)
}


// 接收子组件传值，用于控制上一步和确定按钮显隐
const changeDisable = val => {
    data.ifShowConfirm = val.uploadFlag
}


defineExpose({
    open,
    close,
})
</script>
<style lang="scss" scoped>
.bt-dialog-export-upload :deep(.el-dialog) {
    position: relative;
    height: 418px;
    pointer-events: auto;
    border-radius: 6px;
}
.bt-dialog-export-upload :deep(.el-dialog__header) {
    margin-right: 0;
    border-bottom: 1px solid #dce4f2;
}
.bt-dialog-export-upload :deep(.el-dialog__body) {
    padding: 8px 32px;
}
.bt-dialog-export-upload :deep(.el-button--primary) {
    background-color: #5c84f2;
    border-color: #5c84f2;
}
.bt-dialog-export-upload
    :deep(.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover) {
    background-color: #d1d6e3;
    border-color: #d1d6e3;
}
.bt-dialog-export-upload {
    .bt-dialog-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .bt-icon-sty {
        width: 14px;
        height: 14px;
        cursor: pointer;
    }
    .bt-ml {
        margin-left: 24px;
    }
    .el-top {
        margin-top: 16px;
    }
    .bt-dialog-footer {
        position: absolute;
        right: 32px;
        bottom: 24px;
    }
}
.bt-mr {
    margin-right: 3px;
}
.bt-hide {
    position: fixed;
    right: 0;
    bottom: 0;
    left: auto;
    width: 180px;
    height: 30px;
    padding: 4px 8px;
    overflow: hidden;
    border: 1px solid #dce4f2;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
.bt-flex-space {
    z-index: 9999;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.bt-hide-icon {
    font-size: 14px;
    cursor: pointer;
}
</style>
<style lang="scss">
.bt-dialog-point {
    pointer-events: none;
}
</style>

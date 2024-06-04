<template>
    <div>
        <slot>
            <el-button type="primary" @click="open">
                导入<el-icon v-if="!props.hideIcon" class="el-icon--right"><Upload /></el-icon>
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
                    <div class="bt-buttons">
                        <div
                            class="bt-buttons bt-button-sty"
                            :class="data.activeButton == 1 ? 'bt-change' : ''"
                            @click="changeButton(1)"
                        >
                            <Setting class="setting-sty bt-mr" />导入设置
                        </div>
                        <div
                            class="bt-buttons bt-button-sty border-left"
                            :class="data.activeButton == 2 ? 'bt-change' : ''"
                            @click="changeButton(2)"
                        >
                            <BtIcon
                                icon="bt-icon-upload bt-mr"
                                size="14"
                                :color="data.activeButton == 2 ? '#5C84F2' : '#A5B3CF'"
                            />导入数据
                        </div>
                    </div>
                    <div v-show="data.activeButton == 1" class="el-top">
                        <ImportSetting @getSettingData="getSettingData" />
                    </div>
                    <div v-show="data.activeButton == 2" class="el-top">
                        <ImportData :upload-data="uploadData" @changeDisable="changeDisable" />
                    </div>
                    <template #footer>
                        <span class="bt-dialog-footer">
                            <el-button
                                v-show="data.activeButton == 1"
                                type="primary"
                                @click="btnNext"
                            >
                                下一步
                            </el-button>
                            <el-button
                                v-show="data.activeButton == 2"
                                :disabled="data.ifDisable"
                                type="primary"
                                @click="btnPre"
                            >
                                上一步
                            </el-button>
                            <el-button
                                v-show="data.activeButton == 2 && data.ifShowConfirm !== 1"
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
    name: 'BtExcelImport',
}
</script>
<script setup lang="ts">
import { Minus, Close, Setting, Upload } from '@element-plus/icons-vue'
import { provide, reactive, ref } from 'vue'
import ImportSetting from './import-setting.vue'
import ImportData from './import-data.vue'

interface baseState {
    // 弹窗标题
    dialogTitle: string
    // 弹窗显隐
    // dialogVisible: boolean
    // 最小化
    ismini?: boolean
    // 点击状态中的按钮
    activeButton?: number
    // 是否禁用下一步按钮
    ifDisable?: boolean
    // 是否显示确定按钮
    ifShowConfirm?: number
    requestApi?: (params: any) => Promise<any> // 上传文件的 api 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可 ==> 非必传
    downLoadUrl?: string
    downErrorDataUrl?: string
    hideIcon?: boolean
}

const uploadData = reactive({
    radioModel: '1', // 导入设置组件的导入模式
    radioData: '1', // 导入设置组件的数据出错时处理
})

const props = withDefaults(defineProps<baseState>(), {
    dialogTitle: '导入',
    ismini: false,
    activeButton: 1,
    ifDisable: false,
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

// 切换按钮
const changeButton = val => {
    data.activeButton = val
}

// 下一步
const btnNext = () => {
    data.activeButton = 2
}

// 上一步
const btnPre = () => {
    data.activeButton = 1
}

// 接收子组件传值，用于控制上一步和确定按钮显隐
const changeDisable = val => {
    data.ifDisable = val.uploadLoading
    data.ifShowConfirm = val.uploadFlag
}

// 获取导入设置里的值
const getSettingData = val => {
    uploadData.radioModel = val.radioModel
    uploadData.radioData = val.radioData
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
    .bt-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .bt-button-sty {
        width: 249px;
        height: 32px;
        color: #a5b3cf;
        cursor: pointer;
        background: #f8f8f8;
        border: 1px solid #dce4f2;
    }
    .border-left {
        border-left: none;
    }
    .setting-sty {
        width: 14px;
        height: 14px;
    }
    .bt-change {
        color: #5c84f2;
        background: #ffffff;
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

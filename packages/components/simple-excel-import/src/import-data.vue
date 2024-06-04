<template>
    <div class="bt-component-setting">
        <div class="bt-flex-center">
            <el-upload
                ref="upload"
                class="bt-dialog-width"
                action="#"
                :limit="1"
                accept=".xls, .xlsx"
                :on-exceed="handleExceed"
                :auto-upload="false"
                :on-change="handleChange"
                :on-success="handleSuccess"
                :http-request="handleHttpUpload"
                :on-error="handleError"
                :show-file-list="false"
            >
                <template #trigger>
                    <el-button type="primary">选择文件</el-button>
                </template>
                <div
                    class="el-font-border el-font-left bt-file-upload-content"
                    @click="downLoadModel"
                >
                    下载模板
                </div>
                <template #tip>
                    <div class="bt-flex-center el-margin-top">
                        <el-input
                            v-model="fileName"
                            disabled
                            placeholder=""
                            class="el-margin-right"
                        />
                        <el-button :disabled="uploadLoading" type="primary" @click="submitUpload">
                            导入
                        </el-button>
                    </div>
                </template>
            </el-upload>
        </div>
        <div
            v-loading="uploadLoading"
            element-loading-text="数据导入中"
            class="bt-flex-center bt-justify-center justify-margin-top"
        >
            <div
                v-if="!uploadLoading && uploadFlag === 1"
                class="bt-flex-column"
            >
                <CircleCheck class="el-icon-sty" color="#5c84f2" />
                <div class="el-margin-top el-error-font">导入完成</div>
                <div class="bt-flex-center bt-justify-center el-mes-margin-top el-font-size">
                    <div>导入成功</div>
                    <div class="el-num-color">{{ dataInfo.successRows }}</div>
                    <div>条</div>
                </div>
            </div>
            <div
                v-if="!uploadLoading && uploadFlag === 0"
                class="bt-flex-column"
            >
                <CircleClose class="el-icon-sty" color="#FF524C" />
                <div class="el-margin-top el-error-font">导入失败!</div>
                <div class="bt-flex-center bt-justify-center el-mes-margin-top el-font-size">
                    <div>错误数据：</div>
                    <div class="el-font-border" @click="downLoadErrList">错误数据列表</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { inject, ref, nextTick, reactive } from 'vue'
import { CircleCheck, CircleClose } from '@element-plus/icons-vue'
import { ElMessage, genFileId, UploadRequestOptions } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { BtUseAppStore } from '@beeboat/core/store'

const requestApi: any = inject('requestApi') // 接收requestApi
const downErrorDataUrl: any = inject('downErrorDataUrl') // 接收错误列表下载地址
const downLoadUrl: any = inject('downLoadUrl') // 接收下载地址
const fileName = ref('') // 显示在输入框里的上传文件名
const uploadLoading = ref(false) // loading
const uploadFlag = ref(2) // 判断是否上传成功 0：失败   1：成功
const upload = ref<UploadInstance>()

interface BaseState {
    successRows?: number
    fileId?: string
    downErrUrl?: string
}

const appStore = BtUseAppStore()

// 接收父组件传值(对象需要return)
const props = withDefaults(defineProps<BaseState>(), {
    successRows: 0, // 必须
    fileId: '',
    downErrUrl: '',
})
const dataInfo = reactive({ ...props })
// 当超出限制时，替换上一个文件
const handleExceed: UploadProps['onExceed'] = files => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

// 文件改变时执行,获取文件名用于显示
const handleChange: UploadProps['onChange'] = uploadFile => {
    fileName.value = uploadFile.name
}

// 导入操作
const emit = defineEmits(['changeDisable'])
const submitUpload = () => {
    if (fileName.value) {
        uploadLoading.value = true
        emit('changeDisable', {
            uploadLoading: uploadLoading.value,
            uploadFlag: uploadFlag.value,
        })
        upload.value!.submit()
    } else {
        ElMessage({
            message: '请先选择文件！',
            type: 'warning',
        })
    }
}

// 文件上传
const handleHttpUpload = async (options: UploadRequestOptions) => {
    let formData = new FormData()
    formData.append('file', options.file)
    try {
        const api = requestApi.api
        const { data } = await api(formData)
        options.onSuccess(data)
    } catch (error) {
        options.onError(error as any)
    }
}

// 上传成功
const handleSuccess = data => {
    dataInfo.successRows = data!.successRows
    uploadLoading.value = false
    uploadFlag.value = 1
    emit('changeDisable', {
        uploadLoading: uploadLoading.value,
        uploadFlag: uploadFlag.value,
    })
    upload.value!.clearFiles()
    nextTick(() => {
        fileName.value = ''
    })
}

// 上传失败
const handleError = () => {
    uploadLoading.value = false
    uploadFlag.value = 0
    emit('changeDisable', {
        uploadLoading: uploadLoading.value,
        uploadFlag: uploadFlag.value,
    })
    upload.value!.clearFiles()
    nextTick(() => {
        fileName.value = ''
    })
    ElMessage({
        message: '接口异常请联系系统管理员！',
        type: 'error',
    })
}

// 下载模板
const downLoadModel = () => {
    if (!downLoadUrl) return
    window.open(downLoadUrl, '_blank')
}
// 下载错误数据列表
const downLoadErrList = () => {
    const api = downErrorDataUrl ?? downLoadDefaultUrl
    if (!api) return
    dataInfo.downErrUrl = `${api}'?fileId=${dataInfo.fileId}`
    window.open(dataInfo.downErrUrl, '_blank')
}
// 下载默认接口
const downLoadDefaultUrl = () => {
    const app = appStore.getApp()
    const apiUrl =
        app?.getConfig('downloadApi', '/system/app/fileObject/download') ||
        '/system/app/fileObject/download'
    return apiUrl || undefined
}
</script>
<style lang="scss" scoped>
.bt-component-setting {
    .bt-dialog-width {
        width: 100%;
    }
    .bt-flex-center {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }
    .el-font-border {
        color: #5c84f2;
        cursor: pointer;
        border-bottom: 1px solid #5c84f2;
    }
    .el-font-left {
        margin-left: 16px;
    }
    .el-margin-top {
        margin-top: 8px;
    }
    .el-margin-right {
        margin-right: 8px;
    }
    :deep(.el-upload-list) {
        margin: 0;
    }
    .bt-justify-center {
        justify-content: center;
    }
    .justify-margin-top {
        margin-top: 32px;
    }
    .el-icon-sty {
        width: 24px;
        height: 24px;
    }
    .bt-flex-column {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .el-error-font {
        color: #3e4a6b;
    }
    .el-mes-margin-top {
        margin-top: 24px;
    }
    .el-num-color {
        color: #5c84f2;
    }
    .el-font-size {
        font-size: 12px;
        line-height: 12px;
    }
    :deep(.el-loading-spinner .el-loading-text) {
        color: #5c84f2;
    }
    :deep(.el-loading-spinner .path) {
        stroke: #5c84f2;
    }
    .bt-file-upload-content {
        display: inline-flex;
    }
}
</style>

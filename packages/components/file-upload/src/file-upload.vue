<template>
    <el-upload
        v-model:file-list="fileList"
        action="#"
        :multiple="Boolean(props.multiple)"
        :disabled="Boolean(self_disabled)"
        :limit="props.limit"
        :http-request="handleHttpUpload"
        :before-upload="beforeUpload"
        :on-exceed="handleExceed"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :drag="Boolean(props.drag)"
        :accept="fileType.join(',')"
        v-bind="$attrs"
    >
        <template #trigger>
            <bt-button type="primary">文件上传</bt-button>
        </template>

        <div class="bt-file-upload-content">
            <slot name="empty"> </slot>
        </div>

        <template #file>
            <span></span>
        </template>
        <div>
            <slot v-if="props.enabledSlotFile" name="customFile" :file="fileList"></slot>
        </div>
    </el-upload>
</template>
<script lang="ts">
export default {
    name: 'BtFileUpload',
}
</script>
<script setup lang="ts">
import { ref, computed, inject, watch } from 'vue'
import type { UploadProps, UploadFile, UploadUserFile, UploadRequestOptions } from 'element-plus'
import { ElUpload, ElNotification, formContextKey, formItemContextKey } from 'element-plus'
import { BtUseAppStore } from '@beeboat/core/store'
import { randomNum } from './helper'
interface UploadFileProps {
    fileList?: UploadUserFile[]
    requestApi?: (params: any) => Promise<any> // 上传文件的 api 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可 ==> 非必传
    multiple?: boolean | number // 是否支持多文件上传
    drag?: boolean | number // 是否支持拖拽上传 ==> 非必传（默认为 true）
    disabled?: boolean | number // 是否禁用上传组件 ==> 非必传（默认为 false）
    limit?: number // 最大文件上传数 ==> 非必传（默认为 10张）
    fileSize?: number // 文件大小限制 ==> 非必传（默认为 10M）
    fileType?: string[] // 文件类型限制 ==> 非必传（默认为 []）
    enabledSlotFile?: boolean | number // 是否开启文件插槽 ==> 非必传（默认为 false）
}

const props = withDefaults(defineProps<UploadFileProps>(), {
    fileList: () => [],
    multiple: false,
    drag: true,
    disabled: false,
    limit: 10,
    fileSize: 30,
    fileType: () => [],
})

// 文件上传返回属性、事件
interface UploadEmits {
    (e: 'update:fileList', value: UploadUserFile[]): void
    (e: 'fileChange', value: any[]): void
}

const emits = defineEmits<UploadEmits>()
const appStore = BtUseAppStore()
watch(
    () => props.fileList,
    () => {
        fileList.value = [...props.fileList]
        emits('fileChange', fileList.value)
    },
)
// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0)
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0)
// 判断是否禁用上传和删除
const self_disabled = computed(() => {
    return props.disabled || formContext?.disabled
})

const fileList = ref<UploadUserFile[]>(props.fileList)

/**
 * @description 文件上传之前判断
 * @param rawFile 上传的文件
 * */
const beforeUpload: UploadProps['beforeUpload'] = rawFile => {
    const imgSize = rawFile.size / 1024 / 1024 < props.fileSize

    const fileExt = rawFile.name.replace(/.+\./, '')
    const imgType = props.fileType.includes(fileExt.toLowerCase())
    if (!imgType) {
        ElNotification({
            title: '温馨提示',
            message: '上传文件不符合所需的格式！',
            type: 'warning',
        })
    }
    if (!imgSize)
        ElNotification({
            title: '温馨提示',
            message: `上传文件大小不能超过 ${props.fileSize}M！`,
            type: 'warning',
        })

    return imgType && imgSize
}

/**
 * @description 文件上传
 * @param options 上传的文件
 * */
const handleHttpUpload = async (options: UploadRequestOptions) => {
    let formData = new FormData()
    formData.append('file', options.file)
    formData.append('userId', '')
    try {
        const api = props.requestApi ?? uploadDefaultApi
        const { data } = await api(formData)
        options.onSuccess(data)
    } catch (error) {
        options.onError(error as any)
    }
}

const uploadSuccess = (response: { filePath: string } | undefined, uploadFile: UploadFile) => {
    if (!response) return
    uploadFile.url = response.filePath
    emits('update:fileList', fileList.value)
    // 调用 el-form 内部的校验方法（可自动校验）
    formItemContext?.prop && formContext?.validateField([formItemContext.prop as string])
    ElNotification({
        title: '温馨提示',
        message: '文件上传成功！',
        type: 'success',
    })
}

// 文件上传错误提示
const uploadError = () => {
    ElNotification({
        title: '温馨提示',
        message: '文件上传失败，请您重新上传！',
        type: 'error',
    })
}

// 文件数超出提示
const handleExceed = () => {
    ElNotification({
        title: '温馨提示',
        message: `当前最多只能上传 ${props.limit} 个文件，请移除后上传！`,
        type: 'warning',
    })
}

// 上传默认接口
const uploadDefaultApi = (data): Promise<any> => {
    const app = appStore.getApp()
    const apiUrl =
        app?.getConfig('uploadLoadApi', '/system/app/fileObject/upload') ||
        '/system/app/fileObject/upload'
    return app?.getHttp().post(apiUrl, data, { params: { t: randomNum() } }) || undefined
}
</script>
<style>
.bt-file-upload-content {
    display: inline-flex;
    margin-left: 14px;
}
</style>

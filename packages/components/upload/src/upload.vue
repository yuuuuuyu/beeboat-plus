<template>
    <el-space>
        <div class="upload-box">
            <el-upload
                v-model:file-list="fileList"
                action="#"
                :class="['upload', self_disabled ? 'disabled' : '', drag ? 'no-border' : '']"
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
                list-type="text"
                v-bind="$attrs"
            >
                <div class="upload-empty">
                    <slot name="empty">
                        <el-icon><Plus /></el-icon>
                    </slot>
                </div>
                <template #file>
                    <span></span>
                    <!-- <img :src="file.url" class="upload-image" />
                <div class="upload-handle" @click.stop>
                    <div class="handle-icon" @click="handlePictureCardPreview(file)">
                        <el-icon><ZoomIn /></el-icon>
                    </div>
                    <div
                        v-if="!self_disabled"
                        class="delete-handle-icon"
                        @click="handleRemove(file)"
                    >
                        <el-icon class="delete-outer"><Close /></el-icon>
                    </div>
                </div> -->
                </template>
            </el-upload>
            <!-- <div class="el-upload__tip">
                <slot name="tip"></slot>
            </div> -->
            <!-- <el-image-viewer
                v-if="imgViewVisible"
                :initial-index="viewImageIndex"
                :url-list="fileList.map(i => i.url)"
                @close="imgViewVisible = false"
            /> -->
        </div>
        <ImageCarousel
            ref="imageCarouselRef"
            :images="fileList"
            :width="props.width"
            :height="props.height"
            :auto-slide="props.autoSlide"
            :disabled-delete="props.disabledDelete"
            :disabled-pre-view="props.disabledPreView"
            :show-size="props.showSize"
            @change="onFileListChange"
            @fileChange="onFileStateChange"
        />
    </el-space>
</template>
<script lang="ts">
export default {
    name: 'BtUpload',
}
</script>
<script setup lang="ts">
import { ref, computed, inject, watch, provide } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadFile, UploadUserFile, UploadRequestOptions } from 'element-plus'
import { ElSpace, ElUpload, ElNotification, formContextKey, formItemContextKey } from 'element-plus'
import ImageCarousel from '../../image-carousel'
import { BtUseAppStore } from '@beeboat/core/store'
import { randomNum } from './helper'
type FileTypes =
    | 'image/apng'
    | 'image/bmp'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/pjpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/tiff'
    | 'image/webp'
    | 'image/x-icon'
    | 'audio/basic'
    | 'audio/mpeg'
    | 'audio/mp4'
    | 'audio/3gpp'
    | 'audio/ac3'
    | 'video/mp4'
    | 'video/3gpp'
    | 'video/mpeg'
    | 'video/ogg'
    | 'video/mov'
    | 'video/flv'
    | 'video/avi'
    | 'video/wmv'
    | 'video/mvb'
    | 'video/rmvb'

// 图片上传成功
interface UploadEmits {
    (e: 'update:fileList', value: UploadUserFile[]): void
    (e: 'fileChange', value: any[]): void
}
const emits = defineEmits<UploadEmits>()
interface UploadFileProps {
    fileList?: UploadUserFile[]
    requestApi?: (params: any) => Promise<any> // 上传文件的 api 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可 ==> 非必传
    multiple?: boolean | number // 是否支持多文件上传  ==> 非必传（默认为 false）
    showSize?: number // 显示轮播图的数量 ==> 非必传（默认为 3）
    drag?: boolean | number // 是否支持拖拽上传 ==> 非必传（默认为 true）
    disabled?: boolean | number // 是否禁用上传组件 ==> 非必传（默认为 false）
    limit?: number // 最大文件上传数 ==> 非必传（默认为 10张）
    fileSize?: number // 文件大小限制 ==> 非必传（默认为 10M）
    fileType?: FileTypes[] // 文件类型限制 ==> 非必传（默认为 ['image/jpeg', 'image/png', 'image/gif', 'image/bmp']）
    height?: number // 组件高度 ==> 非必传（默认为 132px）
    width?: number // 组件宽度 ==> 非必传（默认为 176px）
    borderRadius?: string // 组件边框圆角 ==> 非必传（默认为 8px）
    autoSlide?: boolean | number // 是否开启自动图片滑动 ==> 非必传（默认 false）
    disabledDelete?: boolean | number // 禁用图片删除 ==> 非必传（默认 true）
    disabledPreView?: boolean | number // 禁用图片预览 ==> 非必传（默认 true）
}

const props = withDefaults(defineProps<UploadFileProps>(), {
    fileList: () => [],
    multiple: false,
    drag: true,
    disabled: false,
    limit: 10,
    fileSize: 10,
    fileType: () => ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'],
    height: 132,
    width: 176,
    borderRadius: '8px',
    autoSlide: false,
    disabledDelete: true,
    disabledPreView: true,
    showSize: 3,
})
provide('btUploadContextKey', { props })
const imageCarouselRef = ref()
const appStore = BtUseAppStore()
const getWidth = computed(() => `${props.width}px`)
const getHeight = computed(() => `${props.height}px`)
const getWidthNoBorder = computed(() => `${props.width - 2}px`)
const getHeightNoBorder = computed(() => `${props.height - 2}px`)
watch(
    () => props.fileList,
    () => {
        fileList.value = [...props.fileList]
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
    // progressFlag.value = true // 显示进度条
    // stock = setInterval(increase, 500) as any

    const imgSize = rawFile.size / 1024 / 1024 < props.fileSize
    const imgType = props.fileType
    if (!imgType.includes(rawFile.type as FileTypes))
        ElNotification({
            title: '温馨提示',
            message: '上传图片不符合所需的格式！',
            type: 'warning',
        })
    if (!imgSize)
        ElNotification({
            title: '温馨提示',
            message: `上传图片大小不能超过 ${props.fileSize}M！`,
            type: 'warning',
        })

    return imgType.includes(rawFile.type as FileTypes) && imgSize
}

/**
 * @description 图片上传
 * @param options 上传的文件
 * */
const handleHttpUpload = async (options: UploadRequestOptions) => {
    let formData = new FormData()
    formData.append('file', options.file)
    try {
        const api = props.requestApi ?? uploadDefaultApi
        const { data } = await api(formData)
        // 使用默认Api逻辑时启用以下逻辑
        if (!props.requestApi) {
            if (data.id && !validUrl(data.filePath)) {
                const app = appStore.getApp()
                const apiUrl = app?.getConfig('uploadPreviewApi', '/system/app/fileObject/preview')
                data.filePath = `${apiUrl}?id=${data.id}`
            }
        }

        options.onSuccess(data)
    } catch (error) {
        options.onError(error as any)
    }
}

const uploadSuccess = (
    response: { filePath: string; id: string } | undefined,
    uploadFile: UploadFile,
) => {
    if (!response) return
    uploadFile.url = response.filePath
    uploadFile.uid = response.id as any
    emits('update:fileList', fileList.value)
    // 调用 el-form 内部的校验方法（可自动校验）
    formItemContext?.prop && formContext?.validateField([formItemContext.prop as string])
    ElNotification({
        title: '温馨提示',
        message: '图片上传成功！',
        type: 'success',
    })
}

const onFileListChange = list => {
    fileList.value = list
    emits('update:fileList', fileList.value)
}

const onFileStateChange = list => {
    emits('fileChange', list)
}

// 图片上传错误提示
const uploadError = () => {
    ElNotification({
        title: '温馨提示',
        message: '图片上传失败，请您重新上传！',
        type: 'error',
    })
}

// 文件数超出提示
const handleExceed = () => {
    ElNotification({
        title: '温馨提示',
        message: `当前最多只能上传 ${props.limit} 张图片，请移除后上传！`,
        type: 'warning',
    })
}
// 上传默认接口
const uploadDefaultApi = async (data): Promise<any> => {
    const app = appStore.getApp()
    const apiUrl =
        app?.getConfig('uploadLoadApi', '/system/app/fileObject/upload') ||
        '/system/app/fileObject/upload'
    return app?.getHttp().post(apiUrl, data, { params: { t: randomNum() } })
}

/**
 * 验证是否网络URL地址
 */
const validUrl = url => {
    const pattern = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/)
    return pattern.test(url)
}
/**
 * 重新渲染跑马灯列表数据
 */
const doLayout = () => {
    imageCarouselRef.value.doLayout()
}
defineExpose({
    doLayout, // 重新渲染跑马灯列表数据
})
</script>

<style scoped lang="scss">
.is-error {
    .upload {
        :deep(.el-upload--picture-card),
        :deep(.el-upload-dragger) {
            border: 1px dashed var(--ever-color-danger, --el-color-danger) !important;
            &:hover {
                border-color: var(--ever-color-primary, --el-color-primary) !important;
            }
        }
    }
}
:deep(.disabled) {
    .el-upload--picture-card,
    .el-upload-dragger {
        cursor: not-allowed;
        background: var(--el-disabled-bg-color) !important;
        border: 1px dashed var(--el-border-color-darker);
        &:hover {
            border-color: var(--el-border-color-darker) !important;
        }
    }
}
.upload-box {
    width: v-bind(getWidth);
    height: v-bind(getHeight);
    overflow: hidden;
    .no-border {
        :deep(.el-upload--picture-card) {
            border: none !important;
        }
    }
    .upload {
        display: inline-flex;
        align-items: center;
    }
    .upload :deep(.el-upload-list) {
        width: 0;
        height: 0;
    }
    .upload :deep(.el-upload--text) {
        width: v-bind(getWidthNoBorder);
        height: v-bind(getHeightNoBorder);
        color: var(--ever-color-primary, --el-color-primary);
        background-color: transparent;
        border: 1px dashed var(--el-color-primary);
        border-radius: v-bind(borderRadius);
    }

    .upload :deep(.upload-empty) {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        line-height: 30px;
        color: var(--el-color-info);
    }
    .upload :deep(.upload-empty .el-icon) {
        font-size: 200%;
    }
    .el-upload__tip {
        line-height: 15px;
        text-align: center;
    }
}
</style>

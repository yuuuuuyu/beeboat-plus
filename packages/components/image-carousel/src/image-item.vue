<template>
    <el-image :src="props.data.url" fit="scale-down" class="bt-image-carousel__image">
        <template #error>
            <div v-if="props.data?.status == 'ready'" class="image-slot">
                <el-icon><Picture /></el-icon>
            </div>
            <div v-else-if="props.data?.status == 'error'" class="image-slot">
                <el-icon><WarnTriangleFilled /></el-icon>
            </div>
            <div
                v-else-if="validateVideoType(props.data?.url)"
                :data-url="props.data.url"
                class="image-slot"
            >
                <el-icon><VideoPlay /></el-icon>
            </div>
        </template>
    </el-image>
    <el-progress
        v-if="props.data?.status == 'ready'"
        :percentage="100"
        :show-text="false"
        indeterminate
        :duration="100"
        class="handle-progress"
    />
    <template v-if="props.data?.status != 'ready'">
        <div v-if="props.disabledPreView || props.disabledDelete" class="image-handle" @click.stop>
            <div
                v-if="props.disabledPreView"
                class="bt-image-item handle-icon"
                @click="onView(props.data)"
            >
                <el-icon><ZoomIn /></el-icon>
            </div>
            <div
                v-show="!props.disabledDelete"
                class="bt-image-item delete-handle-icon"
                @click="onDelete(props.data)"
            >
                <el-icon class="delete-outer"><Close /></el-icon>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import { Close, ZoomIn, Picture, WarnTriangleFilled, VideoPlay } from '@element-plus/icons-vue'
import { ElProgress, ElIcon, ElImage } from 'element-plus'
import { computed } from 'vue'

interface TypeProps {
    data: any // 数组数据 ==> 必传（默认[]）
    disabledDelete?: boolean | number // 禁用图片删除 ==> 非必传（默认 false）
    disabledPreView?: boolean | number // 禁用图片预览 ==> 非必传（默认 false）
    width?: number // 宽
    height?: number // 高
}
const props = withDefaults(defineProps<TypeProps>(), {})
console.log(props.disabledDelete, 'disabledDelete..')
interface ImageItemEmits {
    (e: 'viewChange', value: any[]): void
    (e: 'deleteChange', value: any[]): void
}
const emits = defineEmits<ImageItemEmits>()

const validWidth = computed(() => {
    return `${props.width}px`
})
const validHeight = computed(() => {
    return `${props.height}px`
})
const onView = data => {
    emits('viewChange', data)
}
const onDelete = data => {
    emits('deleteChange', data)
}
// const getResourceType = data => {
//     if (data.url) {
//         console.log(data.url, 'url type...')

//         if (validateVideoType(data.url)) {
//             return videoImage
//         }
//         return data.url
//     }
// }
/**
 * 验证视频类型
 */
const validateVideoType = str => {
    let type = str.substring(str.lastIndexOf('.')).toLowerCase()
    if (/.(mp4|3gpp|mpeg|ogg|mov|flv|avi|wmv|mvb|rmvb)$/.test(type)) {
        return true
    } else {
        return false
    }
}
</script>

<style lang="scss" scoped>
.bt-image-carousel__image {
    width: v-bind('validWidth');
    height: v-bind('validHeight');
}
</style>

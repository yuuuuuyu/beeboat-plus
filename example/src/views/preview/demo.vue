<template>
    <el-button type="primary" @click="showImg">点击预览</el-button>
    <div class="flex justify-center">
        <div
            v-for="(item, $index) in imgList"
            :key="item"
            class="img-item"
            @click="showHasImg($index)"
        >
            <img :src="item" alt="" class="image" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { createImgPreview } from '@beeboat/components/preview'
import { ref } from 'vue'

const imgList = ref<string[]>([
    'https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110013.jpg',
    'https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110015.jpg',
    'https://www.runoob.com/try/demo_source/movie.mp4',
    'http://10.20.20.20:33011/system22/app/fileObject/preview?id=a6e8de50200c2b26f7ef9c78596ee6d7&type=.jpg',
])

function showHasImg(i: number): void {
    createImgPreview({
        imageList: [imgList.value[i]],
        show: true,
        // index: 0
    })
}

function showImg(): void {
    createImgPreview({
        imageList: imgList.value,
        show: true,
        // index: 0,
        onSelect: (i: number) => {
            console.log(`当前点击的图片索引：${i}`)
        },
        onClose: (i: number) => {
            console.log(`关闭之后的图片索引：${i}`)
        },
    })
}
</script>

<template>
    <div
        class="bt-image-carousel"
        :class="{ 'bt-image-carousel--vertical': mode === 'vertical' }"
        @mouseover="states.suspendAutoSlide = true"
        @mouseout="states.suspendAutoSlide = false"
    >
        <div
            v-if="!(showSize > props.images.length)"
            class="bt-image-carousel__previous"
            @click="checkPrevious"
        >
            <img :src="arrowsImage" />
        </div>
        <div ref="imageListRef" class="bt-image-carousel__image-list">
            <div ref="virtualListRef" class="bt-image-carousel__virtual-list">
                <div class="bt-image-carousel__virtual-slot"></div>
            </div>
        </div>
        <div
            v-if="!(showSize > props.images.length)"
            class="bt-image-carousel__next"
            @click="checkNext"
        >
            <img :src="arrowsImage" />
        </div>
    </div>
    <!-- <el-image-viewer
        v-if="imgViewVisible"
        :initial-index="viewImageIndex"
        :url-list="props.images.map(i => i.url)"
        @close="imgViewVisible = false"
    /> -->
</template>
<script lang="ts">
export default {
    name: 'BtImageCarousel',
}
</script>
<script setup lang="ts">
import { nextTick, reactive, ref, watch, onUnmounted, onMounted, render, h } from 'vue'
import ImageItem from './image-item.vue'
import { createImgPreview } from '../../preview'
import { PropsType } from './typing'
import { arrowsImage, shiftCycleSolve } from './helper'
import { clone } from '@beeboat/core/utils'
const props = defineProps(PropsType)
interface ImageEmits {
    (e: 'auto-slide-image', value: object): void
    (e: 'change', value: any[]): void // fileList变化监听
    (e: 'fileChange', value: any[]): void // 用于上传业务场景的新的fileList的监听，使用upload组件的文件中使用
}
const emits = defineEmits<ImageEmits>()
watch(
    () => props.disabledDelete,
    val => {
        const el: any = document.querySelectorAll('.bt-image-item.delete-handle-icon')

        let index = 0,
            length = el.length
        for (; index < length; index++) {
            el[index].style.display = val ? 'none' : 'block'
        }
    },
)
const virtualListRef = ref()
const imageListRef = ref()
const states = reactive({
    req: undefined as any,
    displacement: undefined as any,
    step: undefined as any,
    taskList: [] as any[],
    timer: undefined as any,
    suspendAutoSlide: false,
    previousDirection: undefined as undefined | string,
    nextDirection: undefined as undefined | string,
})
const imagesWatch = watch(
    () => props.images,
    (n, o) => {
        if (props.images.length) {
            if (n.length > o.length) {
                // 删除.bt-image-carousel__virtual-slot全部子元素
                removeEl_virtualSlot()
                renderImageItemList(props.images)
            }
            nextTick(() => {
                init()
                // 业务场景中需要判断上传对象的状态时使用fileChange()事件
                emits('fileChange', [...props.images])
            })
        } else if (props.images.length == 0) {
            // 删除.bt-image-carousel__virtual-slot全部子元素
            removeEl_virtualSlot()
        }
    },
    {
        immediate: false,
    },
)
const reqWatch = watch(
    () => states.req,
    () => {
        if (states.req === null && states.taskList.length) {
            const task = states.taskList.pop()
            task.call(this)
        }
    },
)
const autoSlideWatch = watch(
    () => props.autoSlide,
    val => {
        if (val) {
            states.timer = setInterval(() => {
                if (
                    states.suspendAutoSlide ||
                    props.showSize > props.images.length ||
                    document.hidden
                ) {
                    return
                }

                checkNext()
                setTimeout(() => {
                    const src = getEl_imageUrl()
                    emits('auto-slide-image', { src })
                }, props.slideTime)
            }, props.autoSlideInterval)
        } else {
            clearInterval(states.timer)
            states.timer = null
        }
    },
    {
        immediate: true,
    },
)

const init = () => {
    initDirection()
    initImageList()
    initStep()
}
onMounted(() => {
    if (props.images.length) {
        renderImageItemList(props.images)
        nextTick(() => {
            init()
        })
    }
})

const initDirection = () => {
    if (props.mode === 'horizontal') {
        states.previousDirection = 'left'
        states.nextDirection = 'right'
    } else {
        states.previousDirection = 'top'
        states.nextDirection = 'bottom'
    }
}
const initStep = () => {
    states.step = states.displacement / (props.slideTime / 16)
}

const initImageList = () => {
    const imageListEl = imageListRef.value
    const imageEl = virtualListRef.value.children[0]
    const imageElStyle = window.getComputedStyle(imageEl)
    if (props.mode === 'horizontal') {
        if (imageEl.offsetWidth > 0) {
            states.displacement =
                parseInt(imageElStyle.marginLeft) +
                parseInt(imageElStyle.marginRight) +
                parseInt(imageEl.offsetWidth)
            imageListEl.style.width = `${
                states.displacement * virtualListRef.value.childElementCount
            }px`
            imageListEl.style.height = `${
                parseInt(imageEl.offsetHeight) +
                parseInt(imageElStyle.marginTop) +
                parseInt(imageElStyle.marginBottom)
            }px`
        } else {
            states.displacement = 174
            imageListEl.style.width = `${
                states.displacement * virtualListRef.value.childElementCount
            }px`
            imageListEl.style.height = `132px`
        }
    } else {
        // states.displacement =
        //     parseInt(imageElStyle.marginTop) +
        //     parseInt(imageElStyle.marginBottom) +
        //     parseInt(imageEl.offsetHeight)
        // imageListEl.style.height = `${
        //     states.displacement * virtualListRef.value.childElementCount
        // }px`
        // imageListEl.style.width = `${
        //     parseInt(imageEl.offsetWidth) +
        //     parseInt(imageElStyle.marginLeft) +
        //     parseInt(imageElStyle.marginRight)
        // }px`
    }
}

const checkPrevious = () => {
    if (states.req) {
        states.taskList.push(checkPrevious)
        return
    }

    let index = props.images.findIndex(
        image =>
            image.url ==
            (virtualListRef.value.children[0].firstElementChild.querySelector('img')
                ? virtualListRef.value.children[0].firstElementChild.querySelector('img').src
                : virtualListRef.value.children[0].firstElementChild.querySelector('.image-slot')
                      .dataset.url),
    )
    index--
    if (index < 0) {
        index = props.images.length - 1
    }
    const previousImageEL = document.createElement('div')
    previousImageEL.classList.add('bt-image-carousel__image-layout')
    previousImageEL.setAttribute('data-id', `${index}`)
    virtualListRef.value.children[0].insertBefore(
        previousImageEL,
        virtualListRef.value.children[0].firstElementChild,
    )
    renderItem(previousImageEL, props.images[index])

    virtualListRef.value.style[states.previousDirection!] = `-${states.displacement}px`
    movingTowardPrevious()
}
const movingTowardPrevious = () => {
    // TODO 动画效果待修复完善
    virtualListRef.value.children[0].removeChild(virtualListRef.value.children[0].lastElementChild)
    virtualListRef.value.style[states.previousDirection!] = ''
    // let previousDisplacement =
    //     parseInt(window.getComputedStyle(virtualListRef.value)[states.previousDirection!]) +
    //     states.step
    // if (previousDisplacement > 0) {
    //     virtualListRef.value.style[states.previousDirection!] = '0'
    //     window.cancelAnimationFrame(states.req)
    //     states.req = null
    //     virtualListRef.value.children[0].removeChild(
    //         virtualListRef.value.children[0].lastElementChild,
    //     )
    //     virtualListRef.value.style[states.previousDirection!] = ''
    // } else {
    //     virtualListRef.value.style[states.previousDirection!] = `${previousDisplacement}px`
    //     states.req = window.requestAnimationFrame(movingTowardPrevious)
    // }
}
const checkNext = () => {
    if (states.req) {
        states.taskList.push(checkNext)
        return
    }

    let index = props.images.findIndex(image => image.url == getEl_imageUrl())
    index++
    if (index > props.images.length - 1) {
        index = 0
    }
    const nextImageEL = document.createElement('div')
    nextImageEL.classList.add('bt-image-carousel__image-layout')
    nextImageEL.setAttribute('data-id', `${index}`)
    virtualListRef.value.children[0].appendChild(nextImageEL)
    renderItem(nextImageEL, props.images[index])

    virtualListRef.value.style[states.nextDirection!] = -`${states.displacement}px`
    movingTowardNext()
}
const movingTowardNext = () => {
    let nextDisplacement =
        parseInt(window.getComputedStyle(virtualListRef.value)[states.nextDirection!]) + states.step
    if (nextDisplacement > 0) {
        virtualListRef.value.style[states.nextDirection!] = '0'
        window.cancelAnimationFrame(states.req)
        states.req = null
        virtualListRef.value.children[0].removeChild(
            virtualListRef.value.children[0].firstElementChild,
        )
        virtualListRef.value.style[states.nextDirection!] = ''
    } else {
        virtualListRef.value.style[states.nextDirection!] = `${nextDisplacement}px`
        states.req = window.requestAnimationFrame(movingTowardNext)
    }
}
// 获取选中图片的src地址
const getEl_imageUrl = () => {
    return virtualListRef.value.children[0].lastElementChild.querySelector('img')
        ? virtualListRef.value.children[0].lastElementChild.querySelector('img').src
        : virtualListRef.value.children[0].lastElementChild.querySelector('.image-slot').dataset.url
}
// 删除全部子元素
const removeEl_virtualSlot = () => {
    const e = virtualListRef.value.querySelector('.bt-image-carousel__virtual-slot')
    let child = e.lastElementChild
    while (child) {
        e.removeChild(child)
        child = e.lastElementChild
    }
}
onUnmounted(() => {
    if (states.timer) {
        clearInterval(states.timer)
        states.timer = null
    }
    if (states.req) {
        window.cancelAnimationFrame(states.req)
        states.req = null
    }
    imagesWatch()
    reqWatch()
    autoSlideWatch()
})

const viewImageIndex = ref(0)
// const imgViewVisible = ref(false)

const handlePictureCardPreview = uploadFile => {
    if (uploadFile.url) {
        viewImageIndex.value = props.images.findIndex(val => val.url == uploadFile.url)
    } else {
        viewImageIndex.value = 0
    }
    // imgViewVisible.value = true
    createImgPreview({
        imageList: props.images.map(i => i.url),
        index: viewImageIndex.value,
        show: true,
    })
}
// 删除图片
const handleRemove = uploadFile => {
    const index = props.images.findIndex(item => {
        return item.url == uploadFile.url || item.name == uploadFile.name
    })
    const list = props.images.filter(
        item => item.url !== uploadFile.url || item.name !== uploadFile.name,
    )

    const len = list.length
    const newList = shiftCycleSolve(len, index > len ? 0 : index, clone(list))
    // 删除全部子元素
    removeEl_virtualSlot()
    // 循环移位后的图片集合，重新渲染内容
    renderImageItemList(newList)
    // newList.forEach((item, i) => {
    //     if (i < props.showSize) {
    //         const nextImageEL = document.createElement('div')
    //         nextImageEL.classList.add('bt-image-carousel__image-layout')
    //         nextImageEL.setAttribute('data-id', `${i}`)
    //         virtualListRef.value.children[0].appendChild(nextImageEL)

    //         render(
    //             h(ImageItem, {
    //                 data: item,
    //                 disabledDelete: props.disabledDelete,
    //                 disabledPreView: props.disabledPreView,
    //                 onViewChange: handlePictureCardPreview,
    //                 onDeleteChange: handleRemove,
    //             }),
    //             nextImageEL,
    //         )
    //     }
    // })
    emits('change', list)
}
// 渲染数据
const renderImageItemList = arr => {
    arr.forEach((item, i) => {
        if (i < props.showSize) {
            const imageEL = document.createElement('div')
            imageEL.classList.add('bt-image-carousel__image-layout')
            imageEL.setAttribute('data-id', `${i}`)
            virtualListRef.value.children[0].appendChild(imageEL)
            renderItem(imageEL, item)
            // render(
            //     h(ImageItem, {
            //         width: props.width,
            //         height: props.height,
            //         data: item,
            //         disabledDelete: props.disabledDelete,
            //         disabledPreView: props.disabledPreView,
            //         onViewChange: handlePictureCardPreview,
            //         onDeleteChange: handleRemove,
            //     }),
            //     imageEL,
            // )
        }
    })
}
/**
 *
 * @param el DOM元素
 * @param item 组件
 */
const renderItem = (el, item) => {
    render(
        h(ImageItem, {
            width: props.width,
            height: props.height,
            data: item,
            disabledDelete: props.disabledDelete,
            disabledPreView: props.disabledPreView,
            onViewChange: handlePictureCardPreview,
            onDeleteChange: handleRemove,
        }),
        el,
    )
}
/**
 * 重新渲染跑马灯数据
 */
const doLayout = () => {
    // 删除.bt-image-carousel__virtual-slot全部子元素
    removeEl_virtualSlot()
    if (props.images && props.images.length > 0) {
        renderImageItemList(props.images)
    }
}
defineExpose({
    doLayout,
})
</script>

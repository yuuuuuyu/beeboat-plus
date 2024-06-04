<template>
    <transition>
        <div
            v-if="show"
            ref="wrapElRef"
            tabindex="-1"
            :style="{ 'z-index': zIndex }"
            class="bt-preview image-viewer__wrapper"
        >
            <div class="image-viewer__mask"></div>
            <!-- CLOSE -->
            <span class="image-viewer__btn image-viewer__close" @click="hide">
                <el-icon class="close-icon"><CircleClose /></el-icon>
            </span>
            <!-- ARROW -->
            <template v-if="!isSingle">
                <span
                    class="image-viewer__btn image-viewer__prev"
                    :class="{ 'is-disabled': !infinite && isFirst }"
                    @click="prev"
                >
                    <el-icon class="arrow-icon"><ArrowLeft /></el-icon>
                </span>
                <span
                    class="image-viewer__btn image-viewer__next"
                    :class="{ 'is-disabled': !infinite && isLast }"
                    @click="next"
                >
                    <el-icon class="arrow-icon"><ArrowRight /></el-icon>
                </span>
            </template>
            <!-- ACTIONS -->
            <div v-show="displayType == 'image'" class="image-viewer__btn image-viewer__actions">
                <div class="image-viewer__actions__inner">
                    <el-icon class="icon-style" @click="handleActions('zoomIn')">
                        <ZoomIn />
                    </el-icon>
                    <el-icon class="icon-style" @click="handleActions('zoomOut')">
                        <ZoomOut />
                    </el-icon>
                    <el-icon class="icon-style" @click="toggleMode"><VideoPause /></el-icon>
                    <el-icon class="icon-style" @click="handleActions('anticlocelise')">
                        <RefreshLeft />
                    </el-icon>
                    <el-icon class="icon-style" @click="handleActions('clocelise')">
                        <RefreshRight />
                    </el-icon>
                </div>
            </div>
            <!-- CANVAS -->
            <div class="image-viewer__canvas">
                <img
                    v-show="displayType == 'image'"
                    ref="imgRef"
                    :src="currentImg"
                    :style="imgStyle"
                    class="image-viewer__img"
                    @load="handleImgLoad"
                    @error="handleImgError"
                    @mousedown="handleMouseDown"
                    @click="select"
                />
                <video
                    v-if="displayType == 'video'"
                    style="width: 400px; height: 300px"
                    alt=""
                    controls
                    controlsList="nodownload"
                >
                    <source
                        :src="currentImg"
                        type="video/mp4"
                        @error="handleImgError"
                        @click="select"
                    />
                    <source
                        :src="currentImg"
                        type="video/ogg"
                        @error="handleImgError"
                        @click="select"
                    />
                    您的浏览器不支持 HTML5 video 标签
                </video>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, nextTick, unref, Ref } from 'vue'
import {
    ArrowLeft,
    ArrowRight,
    CircleClose,
    ZoomIn,
    ZoomOut,
    RefreshRight,
    RefreshLeft,
    VideoPause,
} from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { previewProps } from './props'
import { isFirefox } from '@beeboat/core/utils/is'
import { on, off } from '@beeboat/core/utils/dom-utils'
import throttle from 'lodash-es/throttle'
const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel'
export default defineComponent({
    name: 'BtPreview',
    components: {
        ElIcon,
        ArrowLeft,
        ArrowRight,
        CircleClose,
        ZoomIn,
        ZoomOut,
        RefreshRight,
        RefreshLeft,
        VideoPause,
    },
    props: previewProps,
    setup(props) {
        const infinite = ref<boolean>(true)
        const loading = ref<boolean>(false)
        const show = ref<boolean>(props.show)
        const index = ref<number>(props.index)
        const transform = reactive({
            scale: 1,
            deg: 0,
            offsetX: 0,
            offsetY: 0,
            enableTransition: false,
        })
        const isSingle = computed((): boolean => props.imageList.length <= 1)
        const isFirst = computed((): boolean => index.value === 0)
        const isLast = computed((): boolean => index.value === props.imageList.length - 1)
        const currentImg = computed((): string => props.imageList[index.value])
        const displayType: Ref<'image' | 'video'> = ref('image')
        const videoType = ['mp4', 'ogg', 'webm'] // html video 只支持这3种视频的播放
        const imgStyle = computed(() => {
            const { scale, deg, offsetX, offsetY, enableTransition } = transform
            const style = {
                transform: `scale(${scale}) rotate(${deg}deg)`,
                transition: enableTransition ? 'transform .3s' : '',
                'margin-left': `${offsetX}px`,
                'margin-top': `${offsetY}px`,
            }
            return style
        })

        const wrapElRef = ref<HTMLElement | null>(null)
        const imgRef = ref<HTMLElement | null>(null)

        let _keyDownHandler: Function | null = null
        let _mouseWheelHandler: Function | null = null
        let _dragHandler: Function | null = null

        watch(
            () => index.value,
            () => {
                reset()
            },
        )

        watch(
            () => currentImg.value,
            url => {
                if (url) {
                    const type = url.substring(url.lastIndexOf('.') + 1).toLowerCase()
                    displayType.value = videoType.includes(type) ? 'video' : 'image'
                    nextTick(() => {
                        const $img = unref(imgRef) as any
                        if (!$img.complete) {
                            loading.value = true
                        }
                    })
                }
            },
            {
                immediate: true,
            },
        )

        watch(
            () => show.value,
            (show: boolean) => {
                if (show) {
                    nextTick(() => {
                        ;(unref(wrapElRef) as any).focus()
                        document.body.style.overflow = 'hidden'
                        deviceSupportInstall()
                    })
                } else {
                    nextTick(() => {
                        document.body.style.overflow = 'auto'
                        deviceSupportUninstall()
                    })
                }
            },
            {
                immediate: true,
            },
        )

        function hide(): void {
            show.value = false
            if (typeof props.onClose === 'function') {
                props.onClose(index.value)
            }
        }

        function select(): void {
            if (typeof props.onSelect === 'function') {
                props.onSelect(index.value)
            }
        }

        function deviceSupportInstall(): void {
            _keyDownHandler = throttle((e: any) => {
                const keyCode = e.keyCode
                switch (keyCode) {
                    // ESC
                    case 27:
                        hide()
                        break
                    // SPACE
                    case 32:
                        toggleMode()
                        break
                    // LEFT_ARROW
                    case 37:
                        prev()
                        break
                    // UP_ARROW
                    case 38:
                        handleActions('zoomIn')
                        break
                    // RIGHT_ARROW
                    case 39:
                        next()
                        break
                    // DOWN_ARROW
                    case 40:
                        handleActions('zoomOut')
                        break
                }
            })

            _mouseWheelHandler = throttle((e: any) => {
                const delta = e.wheelDelta ? e.wheelDelta : -e.detail
                if (delta > 0) {
                    handleActions('zoomIn', {
                        zoomRate: 0.015,
                        enableTransition: false,
                    })
                } else {
                    handleActions('zoomOut', {
                        zoomRate: 0.015,
                        enableTransition: false,
                    })
                }
            })
            on(document, 'keydown', _keyDownHandler as any)
            on(document, mousewheelEventName, _mouseWheelHandler as any)
        }

        function deviceSupportUninstall(): void {
            off(document, 'keydown', _keyDownHandler)
            off(document, mousewheelEventName, _mouseWheelHandler)
            _keyDownHandler = null
            _mouseWheelHandler = null
        }

        function handleImgLoad(): void {
            loading.value = false
        }

        function handleImgError(e: any): void {
            loading.value = false
            e.target.alt = '加载失败'
        }

        function handleMouseDown(e: any): void {
            if (loading.value || e.button !== 0) return
            const { offsetX, offsetY } = transform
            const startX = e.pageX
            const startY = e.pageY
            _dragHandler = throttle((ev: any) => {
                transform.offsetX = offsetX + ev.pageX - startX
                transform.offsetY = offsetY + ev.pageY - startY
            })
            on(document, 'mousemove', _dragHandler as any)
            on(document, 'mouseup', () => {
                off(document, 'mousemove', _dragHandler as any)
            })

            e.preventDefault()
        }

        function reset(): void {
            transform.scale = 1
            transform.deg = 0
            transform.offsetX = 0
            transform.offsetY = 0
            transform.enableTransition = false
        }

        function toggleMode(): void {
            if (loading.value) return
            reset()
        }

        function prev(): void {
            if (isFirst.value && !infinite.value) return
            const len = props.imageList.length
            index.value = (index.value - 1 + len) % len
        }

        function next(): void {
            if (isLast.value && !infinite.value) return
            const len = props.imageList.length
            index.value = (index.value + 1) % len
        }

        function handleActions(action: string, options: any = {}): void {
            if (loading.value) return
            const style = {
                zoomRate: 0.2,
                rotateDeg: 90,
                enableTransition: true,
                ...options,
            }
            const { zoomRate, rotateDeg, enableTransition } = style
            switch (action) {
                case 'zoomOut':
                    if (transform.scale > 0.2) {
                        transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3))
                    }
                    break
                case 'zoomIn':
                    transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3))
                    break
                case 'clocelise':
                    transform.deg += rotateDeg
                    break
                case 'anticlocelise':
                    transform.deg -= rotateDeg
                    break
            }
            transform.enableTransition = enableTransition
        }

        return {
            infinite,
            loading,
            show,
            index,
            transform,
            isSingle,
            isFirst,
            isLast,
            displayType,
            currentImg,
            imgStyle,
            imgRef,
            wrapElRef,
            hide,
            select,
            handleImgLoad,
            handleImgError,
            handleMouseDown,
            prev,
            next,
            toggleMode,
            handleActions,
        }
    },
})
</script>

<style lang="scss">
.bt-preview.image-viewer__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    .image-viewer__btn {
        position: absolute;
        z-index: 1;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        border-radius: 50%;
        opacity: 0.8;
        .close-icon {
            width: 40px;
        }
        .arrow-icon {
            width: 18px;
        }
    }

    .image-viewer__close {
        top: 40px;
        right: 40px;
        width: 40px;
        height: 40px;
        font-size: 40px;
        color: #fff;
    }

    .image-viewer__canvas {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .image-viewer__actions {
        bottom: 30px;
        left: 50%;
        width: 282px;
        height: 44px;
        padding: 0 23px;
        background-color: #606266;
        border-color: #fff;
        border-radius: 22px;
        transform: translateX(-50%);
    }

    .image-viewer__actions .image-viewer__actions__inner {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        font-size: 23px;
        color: #fff;
        text-align: justify;
        cursor: default;
        .icon-style {
            font-size: 28px;
            cursor: pointer;
        }
    }

    .image-viewer__prev {
        top: 50%;
        left: 40px;
        width: 44px;
        height: 44px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
        border-color: #fff;
        transform: translateY(-50%);
    }

    .image-viewer__next {
        top: 50%;
        right: 40px;
        width: 44px;
        height: 44px;
        font-size: 24px;
        color: #fff;
        text-indent: 2px;
        background-color: #606266;
        border-color: #fff;
        transform: translateY(-50%);
    }

    .image-viewer__mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.5;
    }

    .viewer-fade-enter-active {
        animation: viewer-fade-in 0.3s;
    }

    .viewer-fade-leave-active {
        animation: viewer-fade-out 0.3s;
    }

    @keyframes viewer-fade-in {
        0% {
            opacity: 0;
            transform: translate3d(0, -20px, 0);
        }
        100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes viewer-fade-out {
        0% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
        100% {
            opacity: 0;
            transform: translate3d(0, -20px, 0);
        }
    }
}
</style>

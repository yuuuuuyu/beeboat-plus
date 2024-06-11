<template>
    <div ref="btResizeRef" class="bt-resize-observer" tabindex="-1"></div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, reactive } from 'vue'
import { getInternetExplorerVersion } from './helper'
const props = withDefaults(
    defineProps<{
        emitOnMount?: boolean
        ignoreWidth?: boolean
        ignoreHeight?: boolean
    }>(),
    {
        emitOnMount: false,
        ignoreWidth: false,
        ignoreHeight: false,
    },
)
const emit = defineEmits(['notify'])
const btResizeRef = ref()
const states = reactive({
    _w: 0,
    _h: 0,
    _resizeObject: null as unknown as HTMLObjectElement,
})
let isIE: boolean
onMounted(() => {
    isIE = getInternetExplorerVersion() !== -1
    nextTick(() => {
        states._w = btResizeRef.value.offsetWidth
        states._h = btResizeRef.value.offsetHeight
        if (props.emitOnMount) {
            emitSize()
        }
    })
    const object = document.createElement('object')
    states._resizeObject = object
    object.setAttribute('aria-hidden', 'true')
    object.setAttribute('tabindex', '-1')
    object.onload = addResizeHandlers
    object.type = 'text/html'
    if (isIE) {
        btResizeRef.value.appendChild(object)
    }
    object.data = 'about:blank'
    if (!isIE) {
        btResizeRef.value.appendChild(object)
    }
})
onUnmounted(() => {
    removeResizeHandlers()
})
const emitSize = () => {
    emit('notify', {
        width: states._w,
        height: states._h,
    })
}
const compareAndNotify = () => {
    if (
        (!props.ignoreWidth && states._w !== btResizeRef.value.offsetWidth) ||
        (!props.ignoreHeight && states._h !== btResizeRef.value.offsetHeight)
    ) {
        states._w = btResizeRef.value.offsetWidth
        states._h = btResizeRef.value.offsetHeight
        emitSize()
    }
}
const addResizeHandlers = () => {
    states._resizeObject.contentDocument?.defaultView?.addEventListener('resize', compareAndNotify)
    compareAndNotify()
}
const removeResizeHandlers = () => {
    if (states._resizeObject && states._resizeObject.onload) {
        if (!isIE && states._resizeObject.contentDocument) {
            states._resizeObject.contentDocument?.defaultView?.removeEventListener(
                'resize',
                compareAndNotify,
            )
        }
        btResizeRef.value?.removeChild(states._resizeObject)
        states._resizeObject.onload = null
        states._resizeObject = null as unknown as HTMLObjectElement
    }
}
</script>

<template>
    <div ref="resizableRef" @mousedown="onMouseDown">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'

const emits = defineEmits(['change'])

const resizableRef = ref()
const state = reactive({
    isMoving: false,
    offsetX: null,
    offsetY: null,
})

const onMouseDown = () => {
    state.isMoving = true
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
}
const onMouseMove = event => {
    if (!state.isMoving) {
        return
    }
    if (state.offsetX == null || state.offsetY == null) {
        state.offsetX = event.clientX
        state.offsetY = event.clientY
        return
    }
    const x = event.clientX - state.offsetX
    const y = event.clientY - state.offsetY

    state.offsetX = event.clientX
    state.offsetY = event.clientY

    if (state.offsetX != null || state.offsetY != null) {
        emits('change', { x: x, y: y })
    }
}

const onMouseUp = () => {
    state.isMoving = false
    state.offsetX = null
    state.offsetY = null
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
}

onMounted(() => {
    document.addEventListener('mousedown', e => {
        if (resizableRef.value && !resizableRef.value.contains(e.target)) {
            onMouseUp()
        }
    })
})

onUnmounted(() => {
    onMouseUp()
})
</script>

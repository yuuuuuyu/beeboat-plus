<template>
    <div class="bt-dockpanel" :class="{ 'bt-dockpanel--horizontal': !props.isVertical }">
        <div
            ref="leftPanelRef"
            :style="{
                overflow: 'hidden',
                width: props.isVertical
                    ? (state.collapsed ? props.minCollapsedSize : state.dockSize) + 'px'
                    : 'auto',
                height: props.isVertical
                    ? 'auto'
                    : (state.collapsed ? props.minCollapsedSize : state.dockSize) + 'px',
            }"
        >
            <slot name="dock"></slot>
        </div>
        <div class="bt-dockpanel-separator" @mousedown="onMouseDown($event)">
            <div class="bt-dockpanel-separatorline"></div>
            <div
                :class="{ 'bt-dockpanel-collapsed ': state.collapsed }"
                class="bt-dockpanel-dock"
                @click="state.collapsed = !state.collapsed"
            >
                <!-- <i class="bt-icon bt-icon-unfold"></i> -->
                <div v-if="!state.isFold">
                    <FoldRightSvg
                        v-if="!state.isHover"
                        @mouseenter="state.isHover = !state.isHover"
                        @click="state.isFold = !state.isFold"
                    />
                    <FoldRightHoverSvg v-else @mouseleave="state.isHover = !state.isHover" />
                </div>
                <div v-else>
                    <FoldLeftSvg
                        v-if="!state.isHover"
                        @mouseenter="state.isHover = !state.isHover"
                        @click="state.isFold = !state.isFold"
                    />
                    <FoldLeftHoverSvg v-else @mouseleave="state.isHover = !state.isHover" />
                </div>
            </div>
        </div>
        <div class="bt-dockpanel-right"><slot></slot></div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import FoldRightSvg from './fold-right.vue'
import FoldRightHoverSvg from './fold-right-hover.vue'
import FoldLeftSvg from './fold-left.vue'
import FoldLeftHoverSvg from './fold-left-hover.vue'

interface BtDockPanelProps {
    //最小尺寸
    minCollapsedSize?: number
    //折叠区域默认尺寸
    dockSize?: number
    collapsed?: boolean
    isVertical?: boolean
}
const props = withDefaults(defineProps<BtDockPanelProps>(), {
    minCollapsedSize: 24,
    dockSize: 340,
    collapsed: false,
    isVertical: true,
})

const leftPanelRef = ref()

const state = reactive({
    dockSize: props.dockSize,
    collapsed: props.collapsed || false,
    isHover: false,
    isFold: false,
})

watch(
    ()=>props.dockSize,
    value => {
        state.dockSize = value
    },
)

const onMouseDown = event => {
    if (state.collapsed) {
        return
    }
    event = event || window.event
    event.target.setCapture && event.target.setCapture()
    if (props.isVertical) {
        const offsetWidth = leftPanelRef.value.offsetWidth - event.clientX
        document.onmousemove = function (event: any) {
            event = event || window.event
            state.dockSize = Math.max(offsetWidth + event.clientX, props.minCollapsedSize)
        }
    } else {
        const offsetHeight = leftPanelRef.value.offsetHeight - event.clientY
        document.onmousemove = function (event: any) {
            event = event || window.event
            state.dockSize = Math.max(offsetHeight + event.clientY, props.minCollapsedSize)
        }
    }
    document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
        leftPanelRef.value.releaseCapture && leftPanelRef.value.releaseCapture()
    }
}
</script>

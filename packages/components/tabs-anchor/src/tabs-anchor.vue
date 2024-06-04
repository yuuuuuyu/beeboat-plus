<template>
    <div class="bt-tabs-anchor" :style="styleObj">
        <el-tabs
            v-bind="{ ...$props, ...$attrs }"
            class="customer-tab"
            @tab-click="jump"
            @tab-remove="$emit('tab-remove', data.activeTabName)"
            @tab-add="$emit('tab-add')"
            @edit="(paneName, action) => $emit('edit', paneName, action)"
        >
            <el-tab-pane
                v-for="(tab, index) in $attrs.tabs"
                :key="index"
                :name="tab.refName"
                :label="tab.name"
            />
        </el-tabs>
        <div
            ref="tabAnchorScrollRef"
            class="scroll-content"
            style="flex: 1; height: calc(100% - 54px); overflow-x: hidden; overflow-y: auto"
            @scroll="onScroll"
        >
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtTabsAnchor',
}
</script>
<script setup lang="ts">
import { computed, getCurrentInstance, reactive, ref } from 'vue'

const tabAnchorScrollRef = ref()
const instance = getCurrentInstance()

const emits = defineEmits(['update:modelValue', 'tab-change', 'tab-remove', 'tab-add', 'edit'])

const data = reactive({
    activeTabName: '',
    tabIndex: 0,
    tabs: instance?.attrs.tabs || [],
})

const styleObj = computed(() => {
    const position = instance?.attrs['tab-position']
    if (position === 'left') {
        return {
            'flex-direction': 'row',
        }
    } else if (position === 'right') {
        return {
            'flex-direction': 'row-reverse',
        }
    } else if (position === 'bottom') {
        return {
            'flex-direction': 'column-reverse',
        }
    } else {
        return {
            'flex-direction': 'column',
        }
    }
})

// 参数element为滚动区域
const smoothDown = (element, distance, totalY, step) => {
    if (distance < totalY) {
        distance += step
        element.scrollTop = distance
        setTimeout(smoothDown.bind(null, element, distance, totalY, step), 10)
    } else {
        element.scrollTop = totalY
    }
}

// 参数element为滚动区域
function smoothUp(element, distance, totalY, step) {
    if (distance > totalY) {
        distance -= step
        element.scrollTop = distance
        setTimeout(smoothUp.bind(null, element, distance, totalY, step), 10)
    } else {
        element.scrollTop = totalY
    }
}

// tab click
const jump = tab => {
    let target = tabAnchorScrollRef.value
    let scrollItems = target.children
    // 判断滚动条是否滚动到底部
    if (target!.scrollHeight <= target!.scrollTop + target!.clientHeight) {
        data.tabIndex = tab.index
    }
    let totalY = scrollItems[tab.index].offsetTop - scrollItems[0].offsetTop
    let distance = target!.scrollTop // 滚动条距离滚动区域顶部的距离
    // 滚动动画实现, 使用setTimeout的递归实现平滑滚动，将距离细分为50小段，10ms滚动一次
    // 计算每一小段的距离
    let step = totalY / 50
    if (totalY > distance) {
        smoothDown(target, distance, totalY, step)
    } else {
        let newTotal = distance - totalY
        step = newTotal / 50
        smoothUp(target, distance, totalY, step)
    }
}
// 滚动条滚动
const onScroll = e => {
    const scrollTop = e.target.scrollTop
    const windowHeight = e.target.clientHeight
    const scrollHeight = e.target.scrollHeight
    if (Math.ceil(scrollTop + windowHeight) === scrollHeight) {
        // 已经滚动到底部
        data.activeTabName = data.tabs[Object.keys(data.tabs).length - 1].refName
        emits('tab-change', data.activeTabName)
        emits('update:modelValue', data.activeTabName)
    } else {
        let scrollItems = tabAnchorScrollRef.value.children
        for (let i = scrollItems.length - 1; i >= 0; i--) {
            // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
            let judge =
                e.target.scrollTop >= scrollItems[i].offsetTop - scrollItems[0].offsetTop - 100
            if (judge) {
                data.tabIndex = i
                data.activeTabName = data.tabs[data.tabIndex].refName
                emits('tab-change', data.activeTabName)
                emits('update:modelValue', data.activeTabName)
                break
            }
        }
    }
}
</script>

<template>
    <div ref="tabRef" class="btp-tabs-anchor">
        <el-tabs
            ref="elTabRef"
            v-bind="$attrs"
            v-model="state.activeTabName"
            style="height: 100%"
            @tab-change="tabChange"
            @tab-click="v1 => jump(v1, null)"
            @tab-remove="v1 => $emit('tab-remove', v1)"
            @tab-add="() => $emit('tab-add')"
            @edit="(v1, v2) => $emit('edit', v1, v2)"
        >
            <el-scrollbar>
                <slot name="default">
                    <template :key="component.id" v-for="component in btConfig?.children">
                        <component
                            :is="btViewContext.render(component)"
                            :style="component.styles"
                            :bt-view-context="btViewContext"
                            :bt-config="component"
                            v-bind="component.props"
                        />
                    </template>
                </slot>
            </el-scrollbar>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive, getCurrentInstance } from 'vue'

defineProps({
    /**
     * @description 视图动态配置
     */
    btConfig: {
        type: Object,
        default: undefined,
    },
    /**
     * @description 视图动态配置
     */
    btViewContext: {
        type: Object,
        default: undefined,
    },
})

const emits = defineEmits([
    'update:modelValue',
    'tab-click',
    'tab-change',
    'tab-remove',
    'tab-add',
    'edit',
])

const instance = getCurrentInstance()
const tabRef = ref()
const elTabRef = ref()

const state = reactive({
    activeTabName: instance?.attrs.modelValue || ('' as any),
    tabIndex: 0,
})
let isTabClick = false

onMounted(() => {
    tabRef.value.querySelector('.el-scrollbar__wrap').addEventListener('scroll', e => {
        if (isTabClick) return
        const scrollTop = e.target.scrollTop
        const windowHeight = e.target.clientHeight
        const scrollHeight = e.target.scrollHeight
        if (Math.ceil(scrollTop + windowHeight) === scrollHeight) {
            //
        } else {
            let scrollItems = tabRef.value.querySelectorAll('.el-tab-pane')
            for (let i = scrollItems.length - 1; i >= 0; i--) {
                // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
                let judge =
                    e.target.scrollTop >= scrollItems[i].offsetTop - scrollItems[0].offsetTop - 100
                if (judge) {
                    state.activeTabName = scrollItems[i].id.split('-')[1]
                    break
                }
            }
        }
    })
})

// 参数element为滚动区域
const smoothDown = (element, distance, totalY, step) => {
    if (distance < totalY) {
        distance += step
        element.scrollTop = distance
        setTimeout(smoothDown.bind(null, element, distance, totalY, step), 10)
    } else {
        element.scrollTop = totalY
        isTabClick = false // 重置标志
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
        isTabClick = false // 重置标志
    }
}

// tab click
const jump = (tabName, event) => {
    isTabClick = true // 设置标志

    emits('tab-click', tabName, event)
    let scrollTarget = tabRef.value.querySelector('.el-scrollbar__wrap')
    let target = tabRef.value.querySelector('.el-scrollbar__view')
    let scrollItems = target.children
    let totalY = scrollItems[tabName.index].offsetTop - scrollItems[0].offsetTop
    let distance = target!.scrollTop // 滚动条距离滚动区域顶部的距离
    // 滚动动画实现, 使用setTimeout的递归实现平滑滚动，将距离细分为50小段，10ms滚动一次
    // 计算每一小段的距离
    let step = totalY / 50
    if (totalY > distance) {
        smoothDown(scrollTarget, distance, totalY, step)
    } else {
        let newTotal = distance - totalY
        step = newTotal / 50
        smoothUp(scrollTarget, distance, totalY, step)
    }
}

const tabChange = tabName => {
    emits('update:modelValue', tabName)
    emits('tab-change', tabName)
}

/**
 * 将ElementPlus的内置方法继续暴露出去
 */
defineExpose({
    tabRef,
    elTabRef,
})
</script>

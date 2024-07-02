<template>
    <el-tabs class="btp-tabs-anchor" ref="elTabRef" v-model="state.activeTabName">
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
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive, getCurrentInstance, watch } from 'vue'

const emits = defineEmits([
    'update:modelValue',
    'tab-click',
    'tab-change',
    'tab-remove',
    'tab-add',
    'edit',
])

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
const instance = getCurrentInstance()
const state = reactive({
    activeTabName: instance?.attrs.modelValue || ('' as any),
})

let isTabClick = false
const elTabRef = ref()

watch(
    () => state.activeTabName,
    value => {
        console.log('监控信息变化', instance, instance.$refs)
        jump(state.activeTabName)
    },
)

const querySelector = clazz => {
    return elTabRef.value.$el.querySelector(clazz)
}
const querySelectorAll = clazz => {
    return elTabRef.value.$el.querySelectorAll(clazz)
}

onMounted(() => {
    querySelector('.el-scrollbar__wrap').addEventListener('scroll', e => {
        console.log('isscoll')
        if (isTabClick) return
        const scrollTop = e.target.scrollTop
        const windowHeight = e.target.clientHeight
        const scrollHeight = e.target.scrollHeight
        if (Math.ceil(scrollTop + windowHeight) === scrollHeight) {
            //
        } else {
            let scrollItems = querySelectorAll('.el-tab-pane')
            for (let i = scrollItems.length - 1; i >= 0; i--) {
                let judge =
                    e.target.scrollTop >= scrollItems[i].offsetTop - scrollItems[0].offsetTop - 100
                if (judge) {
                    state.activeTabName = scrollItems[i].id.split('-')[1]
                    emits('update:modelValue', state.activeTabName)
                    emits('tab-click', state.activeTabName, event)
                    emits('tab-change', state.activeTabName, event)
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
        isTabClick = false
    }
}

// tab click
const jump = (tabName, event) => {
    isTabClick = true
    let scrollTarget = querySelector('.el-scrollbar__wrap')
    let target = querySelector('.el-scrollbar__view')
    let scrollItems = target.children
    let totalY = scrollItems[tabName.index].offsetTop - scrollItems[0].offsetTop
    let distance = target!.scrollTop

    let step = totalY / 50
    if (totalY > distance) {
        smoothDown(scrollTarget, distance, totalY, step)
    } else {
        let newTotal = distance - totalY
        step = newTotal / 50
        smoothUp(scrollTarget, distance, totalY, step)
    }

    emits('tab-click', tabName, event)
    emits('tab-change', tabName, event)
}

/**
 * 将ElementPlus的内置方法继续暴露出去
 */
defineExpose({
    elTabRef,
})
</script>

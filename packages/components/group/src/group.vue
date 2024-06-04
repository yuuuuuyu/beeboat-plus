<template>
    <div
        class="bt-group"
        :class="{
            collapsed: data.collapsed,
            collapsable: props.showLeftFoldButton || props.showRightFoldButton,
        }"
    >
        <div class="bt-group-title">
            <el-icon
                v-if="props.showLeftFoldButton"
                class="bt-group--expand-icon"
                @click="foldOrSpread"
            >
                <CaretRight v-if="data.collapsed" />
                <CaretBottom v-else />
            </el-icon>
            <span v-if="props.showTitleIcon" class="bt-group--divider"></span>
            <div class="bt-group--title">
                <slot name="title">
                    {{ props.title }}
                </slot>
            </div>
            <div
                v-if="props.showRightFoldButton"
                class="bt-group--expand-button"
                @click="foldOrSpread"
            >
                {{ data.collapsed ? '展开' : '收起' }}
            </div>
        </div>
        <div ref="groupContentRef" class="bt-group--content">
            <div class="bt-group--content-wrapper">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtGroup',
}
</script>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CaretBottom, CaretRight } from '@element-plus/icons-vue'

interface IProps {
    title?: string
    showLeftFoldButton?: boolean
    showRightFoldButton?: boolean
    showTitleIcon?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
    title: '',
    showLeftFoldButton: false,
    showRightFoldButton: false,
    showTitleIcon: false,
})

const groupContentRef = ref()

const data = reactive({
    collapsed: false,
})

const foldOrSpread = () => {
    data.collapsed = !data.collapsed
    if (data.collapsed) {
        let targetHeight = window.getComputedStyle(groupContentRef.value).height
        groupContentRef.value.style.height = targetHeight
        setTimeout(() => {
            groupContentRef.value.style.height = '0'
        }, 20)
    } else {
        groupContentRef.value.style.height = 'auto'
        let targetHeight = window.getComputedStyle(groupContentRef.value).height
        groupContentRef.value.style.height = '0'
        setTimeout(() => {
            groupContentRef.value.style.height = targetHeight
        }, 20)
    }
}

defineExpose({
    isCollapsed: () => {
        return data.collapsed
    },
})
</script>

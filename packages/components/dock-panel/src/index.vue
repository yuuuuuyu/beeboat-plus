<template>
    <div class="btp-dockpanel" :class="{ 'btp-dockpanel--horizontal': props.mode == 'horizontal' }">
        <div
            ref="leftPanelRef"
            :style="{
                overflow: 'hidden',
                width:
                    props.mode == 'vertical'
                        ? (state.collapsed ? props.minDockSize : state.dockSize) + 'px'
                        : 'auto',
                height:
                    props.mode == 'vertical'
                        ? 'auto'
                        : (state.collapsed ? props.minDockSize : state.dockSize) + 'px',
            }"
        >
            <slot name="dock">
                <template :key="component.id" v-for="component in btConfig?.dock?.children">
                    <component
                        :is="btViewContext.render(component)"
                        :style="component.styles"
                        :bt-view-context="btViewContext"
                        :bt-config="component"
                        v-on="component.events"
                        v-bind="component.props"
                        v-model="btViewContext.dataModelProxy[component.model?.prop]"
                    />
                </template>
            </slot>
        </div>
        <div class="btp-dockpanel-separator" @mousedown="onMouseDown($event)">
            <div class="btp-dockpanel-separatorline"></div>
            <div
                :class="{ 'btp-dockpanel-collapsed ': state.collapsed }"
                class="btp-dockpanel-dock"
                @click="state.collapsed = !state.collapsed"
            >
                <i class="bt-icon bt-icon-unfold"></i>
            </div>
        </div>
        <div class="btp-dockpanel-right">
            <slot>
                <template :key="component.id" v-for="component in btConfig?.dockcontent?.children">
                    <component
                        :is="btViewContext.render(component)"
                        :style="component.styles"
                        :bt-view-context="btViewContext"
                        :bt-config="component"
                        v-on="component.events"
                        v-bind="component.props"
                        v-model="btViewContext.dataModelProxy[component.model?.prop]"
                    />
                </template>
            </slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
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
    /**
     * @description 面板模式 vertical为左右结构；horizontal为上下结构
     */
    mode: {
        type: String,
        default: 'vertical',
    },
    /**
     * @description 大小 参考element-plus的size属性
     */
    size: {
        type: String,
        default: undefined,
    },
    /**
     * @description 折叠区大小
     */
    dockSize: {
        type: Number,
        default: 340,
    },
    /**
     * @description 折叠区最小像素
     */
    minDockSize: {
        type: Number,
        default: 24,
    },
})

const leftPanelRef = ref()

const state = reactive({
    dockSize: props.dockSize,
    collapsed: false,
})

watch(
    () => props.dockSize,
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
    if (props.mode == 'vertical') {
        const offsetWidth = leftPanelRef.value.offsetWidth - event.clientX
        document.onmousemove = function (event: any) {
            event = event || window.event
            state.dockSize = Math.max(offsetWidth + event.clientX, props.minDockSize)
        }
    } else {
        const offsetHeight = leftPanelRef.value.offsetHeight - event.clientY
        document.onmousemove = function (event: any) {
            event = event || window.event
            state.dockSize = Math.max(offsetHeight + event.clientY, props.minDockSize)
        }
    }
    document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
        leftPanelRef.value.releaseCapture && leftPanelRef.value.releaseCapture()
    }
}
</script>

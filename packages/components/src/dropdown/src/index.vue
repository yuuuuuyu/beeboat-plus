<template>
    <el-dropdown ref="dropdownRef" class="btp-dropdown">
        <slot>
            <span v-if="$attrs['split-button'] || $attrs['splitButton']">
                {{ btConfig?.props.name || '' }}
            </span>
            <span v-else>
                <el-button type="$attrs.type || 'primarty'">
                    {{ btConfig?.props.name || '' }}<i class="bt-icon bt-icon-unfold" />
                </el-button>
            </span>
        </slot>
        <template #dropdown>
            <slot name="dropdown">
                <el-dropdown-menu>
                    <template v-for="component in btConfig?.children" :key="component.id">
                        <el-dropdown-item
                            :style="component.styles"
                            v-bind="component.props"
                            :command="component.props.command"
                        />
                    </template>
                </el-dropdown-menu>
            </slot>
        </template>
    </el-dropdown>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
    /**
     * @description 动态数据接口
     */
    props: {
        type: Object,
        default() {
            return { label: 'name', value: 'id' }
        },
    },
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

const dropdownRef = ref()

/**
 * 将ElementPlus的内置方法继续暴露出去
 */
defineExpose({
    handleOpen: () => {
        return dropdownRef.value.handleOpen()
    },
    handleClose: () => {
        return dropdownRef.value.handleClose()
    },
})
</script>

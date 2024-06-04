<template>
    <div class="bt-drop-down">
        <el-dropdown
            split-button
            :type="props.type"
            :size="props.size"
            :trigger="props.trigger"
            :max-height="props.maxHeight"
            :placement="props.placement"
            :hide-on-click="Boolean(props.hideOnClick)"
            :show-timeout="props.showTimeout"
            :hide-timeout="props.hideTimeout"
            :role="props.role"
            :tabindex="props.tabindex"
            :popper-class="props.popperClass"
            :teleported="Boolean(props.teleported)"
            :disabled="Boolean(props.disabled)"
            @visible-change="visibleChange"
            @click="handleClick"
            @command="handleCommand"
            @handleOpen="handleOpen"
            @handleClose="handleClose"
        >
            {{ props.title }}
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        v-for="item in props.dropOptions"
                        :key="`${item.label}drop`"
                        :disabled="Boolean(item.disabled)"
                        :divided="Boolean(item.divided)"
                        :command="item"
                    >
                        {{ item.label }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtDropDown',
}
</script>
<script setup lang="ts">

interface IProps {
    title?: string // 下拉标题
    dropOptions?: any
    size?: string
    trigger?: string
    type?: string
    maxHeight?: string | number
    placement?: string
    hideOnClick?: boolean | number
    showTimeout?: number
    hideTimeout?: number
    role?: string
    tabindex?: number
    popperClass?: string
    teleported?: boolean | number
    disabled?: boolean | number
}
const props = withDefaults(defineProps<IProps>(), {
    title: 'dropdown',
    size: 'default',
    trigger: 'hover',
    type: 'primary',
    hideOnClick: true,
})

const emits = defineEmits(['click', 'command', 'visibleChange', 'handleOpen', 'handleClose'])
const handleClick = val => {
    emits('click', { data: val })
}
const handleCommand = (command: string | number | object) => {
    emits('command', { data: command })
}
const visibleChange = val => {
    emits('visibleChange', { data: val })
}
const handleOpen = () => {
    emits('handleOpen')
}
const handleClose = () => {
    emits('handleClose')
}
</script>

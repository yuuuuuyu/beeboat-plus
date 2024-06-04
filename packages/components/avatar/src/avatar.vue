<template>
    <el-dropdown class="bt-avatar" trigger="click">
        <img class="bt-avatar--image" :src="props.imageUrl" />
        <!--用户下拉菜单-->
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="item in props.commands" :key="item.command">
                    <el-button text @click="onCommandClick(item.command)">
                        <em class="bt-avatar--command__icon" :class="item.icon"></em>
                        <span class="bt-avatar--command__title">{{ item.title }}</span>
                    </el-button>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
        <div></div>
    </el-dropdown>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
interface IProps {
    imageUrl?: string
    commands?: any
}
const props = withDefaults(defineProps<IProps>(), {})
const emits = defineEmits(['ItemClick'])
const pageData = reactive({
    dialogVisible: false,
    previewImageData: '',
})
const onCommandClick = command => {
    pageData.dialogVisible = !pageData.dialogVisible
    emits('ItemClick', command)
}
</script>

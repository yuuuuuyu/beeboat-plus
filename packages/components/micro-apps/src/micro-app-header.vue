<template>
    <div style="display: flex; flex-direction: row; align-items: center; width: 100%; height: 100%">
        <div style="flex: 1; padding: 0 10px; font-weight: bold; color: white">子应用首页</div>
        <div style="color: white">{{ appStore.getUserTokenData()?.user?.name }}</div>
        <div style="padding: 0 10px">
            <el-button plain @click="onLogout">注销</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BtUseAppStore } from '@beeboat/core/store'

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

const appStore = BtUseAppStore()
const router = useRouter()

const onLogout = () => {
    appStore.getApp().setToken('')
    router.push('/')
}
</script>

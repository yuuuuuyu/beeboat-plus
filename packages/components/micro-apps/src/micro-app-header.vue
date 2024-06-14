<template>
    <div style="display: flex; flex-direction: row; align-items: center; width: 100%; height: 100%">
        <div style="flex: 1; padding: 0 10px; font-weight: bold; color: white">子应用首页</div>
        <div style="color: white">{{ BTPApplication.getInstance().getCacheManager().getUserName() }}</div>
        <div style="padding: 0 10px">
            <el-button plain @click="onLogout">注销</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BTPApplication } from '@beeboat/core/app'

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

const router = useRouter()

const onLogout = () => {
    BTPApplication.getInstance().removeToken()
    router.push('/')
}
</script>

<template>
    <div class="bt-user-tool">
        <el-popover placement="bottom" :width="180" trigger="hover">
            <template #reference>
                <person :src="person" class="bt-user-tool__img--person" />
            </template>
            <div class="bt-user-tool__div--person">
                <div class="person--item">当前用户：{{ appStore.getUser?.name }}</div>
                <div class="person--item" @click="logout">退出系统</div>
            </div>
        </el-popover>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtUserTool',
}
</script>
<script setup lang="ts">
import { BtUseAppStore } from '@beeboat/core/store'
// 用户头像
import person from '../icon/person.vue'
const appStore = BtUseAppStore()

//退出登录
let logout = () => {
    appStore.getApp().setToken('')
    appStore.getApp().$router.push(appStore.getApp().loginPath)
}
</script>

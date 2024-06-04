<template>
    <div style="height: calc(100% - 0px)">
        <div style="padding: 8px">
            <el-select v-model="state.currentRoutePath" @change="onRoute">
                <el-option
                    v-for="item in getList"
                    :key="item.path"
                    :label="item.meta.name || item.name"
                    :value="item.path"
                />
            </el-select>
        </div>
        <el-scrollbar style="height: calc(100% - 50px)">
            <el-menu style="border-right: none" :default-active="state.currentRoutePath">
                <el-menu-item
                    v-for="item in getList"
                    :key="item.path"
                    :index="item.path"
                    @click="onRoute(item.path)"
                >
                    <span>{{ item?.meta?.name || item?.name }}</span>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtPageMenu',
}
</script>
<script script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { BtUseAppStore } from '@beeboat/core/store'
const state = reactive({
    currentRoutePath: '',
})
const router = useRouter()
const appStore = BtUseAppStore()
const getList = computed(() => {
    return appStore.getApp()?.options?.constRoutes?.find(i => i.path == '/')?.children || []
})

const onRoute = path => {
    state.currentRoutePath = path
    router.push({ path: path })
}
</script>

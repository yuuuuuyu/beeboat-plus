<template>
    <div class="welcome">
        <div class="title">我是组件列表目录</div>
        <div class="grid-list">
            <div class="grid-item">
                <div class="flex-item">组件</div>
                <div class="cls-author">作者</div>
                <div class="flex-item2">描述</div>
            </div>
        </div>
        <div class="grid-list">
            <div
                v-for="(item, index) in routesList"
                :key="index"
                class="grid-item"
                @click="toRoute(item.path)"
            >
                <div class="flex-item">
                    <el-link type="primary">{{ item.meta.title }}</el-link>
                </div>
                <div class="cls-author">{{ item.meta.author }}</div>
                <div class="flex-item2">{{ item.meta.desc }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const routesList = router.getRoutes().filter(i => !i.meta.hidden)
const toRoute = path => {
    router.push(path)
}
</script>

<style scoped>
.welcome {
    padding: 20px;
}

.title {
    padding-bottom: 10px;
}

.grid-list {
    display: grid;
    row-gap: 10px;
    width: 500px;
}

.grid-item {
    display: flex;
    flex: 1;
}

.cls-author {
    width: 120px;
    /* color: gray; */
    padding-right: 10px;
}

.flex-item {
    flex: 1;
}

.flex-item2 {
    flex: 2;
}
</style>

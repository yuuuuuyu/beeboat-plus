<template>
    <div class="welcome">
        <h1 class="title">组件列表</h1>
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
h1 {
    margin: 0;
    margin-bottom: 20px;
}
.grid-list {
    width: auto;
}

.grid-item {
    height: 40px;
    line-height: 40px;
}

.cls-author {
    width: 120px;
    /* color: gray; */
    padding-right: 10px;
}
</style>

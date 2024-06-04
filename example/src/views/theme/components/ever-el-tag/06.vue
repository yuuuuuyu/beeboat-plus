<template>
    <el-divider content-position="left">可选中的标签</el-divider>
    <el-check-tag checked style="margin-right: 8px">Checked</el-check-tag>
    <el-check-tag :checked="checked" @change="onChange">Toggle me</el-check-tag>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(false)

const onChange = (status: boolean) => {
    checked.value = status
}
</script>

<style scoped>
.el-tag {
    margin: 0 4px;
}
</style>

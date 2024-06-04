<template>
    <div class="detail-title"><span class="prefix"></span>{{ title }}</div>
</template>

<script setup lang="ts">
defineProps({
    title: String,
})
</script>

<style scoped lang="scss">
.detail-title {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 8px;
    font-size: 16px;

    .prefix {
        display: inline;
        padding-right: 8px;
        margin: 6px 0;
        border-left: 4px solid var(--el-color-primary);
    }
}
</style>

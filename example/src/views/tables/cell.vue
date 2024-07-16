<template>
    <el-table-column v-bind="column"> </el-table-column>
</template>

<script setup lang="ts">
defineProps({
    column: {
        type: Object,
        default: null,
    },
    editor: {
        type: Object,
        default: null,
    },
    manager: {
        type: Object,
        default: null,
    },
})
</script>

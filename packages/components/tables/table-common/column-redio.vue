<template>
    <el-radio
        :label="scope.row.id"
        v-model="manager.state.radioSelection"
        @change="manager.selectSingleRow(scope.row)"
    >
        {{ '' }}
    </el-radio>
</template>

<script setup lang="ts">
defineProps({
    column: {
        type: Object,
        default: null,
    },
    scope: {
        type: Object,
        default: null,
    },
    manager: {
        type: Object,
        default: null,
    },
})
</script>

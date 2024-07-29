<template>
    <template v-if="column.children && column.children.length > 0">
        <template v-for="item in column.children" :key="item.id">
            <el-button>{{ item.name }}</el-button>
        </template>
    </template>
</template>
<script lang="ts">
export default {
    name: 'BtpTableOperator',
    btpInject: true,
}
</script>
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

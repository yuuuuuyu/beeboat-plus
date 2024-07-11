<template>this is override--{{ scope.row[column.prop] }}</template>

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
    editor: {
        type: Object,
        default: null,
    },
})
</script>

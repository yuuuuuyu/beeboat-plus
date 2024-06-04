<template>
    <div class="ever-table-screen__item">
        <div class="ever-table-screen__item--label">{{ label }}</div>
        <div class="ever-table-screen__item--content">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
    label: {
        type: String as PropType<string>,
        default: '',
    },
})
</script>

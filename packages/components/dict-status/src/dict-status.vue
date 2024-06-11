<template>
    <div class="bt-dict-status">
        <span
            v-if="colorData?.color"
            class="mark"
            :style="`background-color:${colorData.color}`"
        ></span>
        <span class="text">{{ colorData?.name || '-' }}</span>
    </div>
</template>

<script lang="ts">
export default {
    name: 'BtDictStatus',
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { PropsType } from './typing'

const props = defineProps(PropsType)

const colorData = computed(() => {
    return props.data
})
</script>

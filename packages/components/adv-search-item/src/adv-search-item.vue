<template>
    <div class="bt-advsearchbar-item bt-advsearchbar-searchitem">
        <div v-if="showLabel" class="bt-advsearchbar-searchitem--label">
            <template v-if="label.length > 6">
                <el-tooltip effect="dark" :content="label" placement="left">
                    {{ label }}
                </el-tooltip>
            </template>
            <template v-else>
                {{ label }}
            </template>
        </div>
        <div class="bt-advsearchbar-searchitem--content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
    showLabel: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    label: {
        type: String as PropType<string>,
        default: '',
    },
})
</script>

<template>
    <label>
        <mark v-if="props.mark && props.code">
            <code>
                <sub-item v-bind="props" />
            </code>
        </mark>
        <mark v-else-if="props.mark">
            <sub-item v-bind="props" />
        </mark>
        <code v-else-if="props.code">
            <sub-item v-bind="props" />
        </code>
        <template v-else>
            <sub-item v-bind="props" />
        </template>
    </label>
</template>
<script lang="ts">
export default {
    name: 'BtTitle',
}
</script>
<script setup lang="ts">
import SubItem from './sub-item.vue'
import { PropsType } from './typing'

const props = defineProps(PropsType)
</script>

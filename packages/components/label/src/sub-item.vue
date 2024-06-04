<template>
    <del v-if="props.deleteLine">
        <ins v-if="props.underline">
            <strong v-if="props.strong">
                {{ props.text }}
            </strong>
            <template v-else>
                {{ props.text }}
            </template>
        </ins>
        <template v-else>
            <strong v-if="props.strong">
                {{ props.text }}
            </strong>
            <template v-else>
                {{ props.text }}
            </template>
        </template>
    </del>
    <ins v-else-if="props.underline">
        <strong v-if="props.strong">
            {{ props.text }}
        </strong>
        <template v-else>
            {{ props.text }}
        </template>
    </ins>
    <template v-else>
        <strong v-if="props.strong">
            {{ props.text }}
        </strong>
        <template v-else>
            {{ props.text }}
        </template>
    </template>
</template>
<script lang="ts">
export default {
    name: 'BtTitleSubItem',
}
</script>
<script setup lang="ts">
import { PropsType } from './typing'

const props = defineProps(PropsType)
</script>

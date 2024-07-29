<template>
    <template v-if="column.dictId">
        <div class="bt-dict-status">
            <span
                class="mark"
                :style="`background-color:${state.dictItem?.color || 'transparent'}`"
            ></span>
            <span class="text">{{ state.dictItem?.name || '-' }}</span>
        </div>
    </template>
    <template v-else>{{ calcColumnText() }} </template>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { BTPUtils } from '@beeboat/core'

const props = defineProps({
    column: {
        type: Object,
        default: null,
    },
    scope: {
        type: Object,
        default: null,
    },
})

const state = reactive({
    dictItem: null as any,
})

onMounted(() => {
    if (props.column.dictId) {
        const value = props.scope.row[props.column.prop]
        state.dictItem = BTPUtils.getCacheManager().getDictItem(props.column.dictId, value)
    }
})

const calcColumnText = () => {
    const row = props.scope.row
    const value = row[props.column.prop]
    if (props.column.formatter) {
        return row.$index == -1 ? null : props.column.formatter(props.column, row, value)
    } else {
        const cellValue = Array.isArray(value) ? value.join(' / ') : value

        return BTPUtils.isEmpty(cellValue) ? '-' : cellValue
    }
}
</script>

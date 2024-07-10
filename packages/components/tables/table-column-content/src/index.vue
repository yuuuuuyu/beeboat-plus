<template>
    <template v-if="props.editable && column.editProps?.enable && editor.isEditing(scope.row)">
        <CellEditor :column="column" :row="scope.row" :editor="editor"></CellEditor>
    </template>
    <template v-else>
        <template v-if="column.dictId">
            <div class="bt-dict-status">
                <span
                    class="mark"
                    :style="`background-color:${state.dictItem?.color || 'transparent'}`"
                ></span>
                <span class="text">{{ state.dictItem?.name || '-' }}</span>
            </div>
        </template>
        <template v-else>
            {{ calcColumnText() }}
        </template>
    </template>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import CellEditor from '../../table-editor/src/index.vue'
import BTPUtils from '@beeboat/core/utils-ex/btp-utils'

interface IProps {
    editable?: boolean
    column?: any
    scope?: any
    editor?: any
}
const props = withDefaults(defineProps<IProps>(), {
    editable: false,
    column: null,
    scope: null,
    editor: null,
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

const isEmpty = callValue => {
    return callValue === '' || callValue == null || callValue == undefined
}

const calcColumnText = () => {
    const row = props.scope.row
    const value = row[props.column.prop]
    if (props.column.formatter) {
        return row.$index == -1 ? null : props.column.formatter(props.column, row, value)
    } else {
        const cellValue = Array.isArray(value) ? value.join(' / ') : value

        return isEmpty(cellValue) ? '-' : cellValue
    }
}
</script>

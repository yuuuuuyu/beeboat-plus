<template>
    <div class="btp-table-cell-editor">
        <div class="btp-table-cell-editor--content">
            <el-input v-model.trim="data[column.prop]" />
        </div>
        <el-popover v-if="editor?.hasError(row, column)" placement="right" trigger="hover">
            {{ editor.getErrorMessage(row, column) || '' }}
            <template #reference>
                <el-icon>
                    <WarningFilled color="#f56c6c" />
                </el-icon>
            </template>
        </el-popover>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
    row?: any
    column?: any
    editor?: any
}
const props = withDefaults(defineProps<IProps>(), {
    column: {},
    row: {},
    editor: null,
})

const data = computed(() => {
    return props.editor?.getData(props.row) || {}
})
</script>

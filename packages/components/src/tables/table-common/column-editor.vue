<template>
    <div class="btp-table-cell-editor">
        <div class="btp-table-cell-editor--content">
            <el-input v-model.trim="data[column.prop]" />
        </div>
        <el-popover v-if="manager.editor.hasError(row, column)" placement="right" trigger="hover">
            {{ manager.editor.getErrorMessage(row, column) || '' }}
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
    manager?: any
}
const props = withDefaults(defineProps<IProps>(), {
    column: {},
    row: {},
    manager: null,
})

const data = computed(() => {
    return props.manager.editor.getData(props.row) || {}
})
</script>

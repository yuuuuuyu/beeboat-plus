<template>
    <el-popover
        v-if="fuzzyHas(props.row, column.prop!+'_message')"
        placement="right"
        :width="200"
        trigger="hover"
    >
        <div v-html="props.row[column.prop!+'_message']"></div>
        <template #reference>
            <el-icon>
                <WarningFilled color="#f56c6c" />
            </el-icon>
        </template>
    </el-popover>
</template>

<script setup lang="ts">
import { fuzzyHas } from './helpers'
import { WarningFilled } from '@element-plus/icons-vue'

interface ErrorProps {
    row?: any
    column?: any
}
const props = withDefaults(defineProps<ErrorProps>(), {
    row: {},
    column: {},
})
</script>

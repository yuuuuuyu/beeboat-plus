<template>
    <div class="bt-pagination">
        <div ref="btPageRef" :class="[{ 'bt-pagination--ui': isCss }]">
            <span v-if="props.multiPageSelection">
                <slot name="left"></slot>
            </span>
            <el-pagination
                v-if="!getHasSelection"
                v-model:current-page="props.pageable.pageNumber"
                v-model:page-size="props.pageable.pageSize"
                :page-sizes="[20, 50, 100, 200, 500]"
                :background="true"
                :small="true"
                :layout="layoutString"
                :total="props.pageable.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
        <!-- 外层元素属性position必须是static之外的值才能正常生效 -->
        <ResizeObserver :emit-on-mount="true" @notify="handleResize" />
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtPagination',
}
</script>
<script setup lang="ts" name="pagination">
import { computed, ref } from 'vue'
// import { MkResizeObserver } from 'mickey-ui'
import ResizeObserver from '../../resize-observer/src/resize-observer.vue'
import { getLayout, getLayoutByAuto } from './helper'
interface PaginationProps {
    pageable: {
        // 当前页数
        pageNumber: number
        // 每页显示条数
        pageSize: number
        // 总条数
        total: number
    }
    /** 布局 auto, 1, 2, 3, 4 */
    layout?: string
    /** 是否加载UI规范样式样式 */
    isCss?: boolean
    /** 是否跨页多选 */
    multiPageSelection?: boolean
    hasSelection?: boolean
    handleSizeChange: (size: number) => void
    handleCurrentChange: (currentPage: number) => void
}

const props = withDefaults(defineProps<PaginationProps>(), {
    layout: 'auto',
    isCss: true,
    multiPageSelection: false,
    hasSelection: false,
})

const getHasSelection = computed(() => {
    return props.hasSelection
})
const layoutString = ref(getLayout(props.layout))

const handleResize = ({ width }) => {
    if (props.layout == 'auto') {
        layoutString.value = getLayoutByAuto(width)
    }
}
</script>
<style scoped lang="scss">
.bt-pagination {
    :deep(.el-pagination) {
        --el-pagination-button-width: 24px;
        --el-pagination-button-height: 24px;
    }
    position: relative;
    width: 100%;
    :deep(.el-pagination__jump) {
        margin-left: 16px;
    }
    :deep(.el-pagination__sizes) {
        margin-left: 12px;
    }
    :deep(.el-pagination__classifier) {
        margin-left: 8px;
    }
}
.bt-pagination--ui {
    display: flex;
    justify-content: v-bind('multiPageSelection?"space-between":"flex-end"');
    padding-top: 24px;
    padding-bottom: 24px;
}
</style>

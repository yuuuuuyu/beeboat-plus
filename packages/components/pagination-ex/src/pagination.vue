<template>
    <div ref="btPageRef" class="bt-pagination-ex">
        <div class="bt-pagination-ex--toolbar">
            <div v-if="props.reserveSelection">
                <el-switch v-model="state.mode" @change="$emit('reserve-change', state.mode)" />
                <bt-button type="default" text="plain" link>
                    已选{{ selection ? selection.length : 0 }}行
                </bt-button>
                <bt-button
                    v-if="selection && selection.length > 0"
                    link
                    text="plain"
                    @click="$emit('clear-selection')"
                >
                    清空
                </bt-button>
            </div>
        </div>
        <el-pagination
            v-if="!state.mode"
            ref="paginationRef"
            v-bind="{ ...$props, ...$attrs }"
            v-model:current-page="state.currentPage"
            v-model:page-size="state.pageSize"
            :layout="$attrs.layout || state.layout"
            @current-change="innerCurrentChange"
            @size-change="innerPageSizeChange"
        />
        <ResizeObserver :emit-on-mount="true" @notify="onViewResized" />
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtPagination',
}
</script>
<script setup lang="ts" name="pagination">
import { reactive, ref, watch } from 'vue'
import ResizeObserver from '../../resize-observer/src/resize-observer.vue'
import { ElMessageBox } from 'element-plus'
//定义事件
const emits = defineEmits([
    'update:current-page',
    'update:page-size',
    'reserve-change',
    'clear-selection',
    'size-change',
    'current-change',
    'back',
])

const paginationRef = ref()

const layouts = {
    1: 'prev, next, jumper',
    2: 'total, prev, pager, next',
    3: 'total, prev, pager, next, sizes',
    4: 'total, prev, pager, next, sizes, jumper',
    550: 'prev, next, jumper',
    650: 'total, prev, pager, next',
    750: 'total, prev, pager, next, sizes',
    850: 'total, prev, pager, next, sizes, jumper',
}

/**
 * 计算布局
 * @param mode
 * @param width
 * @returns
 */
const getLayout = (mode: any, width: any) => {
    if (width && mode == 'auto') {
        if (width <= 550) {
            return layouts[550]
        } else if (width <= 650) {
            return layouts[550]
        } else if (width <= 750) {
            return layouts[750]
        } else if (width <= 850) {
            return layouts[850]
        } else {
            return layouts[4]
        }
    } else {
        return layouts[mode]
    }
}

interface PaginationProps {
    pageSizes?: any
    autoLayout?: boolean
    background?: boolean
    /**表格选中数据 */
    selection: any
    /**是否开启跨页勾选 */
    reserveSelection?: boolean
    total: number
    small?: boolean
    pageSize: number
    currentPage: number
    currentRow: any
}

const props = withDefaults(defineProps<PaginationProps>(), {
    pageSizes: [20, 50, 100, 200, 500],
    autoLayout: true,
    background: true,
    selection: [],
    reserveSelection: true,
    small: true,
    pageSize: 20,
    currentPage: 1,
    currentRow: [],
})

const state = reactive({
    mode: false,
    pageSize: 20,
    previousPageSize: 20, //上一次的pageSize
    currentPage: 1,
    previousPage: 1, //上一次的currentPage
    layout: getLayout(4, null),
    todoPageSize: false,
    todoTemp: 0,
})

// innerPageSizeChange/innerCurrentChange 用于处理行内编辑状态下的翻页判断
// 如果他要实现确定后在切换pagesize目前饿了么不支持，所以在confirm后再切换
const innerPageSizeChange = val => {
    state.todoPageSize = true

    if (!props.currentRow.length) {
        state.pageSize = val
        state.previousPageSize = val
    }
}
const innerCurrentChange = val => {
    if (!props.currentRow.length) {
        state.currentPage = val
        state.previousPage = val
    }
}
// fix: 高级搜索重置操作后，分页器数据发生变化，但是当前页码不变
watch(
    () => props.currentPage,
    value => {
        state.currentPage = value
    },
    { immediate: true },
)
watch(
    () => state.currentPage,
    (newValue, oldValue) => {
        // 切换pageSize的时候也会触发currentPage的变化
        if (newValue == state.previousPage) {
            emits('update:current-page', state.currentPage)
            emits('current-change', state.currentPage)
            return
        }
        // 切换pagesize后页数减少，上一步操作选中的页码更新成切换后的最后一页，这个时候要更新以下数据
        if (state.todoPageSize) {
            state.todoTemp = oldValue
        }
        if (props.currentRow.length && !state.todoPageSize) {
            ElMessageBox.confirm('当前页面存在未保存数据，确认离开?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    state.previousPage = newValue
                    state.currentPage = newValue
                    state.todoTemp = state.currentPage

                    emits('back', {
                        pageSize: state.pageSize,
                        currentPage: newValue,
                    })
                })
                .catch(() => {
                    state.currentPage = state.previousPage
                })
        }
    },
    {},
)
watch(
    () => state.pageSize,
    (newValue, oldValue) => {
        if (newValue == state.previousPageSize) {
            // 不存在编辑状态的数据时，要处理todoPageSize的状态false，因为在切换currentPage的时候需要判断todoPageSize的状态
            state.todoPageSize = false
            emits('update:page-size', state.pageSize)
            emits('size-change', state.pageSize)
            return
        }

        if (props.currentRow.length) {
            ElMessageBox.confirm('当前页面存在未保存数据，确认离开?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    state.todoPageSize = false

                    state.pageSize = newValue
                    state.previousPageSize = newValue

                    state.previousPage = state.currentPage
                    state.todoTemp = state.currentPage

                    emits('back', {
                        pageSize: newValue,
                        currentPage: state.currentPage,
                    })
                })
                .catch(() => {
                    state.todoPageSize = false
                    if (state.todoTemp) {
                        state.currentPage = state.todoTemp
                    }
                    state.pageSize = state.previousPageSize
                })
        }
    },
    {},
)

watch(
    () => props.pageSize,
    value => {
        state.pageSize = value
        state.previousPageSize = value
    },
    {},
)

const onViewResized = ({ width }) => {
    if (props.autoLayout) {
        state.layout = getLayout('auto', width)
    }
}
const resetPagination = () => {
    state.currentPage = 1
    state.previousPage = 1
    state.pageSize = 20
    state.previousPageSize = 20
}

defineExpose({
    paginationRef,
    resetPagination,
})
</script>

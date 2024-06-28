<template>
    <div class="btp-pagination">
        <div class="btp-pagination--toolbar">
            <div v-if="props.reserveSelection">
                <el-switch
                    v-model="state.mode"
                    @change="$emit('update:reserve', state.mode)"
                ></el-switch>
                <el-button type="default" link>
                    已选{{ selection ? selection.length : 0 }}行
                </el-button>
                <el-button
                    v-if="selection && selection.length > 0"
                    link
                    @click="$emit('clear-selection')"
                >
                    清空
                </el-button>
            </div>
        </div>
        <el-pagination
            v-if="!state.mode"
            v-bind="{ ...$props, ...$attrs }"
            v-model:current-page="state.currentPage"
            v-model:page-size="state.pageSize"
            :layout="$attrs.layout || state.layout"
            @size-change="$emit('size-change', $event)"
            @current-change="$emit('current-change', $event)"
            @prev-click="$emit('prev-click', $event)"
            @next-click="$emit('next-click', $event)"
            @change="
                (v1, v2) => {
                    $emit('change', v1, v2)
                }
            "
        ></el-pagination>
        <ResizeObserver :emit-on-mount="true" @notify="onViewResized"></ResizeObserver>
    </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue'
import ResizeObserver from '../../../resize-observer/src/resize-observer.vue'

//定义事件
const emits = defineEmits([
    'size-change',
    'current-change',
    'change',
    'prev-click',
    'next-click',
    'reserve-change',
    'clear-selection',
    'update:page-size',
    'update:current-page',
    'update:reserve',
])
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
    selection: any
    reserve?: boolean
    /**是否开启跨页勾选 */
    reserveSelection?: boolean
    total: number
    pageSize: number
    currentPage: number
}

const props = withDefaults(defineProps<PaginationProps>(), {
    pageSizes: [20, 50, 100, 200, 500],
    autoLayout: true,
    selection: [],
    reserve: false,
    reserveSelection: true,
    pageSize: 20,
    currentPage: 1,
})

const state = reactive({
    mode: props.reserve || false,
    pageSize: props.pageSize || 20,
    currentPage: 1,
    layout: getLayout(4, null),
})

const onViewResized = ({ width }) => {
    if (props.autoLayout) {
        state.layout = getLayout('auto', width)
    }
}
const reset = () => {
    state.currentPage = 1
    state.pageSize = 20
}

/**
 * 进行V-Model监控
 */
watch(
    () => state.currentPage,
    value => {
        emits('update:current-page', value)
    },
    { immediate: false },
)
/**
 * 进行V-Model监控
 */
watch(
    () => state.pageSize,
    value => {
        emits('update:page-size', value)
    },
    { immediate: false },
)

defineExpose({
    reset,
})
</script>

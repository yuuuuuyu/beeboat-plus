<template>
    <div class="bt-table-ex bt-table-v2">
        <div class="bt-table-ex--searchbar">
            <bt-adv-searchbar-ex
                v-if="props.searchBarProps?.enable"
                ref="searchbarRef"
                v-bind="props.searchBarProps"
                :column-list="props.searchBarProps.searchColumns || props.columns"
                :sence-id="senceId"
                @search="onAdvSearchbarSearch"
                @reset="onAdvSearchbarReset"
            >
                <template #default>
                    <slot name="tableHeaderSearch"></slot>
                </template>
            </bt-adv-searchbar-ex>
        </div>
        <!-- 搜索栏下 头部左侧操作栏 -->
        <div class="bt-table-ex--toolbar">
            <slot name="tableHeaderLeft" :selection="state.selection"></slot>
            <slot name="tableHeaderRight" :selection="state.selection"></slot>
        </div>
        <div class="bt-table-ex--table">
            <div class="bt-table-ex--table--container">
                <el-auto-resizer>
                    <template #default="{ height, width }">
                        <el-table-v2
                            ref="tableRef"
                            :columns="props.columns"
                            :data="getTableData()"
                            :row-height="40"
                            :header-height="48"
                            :width="width"
                            :height="height"
                            fixed
                            :sort-by="sortBy"
                            @column-sort="onSort"
                        >
                            <template #header-cell="scope">
                                <el-checkbox
                                    v-if="scope.column.type == 'selection'"
                                    v-model="state.multiSelectionCheckAll"
                                    :indeterminate="state.multiSelectionCheckIndeterminate"
                                    @change="onCheckboxSelectionAllChange($event)"
                                />
                                <span v-else>{{ scope.column.label }}</span>
                            </template>
                            <template #cell="scope">
                                <span v-if="scope.column.type == 'index'">
                                    {{ computeRowIndex(scope.rowIndex) }}
                                </span>
                                <span v-else-if="scope.column.type == 'radio'">
                                    <el-radio
                                        v-model="state.singleSelectionData"
                                        :label="scope.rowData[props.rowKey]"
                                        @change="onRadioSelectionChange(scope.rowData)"
                                    >
                                        {{ '' }}
                                    </el-radio>
                                </span>
                                <span v-else-if="scope.column.type == 'selection'">
                                    <el-checkbox
                                        v-model="
                                            state.multiSelectionData[scope.rowData[props.rowKey]]
                                        "
                                        :label="scope.rowData[props.rowKey]"
                                        @change="onCheckboxSelectionChange(scope.rowData, $event)"
                                    >
                                        {{ '' }}
                                    </el-checkbox>
                                </span>
                                <div v-else>
                                    <slot
                                        :name="`BtTableExColumn${scope.column.prop}Content`"
                                        :row="scope.rowData"
                                        :column="scope.column"
                                        :index="scope.rowIndex"
                                    >
                                        <ColContent
                                            :table-src="tableSrc"
                                            :item="scope.column"
                                            :scope="scope"
                                        />
                                    </slot>
                                </div>
                            </template>
                        </el-table-v2>
                    </template>
                </el-auto-resizer>
            </div>
        </div>
        <!-- 分页 -->
        <div v-if="props.paginationProps?.enable" class="bt-table-ex--paginatioin">
            <PaginationEx
                ref="paginationRef"
                v-model:currentPage="state.pagination.pageNumber"
                v-model:page-size="state.pagination.pageSize"
                :total="state.pagination.total"
                :reserve-selection="Boolean(props.reserveSelection)"
                :selection="state.selection"
                v-bind="props.paginationProps"
                :current-row="{}"
                @current-change="onPaginationCurrentChange"
                @size-change="onPaginationSizeChange"
                @reserve-change="onPaginationReserveChange"
                @clear-selection="onPaginationClearSelection"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import ColContent from './col-content.vue'
import PaginationEx from '../../pagination/src/index.vue'
import { useInit, usePagination } from './table-v2'

const emit = defineEmits([
    'beforeQuery',
    'afterQuery',
    'selection-change',
    'search',
    'reset',
    'dataChange',
    'column-sort',
    'expanded-rows-change',
    'end-reached',
    'scroll',
    'rows-rendered',
    'row-expand',
    'row-event-handlers',
])
interface BtTableExProps {
    rowKey?: string
    border?: boolean
    tableId: string
    senceId: string
    data?: any
    columns?: any
    enableContinuous?: boolean
    requestApi: (params: any) => Promise<any>
    beforeQuery?: Function
    afterQuery?: Function
    reserveSelection?: boolean
    searchBarProps?: any
    paginationProps?: any
    initParam?: any
    initLoading?: boolean
    selectable?: any
}
const props = withDefaults(defineProps<BtTableExProps>(), {
    rowKey: 'id',
    border: true,
    tableId: '',
    senceId: '',
    columns: [],
    enableContinuous: true,
    reserveSelection: true,
    searchBarProps: {
        enable: false,
    },
    paginationProps: {
        enable: true,
        background: true,
    },
    initParam: {},
    initLoading: true,
})
const tableRef = ref()
const paginationRef = ref()
const {
    state,
    loadData,
    getTableData,
    getTableDataId,
    onAdvSearchbarSearch,
    onAdvSearchbarReset,
    onRadioSelectionChange,
    onCheckboxSelectionChange,
    onCheckboxSelectionAllChange,
} = useInit(tableRef, props, emit)

const {
    computeRowIndex,
    onPaginationCurrentChange,
    onPaginationSizeChange,
    onPaginationReserveChange,
    onPaginationClearSelection,
} = usePagination(tableRef, paginationRef, state, props, emit, loadData)

//启用高级搜索后默认不加载数据
if (!props.searchBarProps?.enable && props.initLoading) {
    loadData()
}

//检测是否有数据源单元格
const tableSrc = reactive({})
const checkData = () => {
    state.columns?.forEach(async el => {
        const baceName = el.prop //基础字段名称
        if (el.searchProps?.dataSourceProps && el.searchProps.dataSource) {
            //后端获取数据源
            if (typeof el.searchProps.dataSource === 'function') {
                const { data } = await el.searchProps.dataSource({ _time: new Date().getTime() })
                //把数据源添加到每一行
                tableSrc[`${baceName}SrcList`] = data
            }
        }
    })
}
checkData()
const searchbarRef = ref()
const getAdvOutQueryParam = () => {
    return searchbarRef.value.getAdvOutQueryParam()
}
const getInitParam = () => props.initParam
//排序逻辑
const sortBy = ref({
    key: '',
    order: 'asc',
})
const onSort = (column: any) => {
    sortBy.value = column
    let sortData: any
    state.pagination.reserve ? (sortData = state.selection) : (sortData = state.data)
    if (sortBy.value.order === 'asc') {
        //升序
        state.data = sortData.sort((a, b) => a[column.key] - b[column.key])
    } else if (sortBy.value.order === 'desc') {
        //降序
        state.data = sortData.sort((a, b) => b[column.key] - a[column.key])
    }
}
//获取选中的数据(多选、单选)
const getSelection = () => {
    return state.selection
}
defineExpose({
    tableRef,
    paginationRef,
    getAdvOutQueryParam,
    getInitParam,
    getSelection,
    /** 自定义Expose开始*/
    refresh: () => {
        loadData()
    },
    /**
     * 获取表格数据
     */
    getTableData: () => {
        return state.data
    },
    getTableDataId: (id = null) => {
        return getTableDataId(id)
    },
    /** 自定义Expose开始*/
    clearSelection: () => {
        // 清除单选
        state.singleSelectionData = null
        // state.multiSelectionData = {}
        state.multiSelectionCheckAll = false
        state.multiSelectionCheckIndeterminate = false
        state.selection = []
        Object.keys(state.multiSelectionData).forEach(key => {
            state.multiSelectionData[key] = false
        })
    },
    getSelectionRows: () => {
        return state.selection
    },
    getSelectionRowsId: (id = null) => {
        const ids = [] as Array<String>
        state.selection.forEach(element => {
            ids.push(element[id || props.rowKey || 'id'])
        })
        return ids
    },

    scrollTo: (scrollLeft, scrollTop) => {
        tableRef.value.scrollTo(scrollLeft, scrollTop)
    },
    scrollToLeft: scrollLeft => {
        tableRef.value.scrollToLeft(scrollLeft)
    },
    scrollToTop: scrollTop => {
        tableRef.value.scrollToTop(scrollTop)
    },
    scrollToRow: (row, strategy) => {
        tableRef.value.scrollToRow(row, strategy)
    },
})
</script>

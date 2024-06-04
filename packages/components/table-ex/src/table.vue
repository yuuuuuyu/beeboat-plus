<template>
    <div class="bt-table-ex">
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
            <div class="bt-table-ex--toolbar-inneredit">
                <slot
                    v-if="!state.controlInnerEdit"
                    name="tableHeaderLeft"
                    :selection="state.selection"
                >
                </slot>
                <template
                    v-if="props.editConfig.showBtn && props.editConfig.dialogStatus !== 'view'"
                >
                    <el-dropdown split-button type="primary" @click="handleControlInnerEdit">
                        {{ state.controlInnerEdit ? '退出行内编辑' : '开启行内编辑' }}
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-if="props.editConfig.dialogStatus !== 'view'">
                                    <bt-button
                                        type="primary"
                                        :loading="state.addLoading"
                                        :disabled="!state.controlInnerEdit"
                                        @click="todoEdit(props.columns, { type: 'add' })"
                                    >
                                        <el-icon><Plus /></el-icon>添加
                                    </bt-button>
                                </el-dropdown-item>
                                <el-dropdown-item v-if="props.editConfig.type === 'page'">
                                    <bt-button
                                        type="secondary"
                                        :disabled="!currentRow.length"
                                        @click="todoEdit(null, { type: 'save' })"
                                    >
                                        <el-icon><Check /></el-icon>保存
                                    </bt-button>
                                </el-dropdown-item>
                                <el-dropdown-item
                                    v-if="props.editConfig.type === 'page'"
                                    :divided="true"
                                >
                                    <bt-button
                                        type="warning"
                                        :disabled="!currentRow.length"
                                        @click="todoEdit(null, { type: 'cancel' })"
                                    >
                                        <el-icon><Close /></el-icon> 取消
                                    </bt-button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </div>
            <slot
                v-if="!state.controlInnerEdit"
                name="tableHeaderRight"
                :selection="state.selection"
            ></slot>
        </div>
        <div class="bt-table-ex--table">
            <div class="bt-table-ex--table--container">
                <el-table
                    ref="tableRef"
                    v-bind="{ ...$props, ...$attrs }"
                    v-loading="state.loading"
                    :data="getTableData()"
                    element-loading-background="rgba(255, 255, 255, .9)"
                    :row-style="rowStyle"
                    v-on="emitEvents"
                >
                    <template v-if="$slots.append" #append>
                        <slot name="append"></slot>
                    </template>
                    <template v-if="$slots.empty" #empty><slot name="empty"></slot> </template>
                    <!--原生插槽-->
                    <slot></slot>
                    <template v-for="item in state.columns" :key="item.uniqueIndex">
                        <slot v-if="!item.hidden" :name="`${item.prop || item.id}`" :column="item">
                            <el-table-column
                                v-bind="item"
                                :selectable="props.selectable"
                                :sort-method="!props.data ? getTableData : void 0"
                            >
                                <!-- 表头 -->
                                <template #header="scope">
                                    <slot
                                        :name="`BtTableExColumn${item.prop}Header`"
                                        :column="scope.column"
                                        :row="scope.row"
                                        :index="scope.$index"
                                    >
                                        {{ item.label || '' }}
                                    </slot>
                                    <template
                                        v-if="props.columnSetting && isLastOperateColumn(item)"
                                    >
                                        <ColumnSettingDialog
                                            :columns="props.columns"
                                            @change="onColumnSettingChange"
                                        />
                                    </template>
                                </template>
                                <!-- 序号列 -->
                                <template
                                    v-if="item.type == 'index' && props.enableContinuous"
                                    #default="scope"
                                >
                                    {{ computeRowIndex(scope.$index) }}
                                </template>
                                <!-- 单选列 -->
                                <template v-if="item.type == 'radio'" #default="scope">
                                    <el-radio
                                        v-model="state.signgleSelectionData"
                                        :label="scope.$index"
                                        @change="onRadioSelectionChange(scope.row)"
                                    >
                                        {{ '' }}
                                    </el-radio>
                                </template>
                                <template
                                    v-else-if="!item.type || item.type == ''"
                                    #default="scope"
                                >
                                    <slot
                                        :name="`BtTableExColumn${item.prop}Content`"
                                        :row="scope.row"
                                        :column="scope.column"
                                        :index="scope.$index"
                                    >
                                        <ColContent
                                            :state="state"
                                            :table-src="tableSrc"
                                            :item="item"
                                            :scope="scope"
                                            :current-row="currentRow"
                                        />
                                    </slot>
                                </template>
                                <template v-else-if="item.type == 'operate'" #default="scope">
                                    <slot
                                        v-if="!state.controlInnerEdit"
                                        :name="`BtTableExColumn${item.prop}Content`"
                                        :row="scope.row"
                                        :column="scope.column"
                                        :index="scope.$index"
                                    >
                                    </slot>
                                    <bt-button
                                        v-if="state.controlInnerEdit"
                                        type="primary"
                                        link="true"
                                        @click.stop="
                                            todoEdit(props.columns, {
                                                type: 'add',
                                                position: 'down',
                                                origin: scope.row,
                                            })
                                        "
                                    >
                                        添加
                                    </bt-button>
                                    <bt-button
                                        v-if="state.controlInnerEdit"
                                        type="danger"
                                        link="true"
                                        @click.stop="todoEdit(scope.row, { type: 'delete' })"
                                    >
                                        删除
                                    </bt-button>
                                </template>
                            </el-table-column>
                        </slot>
                    </template>
                    <el-table-column
                        v-if="props.columnSetting && !isLastOperateColumn(null)"
                        width="60"
                        fixed="right"
                    >
                        <template #header>
                            <ColumnSettingDialog
                                :columns="props.columns"
                                @change="onColumnSettingChange"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="props.movable && !state.pagination?.reserve"
                        width="60"
                        fixed="right"
                    >
                        <el-button text class="bt-table-ex-row-move">
                            <el-icon class="bt-icon bt-icon-move" />
                        </el-button>
                    </el-table-column>
                </el-table>
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
                :current-row="currentRow"
                v-bind="props.paginationProps"
                @current-change="onPaginationCurrentChange"
                @size-change="onPaginationSizeChange"
                @reserve-change="onPaginationReserveChange"
                @clear-selection="onPaginationClearSelection"
                @back="back"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, nextTick, provide, reactive } from 'vue'
import Sortable from 'sortablejs'
import { Plus, Close, Check } from '@element-plus/icons-vue'
import PaginationEx from '../../pagination-ex/src/pagination.vue'
import ColContent from './col-content.vue'
import ColumnSettingDialog from './column-setting-popover.vue'
import { useInit, usePagination } from './table'
import { useSence } from './sence'
import isEqual from 'lodash-es/isEqual'

const emit = defineEmits([
    'beforeSenceLoad',
    'aftersenceLoad',
    'beforeQuery',
    'afterQuery',
    'select',
    'select-all',
    'selection-change',
    'cell-mouse-enter',
    'cell-mouse-leave',
    'cell-click',
    'cell-dblclick',
    'cell-contextmenu',
    'row-click',
    'row-contextmenu',
    'row-dblclick',
    'header-click',
    'header-contextmenu',
    'sort-change',
    'filter-change',
    'current-change',
    'header-dragend',
    'expand-change',
    /*自定义事件 */
    'move-change',
    'edit-change',
])

interface BtTableExProps {
    rowKey?: string
    border?: boolean
    tableId: string
    senceId: string
    data?: any
    columns?: any
    columnSetting?: boolean
    movable?: boolean
    enableContinuous?: boolean
    reserveSelection?: boolean | number
    requestApi: (params: any) => Promise<any>
    beforeQuery?: Function
    afterQuery?: Function

    searchBarProps?: any
    paginationProps?: any
    editConfig?: any
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
    columnSetting: true,
    movable: false,
    enableContinuous: true,
    reserveSelection: false,

    searchBarProps: {
        enable: false,
    },
    paginationProps: {
        enable: true,
        background: true,
    },
    editConfig: {
        enable: false,
        showBtn: false,
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
    isLastOperateColumn,
    onColumnSettingChange,
    onColumnHeaderDraged,
    onTableSortChange,
    onAdvSearchbarSearch,
    onAdvSearchbarReset,
    doLayout,
    todoEdit,
    currentRow,
    handleControlInnerEdit,
    setPageSize,
} = useInit(tableRef, props, emit)

const {
    computeRowIndex,
    onPaginationCurrentChange,
    onPaginationSizeChange,
    onPaginationReserveChange,
    onPaginationClearSelection,
} = usePagination(tableRef, paginationRef, state, props, emit, loadData, currentRow)

const { loadTableSence } = useSence(doLayout, tableRef, state, props)

doLayout()
//加载表格列设置主题
loadTableSence()
// 开启默认加载后才去加载数据
props.initLoading && loadData()

/**
 * 初始化行拖拽事件
 */
const initRowMoveEvents = () => {
    nextTick(() => {
        if (tableRef.value) {
            const tbody = tableRef.value.$el.querySelector('.el-table__body-wrapper tbody')
            Sortable.create(tbody, {
                handle: '.bt-table-ex-row-move',
                onEnd: ({ newIndex, oldIndex }) => {
                    const currentRow = state.data.splice(oldIndex, 1)[0]
                    state.data.splice(newIndex, 0, currentRow)
                    emit('move-change', state.data)
                },
            })
        }
    })
}
if (props.movable) {
    initRowMoveEvents()
}

/**
 * 单选点击事件
 * @param row 行
 */
const onRadioSelectionChange = row => {
    tableRef.value.setCurrentRow(row)
    state.selection = [row]
    state.signgleSelectionData = getTableData().findIndex(
        v => JSON.stringify(v) === JSON.stringify(row),
    )
    emit('selection-change', state.selection)
}
/**
 * 获取选中数据的ID
 */
const getSelectionRowsId = (id = null) => {
    const ids = [] as Array<String>
    const selection = tableRef.value.getSelectionRows()
    selection.forEach(element => {
        ids.push(element[id || props.rowKey || 'id'])
    })
    return ids
}

/**
 * 获取表格数据ID
 */
const getTableDataId = (id = null) => {
    const ids = [] as Array<String>
    if (state.data) {
        state.data.forEach(element => {
            ids.push(element[id || props.rowKey || 'id'])
        })
    }
    return ids
}

const rowStyle = ({ row }) => {
    let checkIdList: any = ref([])
    state.selection.forEach(item => {
        checkIdList.value.push(item[props.rowKey])
    })
    if (checkIdList.value.length == 0) return
    if (checkIdList.value.includes(row[props.rowKey])) {
        return {
            backgroundColor: '#E5EBFD',
        }
    }
}
const emitEvents = {
    select: (v1, v2) => {
        emit('select', v1, v2)
    },
    'select-all': v1 => {
        emit('select-all', v1)
    },
    'cell-mouse-enter': (v1, v2, v3, v4) => {
        emit('cell-mouse-enter', v1, v2, v3, v4)
    },
    'cell-mouse-leave': (v1, v2, v3, v4) => {
        emit('cell-mouse-leave', v1, v2, v3, v4)
    },
    'cell-click': (v1, v2, v3, v4) => {
        if (props.editConfig.enable) {
            // 如果点击的数据行是新增的数据行不执行
            // 内部再次增加控制行内编辑的开启
            if (!v1.virtualId && state.controlInnerEdit) {
                // tableRef.value.toggleRowSelection(v1, true)
                todoEdit(v1, { type: 'edit' })
            }
        }
        emit('cell-click', v1, v2, v3, v4)
    },
    'cell-dblclick': (v1, v2, v3, v4) => {
        emit('cell-dblclick', v1, v2, v3, v4)
    },
    'cell-contextmenu': (v1, v2, v3, v4) => {
        emit('cell-contextmenu', v1, v2, v3, v4)
    },
    'row-click': (v1, v2, v3) => {
        // 结合行内编辑优化交互
        if (v2 && v2.type && v2.type != 'radio' && !props.editConfig.enable) {
            // 增加了行点击选中的后，需要配合全选的动作
            tableRef.value.clearSelection()
            tableRef.value.toggleRowSelection(v1)

            state.signgleSelectionData = getTableData().findIndex(
                v => JSON.stringify(v) === JSON.stringify(v1),
            )
            state.selection = [v1]
        }
        emit('row-click', v1, v2, v3)
    },
    'row-contextmenu': (v1, v2, v3) => {
        emit('row-contextmenu', v1, v2, v3)
    },
    'row-dblclick': (v1, v2, v3) => {
        emit('row-dblclick', v1, v2, v3)
    },
    'header-click': (v1, v2) => {
        emit('header-click', v1, v2)
    },
    'header-contextmenu': (v1, v2) => {
        emit('header-contextmenu', v1, v2)
    },
    'sort-change': sort => {
        onTableSortChange(sort)
    },
    'filter-change': v1 => {
        emit('filter-change', v1)
    },
    'selection-change': rows => {
        state.selection = rows
        emit('selection-change', rows)
    },
    'current-change': (v1, v2) => {
        emit('current-change', v1, v2)
    },
    'header-dragend': (v1, v2, v3, v4) => {
        onColumnHeaderDraged(v1, v2, v3, v4)
        emit('header-dragend', v1, v2, v3, v4)
    },
    'expand-change': (v1, v2) => {
        emit('expand-change', v1, v2)
    },
    'edit-change': (v1, v2) => {
        emit('edit-change', v1, v2)
    },
}
const searchbarRef = ref()
const getAllQueryParam = () => {
    return searchbarRef.value.getAllAdvOutQueryParam()
}
const getAdvOutQueryParam = () => {
    return searchbarRef.value.getAdvOutQueryParam()
}
const getInitParam = () => props.initParam
/**
 * 处于编辑状态时，切换pagesize或者pagenumber后确定离开编辑状态，更新分页信息，并取消编辑状态，刷新列表，不做保存
 * @param {Object} params - 分页参数
 * @param {number} params.pageSize - 每页显示的条数
 * @param {number} params.currentPage - 当前页码
 */
const back = params => {
    state.pagination.pageSize = params.pageSize
    state.pagination.pageNumber = params.currentPage
    todoEdit(null, { type: 'cancel' })
}

const onEditChange: (column: any, event: any, row: any, datasource: any) => void = (
    column,
    $event,
    row,
    datasource,
) => {
    emit('edit-change', { column: column, row: row, value: $event, datasource: datasource })
}
//获取选中数据（单选、多选）
const  getSelection = () => {
    return state.selection
}
// 处理行内编辑的change事件
provide('onEditChange', onEditChange)

defineExpose({
    rowEditAdd: () => {
        todoEdit(props.columns, { type: 'add' })
    },
    rowEditRemove: (selection: any) => {
        todoEdit(selection, { type: 'deleteBatchSilent' })
    },
    todoEdit,
    cancelEdit: handleControlInnerEdit,
    tableRef,
    paginationRef,
    setPageSize,
    getAllQueryParam,
    getAdvOutQueryParam,
    /** 获取表格的初始化参数 */
    getInitParam,
    /** 自定义Expose开始*/
    refresh: () => {
        tableRef.value.clearSelection()
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
        // 清空表格多选
        tableRef.value.clearSelection()
        // 清除单选
        state.signgleSelectionData = null
        state.selection = []
    },
    getSelectionRowsLength: () => {
        // 获取选中数据的条数
        const selection = tableRef.value.getSelectionRows()
        return selection.length
    },
    getSelectionRows: () => {
        if (props.columns.find(item => item.type && item.type == 'radio')) {
            return state.selection
        } else {
            return tableRef.value.getSelectionRows()
        }
    },
    getSelectionRowsId: (id = null) => {
        return getSelectionRowsId(id)
    },
    toggleRowSelection: (row, selected) => {
        // 主动调用toggleRowSelection，在取消时需要同步移除跨页勾选收集的数据
        const index = state.selection.findIndex(obj => isEqual(obj, row))
        index !== -1 && state.selection.splice(index, 1)

        tableRef.value.toggleRowSelection(row, selected)
    },
    toggleAllSelection: () => {
        tableRef.value.toggleAllSelection()
    },
    toggleRowExpansion: (row, expanded) => {
        tableRef.value.toggleRowExpansion(row, expanded)
    },
    setCurrentRow: row => {
        tableRef.value.setCurrentRow(row)
        // 兼容单选表格
        state.selection = [row]
        state.signgleSelectionData = getTableData().findIndex(
            v => JSON.stringify(v) === JSON.stringify(row),
        )
    },
    clearSort: () => {
        tableRef.value.clearSort()
    },
    clearFilter: columnKeys => {
        tableRef.value.clearFilter(columnKeys)
    },
    doLayout: () => {
        doLayout()
    },
    sort: (prop: string, order: string) => {
        tableRef.value.sort(prop, order)
    },
    scrollTo: (options, yCoord) => {
        tableRef.value.scrollTo(options, yCoord)
    },
    setScrollTop: top => {
        tableRef.value.setScrollTop(top)
    },
    setScrollLeft: left => {
        tableRef.value.setScrollLeft(left)
    },
    getSelection,
})

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
</script>
<style scoped>
:deep(.el-table__body-wrapper tr td.el-table-fixed-column--left) {
    background-color: inherit;
}
</style>

<template>
    <div class="btp-table">
        <div class="btp-table--searchbar">
            <BtpAdvSearchbar
                v-if="props.search?.enable"
                ref="searchbarRef"
                v-bind="props.search"
                :column-list="props.columns"
                @search="onAdvSearch"
            >
                <template #default>
                    <slot name="search"></slot>
                </template>
            </BtpAdvSearchbar>
        </div>
        <!-- 搜索栏下 头部左侧操作栏 -->
        <div class="btp-table--toolbar">
            <slot name="toolbar" :selection="state.selection"></slot>
        </div>
        <div class="btp-table--table">
            <div class="btp-table--table--container">
                <el-table
                    ref="tableRef"
                    :data="getTableData()"
                    v-loading="status.loading"
                    v-bind="{ ...$props, ...$attrs }"
                    v-on="emitEvents"
                >
                    <template v-if="$slots.append" #append>
                        <slot name="append"></slot>
                    </template>
                    <template v-if="$slots.empty" #empty>
                        <slot name="empty"></slot>
                    </template>
                    <!--原生插槽-->
                    <slot>
                        <template v-for="item in state.columns" :key="item.uniqueIndex">
                            <slot v-if="!item.hidden" :name="item.prop" :column="item">
                                <el-table-column v-bind="item">
                                    <template #default="scope">
                                        <template v-if="item.type == 'index' && item.continuous">
                                            {{ computeRowIndex(scope.$index) }}
                                        </template>
                                        <template v-else-if="item.type == 'radio'">
                                            <el-radio
                                                :label="scope.row.id"
                                                v-model="state.radioSelection"
                                                @change="radioSelectionChange(scope.row)"
                                            >
                                                {{ '' }}
                                            </el-radio>
                                        </template>
                                        <template v-else-if="item.type == 'operate'">
                                            <el-button :row="scope">123</el-button>
                                        </template>
                                        <template v-else-if="!item.type || item.type == ''">
                                            <BtpTableColumnContent
                                                :column="item"
                                                :scope="scope"
                                                :editor="tableEditor"
                                                :editable="props.editProps?.enable"
                                            >
                                            </BtpTableColumnContent>
                                        </template>
                                    </template>
                                </el-table-column>
                            </slot>
                        </template>
                        <el-table-column v-if="props.columnSetting" width="120px" fixed="right">
                            <template #header>
                                <BtpTableColumnSetting
                                    :columns="state.columns"
                                    @change="onColumnSettingChange"
                                >
                                </BtpTableColumnSetting>
                            </template>
                            <template #default="scope">
                                <el-button
                                    type="primary"
                                    :link="true"
                                    @click.stop="tableEditor.add(scope.$index)"
                                >
                                    添加
                                </el-button>
                                <el-button
                                    type="danger"
                                    :link="true"
                                    @click.stop="tableEditor.delete(scope.row)"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </slot>
                </el-table>
            </div>
        </div>
        <!-- 分页 -->
        <BtpPagination
            v-if="props.pagination?.enable"
            ref="paginationRef"
            v-bind="props.pagination"
            v-model:current-page="state.pagination.currentPage"
            v-model:page-size="state.pagination.pageSize"
            v-model:reserve="state.pagination.reserve"
            :selection="state.selection"
            :total="state.pagination.total"
            @clear-selection="onPaginationClearSelection"
        ></BtpPagination>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useTable, useTableLoader } from './index'
import { useTableEvents } from './table-events'
import BTPTableEditor from '../../table-editor/src/table-editor'
import BtpAdvSearchbar from '../../adv-searchbar/src/index.vue'
import BtpPagination from '../../pagination/src/index.vue'
import BtpTableColumnContent from '../../table-column-content/src/index.vue'
import BtpTableColumnSetting from './column-setting-popover.vue'

const emits = defineEmits([
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
    'data-loaded',
    'row-edit-add',
    'row-edit-edit',
    'row-edit-delete',
    'row-edit-cancel',
    'row-edit-change',
])

interface IProps {
    id?: string
    rowKey?: string
    search?: any
    pagination?: any
    editProps?: any
    columns?: any
    columnSetting?: boolean
    dataApi?: any
    initLoading?: boolean
    propEvents?: any
}
const props = withDefaults(defineProps<IProps>(), {
    id: '',
    rowKey: 'id',
    search: {},
    pagination: {
        reserveSelection: false,
    },
    editProps: { enable: false },
    columns: [],
    columnSetting: true,
    dataApi: null,
    initLoading: true,
    propEvents: {},
})
const tableRef = ref()
const state = reactive({
    data: [],
    columns: [],
    selection: [],
    pagination: {
        reserve: false,
        pageNumber: 1,
        currentPage: 1,
        total: 0,
        pageSize: props.pagination.pageSize || 20,
    },
    radioSelection: null,
    advQueryParam: null as any,
})
const status = reactive({
    loading: false,
})

const { initTable, loadData, getTableData, onPaginationClearSelection, onColumnSettingChange } =
    useTableLoader(props, state, status, tableRef, emits)

const tableEditor = new BTPTableEditor(props, getTableData, emits)

const { emitEvents } = useTableEvents(props, state, status, tableRef, emits, tableEditor)
const { computeRowIndex, radioSelectionChange } = useTable(props, state, status, tableRef, emits)

/**
 * 进行V-Model监控
 */
watch(
    () => state.pagination.currentPage,
    value => {
        state.pagination.pageNumber = value
        loadData()
    },
    { immediate: false },
)
/**
 * 进行V-Model监控
 */
watch(
    () => state.pagination.pageSize,
    () => {
        state.pagination.pageNumber = state.pagination.currentPage = 1
    },
    { immediate: false },
)

const onAdvSearch = advQueryParam => {
    state.advQueryParam = advQueryParam
    loadData()
}

initTable()

if (props.initLoading && !props.search.enable) {
    loadData()
}

defineExpose({
    editor: tableEditor,
})
</script>

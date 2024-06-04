<!-- eslint-disable vue/html-indent -->
<template>
    <div class="bt-table">
        <!-- 表格头部 搜索栏 -->
        <div class="bt-table--searchbar">
            <bt-adv-searchbar-ex
                v-if="props.searchBar"
                ref="btAdvSearchBarEx"
                v-bind="props.searchBarProps"
                :init-loading="props.initLoading"
                :sence-info="props.senceInfo"
                :sence-id="props.senceId"
                :column-list="props.searchColumns || props.columns"
                @search="searchTable"
                @reset="resetTable"
            >
                <template #default>
                    <slot name="tableHeaderSearch"></slot>
                </template>
            </bt-adv-searchbar-ex>
        </div>
        <div class="bt-table--toolbar">
            <slot
                name="tableHeaderLeft"
                :selected-data="{
                    ids: selectedListIds,
                    list: selectedList,
                    isSelected: isSelected,
                }"
            ></slot>
            <slot
                name="tableHeaderRight"
                :selected-data="{
                    ids: selectedListIds,
                    list: selectedList,
                    isSelected: isSelected,
                }"
            ></slot>
        </div>
        <!-- 搜索栏下 头部左侧操作栏 -->
        <!-- <div class="header-left"></div>
        <div class="header-right"></div> -->
        <div class="bt-table--content">
            <div class="bt-table--content-wrap">
                <!-- 表格主体 -->
                <el-table
                    ref="tableRef"
                    v-loading="loading"
                    :height="props.tableHeight || '100%'"
                    :data="tableData"
                    :border="border"
                    :row-key="rowKey"
                    :stripe="stripe"
                    :highlight-current-row="hightLightCurrentRow"
                    :tree-props="{ children: childrenName }"
                    :header-row-style="headerRowStyle"
                    :row-style="rowStyle"
                    :cell-style="cellStyle"
                    :expand-row-keys="expandRowKey"
                    element-loading-background="rgba(255, 255, 255, .9)"
                    v-bind="bindTableValue"
                    @selection-change="onSelectionChange"
                    @header-dragend="headerDragend"
                    @expand-change="expandChange"
                    @sort-change="
                        val => {
                            if (props?.tableSortChange) {
                                props.tableSortChange(val)
                            } else {
                                onTableSortChange(val)
                            }
                        }
                    "
                >
                    <template v-for="item in tableColumns" :key="`${item.item19999999999}`">
                        <el-table-column
                            v-if="
                                (item.type == 'selection' || item.type == 'index') && item.showValue
                            "
                            :type="item.type"
                            :reserve-selection="item.reserveSelection ? true : false"
                            :label="useI18nTitle(item)"
                            :width="item.width"
                            :min-width="item.minWidth"
                            :fixed="item.fixed && item.fixed != '' ? 'left' : false"
                            :align="item.align"
                            :selectable="props.selectable"
                        >
                            <template #header>
                                <slot :name="`${item.type}Header`">
                                    {{ useI18nTitle(item) || '' }}
                                </slot>
                            </template>
                            <template
                                v-if="item.type == 'index' && props.enableContinuous"
                                #default="scope"
                            >
                                {{
                                    scope.$index + (pageable.pageNumber - 1) * pageable.pageSize + 1
                                }}
                            </template>
                        </el-table-column>
                        <!-- expand（展开查看详情，请使用作用域插槽） -->
                        <el-table-column
                            v-if="item.type == 'expand'"
                            :type="item.type"
                            :label="useI18nTitle(item)"
                            :width="item.width"
                            :min-width="item.minWidth"
                            :fixed="item.fixed && item.fixed != '' ? item.fixed : false"
                            :align="item.align"
                        >
                            <template #header>
                                <slot :name="`${item.type}Header`">
                                    {{ useI18nTitle(item) || '' }}
                                </slot>
                            </template>
                            <template #default="scope">
                                <slot
                                    :name="item.type"
                                    :row="scope.row"
                                    :index="scope.$index"
                                ></slot>
                            </template>
                        </el-table-column>
                        <!-- other -->
                        {{
                            item.showOverflowTooltip != undefined
                                ? Boolean(item.showOverflowTooltip)
                                : true
                        }}
                        <el-table-column
                            v-if="item.prop && !item.type && item.showValue"
                            :prop="item.prop"
                            :label="useI18nTitle(item)"
                            :width="item.width"
                            :min-width="item.minWidth"
                            :sortable="Boolean(item.sortable)"
                            :show-overflow-tooltip="
                                item.showOverflowTooltip != undefined
                                    ? Boolean(item.showOverflowTooltip)
                                    : true
                            "
                            :resizable="true"
                            :fixed="item.fixed && item.fixed != '' ? item.fixed : false"
                            :align="item.align"
                        >
                            <template #header>
                                <slot :name="`${item.prop}Header`">
                                    {{ useI18nTitle(item) || '' }}
                                </slot>
                                <template v-if="isExistOperationColumn && item?.columnType == 4">
                                    <colSetting
                                        v-if="props.columnSetting || props.rightToolColumn"
                                        :table-ref="tableRef"
                                        :col-setting="tableColumns"
                                        @fresh="colsFresh"
                                    />
                                </template>
                            </template>

                            <template #default="scope">
                                <!-- 自定义配置每一列 slot（作用域插槽） -->
                                <slot :name="item.prop" :row="scope.row" :index="scope.$index">
                                    <colContent :item="item" :scope="scope" />
                                </slot>
                            </template>
                        </el-table-column>
                    </template>
                    <template #empty>
                        <div class="table-empty">
                            <div>暂无数据</div>
                        </div>
                    </template>
                    <el-table-column
                        v-if="
                            !isExistOperationColumn &&
                            (Boolean(props.rightToolColumn) || Boolean(props.columnSetting))
                        "
                        width="60"
                        fixed="right"
                    >
                        <template #header>
                            <div>
                                <colSetting
                                    v-if="props.rightToolColumn || props.columnSetting"
                                    :table-ref="tableRef"
                                    :col-setting="tableColumns"
                                    @fresh="colsFresh"
                                />
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 分页 -->
        <div v-if="pagination" class="bt-table--pageable">
            <Pagination
                :has-selection="hasSelection"
                :multi-page-selection="Boolean(props.multiPageSelection)"
                :pageable="pageable"
                :handle-size-change="handleSizeChange"
                :handle-current-change="handleCurrentChange"
            >
                <template #left>
                    <el-space>
                        <el-switch v-model="hasSelection" @change="handleHasSelectionChange" />
                        <span class="text-sm">已选{{ selectedList.length }}行</span>
                        <bt-button
                            v-if="selectedList.length > 0"
                            text
                            @click="handleClearSelection"
                        >
                            清空
                        </bt-button>
                    </el-space>
                </template>
            </Pagination>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtTable2',
}
</script>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, getCurrentInstance } from 'vue'
import { useSelection } from './hooks/useSelection'
import { useTable } from './hooks/useTable'
import { tableSortFormat } from './helpers'
import Pagination from '../../pagination/src/pagination.vue'
import colSetting from './component/col-setting.vue'
import colContent from './component/col-content.vue'
import { BtUseAppStore } from '@beeboat/core'
import { ElMessage } from 'element-plus'
import cloneDeep from 'lodash-es/cloneDeep'
// import searchBar from './component/search-bar.vue'

//接口类型
export interface ProTableProps {
    tableHeight?: string
    columns: any // 列配置项
    searchColumns?: any //高级搜索列配置项
    senceInfo: any // 方案信息
    enableColumnListener?: boolean | number //是否开启深度监听列变化
    requestApi: (params: any) => Promise<any> // 请求表格数据的api ==> 必传
    pagination?: boolean | number // 是否需要分页组件 ==> 非必传（默认为true）
    initParam?: any // 初始化请求参数 ==> 非必传（默认为{}）
    border?: boolean // 表格是否显示边框 ==> 非必传（默认为true）
    showBorder?: boolean | number // 表格是否显示边框 ==> 非必传（默认为true）
    stripe?: boolean // 是否带斑马纹表格 ==> 非必传（默认为false）
    tools?: any // 开启表格功能栏显示的按钮 ==> 非必传（默认为[]）
    rowKey?: string // 支持树类型的数据的显示
    childrenName?: string // 当数据存在 children 时，指定 children key 名字 ==> 非必传（默认为"children"）
    multiPageSelection?: boolean | number // 是否开启跨页勾选
    rightToolColumn?: boolean | number // 是否显示表格header右侧工具列
    columnSetting?: boolean | number // 是否显示表格header右侧工具列
    initLoading?: boolean | number // 是否初始化加载数据
    enableStaticData?: boolean | number //是否启用静态数据
    staticData?: any[] // 静态数据
    tableSortChange?: Function // 重写sort-change事件的function
    searchBar?: boolean | number //是否开启搜索
    searchBarProps?: any // 搜索栏属性、方法
    headerRowStyle?: any // 表头行样式
    cellStyle?: any
    expandRowKey?: string[] // 设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组
    tableId?: string // 表格id
    senceId?: string // 场景id
    enableContinuous?: boolean | number // 是否启用连续序号
    selectable?: any
    hightLightCurrentRow?: any // 是否点击高亮
}
const instance = getCurrentInstance()
// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
    columns: () => [],
    senceInfo: {},
    senceId: '',
    enableColumnListener: false,
    tableHeight: '100%',
    pagination: true,
    initParam: {},
    border: true,
    showBorder: true,
    stripe: false,
    rowKey: 'id',
    childrenName: 'children',
    tools: ref([]),
    multiPageSelection: false,
    initLoading: true,
    enableStaticData: false,
    staticData: undefined as any,
    searchBar: false,
    headerRowStyle: {
        backgroundColor: '#F1F6FE',
        color: '#3E4A6B',
        height: '48px',
    },
    cellStyle: {
        height: '40px',
    },
    enableContinuous: false,
    hightLightCurrentRow: false,
})

const emits = defineEmits([
    'selectionChange', // 复选框选中项变更触发
    'dataChange', // 表格数据、分页数据的变更触发
    'error', // axios api错误触发
    'searchBarChange', // 搜索栏变更列数据时触发，列设置变更列数据时触发
    'columnChange', // 列设置变更列数据时触发
    'reset', // 重置操作后触发
    'expand-change', // 当用户对某一行展开或者关闭的时候会触发该事件
])

// 是否存在操作列
const isExistOperationColumn = ref(false)
// 开启搜索栏增加的参数
if (props.searchBar) {
    props.initParam.advQueryParam = []
}
const tableRef = ref()
// 表格操作 Hooks
let {
    bindTableValue,
    tableData,
    pageable,
    getTableList,
    handleSizeChange,
    handleCurrentChange,
    loading,
    errorInfo,
    errorStatus,
} = useTable(
    props.requestApi,
    props.initParam,
    Boolean(props.pagination),
    props.staticData,
    props.enableStaticData,
)
// 表格多选 Hooks
const { headerDragend, selectionChange, selectedListIds, selectedList, isSelected, hasSelection } =
    useSelection()

// 查询列设置
const senceDataList = ref(<any>[])
const getTableColumns = async () => {
    senceDataList.value = (await BtUseAppStore().getSence(props.tableId)) || []
    columnChange()
}

const columnChange = () => {
    if (senceDataList.value && senceDataList.value.length > 0) {
        // 先修改showValue
        senceDataList.value.forEach((item: any) => {
            props.columns.filter(i => {
                if (i.id == item.id) {
                    i.showValue = item.showValue
                    i.width = item.width || i.width
                    i.fixed = item.fixed
                    i.hidden = item.showValue ? 0 : 1
                }
            })
        })
        // 修改顺序
        const copyColumns = cloneDeep(props.columns)
        let editColumns = cloneDeep(props.columns)
        let empColumns = [] as any
        senceDataList.value.forEach(item => {
            const columItem = copyColumns.find(i => {
                return i.id == item.id
            })
            if (columItem) {
                empColumns.push(columItem)
            }
        })
        senceDataList.value.filter(item => {
            let index = editColumns.findIndex(v => {
                return item.id == v.id
            })
            if (index != -1) {
                // 先删除掉相同项，剩下的就是列表里新增加的
                editColumns.splice(index, 1)
            }
        })
        let arr = empColumns.concat(editColumns)
        // 再赋值
        props.columns.splice(0)
        arr.forEach(element => {
            props.columns.push(element)
        })
        console.log(
            'props.columns变更前--------------------------',
            props.columns,
            senceDataList.value,
            arr,
        )
        changeWatch()
        nextTick(() => {
            doLayout()
        })
    }
}

// 静态数据如果是请求接口获取，那需要监听来重新渲染
watch(
    () => props.staticData,
    newVal => {
        tableData = cloneDeep(newVal) as any
    },
)
watch(
    () => senceDataList.value,
    () => {
        if (senceDataList.value?.length > 0) {
            columnChange()
        }
    },
)

const changeWatch = () => {
    const time = new Date().getTime()
    tableColumns.value = cloneDeep(props.columns)
        ? props.columns?.map((item, index) => {
              if (isExistOperationColumn.value == false && item.columnType == 4) {
                  isExistOperationColumn.value = true
              }
              item['item19999999999'] = `${time + index}`
              if (item?.hidden == 1 || item?.showValue == false) {
                  item.showValue = false
              } else {
                  item.showValue = true
              }
              return { ...item, showValue: item.showValue }
          })
        : []
    console.log(
        'props.columns变更后-------------',
        tableColumns.value,
        props.columns,
        senceDataList.value,
    )
}

// 保存列设置
const saveTableColumns = async (val: any, type: any) => {
    // senceDataList.value = [] as any
    // val.forEach(item => {
    //     senceDataList.value.push({
    //         id: item.id,
    //         // prop: item.prop,
    //         showValue: item.showValue,
    //         width: item.width,
    //         indexValue: item.indexValue,
    //         fixed: item.fixed,
    //     })
    // })
    // console.log('保存列设置------------------', senceDataList.value, type)
    const res = await BtUseAppStore().saveSence(props.tableId, val)
    if (res.code == 0) {
        ElMessage({
            type: 'success',
            message: type == 'save' ? '保存成功！' : '取消成功！',
        })
        emits('searchBarChange', tableColumns.value)
        emits('columnChange', tableColumns.value)
    } else {
        ElMessage({
            type: 'error',
            message: res.msg,
        })
    }
}

// 表格列配置项处理（添加 showValue 属性，控制显示/隐藏）
const tableColumns = ref<any>()
// 监听表格列数据
const columnsWatch = watch(
    () => props.columns,
    () => {
        changeWatch()
    },
    {
        deep: Boolean(props.enableColumnListener),
        immediate: true,
    },
)
getTableColumns()
// 监听表格loading加载状态
const loadingWatch = watch(
    () => loading.value,
    val => {
        if (loading.value == true) {
            hasSelection.value = false
        } else {
            // 如果是重复取消请求，不重新刷新数据
            if (!errorInfo.value?.isCancelRequest) {
                // 每次请求完成返回 tableData 表格数据
                emits('dataChange', {
                    tableData: tableData.value,
                    pageData: pageable.value,
                })
            }
        }
    },
)
// 监听表格api返回error错误
const errorWatch = watch(
    () => errorStatus.value,
    () => {
        if (errorStatus.value == true) {
            emits('error', errorInfo.value)
            errorStatus.value = false
        }
    },
)
// 表格列api动态排序
const onTableSortChange = sort => {
    props.initParam.sortParamList = tableSortFormat(sort)
    getTableList()
}
// 获取表格数据
onMounted(() => {
    //启用高级搜索后默认不加载数据
    if (Boolean(props.initLoading) && !props.searchBar) {
        getTableList()
    }
})
// 销毁watch监听
onUnmounted(() => {
    columnsWatch()
    loadingWatch()
    errorWatch()
})

// 重新渲染布局表格
const doLayout = () => {
    nextTick(() => {
        tableRef.value.doLayout()
    })
}
// 为了列内容重置在此设置重置key
const colsFresh = data => {
    const time = new Date().getTime()
    tableColumns.value = data.columns?.map((item, index) => {
        item['item19999999999'] = `${time + index}`
        return { ...item, showValue: item?.showValue ?? true }
    })
    saveTableColumns(tableColumns.value, data.type)
    doLayout()
}
const handleHasSelectionChange = val => {
    if (val) {
        pageable.value.pageNumber = 1
        tableData.value = selectedList.value
    } else {
        pageable.value.pageNumber = 1

        getTableList()
    }
}
let selectArr: any = ref([])

/** 选中行时修改背景色 */
const rowStyle = ({ row, rowIndex }) => {
    let checkIdList: any = ref([])
    selectArr.value.forEach(item => {
        checkIdList.value.push(item[props.rowKey])
    })
    if (checkIdList.value.length == 0) return
    if (checkIdList.value.includes(row[props.rowKey])) {
        return {
            backgroundColor: '#E5EBFD',
        }
    }
}

/** 多选勾选监听 */
const onSelectionChange = arr => {
    selectArr.value = arr
    emits('selectionChange', selectionChange(arr))
}

/**
 * 取消所有勾选
 */
const handleClearSelection = () => {
    tableRef.value.clearSelection()
}
/**
 * 重置表格数据
 */
const doLayoutData = (val = []) => {
    tableData.value = val
}

/**
 * 获得最新搜索栏数据
 */
const getSearchItemList = val => {
    emits('searchBarChange', val)
}
/**
 * 清空多选数据
 */
const getSelectReset = () => {
    tableRef.value.clearSelection()
}
/**
 * 使用i18n标题
 */
const useI18nTitle = item => {
    if (typeof instance?.proxy?.$t != 'undefined' && instance?.proxy?.$t instanceof Function) {
        if (item?.i18nKey) {
            return instance?.proxy?.$t(`${item.i18nKey}`)
        } else {
            return item.label
        }
    } else {
        return item.label
    }
}

const searchTable = advParams => {
    props.initParam.advQueryParam = advParams
    pageable.value.pageNumber = 1
    // props
    getTableList()
}
const btAdvSearchBarEx = ref()
const resetTable = () => {
    Object.keys(props.initParam).forEach(key => {
        props.initParam[key] = undefined
    })
    props.initParam.advQueryParam = []
    pageable.value.pageNumber = 1
    getTableList()
    handleClearSelection()
    emits('reset')
}
const resetQueryParam = () => {
    btAdvSearchBarEx.value.advParamReset()
}
const getAllQueryParam = () => {
    return btAdvSearchBarEx.value.getAllAdvOutQueryParam()
}

const expandChange = (row, expanded) => {
    emits('expand-change', row, expanded)
}
const getAdvOutQueryParam = () => {
    return btAdvSearchBarEx.value.getAdvOutQueryParam()
}

// 暴露给父组件的参数和方法
defineExpose({
    btTable: tableRef,
    doLayout, // 重绘table
    refresh: getTableList, // 刷新
    tableData, // 表格数据
    pageable, // page数据
    selectedListIds, // 选中项ID集合
    selectedList, // 选中项对象集合
    isSelected, // 是否打开选中行数据独立显示
    clearSelection: handleClearSelection, // 清空选中项
    doLayoutData, //重置表格数据
    onTableSortChange, // 表格列api动态排序
    reset: resetQueryParam, // 仅仅重置查询参数
    getAllQueryParam,
    getAdvOutQueryParam,
    setCurrentRow: row => {
        tableRef.value.setCurrentRow(row)
    },
    toggleRowSelection: (row, selected) => {
        tableRef.value.toggleRowSelection(row, selected)
    },
})
</script>
<style scoped>
:deep(.el-table--border .el-table__cell) {
    border-right: v-bind(
        'Boolean(props.showBorder)?"none":"1px solid var(--el-border-color-light)"'
    );
}
:deep(.el-table th.el-table__cell) {
    border-right: v-bind('Boolean(props.border)?"1px solid var(--el-border-color-light)":"none"');
}
:deep(.el-table__body-wrapper tr td.el-table-fixed-column--left) {
    background-color: inherit;
}
</style>

<template>
    <div class="btp-table" :class="sizeClass">
        <div class="btp-table--searchbar">
            <BtpAdvSearchbar
                v-if="props.search?.enable"
                ref="searchbarRef"
                v-bind="props.search"
                :column-list="props.columns"
                :size="size || 'default'"
                v-on="manager.getAdvSearchbarEvents()"
            >
                <template #default>
                    <slot name="search"></slot>
                </template>
            </BtpAdvSearchbar>
        </div>
        <!-- 搜索栏下 头部左侧操作栏 -->
        <div class="btp-table--toolbar">
            <slot name="toolbar" :selection="state.selection">
                <template :key="component.id" v-for="component in btConfig?.toolbar?.children">
                    <component
                        :is="btViewContext.render(component)"
                        :style="component.styles"
                        :bt-view-context="btViewContext"
                        :bt-config="component"
                        v-on="component.events"
                        v-bind="component.props"
                        v-model="btViewContext.dataModelProxy[component.model?.prop]"
                    />
                </template>
            </slot>
        </div>
        <div class="btp-table--table">
            <div class="btp-table--table--container">
                <el-table
                    ref="tableRef"
                    :data="manager.getTableData()"
                    v-loading="state.loading"
                    v-bind="{ ...$props, ...$attrs }"
                    v-on="manager.getEmitsEvent()"
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
                                <template v-if="item.component">
                                    <component
                                        :is="item.component"
                                        :column="item"
                                        :manager="manager"
                                    ></component>
                                </template>
                                <el-table-column v-else v-bind="item">
                                    <template #default="scope">
                                        <template v-if="item.type == 'index'">
                                            {{ manager.computeRowIndex(scope.$index) }}
                                        </template>
                                        <template v-else-if="item.type == 'radio'">
                                            <ColumnRadio
                                                :column="item"
                                                :scope="scope"
                                                :manager="manager"
                                            ></ColumnRadio>
                                        </template>
                                        <template v-else-if="item.type == 'operate'">
                                            <ColumnOperator
                                                :column="item"
                                                :scope="scope"
                                                :manager="manager"
                                            ></ColumnOperator>
                                        </template>
                                        <template
                                            v-else-if="item.type == '' || item.type == undefined"
                                        >
                                            <ColumnContent
                                                :column="item"
                                                :scope="scope"
                                                :manager="manager"
                                            >
                                            </ColumnContent>
                                        </template>
                                    </template>
                                </el-table-column>
                            </slot>
                        </template>
                        <el-table-column v-if="props.columnSetting" width="120px" fixed="right">
                            <template #header>
                                <ColumnSetting
                                    :columns="state.columns"
                                    @change="
                                        columns => {
                                            manager.onColumnSettingChange(columns)
                                        }
                                    "
                                >
                                </ColumnSetting>
                            </template>
                            <template #default="scope">
                                <el-button
                                    type="primary"
                                    :link="true"
                                    @click.stop="manager.editor.add(scope.$index)"
                                >
                                    添加
                                </el-button>
                                <el-button
                                    type="danger"
                                    :link="true"
                                    @click.stop="manager.editor.delete(scope.row)"
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
            v-on="manager.getPaginationEvents()"
            v-model:current-page="state.pagination.currentPage"
            v-model:page-size="state.pagination.pageSize"
            v-model:reserve="state.pagination.reserve"
            :selection="state.selection"
            :total="state.pagination.total"
        ></BtpPagination>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtpTable',
    btpInject: true,
}
</script>
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { UseElementConfig } from '@beeboat/core'
import BtpAdvSearchbar from '../../adv-searchbar/src/index.vue'
import BtpPagination from '../../pagination/src/index.vue'
import {
    BTPTableManager,
    ColumnRadio,
    ColumnOperator,
    ColumnContent,
    ColumnSetting,
} from '../../table-common/index'

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
    /**
     * @description 视图动态配置
     */
    btConfig?: any
    /**
     * @description 视图动态配置
     */
    btViewContext?: any
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
    size?: string
}
const props = withDefaults(defineProps<IProps>(), {
    btConfig: null,
    btViewContext: null,
    id: '',
    rowKey: 'id',
    search: {},
    pagination: {
        enable: true,
        reserveSelection: false,
    },
    editProps: { enable: false },
    columns: [],
    columnSetting: true,
    dataApi: null,
    initLoading: true,
    propEvents: {},
    size: '',
})

const tableProps = computed(() => {
    const tableProps = Object.assign({}, props) as any
    delete tableProps['btConfig']
    delete tableProps['btViewContext']
    delete tableProps['id']
    delete tableProps['search']
    delete tableProps['pagination']
    delete tableProps['editProps']
    delete tableProps['columns']
    delete tableProps['columnSetting']
    delete tableProps['dataApi']
    delete tableProps['initLoading']
    delete tableProps['propEvents']

    return tableProps
})

const { sizeClass, size } = UseElementConfig(
    {
        componentName: 'btp-table',
    },
    props,
)

const tableRef = ref()
const state = reactive({
    data: [],
    columns: [] as any,
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
    loading: false,
})

const manager = new BTPTableManager(tableRef, props, state, emits)

/**
 * 进行V-Model监控
 */
watch(
    () => state.pagination.currentPage,
    value => {
        state.pagination.pageNumber = value
        manager.loadData()
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

manager.installTable()

defineExpose({})
</script>

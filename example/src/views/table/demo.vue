<template>
    <div class="table-box" style="height: 500px">
        <BtSplitter
            :mode="isCheck ? 'horizontal' : 'vertical'"
            :align="value"
            :gutter="22"
            background-color="red"
            style="height: 100%"
        >
            <BtSplitterItem unit-type="px" :default-width="200">
                <div style="height: 100%; background-color: white">{{ columns }}</div>
            </BtSplitterItem>
            <BtSplitterItem unit-type="px" :default-width="200">
                <div style="height: 100%; background-color: white">asdfdsfds</div>
            </BtSplitterItem>
            <!-- <BtSplitterItem>
                <div style="height: 100%; background-color: white">asdfdsfds</div>
            </BtSplitterItem>
            <BtSplitterItem>
                <div style="height: 100%; background-color: white">asdfdsfds</div>
            </BtSplitterItem> -->
            <BtSplitterItem unit-type="%" :default-width="100" style="height: 100%">
                <div class="bt-view__table">
                    <BtTableNew
                        v-if="columns.length > 0"
                        ref="proTable"
                        :search-table="{}"
                        :request-api="getUserList"
                        :init-param="initParam"
                        :columns="columns"
                        :pagination="true"
                        :show-border="true"
                        :border="true"
                        :tool-button="true"
                        :multi-page-selection="true"
                        :column-setting="true"
                        :init-loading="true"
                        table-height="600px"
                        :search-bar="true"
                        :search-bar-props="{
                            isSenior: true,
                            isToolColumn: true,
                        }"
                        :table-sort-change="onSortChange"
                        v-on="clickEvents"
                        @selection-change="selectionChange"
                        @data-change="onDataChange"
                        @error="onTableError"
                        @search-bar-change="searchBarChange"
                    >
                        <template #tableHeaderSearch>
                            <bt-table-screen-item label="审批单号">
                                <el-input
                                    v-model="initParam.code"
                                    clearable
                                    placeholder="请输入"
                                    autosize
                                />
                            </bt-table-screen-item>
                        </template>
                        <!-- 表格 header 按钮 -->
                        <template #tableHeaderLeft="scope">
                            <el-button v-bt-delay-click="5000" @click="toExcel">导出</el-button>
                            <el-button type="danger" plain @click="handleBatch(scope)">
                                批量处理用户
                            </el-button>
                            <el-button @click="updateColumn">updateColumn</el-button>
                        </template>
                        <template #tableHeaderRight="scope">工具栏扩展</template>
                        <template #selection="scope"> </template>
                        <!-- Expand -->
                        <!-- <template #expand="scope">
                        {{ scope.row }}
                    </template> -->

                        <!-- 用户状态 slot -->
                        <template #status="scope">
                            <!-- 如果插槽的值为 el-switch，第一次加载会默认触发 switch 的 @change 方法，所有在外层包一个盒子，点击触发盒子 click 方法 -->
                            <div @click="changeStatus(scope.row)">
                                <el-switch
                                    :value="scope.row.status"
                                    :active-text="scope.row.status === 1 ? '启用' : '禁用'"
                                    :active-value="1"
                                    :inactive-value="0"
                                />
                            </div>
                        </template>
                        <!-- 表格操作 -->

                        <template #operationHeader> 为222 </template>
                        <template #operation="scope">
                            <el-button text @click="openDrawer('查看', scope.row)">
                                查看
                            </el-button>
                            <el-button text @click="openDrawer('编辑', scope.row)">
                                编辑
                            </el-button>
                        </template>
                    </BtTableNew>
                </div>
            </BtSplitterItem>
        </BtSplitter>
    </div>
</template>

<script setup lang="ts" name="useComponent">
// import axios from 'axios'
import { ref, reactive, nextTick, watch } from 'vue'
import BtHttp from '../../utils/http'
import { exportFile } from '@beeboat/core/utils/export'
import '@beeboat/theme/src/bt-table-screen-item.scss'
import { BtUseAppStore } from '@beeboat/core/store'
import dictData from './dict-data'
import { e_table_sortFormat } from './table-sort'
const isCheck = ref(true)
const value = ref('top')
const tableData = ref(
    {} as {
        pageData: { pageNumber: number; pageSize: number; total: number }
        tableData: any[]
    },
)
const getDynamicColumnList = async () => {
    const data: any = await new Promise(resolve => {
        return resolve({
            code: 200,
            data: [
                {
                    id: '3CauotUkqKKXKsr9xJ4pMo',
                    label: '筛选1',
                    prop: 'column1671615393407',
                    i18nKey: 'PageTablePage.Table1.column1671615393407',
                    type: 'selection',
                    width: '60px',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 2,
                    enableAdvSearch: 0,
                    reserveSelection: true,
                    defaultSearchItem: 0,
                },
                {
                    id: '19eba15d3b7542318d32efcf467b3e3f',
                    label: '名称名称名称名称',
                    prop: 'name',
                    i18nKey: 'PageTablePage.Table1.Name',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 3,
                    enableAdvSearch: 1,
                    searchPropType: 'text',
                    defaultSearchItem: 0,
                },
                {
                    id: '2b1dada90122484387c333c25e9f3df6',
                    label: '实体1',
                    prop: 'entityName',
                    i18nKey: 'PageTablePage.Table1.EntityName',
                    width: '200px',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 3,
                    enableAdvSearch: 1,
                    searchPropType: 'select',
                    searchKeyProp: '{ "label": "name","value": "name" }',
                    defaultSearchItem: 0,
                    // searchDynamicApi: () => {
                    //     return PageApi.list({})
                    // },
                },
                {
                    id: 'e3c7160e609d455f9e76d9f32108e7bb',
                    label: '服务1',
                    prop: 'serviceName',
                    i18nKey: 'PageTablePage.Table1.serviceName',
                    width: '200px',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 3,
                    enableAdvSearch: 1,
                    searchPropType: 'text',
                    searchKeyProp: '{ "label": "name","value": "name" }',
                    defaultSearchItem: 0,
                    // searchDynamicApi: () => {
                    //     return PageApi.list({})
                    // },
                },
                {
                    id: '646c15cd976d46328d9865ba8aae141c',
                    label: '操作1',
                    prop: 'operation',
                    i18nKey: 'PageTablePage.Table1.Operation',
                    width: '200px',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 4,
                    enableAdvSearch: 0,
                    defaultSearchItem: 0,
                },
            ],
            msg: '图片上传成功！',
        })
    })
    const list = data.data || []
    columns.value = list
    console.log(columns.value, 'this.dynamicColumnList..')
}
getDynamicColumnList()
// 获取 page-table 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()
const tableScreenRef = ref()
// 如果表格需要初始化请求参数,直接定义传给 page-table(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam: any = reactive({
    // pageNumber: 1,
    // pageSize: 1000,
    code: '',
})

const hasEnableApi = ref(false)
const staticData = ref([
    {
        code: 'BtFormItem',
        codeType: 0,
        companyId: null,
        componentTypeId: '105101',
        creatorId: null,
        deptId: null,
        gmtCreate: '2022-06-23 15:10:45',
        gmtModified: '2022-09-13 10:18:56',
        icon: 'bt-icon bt-icon-workstation',
        id: '7ae8e3a87c594d74aa7e1d46d20b099712',
        indexValue: null,
        label: '表单项',
        modifiedId: null,
        name: '表单项',
        options: '{"regexpList":"[]","css":"{}","defaultLabel":"表单项"}',
        parentId: 'c722fbb6f07d499c94976b47bb6ba4b5',
        serviceClass: 'com.ever.beeboat.designer.usage.model.service.FormItemService',
        type: null,
    },
])
const tempParam = {
    exposeParams: [],
    advancedParams: [],
}
// 配置项
const columns: any = ref([])
// watch(
//     () => columns.value,
//     n => {
//         console.log(n, 'new.......')
//     },
// )

/** 排序事件 */
function onSortChange(sort) {
    initParam.sortParamList = e_table_sortFormat(sort)
    console.log(initParam, 'initParam...')
    // proTable.value.refresh()
}
const advancedColumns = reactive({
    columns: columns.value.filter(i => i.enableAdvSearch == 1),
})

const setInitParams = (type = 0) => {
    // new BtHttp().$http.post('http://10.20.20.20:33011/system22/security/account/getUserInfo')
    // new BtHttp().$http.post('http://10.20.20.20:33011/system22/security/account/getUserInfo')
    // new BtHttp().$http.post('http://10.20.20.20:33011/system22/security/account/getUserInfo')
    // new BtHttp().$http.post('http://10.20.20.20:33011/system22/security/account/getUserInfo')
    // initParam = {}
    if (type == 0) {
        initParam.advOutQueryParam = tempParam.exposeParams
        initParam.advQueryParam = []
    } else if (type == 1) {
        // 高级搜索
        initParam.advQueryParam = tempParam.advancedParams
        initParam.advOutQueryParam = []
    }
}

setInitParams()

const onReset = () => {
    Object.keys(initParam).forEach(key => {
        initParam[key] = undefined
    })
    columns.value.forEach((i, index) => {
        columns.value[index].value = undefined
    })
    onSubmit(null)
}
const onSubmit = val => {
    let advOutList = []
    val?.data?.forEach(e => {
        if (e.value) {
            advOutList.push({
                field: e.searchProp || e.prop,
                express: e.conditionValue,
                value: e.value,
                fieldType: e.propType,
            })
        }
    })
    tempParam.exposeParams = advOutList
    //外露搜索
    setInitParams(0)
    proTable.value.refresh()
    // proTable.value.refresh()
    // proTable.value.refresh()
    // proTable.value.refresh()
}

const onAdsSearch = val => {
    // 高级搜索数据
    let advList = []
    val.data?.forEach((e, eIndex) => {
        // columns.value.forEach((i, index) => {
        //     if (e.id == i.id) {
        //         columns.value[index].defaultSearchItem = val.data[eIndex].defaultSearchItem
        //         columns.value[index].value = val.data[eIndex].value
        //     }
        // })
        if (e.value) {
            advList.push({
                field: e.searchProp || e.prop,
                express: e.conditionValue,
                value: e.value,
                fieldType: e.propType,
            })
        }
    })
    tempParam.advancedParams = advList
    advancedColumns.columns = columns.value.filter(i => i.enableAdvSearch == 1)
    setInitParams(1)
    proTable.value.refresh()
}
const onChangeColumn = val => {
    // columns.value = val
}

const searchBarChange = val => {
    console.log(val, 'searchBarChange...')
}
const handleHeaderClick = (column, event) => {
    console.log('handleHeaderClick', column, event)
}
const selectionChange = val => {
    console.log(
        val.map(i => i.id),
        'arr...',
    )
}
const clickEvents = { 'header-click': handleHeaderClick }

const handleBatch = scope => {
    nextTick(() => {
        console.log('proTable.value.isSelected', proTable.value.isSelected)
    })
    console.log('handleBatch', scope)
}

const openDrawer = (title: string, _rowData = {}) => {
    console.log('open....')
}
const toExcel = async () => {
    // const excelBlob = await new BtHttp().$http.post(
    //     'http://10.20.20.20:33011/system22/app/loginLog/listPage/export',
    //     { pageNumber: 1, pageSize: 10 },
    //     {
    //         responseType: 'blob',
    //     },
    // )
    // exportFile(excelBlob)
    // console.log(excelBlob, 'excelBlob...')
}

// 切换用户状态
const changeStatus = async row => {
    row.status == 1 ? 0 : 1
    proTable.value.refresh()
}

const getUserList = async param => {
    const cList = await new BtHttp().$http.post(
        'http://10.20.11.20:23333/designer/model/componentType/listPage',
        param,
    )

    cList.data.records = cList.data.records.map(i => {
        return { ...i, require: 0 }
    })
    console.log(cList.data.records)
    return cList
}

const updateColumn = () => {
    hasEnableApi.value = false
    // columns.value = [
    //     {
    //         prop: 'aaa11',
    //         label: 'aaa11',
    //         minWidth: '180',
    //         search: true,
    //         sortable: true,
    //         formatter: val => {
    //             console.log(val)
    //             return val.prop
    //         },
    //     },
    //     {
    //         prop: 'operation',
    //         label: '操作',
    //         width: 330,
    //         fixed: 'right',
    //     },
    // ]
    // proTable.value.doLayout()
    // 暴露整个table组件所有数据
    // console.log(proTable.value.btTable.proxy.$refs.tableRef)
}

function deepClone(target: any) {
    const newTarget = Array.isArray(target) ? [] : {}
    for (const key in target) {
        if (typeof target[key] === 'object' && target[key]) {
            newTarget[key] = this.deepClone(target[key])
        } else {
            newTarget[key] = target[key]
        }
    }
    return newTarget
}
const onDataChange = data => {
    tableData.value = data
    proTable.value.btTable
}
const onTableError = data => {
    // console.log(data, 'error...')
}
BtUseAppStore().dictList = dictData
</script>
<style lang="scss">
@import '@beeboat/theme/src/bt-table';
</style>

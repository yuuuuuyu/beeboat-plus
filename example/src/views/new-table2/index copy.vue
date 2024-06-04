<template>
    <div class="table-box" style="height: 1000px">
        <BtSplitter
            :mode="isCheck ? 'horizontal' : 'vertical'"
            :align="value"
            :gutter="22"
            background-color="red"
            style="height: 100%"
        >
            <BtSplitterItem unit-type="%" :default-width="100" style="height: 100%">
                <div class="bt-view__table">
                    <BtTable2
                        v-if="columns.length > 0"
                        ref="proTable"
                        :table-id="tableId"
                        :sence-id="senceId"
                        :sence-info="senceInfo"
                        :search-columns="columns"
                        :columns="columns"
                        :search-table="{}"
                        :request-api="getUserList"
                        :init-param="initParam"
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
                        :enable-static-data="true"
                        :static-data="staticData"
                        row-key="id"
                        :expand-row-keys="expandRowKey"
                        v-on="clickEvents"
                        @selection-change="selectionChange"
                        @data-change="onDataChange"
                        @error="onTableError"
                        @search-bar-change="searchBarChange"
                    >
                        <!-- <template #tableHeaderSearch>
                            <bt-adv-search-item label="审批单号">
                                <el-input
                                    v-model="initParam.code"
                                    clearable
                                    placeholder="请输入"
                                    autosize
                                />
                            </bt-adv-search-item>
                        </template> -->
                        <!-- 表格 header 按钮 -->
                        <template #tableHeaderLeft="scope">
                            <!-- <el-badge :value="12">
                                <el-button type="danger" plain @click="handleBatch(scope)">
                                    批量处理用户
                                </el-button>
                            </el-badge> -->
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
                    </BtTable2>
                </div>
            </BtSplitterItem>
        </BtSplitter>
    </div>
</template>

<script setup lang="ts" name="useComponent">
// import axios from 'axios'
import { ref, reactive, nextTick } from 'vue'
import BtHttp from '../../utils/http'
import '@beeboat/theme/src/bt-table-screen-item.scss'
import { BtUseAppStore } from '@beeboat/core/store'
import dictData from './dict-data'
import { e_table_sortFormat } from './table-sort'
const tableId = ref('')
const senceId = ref('')
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
                    id: '3CauotUkqKKXKsr9xJ4pMo11',
                    label: '索引',
                    prop: 'column1671615393407',
                    type: 'index',
                    width: '60px',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 1,
                    enableAdvSearch: 0,
                    defaultSearchItem: 0,
                    searchProps: {},
                },
                {
                    id: '5bY13BW7UquGvfDjpD3mTb',
                    label: '设备类别',
                    prop: 'equipmentTypeName',
                    sortable: true,
                    columnType: 3,
                    hidden: 0,
                    enableAdvSearch: 1,
                    searchProps: {
                        enable: true,
                        componentType: 'tree',
                        searchPropKey: 'EquipmentTypeId',
                        dataSourceProps: { label: 'typeName', value: 'id' },
                        dataSource: _params => {
                            return new Promise<any>(resolve => {
                                return resolve({
                                    code: 200,
                                    data: [
                                        {
                                            children: [
                                                {
                                                    children: [],
                                                    creatorId: '4ea915623c2441369e8cb1a7ab8d8729',
                                                    gmtCreate: '2023-04-08 11:45:40',
                                                    id: '45f39bfa22042223aef4ccc40064337f',
                                                    parentId: 'b032a34b05cbb23a7f6a8bebb36c0db4',
                                                    typeCode: 'EqCa00005',
                                                    typeName:
                                                        '请勿删除测试超长字段下拉选择带省略号字段下拉选择带省略号问题拉选择带省略号字段下拉选择带省略号问题问题拉选择带省略号问题',
                                                },
                                            ],
                                            creatorId: 'ManufacturingExecution01',
                                            gmtCreate: '2023-02-23 09:46:44',
                                            id: 'b032a34b05cbb23a7f6a8bebb36c0db4',
                                            parentId: '-1',
                                            typeCode: '',
                                            typeName: '设备类别一',
                                        },
                                        {
                                            children: [],
                                            creatorId: 'd23185cef99349919799c7a2d9804797',
                                            gmtCreate: '2023-04-04 15:43:17',
                                            id: '9f2622fb7811bd5d67b51ecd706c88a7',
                                            parentId: '-1',
                                            typeCode: 'EqCa00004',
                                            typeName: 'lhj测试类别',
                                        },
                                        {
                                            children: [
                                                {
                                                    children: [],
                                                    creatorId: 'MES0000',
                                                    gmtCreate: '2023-03-22 17:04:33',
                                                    id: 'bf88e8fb8864c801a893757b43954454',
                                                    parentId: 'af99fb618decff5b50f3363eb629d14e',
                                                    typeCode: 'EqCa00002',
                                                    typeName: '机械',
                                                },
                                                {
                                                    children: [],
                                                    creatorId: 'MES0000',
                                                    gmtCreate: '2023-03-22 17:04:39',
                                                    id: 'b91b58e730462da8fb775912620eb917',
                                                    parentId: 'af99fb618decff5b50f3363eb629d14e',
                                                    typeCode: 'EqCa00003',
                                                    typeName: '电气',
                                                },
                                            ],
                                            creatorId: 'MES0000',
                                            gmtCreate: '2023-03-22 17:04:20',
                                            id: 'af99fb618decff5b50f3363eb629d14e',
                                            parentId: '-1',
                                            typeCode: 'EqCa00001',
                                            typeName: '设备类别二',
                                        },
                                    ],
                                    msg: '图片上传成功！',
                                })
                            })
                        },
                        supportConditionList: ['in', 'isNull', 'notIn', 'isNotNull'],
                    },
                },
                {
                    id: '3CauotUkqKKXKsr9xJ4pMo',
                    label: '筛选1',
                    prop: 'column1671615393407',
                    i18nKey: '',
                    type: 'selection',
                    width: '60px',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 2,
                    enableAdvSearch: 0,
                    reserveSelection: true,
                    defaultSearchItem: 0,
                    searchProps: {},
                },
                {
                    id: '19eba15d3b7542318d32efcf467b3e3f',
                    label: '名称名称名称名称',
                    prop: 'name',
                    i18nKey: '',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 3,
                    enableAdvSearch: 1,
                    searchPropType: 'text',
                    propType: '2',
                    defaultSearchItem: 1,
                    searchProps: {
                        searchVisible: false, // 用于弹窗里该项选择后禁用
                        enable: true,
                        componentType: 'text',
                        searchPropKey: 'ModifiedId2',
                        supportConditionList: [
                            'ne',
                            'like',
                            'eq',
                            'isNull',
                            'notlike',
                            'isNotNull',
                            'gele',
                        ],
                    },
                },
                {
                    id: '2b1dada90122484387c333c25e9f3df6',
                    label: '实体1',
                    prop: 'entityName',
                    i18nKey: '',
                    width: '200px',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 3,
                    enableAdvSearch: 1,
                    searchPropType: 'date',
                    searchKeyProp: '{ "label": "name","value": "name" }',
                    defaultSearchItem: 0,
                    searchProps: {
                        searchVisible: false,
                        enable: true,
                        componentType: 'date',
                        realProp: 'userId',
                        supportConditionList: [
                            'ne',
                            'like',
                            'eq',
                            'isNull',
                            'notlike',
                            'isNotNull',
                            'gele',
                        ],
                    },
                },
                {
                    id: 'e3c7160e609d455f9e76d9f32108e7bb',
                    label: '服务1',
                    prop: 'serviceName',
                    i18nKey: '',
                    width: '200px',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 3,
                    enableAdvSearch: 1,
                    searchPropType: 'select',
                    searchKeyProp: '{ "label": "name","value": "name" }',
                    defaultSearchItem: 0,
                    searchProps: {
                        searchVisible: false,
                        enable: true,
                        componentType: 'select',
                        realProp: 'userId',
                        supportConditionList: ['ne', 'like', 'eq', 'notlike', 'gele'],
                        dataSourceProps: '{ "label": "name","value": "id" }',
                        dataSource: _params => {
                            return new Promise<any>(resolve => {
                                return resolve({
                                    code: 0,
                                    msg: '',
                                    data: [
                                        { id: 'b1345', name: '我的1aa' },
                                        { id: 'a12', name: '我的bb2' },
                                    ],
                                })
                            })
                        },
                    },
                },
                {
                    id: '646c15cd976d46328d9865ba8aae141c',
                    label: '操作1',
                    prop: 'operation',
                    i18nKey: '',
                    width: '200px',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 4,
                    enableAdvSearch: 0,
                    defaultSearchItem: 0,
                    searchProps: {
                        searchVisible: false,
                        enable: true,
                        componentType: 'text',
                        realProp: 'userId',
                        supportConditionList: ['like'],
                        dataSource: _params => {
                            return new Promise<any>(resolve => {
                                return resolve({
                                    code: 0,
                                    msg: '',
                                    data: [
                                        { id: '1', name: '我的1' },
                                        { id: '12', name: '我的2' },
                                    ],
                                })
                            })
                        },
                    },
                },
                {
                    id: '19eb1542318d32efcf467b3e3f',
                    label: '文本11111',
                    prop: 'column16111',
                    i18nKey: '',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 3,
                    enableAdvSearch: 1,
                    searchPropType: 'text',
                    propType: '2',
                    defaultSearchItem: 0,
                    searchProps: {
                        searchVisible: false, // 用于弹窗里该项选择后禁用
                        enable: true,
                        componentType: 'text',
                        searchPropKey: 'column16111',
                        supportConditionList: [
                            'ne',
                            'like',
                            'eq',
                            'isNull',
                            'notlike',
                            'isNotNull',
                            'gele',
                        ],
                    },
                },
                {
                    id: '19eb154231333fcf467b3e3f',
                    label: '时间范围11111',
                    prop: 'column2323',
                    i18nKey: '',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 3,
                    enableAdvSearch: 1,
                    searchPropType: 'date',
                    propType: '2',
                    defaultSearchItem: 0,
                    searchProps: {
                        searchVisible: false, // 用于弹窗里该项选择后禁用
                        enable: true,
                        componentType: 'date',
                        searchPropKey: 'column2323',
                        supportConditionList: [
                            'ne',
                            'like',
                            'eq',
                            'isNull',
                            'notlike',
                            'isNotNull',
                            'gele',
                        ],
                    },
                },
                {
                    id: '19eb1223134343467b3e3f',
                    label: '222222',
                    prop: 'column333',
                    i18nKey: '',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 3,
                    enableAdvSearch: 1,
                    searchPropType: 'number',
                    propType: '2',
                    defaultSearchItem: 0,
                    searchProps: {
                        searchVisible: false, // 用于弹窗里该项选择后禁用
                        enable: true,
                        componentType: 'number',
                        searchPropKey: 'column333',
                        supportConditionList: [
                            'ne',
                            'like',
                            'eq',
                            'isNull',
                            'notlike',
                            'isNotNull',
                            'gele',
                        ],
                    },
                },
                {
                    id: '19eb1223134342467b3e3f',
                    label: 'column14443223',
                    prop: 'column344333',
                    i18nKey: '',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 3,
                    enableAdvSearch: 1,
                    searchPropType: 'datetime',
                    propType: '2',
                    defaultSearchItem: 0,
                    searchProps: {
                        searchVisible: false, // 用于弹窗里该项选择后禁用
                        enable: true,
                        componentType: 'datetime',
                        searchPropKey: 'column344333',
                        supportConditionList: [
                            'ne',
                            'like',
                            'eq',
                            'isNull',
                            'notlike',
                            'isNotNull',
                            'gele',
                        ],
                    },
                },
                {
                    id: '19eb122314552467b3e3f',
                    label: 'qqq3223',
                    prop: 'colum11333',
                    i18nKey: '',
                    hidden: 0,
                    align: 'left',
                    sortable: 0,
                    columnType: 3,
                    enableAdvSearch: 1,
                    searchPropType: 'time',
                    propType: '2',
                    defaultSearchItem: 0,
                    searchProps: {
                        searchVisible: false, // 用于弹窗里该项选择后禁用
                        enable: true,
                        componentType: 'time',
                        searchPropKey: 'colum11333',
                        supportConditionList: [
                            'ne',
                            'like',
                            'eq',
                            'isNull',
                            'notlike',
                            'isNotNull',
                            'gele',
                        ],
                    },
                },
            ],
            msg: '图片上传成功！',
        })
    })
    const list = data.data || []
    columns.value = list

    getSenceList()
    console.log(columns.value, 'this.dynamicColumnList..')
}
getDynamicColumnList()

// 默认方案
const senceInfo = ref({
    defaultSence: '',
    senceList: [],
})
const getSenceList = () => {
    //生成的默认方案
    senceInfo.value = {
        defaultSence: '1', // 默认方案（取方案的id）
        senceList: [
            {
                name: '默认方案',
                id: '1',
                active: false, // 是否选中激活
                edit: false, // 是否可编辑
                canDel: false, // 是否可删除
                setDefaultSence: true, // 是否默认
                allExpose: false, // 是否全部外露
                searchList: [
                    {
                        searchCondition: 'like',
                        searchVisible: true, // 是否外露
                        searchValue: ['111'], // 外露值
                        id: '19eba15d3b7542318d32efcf467b3e3f',
                    },
                    {
                        searchCondition: 'eq',
                        searchVisible: true, // 是否外露
                        searchValue: [], // 外露值
                        id: '5bY13BW7UquGvfDjpD3mTb',
                    },

                    {
                        searchCondition: 'eq',
                        searchVisible: false, // 是否外露
                        searchValue: [], // 外露值
                        id: '2b1dada90122484387c333c25e9f3df6',
                    },
                ],
            },
            {
                name: '方案2',
                id: '2',
                active: false,
                edit: false,
                canDel: true,
                setDefaultSence: false, // 是否默认
                allExpose: false, // 是否全部外露
                searchList: [
                    {
                        searchCondition: 'eq',
                        searchVisible: true, // 是否外露
                        searchValue: ['222'], // 外露值
                        id: '19eba15d3b7542318d32efcf467b3e3f',
                    },
                ],
            },
        ],
    }
}

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

// const expandRowKey = ref(['7ae8e3a87c594d74aasa7e1d46d20b099712','7ae8e3a87c594d74aasa7e1d46d20b09971222'])
const expandRowKey = ref([
    '7ae8e3a87c594d74aasd7e1d46d20b099712',
    '7ae8e3a87c594d74aasd7e1d46d20b099712111',
])

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
        id: '7ae8e3a87c594d74aasa7e1d46d20b099712',
        indexValue: null,
        label: '表单项1',
        modifiedId: null,
        name: '表单项1',
        options: '{"regexpList":"[]","css":"{}","defaultLabel":"表单项"}',
        parentId: 'c722fbb6f07d499c94976b47bb6ba4b5',
        serviceClass: 'com.ever.beeboat.designer.usage.model.service.FormItemService',
        type: null,
        children: [
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
                id: '7ae8e3a87c594d74aasa7e1d46d20b09971222',
                indexValue: null,
                label: '表单项1-1',
                modifiedId: null,
                name: '表单项1-1',
                options: '{"regexpList":"[]","css":"{}","defaultLabel":"表单项"}',
                parentId: 'c722fbb6f07d499c94976b47bb6ba4b5',
                serviceClass: 'com.ever.beeboat.designer.usage.model.service.FormItemService',
                type: null,
                children: [
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
                        id: '7ae8e3a87c594d74aasa7e1d46d20b0997122121',
                        indexValue: null,
                        label: '表单项1-2',
                        modifiedId: null,
                        name: '表单项1-2',
                        options: '{"regexpList":"[]","css":"{}","defaultLabel":"表单项"}',
                        parentId: 'c722fbb6f07d499c94976b47bb6ba4b5',
                        serviceClass:
                            'com.ever.beeboat.designer.usage.model.service.FormItemService',
                        type: null,
                    },
                ],
            },
        ],
    },
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
        id: '7ae8e3a87c594d74aasd7e1d46d20b099712',
        indexValue: null,
        label: '表单项2',
        modifiedId: null,
        name: '表单项2',
        options: '{"regexpList":"[]","css":"{}","defaultLabel":"表单项"}',
        parentId: 'c722fbb6f07d499c94976b47bb6ba4b5',
        serviceClass: 'com.ever.beeboat.designer.usage.model.service.FormItemService',
        type: null,
        children: [
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
                id: '7ae8e3a87c594d74aasd7e1d46d20b099712111',
                indexValue: null,
                label: '表单项2-1',
                modifiedId: null,
                name: '表单项2-1',
                options: '{"regexpList":"[]","css":"{}","defaultLabel":"表单项"}',
                parentId: 'c722fbb6f07d499c94976b47bb6ba4b5',
                serviceClass: 'com.ever.beeboat.designer.usage.model.service.FormItemService',
                type: null,
                children: [
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
                        id: '7ae8e3a87c594d74aasd7e1d46d20b099712212121',
                        indexValue: null,
                        label: '表单项2-2',
                        modifiedId: null,
                        name: '表单项2-2',
                        options: '{"regexpList":"[]","css":"{}","defaultLabel":"表单项"}',
                        parentId: 'c722fbb6f07d499c94976b47bb6ba4b5',
                        serviceClass:
                            'com.ever.beeboat.designer.usage.model.service.FormItemService',
                        type: null,
                    },
                ],
            },
        ],
    },
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
        id: '7ae8e3a87c594d74aa7esdsd1d46d20b099712',
        indexValue: null,
        label: '表单项3',
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
        initParam.advQueryParam = tempParam.exposeParams
    } else if (type == 1) {
        // 高级搜索
        initParam.advQueryParam = tempParam.advancedParams
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
    console.log(data, 'onDataChange....onDataChange..')
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

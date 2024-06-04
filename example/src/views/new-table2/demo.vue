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
                        table-id="1"
                        sence-id="2"
                        :sence-info="senceInfo"
                        :search-columns="columns"
                        :columns="columns"
                        table-height="300px"
                        :search-bar="true"
                        :search-bar-props="{
                            isSenior: true,
                            isToolColumn: true,
                        }"
                        :enable-static-data="true"
                        :static-data="staticData"
                        row-key="id"
                    />
                </div>
            </BtSplitterItem>
        </BtSplitter>
    </div>
</template>

<script setup lang="ts" name="useComponent">
// import axios from 'axios'
import { ref, reactive, nextTick } from 'vue'
import '@beeboat/theme/src/bt-table-screen-item.scss'
const staticData = []
// 配置项
const columns = [
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
            supportConditionList: ['ne', 'like', 'eq', 'isNull', 'notlike', 'isNotNull', 'gele'],
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
            supportConditionList: ['ne', 'like', 'eq', 'isNull', 'notlike', 'isNotNull', 'gele'],
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
]

// 默认方案
const senceInfo = ref({
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
            ],
        },
    ],
})
</script>
<style lang="scss">
@import '@beeboat/theme/src/bt-table';
</style>

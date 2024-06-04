<template>
    <div>
        <bt-adv-searchbar :column-list="state.columns" />
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import InputDemo from './input-demo.vue'
const state = reactive({
    columns: [
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
            searchProps: {},
        },
        {
            id: '19eba15d3b7542318d32efcf467b3e3f',
            label: '名称dafafaf大发发1',
            prop: 'name',
            i18nKey: 'PageTablePage.Table1.Name',
            hidden: 0,
            align: 'left',
            sortable: 0,
            enableAdvSearch: 1,
            searchPropType: 'text',
            defaultSearchItem: 0,
            searchProps: {
                enable: true,
                defaultValue: undefined,
                componentType: 'input',
                realProp: 'userId',
                defaultConditionValue: 'in',
                supportConditionList: ['in', 'noIn', 'like'],
                exposeSearchIndex: 0,
                exposeSearchVisible: false,
                exposeSearchValue: ['11'],

                advSearchValue: '',
                advSearchVisible: false,
                advSearchCondition: '',
                advSearchIndex: 0,
                searchComponent: InputDemo,
            },
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
            searchProps: {
                enable: true,
                defaultValue: undefined,
                componentType: 'tree',
                realProp: 'userId',
                defaultConditionValue: 'in',
                supportConditionList: ['in', 'noIn', 'like'],
                dataSourceProps: { label: 'name1', value: 'id' },
                dataSource: _params => {
                    return new Promise<any>(resolve => {
                        return resolve({
                            code: 0,
                            msg: '',
                            data: [
                                { id: '11', name1: '我的11', label: '我的11', children: [] },
                                {
                                    id: '12',
                                    name1: '我的12',
                                    label: '我的12',
                                    children: [{ id: '123', name1: '我的123', label: '我的123' }],
                                },
                            ],
                        })
                    })
                },

                exposeSearchIndex: 0,
                exposeSearchVisible: false,
                exposeSearchValue: ['11'],

                advSearchValue: '',
                advSearchVisible: false,
                advSearchCondition: '',
                advSearchIndex: 0,
            },
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
            searchProps: {
                enable: true,
                defaultValue: undefined,
                componentType: 'text',
                realProp: 'userId',
                defaultConditionValue: 'in',
                supportConditionList: ['in', 'noIn', 'like'],
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

                exposeSearchIndex: 0,
                exposeSearchVisible: false,
                exposeSearchValue: '',

                advSearchValue: '',
                advSearchVisible: false,
                advSearchCondition: '',
                advSearchIndex: 0,
            },
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
            searchProps: {
                enable: true,
                defaultValue: undefined,
                componentType: 'text',
                realProp: 'userId',
                defaultConditionValue: 'in',
                supportConditionList: ['in', 'noIn', 'like'],
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

                exposeSearchIndex: 0,
                exposeSearchVisible: false,
                exposeSearchValue: '',

                advSearchValue: '',
                advSearchVisible: false,
                advSearchCondition: '',
                advSearchIndex: 0,
            },
        },
        {
            id: '646c15cd976d46328d9865ba8aae142c',
            label: '姓名',
            prop: 'operation',
            i18nKey: 'PageTablePage.Table1.Operation',
            width: '200px',
            hidden: 0,
            align: 'left',
            sortable: 0,
            columnType: 4,
            enableAdvSearch: 0,
            defaultSearchItem: 0,
            searchProps: {
                enable: true,
                defaultValue: undefined,
                componentType: 'text',
                realProp: 'userId',
                defaultConditionValue: 'in',
                supportConditionList: ['in', 'noIn', 'like'],
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

                exposeSearchIndex: 0,
                exposeSearchVisible: false,
                exposeSearchValue: '',

                advSearchValue: '',
                advSearchVisible: false,
                advSearchCondition: '',
                advSearchIndex: 0,
            },
        },
        {
            id: '646c15cd976d46328d2865ba8aae141c',
            label: '名称1',
            prop: 'operation',
            i18nKey: 'PageTablePage.Table1.Operation',
            width: '200px',
            hidden: 0,
            align: 'left',
            sortable: 0,
            columnType: 4,
            enableAdvSearch: 0,
            defaultSearchItem: 0,
            searchProps: {
                enable: true,
                defaultValue: undefined,
                componentType: 'text',
                realProp: 'userId',
                defaultConditionValue: 'in',
                supportConditionList: ['in', 'noIn', 'like'],
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

                exposeSearchIndex: 0,
                exposeSearchVisible: false,
                exposeSearchValue: '',

                advSearchValue: '',
                advSearchVisible: false,
                advSearchCondition: '',
                advSearchIndex: 0,
            },
        },
    ],
})
</script>

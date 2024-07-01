<template>
    <BtpTable :search="search" :columns="tables.children" :pagination="pagination" v-bind="table">
        <template #index13>
            <el-table-column label="222"></el-table-column>
        </template>
        <template #toolbar>
            <el-button>123</el-button>
        </template>
    </BtpTable>
</template>

<script lang="ts" setup>
import { useDataLoader } from './table-data'

const { dataApi } = useDataLoader()

const table = {
    id: '123',
    columnSetting: true,
    dataApi: dataApi,
    rowKey: 'id',
    border:true
}

const tables = {
    children: [
        {
            id: 'jKJncyCVS77drVKEzPBpmT',
            label: '序号',
            prop: 'index1',
            type: 'index',
            width: '60px',
            showOverflowTooltip: true,
            editProps: {
                enable: false,
            },
            searchProps: {
                enable: true,
                componentType: 'text',
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
            id: '3',
            label: '序号3',
            prop: 'index3',
            type: 'radio',
            width: '60px',
            showOverflowTooltip: true,
            searchProps: {
                enable: true,
                componentType: 'text',
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
            id: '4',
            label: '序号4',
            prop: 'index4',
            type: 'selection',
            width: '60px',
            reserveSelection: true,
            showOverflowTooltip: true,
            searchProps: {
                enable: true,
                componentType: 'text',
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
            id: '5',
            label: '序号5',
            prop: 'entityName',
            showOverflowTooltip: true,
            searchProps: {
                enable: true,
                componentType: 'text',
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
            id: '6',
            label: '序号6',
            type: 'operate',
            prop: 'index6',
            showOverflowTooltip: true,
            searchProps: {
                enable: true,
                componentType: 'text',
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
}
const search = {
    enable: true,
    scene: {
        id: '231321321321321',
        defaultId: 'scene_123',
        sceneList: [
            {
                id: 'scene_123',
                name: '默认方案',
                isDefault: true,
                searchList: [
                    {
                        id: 'jKJncyCVS77drVKEzPBpmT',
                        searchCondition: 'eq',
                        searchVisible: true,
                        searchValue: ['2024-06-04 00:00:00', '2024-06-04 00:00:00'],
                    },
                ],
            },
        ],
    },
}

const pagination = {
    enable: true,
    reserveSelection: true,
    pageSize: 10,
    background: true,
    size:'small'
}
</script>

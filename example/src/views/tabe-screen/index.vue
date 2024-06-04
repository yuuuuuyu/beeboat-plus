<template>
    <bt-table-screen :item-data="data" :config="config">
        <bt-table-screen-item label="这是一个文字">
            <el-input v-model="data.input" placeholder="请输入111" autosize />
        </bt-table-screen-item>
    </bt-table-screen>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { BtTableScreen } from '@beeboat/components/table-screen'
import { BtTableScreenItem } from '@beeboat/components/table-screen-item'

import '@beeboat/theme/src/bt-table-screen-item.scss'

const data = ref({
    input: '',
})
const config = [
    {
        id: '1',
        prop: 'a1',
        label: 'a1',
        columnType: 2,
        enableAdvSearch: 1,
        defaultSearchItem: 1,
        value: 'aa',
    },
    { id: '2', prop: 'a2', label: 'a2', columnType: 4, enableAdvSearch: 1, defaultSearchItem: 1 },
    { id: '3', prop: 'a3', label: 'a3', columnType: 8, enableAdvSearch: 1, defaultSearchItem: 1 },
    {
        id: '4',
        prop: 'a4',
        label: 'a4',
        columnType: 1,
        enableAdvSearch: 1,
        defaultSearchItem: 1,
        dictId: 'sasdfasd',
    },
    {
        id: '5',
        prop: 'a5',
        label: 'a5',
        columnType: 1,
        enableAdvSearch: 1,
        defaultSearchItem: 1,
        selectData: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
            { label: '选项三', value: '3' },
            { label: '选项四', value: '4' },
        ],
    },
]

// /** 唯一标识 */
//         id: string;
//         /** 表格列 字段 */
//         prop: string;
//         /** 中文名称 */
//         label: string;
//         /** 列类型 */
//         columnType: ConfigType;
//         /** 是否高级筛选 */
//         enableAdvSearch: EnableAdvSearch;
</script>

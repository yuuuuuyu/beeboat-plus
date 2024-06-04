<template>
    <div>
        <el-switch v-model="isLink" :active-value="1" :inactive-value="0" />
        <el-select v-model="buttonType" class="w-full">
            <el-option
                v-for="item in buttonTypeOptions"
                :key="item.value + '+'"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
        <bt-button :type="buttonType">buttonType</bt-button>
        <bt-button type="success">Success</bt-button>
        <bt-button type="secondary" disabled>Default</bt-button>
        <bt-button type="primary">Primary</bt-button>
        <bt-button type="primary" disabled>Primary</bt-button>
        <bt-button type="info">Info</bt-button>
        <bt-button type="warning">warning</bt-button>
        <bt-button type="danger">danger</bt-button>
        <bt-button type="secondary">secondary</bt-button>

        <bt-button type="primary" plain>Primary</bt-button>
        <bt-button type="primary" round>Primary</bt-button>
        <bt-button type="primary" circle>circle</bt-button>

        <bt-button type="primary" :loading="true">loading</bt-button>
        <bt-button type="warning" :link="true" :disabled="true">啊啊啊</bt-button>
        <bt-button type="primary" :link="isLink">啊啊啊</bt-button>
    </div>
    <btTreeSelect
        v-model="treeSelectValue"
        :data="data"
        :render-after-expand="false"
        :props="{ label: 'label', value: 'value' }"
        show-checkbox
        @focus="visibleChange"
    />
    1133
    <bt-autocomplete v-model="states.autoValue" clearable />
    {{ states.autoValue }}
    <el-autocomplete
        ref="autocompleteRef"
        v-model="states.autoValue"
        class="bt-autocomplete"
        :fetch-suggestions="querySearch"
    />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import theme from '@beeboat/bee-theme'

theme.start()
const querySearch = (queryString: string, cb: any) => {
    cb([{ label: '133', value: '1333' }])
}
const states = reactive({
    autoValue: '33',
})
const options = [{ label: '123' }, { label: '345' }]

console.log(
    '++++++',
    options.filter(item => {
        return item.label.indexOf('3') != -1
    }),
)

const treeSelectValue = ref()
const data = [
    {
        value: '1',
        label: 'Level one 1',
        children: [
            {
                value: '1-1',
                label: 'Level two 1-1',
                children: [
                    {
                        value: '1-1-1',
                        label: 'Level three 1-1-1',
                    },
                ],
            },
        ],
    },
    {
        value: '2',
        label: 'Level one 2',
        children: [
            {
                value: '2-1',
                label: 'Level two 2-1',
                children: [
                    {
                        value: '2-1-1',
                        label: 'Level three 2-1-1',
                    },
                ],
            },
            {
                value: '2-2',
                label: 'Level two 2-2',
                children: [
                    {
                        value: '2-2-1',
                        label: 'Level three 2-2-1',
                    },
                ],
            },
        ],
    },
    {
        value: '3',
        label: 'Level one 3',
        children: [
            {
                value: '3-1',
                label: 'Level two 3-1',
                children: [
                    {
                        value: '3-1-1',
                        label: 'Level three 3-1-1',
                    },
                ],
            },
            {
                value: '3-2',
                label: 'Level two 3-2',
                children: [
                    {
                        value: '3-2-1',
                        label: 'Level three 3-2-1',
                    },
                ],
            },
        ],
    },
]

const visibleChange = val => {
    console.log(2333, val)
}

const buttonTypeOptions = [
    {
        value: '',
        label: '默认',
    },
    {
        value: 'primary',
        label: 'Primary',
    },
    {
        value: 'success',
        label: 'Success',
    },
    {
        value: 'info',
        label: 'Info',
    },
    {
        value: 'warning',
        label: 'Warning',
    },
    {
        value: 'danger',
        label: 'Danger',
    },
    {
        value: 'secondary',
        label: 'Secondary',
    },
]
const buttonType = ref()
const isLink = ref()
</script>

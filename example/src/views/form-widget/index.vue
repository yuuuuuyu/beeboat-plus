<template>
    <el-descriptions title="Form 表单组件列表" :column="1" border>
        <el-descriptions-item label="BtSelect示例">
            <template #label>
                <div style="min-width: 200px">BtSelect示例</div>
            </template>
            <div>
                <bt-select
                    ref="sourceServiceIdRef"
                    v-model="selectValue"
                    :data-api="test"
                    :props="{ label: 'label', value: 'value' }"
                />
                <el-button type="primary" style="margin-left: 10px" @click="clearApi(test)">
                    clear api
                </el-button>
            </div>
        </el-descriptions-item>
        <el-descriptions-item label="BtInput示例">
            <template #label>
                <div style="min-width: 200px">BtInput示例</div>
            </template>
            <div style="width: 600px">
                <BtInput v-model="inputData" :show-prepend="true" @blur="blur" @clear="clear">
                    <!-- <template #prepend>
                        <span>Http://</span>
                    </template> -->
                </BtInput>
            </div>
        </el-descriptions-item>
        <el-descriptions-item label="BtInput示例数字类型">
            <template #label>
                <div style="min-width: 200px">BtInput示例数字类型</div>
            </template>
            <div style="width: 600px">
                <BtInput
                    v-model="inputData"
                    type="number"
                    :show-prepend="true"
                    controls-position="right"
                    @blur="blur"
                    @clear="clear"
                />
            </div>
        </el-descriptions-item>
        <el-descriptions-item label="BtDatePicker组件">
            <template #label>
                <div style="min-width: 200px">BtDatePicker组件</div>
            </template>
            <div style="width: 600px">
                <BtDatePicker
                    v-model="date"
                    :type="dateType"
                    :format="'YYYY/MM/DD'"
                    :value-format="'YYYY-MM-DD'"
                    :disabled-date="disabledDate"
                />
                <!-- v-slot:cell="scope"
                    <div class="cell" :class="{ current: scope.slotData.isCurrent }">
                        <span class="text">{{ scope.slotData.text }}</span>
                        <span v-if="isHoliday(scope.slotData)" class="holiday" />
                    </div>
                </BtDatePicker> -->
            </div>
        </el-descriptions-item>
        <el-descriptions-item label="BtRadio示例">
            <template #label>
                <div style="min-width: 200px">BtRadio示例</div>
            </template>
            <div style="width: 600px">
                <BtRadio v-model="defaultValue" :options="options" :border="true" />
            </div>
        </el-descriptions-item>
        <el-descriptions-item label="BtCheckbox示例">
            <template #label>
                <div style="min-width: 200px">BtCheckbox示例</div>
            </template>
            <div style="width: 600px">
                <BtCheckbox v-model="checkDefaultValue" :options="checkBoxOptions" :border="true" />
            </div>
        </el-descriptions-item>
        <el-descriptions-item label="BtSwitch示例">
            <template #label>
                <div style="min-width: 200px">BtSwitch示例</div>
            </template>
            <div style="width: 600px">
                <BtSwitch v-model="switchDefaultValue" :active-value="1" :inactive-value="0" />
            </div>
        </el-descriptions-item>
        <el-descriptions-item label="BtTransfer示例">
            <template #label>
                <div style="min-width: 200px">BtTransfer示例</div>
            </template>
            <div>
                <BtTransfer
                    :default-value="defaultValueTr"
                    :transfer-data="generateData()"
                    :filterable="true"
                    :filter-method="filterMethod"
                >
                    <template #leftFooter>
                        <span>leftFooter</span>
                    </template>
                    <template #rightFooter>
                        <span>rightFooter</span>
                    </template>
                </BtTransfer>
            </div>
        </el-descriptions-item>
        <el-descriptions-item label="BtTreeTransfer示例">
            <template #label>
                <div style="min-width: 200px">BtTreeTransfer示例</div>
            </template>
            <div>
                <BtTreeTransfer
                    ref="treeTransferRef"
                    :node-key="'id'"
                    :tree-data="treeData"
                    :def-to-data="defToData"
                    :default-props="transferProps"
                    :left-tit="'左侧标题'"
                    :right-tit="'右侧标题'"
                    @checkVal="checkVal"
                />
            </div>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// input组件
const inputData = ref('')
const blur = data => {
    console.log('失去焦点', data.val)
}
const clear = () => {
    console.log('清空')
}
const selectValue = ref('')
const sourceServiceIdRef = ref()
let test = () => {
    return new Promise(resolve => {
        console.log(11)

        resolve({
            data: [
                {
                    value: 1,
                    label: '选项一',
                },
                {
                    value: 2,
                    label: '选项二',
                },
                {
                    value: 3,
                    label: '选项三',
                },
                {
                    value: 4,
                    label: '选项四',
                },
                {
                    value: 5,
                    label: '选项五',
                },
                {
                    value: 6,
                    label: '选项六',
                },
            ],
        })
    })
}
const clearApi = test => {
    console.log(test, 'diyige ')
    test = undefined
    sourceServiceIdRef.value.clearApi(test => {
        console.log(test, 'dierge')

        test = undefined
    })
}
// BtDatePicker组件
const date = ref('2023-03-02')
const dateType = ref('date')
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}

// BtRadio组件
const defaultValue = ref('1')
const options = [
    {
        value: '1',
        label: 11,
    },
    {
        value: '2',
        label: 22,
    },
]

// BtCheckbox组件
const checkDefaultValue = ref(['多选二'])
const checkBoxOptions = [
    { id: '1', value: '1', label: '多选一' },
    { id: '2', value: '2', label: '多选二' },
    { id: '3', value: '3', label: '多选三' },
]

// switch
const switchDefaultValue = ref(1)
// transfer

const defaultValueTr = ref([1, 2])
const generateData = () => {
    const data = []
    for (let i = 1; i <= 15; i++) {
        data.push({
            key: i,
            label: `Option ${i}`,
            disabled: i % 4 === 0,
        })
    }
    return data
}

const filterMethod = (query, item) => {
    return item.label.includes(query)
}

// treeTransfer
let treeData = ref([
    {
        id: 1,
        name: 'Level one 1',
        active: false,
        disabled: true,
        children: [
            {
                id: 3,
                name: 'Level two 2-1',
                active: false,
                children: [
                    {
                        id: 4,
                        name: 'Level three 3-1-1',
                        active: false,
                    },
                    {
                        id: 5,
                        name: 'Level three 3-1-2',
                        active: false,
                        disabled: false,
                    },
                ],
            },
            {
                id: 2,
                name: 'Level two 2-2',
                active: false,
                disabled: false,
                children: [
                    {
                        id: 6,
                        name: 'Level three 3-2-1',
                        active: false,
                    },
                    {
                        id: 7,
                        name: 'Level three 3-2-2',
                        active: false,
                        disabled: false,
                    },
                ],
            },
            {
                id: 10,
                name: 'Level two 4-1',
                active: false,
                disabled: false,
                children: [
                    {
                        id: 8,
                        name: 'Level three 4-2-1',
                        active: false,
                    },
                    {
                        id: 9,
                        name: 'Level three 4-2-2',
                        active: false,
                        disabled: false,
                    },
                ],
            },
            {
                id: 11,
                name: 'Level two 5-1',
                active: false,
                disabled: false,
                children: [
                    {
                        id: 12,
                        name: 'Level three 5-2-1',
                        active: false,
                    },
                    {
                        id: 13,
                        name: 'Level three 5-2-2',
                        active: false,
                        disabled: false,
                    },
                ],
            },
            {
                id: 14,
                name: 'Level two 6-1',
                active: false,
                disabled: false,
                children: [
                    {
                        id: 15,
                        name: 'Level three 6-2-1',
                        active: false,
                    },
                    {
                        id: 16,
                        name: 'Level three 6-2-2',
                        active: false,
                        disabled: false,
                    },
                ],
            },
        ],
    },
]) //树形数据
let defToData = ref([]) //选中的ids数据
const transferProps = ref({
    label: 'name',
    children: 'children',
    disabled: 'disabled',
})

//方法

//子组件树形穿梭框返回
const checkVal = val => {
    // console.log('-------',val)
    let arr = []
    for (var i in val) {
        arr.push(val[i].id)
    }
    defToData.value = arr
}

// select
const option = [
    {
        value: 1,
        label: '选项一',
    },
    {
        value: 2,
        label: '选项二',
    },
    {
        value: 3,
        label: '选项三',
    },
    {
        value: 4,
        label: '选项四',
    },
    {
        value: 5,
        label: '选项五',
    },
    {
        value: 6,
        label: '选项六',
    },
]
</script>

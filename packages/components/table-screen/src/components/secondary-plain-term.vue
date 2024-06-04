<template>
    <div v-show="term != 'isNull' && term != 'isNotNull'">
        <!-- 字段：数字 条件：范围 -->
        <div v-if="field == 'number' && term == 'gele'">
            <el-input v-model="resultValue" placeholder="请输入" autosize clearable />
            至
            <el-input v-model="resultValue" placeholder="请输入" autosize clearable />
        </div>
        <!-- 字段：数字 -->
        <div v-else-if="field == 'number'">
            <el-input
                v-model="resultValue"
                placeholder="请输入"
                type="number"
                autosize
                clearable
                @change="onChange"
            />
        </div>
        <!-- 字段：日期 条件：范围 -->
        <div v-else-if="field == 'datetime' && term == 'gele'">
            <el-date-picker
                v-model="resultValue"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                @change="onTimeGeleChange"
            />
        </div>
        <!-- 字段：日期时间 -->
        <div v-else-if="field == 'datetime'">
            <el-date-picker
                v-model="resultValue"
                type="datetime"
                placeholder="请选择"
                format="YYYY/MM/DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                clearable
                @change="onChange"
            />
        </div>
        <div v-else-if="field == 'date' && term == 'gele'">
            <el-date-picker
                v-model="resultValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                @change="onDateGeleChange"
            />
        </div>
        <!-- 字段：日期 -->
        <div v-else-if="field == 'date'">
            <el-date-picker
                v-model="resultValue"
                type="date"
                placeholder="请选择"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                clearable
                @change="onChange"
            />
        </div>
        <!-- 字段：下拉 :multiple-limit="1" -->
        <div v-else-if="field == 'select'">
            <el-select
                v-model="resultValue"
                multiple
                collapse-tags
                collapse-tags-tooltip
                placeholder="请选择"
                clearable
                @change="onSelectChange"
            >
                <el-option
                    v-for="item in dynamicList"
                    :key="item.id"
                    :label="props.selectProp ? item[props.selectProp.label] : item.name"
                    :value="props.selectProp ? item[props.selectProp.value] : item.value"
                />
            </el-select>
        </div>
        <!-- 其他情况为输入框 -->
        <el-input
            v-else
            v-model="resultValue"
            placeholder="请输入"
            autosize
            clearable
            @change="onChange"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const emit = defineEmits({
    'update:modelValue': (value: any) => value,
})

interface IProps {
    modelValue?: any
    field?: string
    term?: string
    selectData: any
    selectProp?: any
    requestApi?: (params: any) => Promise<any>
}
const props = withDefaults(defineProps<IProps>(), {
    modelValue: '',
    field: '',
    term: '',
    selectData: [],
})

const resultValue = ref(props.modelValue)
watch(
    () => props.term,
    () => {
        resultValue.value = undefined
    },
)
const dynamicList: any = ref([])
const init = async () => {
    if (props.field == 'select') {
        if (props.selectData && props.selectData.length > 0) {
            dynamicList.value = props.selectData
        } else if (props.requestApi) {
            props.requestApi({}).then(res => {
                dynamicList.value = res.data || []
                console.log(dynamicList.value, '高级搜索...')
            })
        }
    }
}
// 初始化
init()
function onChange(value) {
    emit('update:modelValue', value)
}
function onTimeGeleChange(value) {
    const dateList: string[] = []
    if (value?.length > 0) {
        dateList[0] = `${value[0]} 00:00:00`
        dateList[1] = `${value[1]} 23:59:59`
    }
    emit('update:modelValue', dateList.join(','))
}
function onDateGeleChange(value) {
    const dateList: string[] = []
    if (value?.length > 0) {
        dateList[0] = `${value[0]}`
        dateList[1] = `${value[1]}`
    }
    emit('update:modelValue', dateList.join(','))
}
function onSelectChange(value) {
    emit('update:modelValue', value.join(','))
}
</script>

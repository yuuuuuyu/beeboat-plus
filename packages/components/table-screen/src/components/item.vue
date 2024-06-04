<template>
    <el-input
        v-if="prop.type == 'text'"
        v-model="resultValue"
        placeholder="请输入"
        autosize
        clearable
        @change="onChange"
    />
    <!-- :input="onInput(resultValue)" -->
    <el-input
        v-else-if="prop.type == 'number'"
        v-model="resultValue"
        placeholder="请输入"
        type="number"
        autosize
        clearable
        @change="onChange"
    />

    <el-date-picker
        v-else-if="prop.type == 'datetime' || prop.type == 'date'"
        v-model="resultValue"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        clearable
        value-format="YYYY-MM-DD"
        @change="onDateTimeChange($event, prop.type)"
    />

    <!-- :multiple-limit="1" -->
    <el-select
        v-else-if="prop.type == 'select'"
        v-model="resultValue"
        multiple
        placeholder="请选择"
        clearable
        collapse-tags
        collapse-tags-tooltip
        @change="onSelectChange"
    >
        <el-option
            v-for="item in dynamicList"
            :key="item.id"
            :label="prop.selectProp ? item[prop.selectProp.label] : item.name"
            :value="prop.selectProp ? item[prop.selectProp.value] : item.value"
        />
    </el-select>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { TableScreen } from '../../types/table-screen'

// const emits = defineEmits({
//     'update:modelValue': (value: any) => value,
// })
const emits = defineEmits(['update:modelValue'])
interface IProps {
    modelValue?: any
    type?: TableScreen.ItemType
    selectData?: any
    selectProp?: any
    requestApi?: (params: any) => Promise<any>
}
const prop = withDefaults(defineProps<IProps>(), { modelValue: '', selectData: [] })
watch(
    () => prop.modelValue,
    val => {
        resultValue.value = val
    },
)
const dynamicList: any = ref([])
const init = async () => {
    if (prop.type == 'select') {
        if (prop.selectData && prop.selectData.length > 0) {
            dynamicList.value = prop.selectData
        } else if (prop.requestApi) {
            prop.requestApi({}).then(res => {
                dynamicList.value = res.data || []
            })
        }
    }
}
// 初始化
init()
// const prop = defineProps({
//     /** 选中值 */
//     modelValue: {
//         type: [String, Object, Number] as PropType<any>,
//         default: '',
//     },
//     /** 筛选类型 */
//     type: String as PropType<TableScreen.ItemType>,
//     selectData: {
//         type: Array as PropType<any[]>,
//         default: () => {
//             return []
//         },
//     },
// })

// const numberValue = ref('') as Ref<string>
const resultValue = ref(prop.modelValue)
/** 数字输入框 格式化 内容 */
// function onInput(value: string) {
//     if (value == '') {
//         return
//     }
//     if (value == '-') {
//         return
//     }
//     const reg = /^([0-9]+\.?[0-9]*|-[0-9]+\.?[0-9]*)$/
//     if (reg.test(value)) {
//         emits('update:modelValue', value)
//     } else {
//         numberValue.value = resultValue.value
//     }
// }
function onChange(value) {
    emits('update:modelValue', [value])
}
function onDateTimeChange(value, type) {
    const dateList: string[] = []
    if (value?.length > 0) {
        if (type == 'date') {
            dateList[0] = `${value[0]}`
            dateList[1] = `${value[1]}`
        } else if (type == 'datetime') {
            dateList[0] = `${value[0]} 00:00:00`
            dateList[1] = `${value[1]} 23:59:59`
        }
    }
    emits('update:modelValue', dateList)
}

function onSelectChange(value) {
    emits('update:modelValue', Array.isArray(value) ? value : [value])
}
</script>

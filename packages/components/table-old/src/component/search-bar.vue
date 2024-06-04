<template>
    <bt-table-screen
        ref="tableScreenRef"
        :config="advancedColumns.columns"
        @reset="onReset"
        @submit="onSubmit"
        @advSearch="onAdsSearch"
        @change="onChangeColumn"
    >
        <slot></slot>
    </bt-table-screen>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue'
const props = defineProps<{ columns: any; params: any; scope?: any }>()
// refresh:表格刷新，selectReset:复选框清空重置，searchBarChange:列数据变更事件
const emits = defineEmits(['refresh', 'selectReset', 'searchBarChange'])
const tempParam: {
    exposeParams: any[]
    advancedParams: any[]
} = {
    exposeParams: [],
    advancedParams: [],
}
const advancedColumns = reactive({
    columns: props.columns.filter(i => i.enableAdvSearch == 1),
})
const setInitParams = (type = 0) => {
    if (type == 0) {
        props.params.advOutQueryParam = tempParam.exposeParams
        props.params.advQueryParam = []
    } else if (type == 1) {
        // 高级搜索
        props.params.advQueryParam = tempParam.advancedParams
        props.params.advOutQueryParam = []
    }
}
const onSubmit = val => {
    let advOutList: any[] = []
    val?.data?.forEach(e => {
        const val = toRaw(e.value)
        if (Array.isArray(val) && val.length > 0) {
            // 剔除值为空的查询条件
            if (!(val.length == 1 && val[0] == '')) {
                advOutList.push({
                    field: e.searchProp || e.prop,
                    express: e.conditionValue,
                    value: e.value,
                    fieldType: e.propType,
                })
            }
        }
    })
    tempParam.exposeParams = advOutList
    //外露搜索
    setInitParams(0)

    emits('refresh')
}

const onAdsSearch = val => {
    // 高级搜索数据
    let advList = [] as any[]
    val.data?.forEach(e => {
        const val = toRaw(e.value)
        if (Array.isArray(val) && val.length > 0) {
            advList.push({
                field: e.searchProp || e.prop,
                express: e.conditionValue,
                value: e.value,
                fieldType: e.propType,
            })
        }
    })
    tempParam.advancedParams = advList
    advancedColumns.columns = props.columns.filter(i => i.enableAdvSearch == 1)
    setInitParams(1)
    emits('refresh')
}

const onReset = () => {
    Object.keys(props.params).forEach(key => {
        props.params[key] = undefined
    })
    props.columns.forEach((i, index) => {
        props.columns[index].value = undefined
    })
    emits('selectReset')
    onSubmit(null)
}

const onChangeColumn = val => {
    emits('searchBarChange', val)
}
</script>

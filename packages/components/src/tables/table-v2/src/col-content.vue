<template>
    <!-- 文字（自带格式化） -->
    <template v-if="item?.dictId">
        <dict-status :data="cacheManager.getDictItem(item.dictId,scope.rowData[item.prop!])" />
    </template>
    <template v-else-if="item?.searchProps?.dataSourceProps">
        {{ dataSourceShowe(scope.rowData, item, props.tableSrc) }}
        {{
            scope.rowData[`${item.prop!}show`]
                ? scope.rowData[`${item.prop!}show`]
                : scope.rowData[`${item.prop!}`]
        }}
    </template>
    <template v-else>
        {{
            item.formatter
                ? dynamicFormatter(item, scope, scope.rowData[item.prop!])
                : defaultFormat(scope.rowData[item.prop!])
        }}
    </template>
</template>

<script setup lang="ts">
import { isArray } from '@beeboat/core'
import DictStatus from '../../../dict-status/src/dict-status.vue'
import { BTPApplication } from '@beeboat/core'

const props = defineProps<{ item: any; scope: any; tableSrc: any }>()
const cacheManager = BTPApplication.getInstance().getCacheManager()

/**
 * 格式化表格单元格默认值
 * @param callValue 当前单元格值
 * @return {String} 格式化后的值
 * */
const defaultFormat = (callValue: any) => {
    // 如果当前值为数组,使用 / 拼接（根据需求自定义）
    if (isArray(callValue)) {
        return callValue.length ? callValue.join(' / ') : '-'
    } else if (callValue === '' || callValue == null || callValue == undefined) {
        return '-'
    } else {
        return callValue
    }
}
// 格式化内容
const dynamicFormatter = (item, row, value) => {
    if (row.$index == -1) {
        return null
    }
    if (item.formatter) {
        return item.formatter(item, row, value)
    } else {
        return value
    }
}
//根据数据源显示内容
const dataSourceShowe = (row, item, state) => {
    //过滤已经获取到值的
    if (row[`${item.prop!}showflag`] || row[`${item.prop!}show`]) return
    //过滤空对象
    if (Object.getOwnPropertyNames(row).length == 0) return
    const dataProps = item.searchProps.dataSourceProps
    try {
        //等待数据源列表生成
        if (state[`${item.prop!}SrcList`]) {
            const showItem = state[`${item.prop!}SrcList`]?.find(el => {
                return el[dataProps.value] === row[item.prop!]
            })
            if (showItem[dataProps.value]) {
                row[`${item.prop!}show`] = showItem[dataProps.label]
            }
            row[`${item.prop!}showflag`] = true
        }
    } catch (e) {
        // console.log(e)
    }
}
</script>

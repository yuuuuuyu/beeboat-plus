import { isArray } from './is'

/**
 * 格式化表格单元格默认值
 * @param callValue 当前单元格值
 * @return {String} 格式化后的值
 * */
export function defaultFormat(callValue: any) {
    // 如果当前值为数组,使用 / 拼接（根据需求自定义）
    if (isArray(callValue)) return callValue.length ? callValue.join(' / ') : '--'
    return callValue ?? '--'
}

/**
 * 根据枚举列表查询当需要的数据
 * @param callValue 当前单元格值
 * @param enumData 枚举列表
 * @param type 过滤类型（目前只有 tag）
 * @return {String} 格式化后的值
 * */
export function filterEnum(callValue: any, enumData: any[] = [], type?: string) {
    let filterData = enumData.find(item => item.value === callValue)
    if (type == 'tag') return filterData?.tagType ? filterData.tagType : ''
    return filterData ? filterData.label : '--'
}

import { isArray } from '@beeboat/core/utils/is'
import Schema from 'async-validator'

// 表格 筛选条件格式化 入参
export interface TableSortParam {
    order: 'descending' | 'ascending' | null | undefined
    prop: string | null
    column?: any
}
// 表格 筛选条件格式化 出参
export interface TableSortRes {
    column: string
    direction: 'DESC' | 'ASC'
}

/**
 * 表格 筛选条件格式化
 * @param tableSort
 * @returns
 */
export function tableSortFormat(tableSort?: TableSortParam): TableSortRes[] | undefined {
    if (!tableSort) {
        return undefined
    }
    if (!tableSort.prop || !tableSort.order) {
        return undefined
    }

    const prop = tableSort.prop.replace(/([A-Z])/g, '_$1').toLowerCase()
    const direction = tableSort.order == 'ascending' ? 'ASC' : 'DESC'
    return [
        {
            column: prop,
            direction,
        },
    ]
}

/**
 * 格式化表格单元格默认值
 * @param callValue 当前单元格值
 * @return {String} 格式化后的值
 * */
export function defaultFormat(callValue: any) {
    // 如果当前值为数组,使用 / 拼接（根据需求自定义）
    if (isArray(callValue)) {
        return callValue.length ? callValue.join(' / ') : '-'
    } else if (callValue === '' || callValue == null || callValue == undefined) {
        return '-'
    } else {
        return callValue
    }
}

export function dynamicFormatter(item, row, value) {
    if (item.formatter) {
        return defaultFormat(item.formatter(item, row))
    } else {
        return defaultFormat(value)
    }
}

/**
 * 根据枚举列表查询当需要的数据
 * @param callValue 当前单元格值
 * @param enumData 枚举列表
 * @param type 过滤类型（目前只有 tag）
 * @return {String} 格式化后的值
 * */
export function filterEnum(callValue: any, enumData: any[] = [], type?: any) {
    const filterData = enumData.find(item => item.value === callValue)
    if (type == 'tag') return filterData?.tagType ? filterData.tagType : ''
    return filterData ? filterData.label : '-'
}

/**
 * 根据字典父ID获取字典列表，匹配value对应的name显示
 * @param callValue 字典value值
 * @param dictId 字典父ID
 * @param appStore pinia appStore
 * @returns
 */
export function filterDictId(callValue: any, dictId: any, appStore?: any) {
    //加载数据字典，不进行后台服务数据查询
    if (callValue != undefined && callValue != null && dictId) {
        const enumData = appStore.getDictById(dictId)
        const filterData = enumData.find(item => item.value == callValue)
        return filterData ? filterData.name : '-'
    } else {
        return '-'
    }
}
export function fuzzyHas(object, property) {
    for (const key in object) {
        if (key.includes(property)) {
            return true
        }
    }
    return false
}

export function clearErrorMessage(item: any) {
    for (const key in item) {
        if (key.includes('_message')) {
            delete item[key]
        }
    }
}
export function innerEditValidate(data: any, rules: any) {
    const descriptor = rules
    const validator = new Schema(descriptor)
    const validatorAll = []
    // 批量保存时 data 为数组
    data.forEach(item => {
        validatorAll.push(
            new Promise((resolve, reject) => {
                validator
                    .validate(item)
                    .then(() => {
                        clearErrorMessage(item)
                        resolve(item)
                    })
                    .catch(({ errors }) => {
                        // fields
                        if (errors) {
                            clearErrorMessage(item)
                            // 返回报错行
                            reject(item)
                            errors.map(error => {
                                item[`${error.field}_message`] = `${
                                    item[`${error.field}_message`] || ''
                                }${error.message || ''}<br/>`
                            })
                        }
                    })
            }),
        )
    })
    return validatorAll
}

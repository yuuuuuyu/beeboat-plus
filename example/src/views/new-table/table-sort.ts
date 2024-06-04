/**
 * 表格 筛选条件格式化
 * @param tableSort
 * @returns
 */
export function e_table_sortFormat(tableSort?: ETableSortParam): ETableSortRes[] | undefined {
    if (tableSort == undefined) {
        return undefined
    }
    if (tableSort.prop == null || tableSort.prop == undefined) {
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
// 表格 筛选条件格式化 入参
export interface ETableSortParam {
    order: 'descending' | 'ascending' | null | undefined
    prop: string | null
    column?: any
}
// 表格 筛选条件格式化 出参
export interface ETableSortRes {
    column: string
    direction: 'DESC' | 'ASC'
}

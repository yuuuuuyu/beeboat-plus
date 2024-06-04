import { getCurrentInstance } from 'vue'

/**
 * 分页相关逻辑代码
 * @param state 数据状态
 * @param props 属性
 * @param emits 事件
 */
export const useSence = (doLayout, elTableRef, state, props) => {
    const loadTableSence = async () => {
        const app = getCurrentInstance()?.appContext.config.globalProperties.$btApplication
        const senceDataList =
            (await app?.getHandler('BtSenceHandler')?.getSence(props.tableId)) || []

        const sortedColumnList = [] as any
        senceDataList.forEach((item: any) => {
            const column = props.columns.find(i => {
                return i.prop == item.prop
            })
            if (column) {
                column.width = item.width || column.width
                column.fixed = item.fixed
                column.hidden = item.hidden ? item.hidden : false
                sortedColumnList.push(column)
            }
        })
        //对列进行排序
        senceDataList.forEach((item: any) => {
            const index = props.columns.findIndex(i => {
                return i.prop == item.prop
            })
            if (index != -1) {
                props.columns.splice(index, 1)
            }
        })
        props.columns.splice(0, 0, ...sortedColumnList)
        doLayout()
    }
    return { loadTableSence }
}

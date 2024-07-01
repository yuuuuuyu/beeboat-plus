import { nextTick } from 'vue'
import BTPUtils from '@beeboat/core/utils-ex/utils-ex'

export const useTable = (props, state, status, tableRef, emits) => {
    /**
     * 计算显示行号
     * @param rowIndex 行号
     * @returns 显示行号
     */
    const computeRowIndex = rowIndex => {
        if (state.pagination.reserve) {
            return rowIndex + 1 + (state.pagination.pageNumber - 1) * state.pagination.pageSize
        }
        return rowIndex + 1
    }
    /**
     * 单选按钮点击
     * @param row 选中行
     */
    const radioSelectionChange = row => {
        tableRef.value.setCurrentRow(row)
        state.selection = [row]
        emits('select', state.selection)
    }
    return { computeRowIndex, radioSelectionChange }
}

export const useTableLoader = (props, state, status, tableRef, emits) => {
    const reLayoutTable = () => {
        state.columns = props.columns?.map(item => {
            item['uniqueIndex'] = BTPUtils.uuid()
            return { ...item }
        })
        nextTick(() => {
            tableRef.value.doLayout()
        })
    }

    /**
     * 保存列主题场景
     */
    const saveScene = () => {
        const columnList = []
        props.columns.forEach(item => {
            columnList.push({
                id: item.id,
                prop: item.prop,
                width: item.width,
                fixed: item.fixed,
                hidden: item.hidden ? item.hidden : false,
            })
        })
        BTPUtils.getCacheManager()
            .saveScene(props.id, columnList)
            .then(res => {
                console.log('保存主题信息完成', res)
            })
    }

    /**
     * 初始化表格
     */
    const initTable = async () => {
        const sceneList = await BTPUtils.getCacheManager().getScene(props.id)
        if (sceneList) {
            const sortedColumnList = [] as any
            //将全部列设置为隐藏
            props.columns.forEach(item => {
                item.hidden = true
            })
            //根据场景信息设置列信息
            sceneList.forEach((item: any) => {
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
            sceneList.forEach((item: any) => {
                const index = props.columns.findIndex(i => {
                    return i.prop == item.prop
                })
                if (index != -1) {
                    props.columns.splice(index, 1)
                }
            })
            props.columns.splice(0, 0, ...sortedColumnList)
        }
        reLayoutTable()
    }

    /**
     * 加载数据
     * @returns void
     */
    const loadData = () => {
        status.loading = true
        //静态数据模式直接返回
        if (props.data) {
            loadLocalData()
            status.loading = false
            return
        }
        if (!props.dataApi) {
            status.loading = false
            return
        }
        const params = JSON.parse(JSON.stringify(props.initParam || {}))
        //附加分页参数
        if (props.pagination?.enable) {
            params.pageNumber = state.pagination.pageNumber
            params.pageSize = state.pagination.pageSize
        }
        params.advQueryParam = state.advQueryParam
        params.sortParamList = state.sortParamList

        //执行请求
        props
            .dataApi(params)
            .then(res => {
                if (props.pagination?.enable) {
                    state.data = res.data.records
                    state.pagination.total = res.data.total
                } else {
                    state.data = res.data
                }
                status.loading = false
                emits('data-loaded', state.data, state.pagination)
            })
            .catch(() => {
                state.data = []
                status.loading = false
                state.pagination.total = 0
            })
    }

    /**
     * 加载本地静态数据
     * @returns void
     */
    const loadLocalData = () => {
        state.data = props.data
    }

    /**
     * 获取表格数据
     * @returns 数据
     */
    const getTableData = () => {
        return state.pagination?.reserve ? state.selection : state.data
    }

    /**
     * 清空选择
     */
    const onPaginationClearSelection = () => {
        tableRef.value.clearSelection()
    }

    /**
     * 列设置点击
     * @param columns 列
     */
    const onColumnSettingChange = async (columns: any) => {
        const sortedColumnList = [] as any
        columns.forEach((item: any) => {
            const column = props.columns.find(i => {
                return i.prop == item.prop
            })
            if (column) {
                column.fixed = item.fixed ? item.fixed : false
                column.hidden = item.hidden ? item.hidden : false
                column.width = item.width ? item.width : ''
                sortedColumnList.push(column)
            }
        })
        //对列进行排序
        columns.forEach((item: any) => {
            const index = props.columns.findIndex(i => {
                return i.id == item.id
            })
            if (index != -1) {
                props.columns.splice(index, 1)
            }
        })
        props.columns.splice(0, 0, ...sortedColumnList)
        reLayoutTable()

        saveScene()
    }

    return { initTable, loadData, getTableData, onPaginationClearSelection, onColumnSettingChange }
}

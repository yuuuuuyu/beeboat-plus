import { reactive } from 'vue'

export const useInit = (elTableRef, props, emits) => {
    props.columns.forEach(item => {
        item.key = item.prop
        if (item.width && typeof item.width === 'string') {
            item.width = Number(item.width.replace('px', ''))
        } else {
            item.width = 200
        }
    })
    const state = reactive({
        columns: [] as any,
        selection: [] as any,
        data: props.data || ([] as any),
        pagination: { pageNumber: 1, pageSize: 20, total: 0 },
        singleSelectionData: null,
        multiSelectionData: {},
        multiSelectionCheckAll: false,
        multiSelectionCheckIndeterminate: false,
        advQueryParam: [] as any,
        sortParamList: [] as any,
        loading: false,
    } as any)

    /**
     * 高级搜索查询
     * @param advQueryParam 参数
     */
    const onAdvSearchbarSearch = advQueryParam => {
        new Promise(resolve => {
            resolve({})
            state.pagination.pageNumber = 1
            state.advQueryParam = advQueryParam
            emits('search')
        }).then(() => {
            loadData()
        })
    }

    /**
     * 高级搜索重置
     */
    const onAdvSearchbarReset = () => {
        new Promise(resolve => {
            resolve({})
            Object.keys(props.initParam).forEach(key => {
                props.initParam[key] = undefined
            })
            state.pagination.pageNumber = 1
            state.advQueryParam = []
            emits('reset')
            //清空选中
            state.singleSelectionData = null
            state.multiSelectionCheckAll = false
            state.multiSelectionCheckIndeterminate = false
            state.selection = []
            Object.keys(state.multiSelectionData).forEach(key => {
                state.multiSelectionData[key] = false
            })
        }).then(() => {
            loadData()
        })
    }

    /**
     * 加载数据
     */
    const loadData = () => {
        state.multiSelectionCheckAll = false
        state.multiSelectionCheckIndeterminate = false
        state.loading = true
        if (props.data) {
            loadStaticData()
            state.loading = false
            return
        }
        if (!props.requestApi) {
            state.loading = false
            return
        }
        let params = JSON.parse(JSON.stringify(props.initParam || {}))
        if (props.paginationProps?.enable) {
            params = Object.assign(params, {
                pageNumber: state.pagination.pageNumber,
                pageSize: state.pagination.pageSize,
            })
        }
        if (state.advQueryParam) {
            params.advQueryParam = state.advQueryParam
        }
        if (state.sortParamList) {
            params.sortParamList = state.sortParamList
        }
        if (props.beforeQuery) {
            if (props.beforeQuery(params)) {
                console.log('用户代码监听了beforeQuery方法并且返回true表明要取消此次加载请求')
                return
            }
        }
        props
            .requestApi(params)
            .then(res => {
                if (props.afterQuery) {
                    if (props.afterQuery(res)) {
                        console.log(
                            '用户代码监听了afterQuery方法并且返回true表明要取消此次数据回写',
                        )
                        return
                    }
                }
                if (props.paginationProps?.enable) {
                    state.data = res.data.records
                    state.pagination.total = res.data.total
                } else {
                    state.data = res.data
                }
                state.loading = false
                emits('dataChange', state.pagination, state.data)
            })
            .catch(() => {
                state.loading = false
                state.data = []
                state.pagination.total = 0
            })
    }

    /**
     * 加载静态数据
     * @returns
     */
    const loadStaticData = () => {
        let params = JSON.parse(JSON.stringify(props.initParam || {}))
        if (props.paginationProps?.enable) {
            params = Object.assign(params, {
                pageNumber: state.pagination.pageNumber,
                pageSize: state.pagination.pageSize,
            })
        }
        if (state.advQueryParam) {
            params.advQueryParam = state.advQueryParam
        }
        if (state.sortParamList) {
            params.sortParamList = state.sortParamList
        }
        if (props.beforeQuery) {
            if (props.beforeQuery(params)) {
                console.log('用户代码监听了beforeQuery方法并且返回true表明要取消此次加载请求')
                return
            }
        }
        if (props.paginationProps?.enable) {
            const dataList = [] as any
            for (
                let i = (params.pageNumber - 1) * params.pageSize;
                i < params.pageNumber * params.pageSize;
                i++
            ) {
                if (props.data.length > i) {
                    dataList.push(props.data[i])
                }
            }
            if (props.afterQuery) {
                if (props.afterQuery(dataList)) {
                    console.log('用户代码监听了afterQuery方法并且返回true表明要取消此次数据回写')
                    return
                }
            }
            state.data = dataList
            state.pagination.total = props.data.length
        } else {
            if (props.afterQuery) {
                if (props.afterQuery(props.data)) {
                    console.log('用户代码监听了afterQuery方法并且返回true表明要取消此次数据回写')
                    return
                }
            }
            state.data = props.data
            state.pagination.total = props.data.length
        }
        emits('dataChange', state.pagination, state.data)
    }

    /**
     * 获取表格数据
     * @returns 数据
     */
    const getTableData = () => {
        return state.pagination.reserve ? state.selection : state.data
    }

    /**
     * 表格排序事件
     * @param sort 排序信息
     */
    const onTableSortChange = sort => {
        if (props.tableSortChange) {
            if (props.tableSortChange(sort)) {
                console.log('用户代码监听了tableSortChange方法并且返回true表明要取消此次数据回写')
                return
            }
        }
        emits('sort-change', sort)
    }

    /**
     * 单选点击事件
     * @param row 行
     */
    const onRadioSelectionChange = row => {
        state.selection = [row]
        emits('selection-change', state.selection)
    }

    /**
     * 多选点击事件
     * @param row 行
     * @param checked 是否选中
     */
    const onCheckboxSelectionChange = (row, checked) => {
        if (checked) {
            state.selection.push(row)
        } else {
            state.selection = state.selection.filter(f => f.id != row.id)
        }
        const newArr = state.data.filter(f => {
            return state.selection.findIndex(t => t.id == f.id) != -1
        })
        state.multiSelectionCheckIndeterminate = !(
            newArr.length == 0 || newArr.length == state.data.length
        )
        state.multiSelectionCheckAll = newArr.length == state.data.length
        emits('selection-change', state.selection)
    }
    /**
     * 全选按钮点击
     */
    const onCheckboxSelectionAllChange = checked => {
        state.multiSelectionCheckIndeterminate = false
        if (checked) {
            const newArr = state.data.filter(f => {
                return state.selection.findIndex(t => t.id == f.id) == -1
            })
            state.selection.push(...newArr)
        } else {
            state.selection = state.selection.filter(f => {
                return state.data.findIndex(t => t.id == f.id) == -1
            })
        }
        Object.keys(state.multiSelectionData).forEach(key => {
            state.multiSelectionData[key] = false
        })
        state.selection.forEach(element => {
            state.multiSelectionData[element.id] = true
        })
        emits('selection-change', state.selection)
    }

    /**
     * 获取表格数据ID
     */
    const getTableDataId = (id = null) => {
        const ids = [] as Array<String>
        if (state.data) {
            state.data.forEach(element => {
                ids.push(element[id || props.rowKey || 'id'])
            })
        }
        return ids
    }

    return {
        state,
        loadData,
        getTableData,
        getTableDataId,
        onTableSortChange,
        onAdvSearchbarSearch,
        onAdvSearchbarReset,
        onRadioSelectionChange,
        onCheckboxSelectionChange,
        onCheckboxSelectionAllChange,
    }
}

/**
 * 分页相关逻辑代码
 * @param state 数据状态
 * @param props 属性
 * @param emits 事件
 */
export const usePagination = (elTableRef, paginationRef, state, props, emits, loadData) => {
    state.pagination = {
        // 实际的页码
        pageNumber: 1,
        pageSize: 20,
        total: 0,
        reserve: false,
    }

    /**
     * 分页器页码变化
     */
    const onPaginationCurrentChange = newPage => {
        state.pagination.pageNumber = newPage
        loadData()
    }
    /**
     * 分页器页数变化
     */
    const onPaginationSizeChange = newPageSize => {
        state.pagination.previousPageSize = newPageSize
        state.pagination.pageNumber = 1
        loadData()
    }
    /**
     * 分页器跨页勾选模式变化
     * @param value 跨页模式
     */
    const onPaginationReserveChange = value => {
        state.pagination.reserve = value
    }
    const onPaginationClearSelection = () => {
        state.selection = []
        state.singleSelectionData = null
        Object.keys(state.multiSelectionData).forEach(key => {
            state.multiSelectionData[key] = false
        })
        state.multiSelectionCheckAll = false
        state.multiSelectionCheckIndeterminate = false
        emits('selection-change', state.selection)
    }
    const computeRowIndex = rowIndex => {
        // 20240115 如果是跨页勾选模式，直接返回行号，不需要使用当前页码和条数计算
        return state.pagination.reserve
            ? rowIndex + 1
            : rowIndex + 1 + (state.pagination.pageNumber - 1) * state.pagination.pageSize
    }
    return {
        computeRowIndex,
        onPaginationCurrentChange,
        onPaginationSizeChange,
        onPaginationReserveChange,
        onPaginationClearSelection,
    }
}

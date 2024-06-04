import { reactive, computed, toRefs, useAttrs } from 'vue'

/**
 * table 页面操作方法封装
 * @param apiUrl 获取表格数据 ApiUrl(必传)
 * @param initParam 获取数据初始化参数(不必传，默认为{})
 * @param isPageable 是否有分页(不必传，默认为true)
 * @param tableRef 当前表格的DOM(不必传，默认为“”)
 * */
export const useTable = (
    apiUrl: (params: any) => Promise<any>,
    initParam: any = {},
    isPageable = true,
    staticData: any,
) => {
    const state = reactive({
        // 表格数据
        tableData: [] as any[],
        // 是否展开更多搜索框
        searchShow: false,
        // 分页数据
        pageable: {
            // 当前页数
            pageNumber: 1,
            // 每页显示条数
            pageSize: 20,
            // 总条数
            total: 0,
        },
        // 查询参数(只包括查询)
        searchParam: {},
        // 初始化默认的查询参数
        initSearchParam: {},
        // 总参数(包含分页和查询参数)
        totalParam: {},
        loading: false, // 加载状态
        errorStatus: false, // catch错误状态
        errorInfo: {} as any, //错误信息
    })
    /**
     * el-table绑定属性和事件
     */
    const bindTableValue = computed(() => {
        const bindValue = { ...useAttrs() }
        delete bindValue.style
        return bindValue
    })

    /**
     * 分页查询数据(只包括分页和表格字段排序,其他排序方式可自行配置)
     * */
    const pageParam = computed({
        get: () => {
            return {
                pageNumber: state.pageable.pageNumber,
                pageSize: state.pageable.pageSize,
            }
        },
        set: (newVal: any) => {
            console.log('我是分页更新之后的值', newVal)
        },
    })

    /**
     * 获取表格数据
     * @return void
     * */
    const getTableList = async () => {
        try {
            state.loading = true
            if (staticData) {
                // staticData 表格静态数据直接赋值
                state.tableData = staticData || []
                updatePageable({ pageNumber: 1, pageSize: 20, total: 0 })
            } else {
                // 更新查询参数
                updatedTotalParam()
                Object.assign(state.totalParam, initParam)
                const { data } = await apiUrl(state.totalParam)
                state.tableData = isPageable
                    ? data.records
                    : Array.isArray(data)
                    ? data
                    : data.records

                // 解构后台返回的分页数据(如果有分页更新分页信息)
                if (isPageable) {
                    const { current, size, total } = data
                    updatePageable({ pageNumber: current, pageSize: size, total })
                }
            }
            setTimeout(() => {
                state.loading = false
            }, 200)
        } catch (error: any) {
            // 取消重复请求时，不对数据重新赋值
            if (!error.isCancelRequest) {
                state.tableData = []
            }
            console.error(error)
            state.errorStatus = true
            state.errorInfo = error
            state.loading = false
        }
    }

    /**
     * 更新查询参数
     * @return void
     * */
    const updatedTotalParam = () => {
        state.totalParam = {}
        Object.assign(state.totalParam, isPageable ? pageParam.value : {})
        // const nowSearchParam: { [propName: string]: any } = {}
        // // 防止手动清空输入框携带参数（可以自定义查询参数前缀）
        // for (const key in state.searchParam) {
        //     // * 某些情况下参数为 false/0 也应该携带参数
        //     if (
        //         state.searchParam[key] ||
        //         state.searchParam[key] === false ||
        //         state.searchParam[key] === 0
        //     ) {
        //         nowSearchParam[key] = state.searchParam[key]
        //     }
        // }
        // Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {})
    }

    /**
     * 更新分页信息
     * @param resPageable 后台返回的分页数据
     * @return void
     * */
    const updatePageable = resPageable => {
        Object.assign(state.pageable, resPageable)
    }

    /**
     * 表格数据查询
     * @return void
     * */
    const search = () => {
        state.pageable.pageNumber = 1
        getTableList()
    }

    /**
     * 表格数据重置
     * @return void
     * */
    const reset = () => {
        state.pageable.pageNumber = 1
        state.searchParam = {}
        // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
        Object.keys(state.initSearchParam).forEach(key => {
            state.searchParam[key] = state.initSearchParam[key]
        })
        getTableList()
    }

    /**
     * 每页条数改变
     * @param val 当前条数
     * @return void
     * */
    const handleSizeChange = (val: number) => {
        state.pageable.pageNumber = 1
        state.pageable.pageSize = val
        getTableList()
    }

    /**
     * 当前页改变
     * @param val 当前页
     * @return void
     * */
    const handleCurrentChange = (val: number) => {
        state.pageable.pageNumber = val
        getTableList()
    }

    /**
     * 表格索引
     * @param index 索引
     * @returns integer 序号
     */
    const indexMethod = index => {
        const currentIndex = index + 1
        return isPageable
            ? (state.pageable.pageNumber - 1) * state.pageable.pageSize + currentIndex
            : currentIndex
    }

    return {
        ...toRefs(state),
        bindTableValue,
        getTableList,
        search,
        reset,
        handleSizeChange,
        handleCurrentChange,
        indexMethod,
    }
}

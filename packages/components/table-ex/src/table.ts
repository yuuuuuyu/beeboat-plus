import { getCurrentInstance, nextTick, reactive, ref, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { BtUseAppStore } from '@beeboat/core'
import { innerEditValidate } from './helpers'
import { ElMessageBox, ElMessage } from 'element-plus'

export const getSence = async senceId => {
    const app = getCurrentInstance()?.appContext.config.globalProperties.$btApplication
    return (await app?.getHandler('BtSenceHandler')?.getSence(senceId)) || []
}

export const saveSence = async (senceId, senceData) => {
    const app = getCurrentInstance()?.appContext.config.globalProperties.$btApplication
    return (await app?.getHandler('BtSenceHandler')?.saveSence(senceId, senceData)) || []
}

/**
 * 处理排序信息
 * @param tableSort 排序信息
 * @returns 处理后的值
 */
export function formatSortParam(tableSort?: any) {
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

export const useInit = (elTableRef, props, emits) => {
    const state = reactive({
        columns: [] as any,
        selection: [] as any,
        data: props.data || ([] as any),
        pagination: { pageNumber: 1, pageSize: 20, total: 0 },
        signgleSelectionData: null,
        advQueryParam: [] as any,
        sortParamList: [] as any,
        loading: false,
        controlInnerEdit: false, // 和蜂舟配置的开启共同控制行内编辑开启和关闭
        originalOperateWidth: Number(
            props.columns.find(item => item.prop === 'operate')?.width?.replace('px', ''),
        ),
    } as any)

    const setPageSize = pagesize => {
        const pageSizes = [20, 50, 100, 200, 500]
        if (typeof pagesize != 'number') {
            return
        }
        if (!pageSizes.includes(pagesize)) {
            return
        }
        pagesize && (state.pagination.pageSize = pagesize)
    }
    /**
     * 高级搜索查询
     * @param advQueryParam 参数
     */
    const onAdvSearchbarSearch = advQueryParam => {
        new Promise(resolve => {
            resolve()
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
            resolve()
            Object.keys(props.initParam).forEach(key => {
                props.initParam[key] = undefined
            })
            state.pagination.pageNumber = 1
            state.advQueryParam = []
            emits('reset')
            elTableRef.value.clearSelection()
        }).then(() => {
            loadData()
        })
    }

    /**
     * 加载数据
     */
    const loadData = () => {
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

                optionMap.initInnerDialog()
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
     * 是否最后操作列
     * @param column 列[可以为空]
     * @returns 是否最后操作列
     */
    const isLastOperateColumn = column => {
        if (state.columns.length == 0 || !props.columnSetting) {
            return false
        }
        const lastColumn = state.columns[state.columns.length - 1]
        column = column || lastColumn
        return lastColumn.id == column.id && lastColumn.columnType == 4
    }

    /**
     * 列设置点击
     * @param columns 列
     */
    const onColumnSettingChange = async (columns: any) => {
        const sortedColumnList = [] as any
        columns.forEach((item: any) => {
            const column = props.columns.find(i => {
                return i.id == item.id
            })
            if (column) {
                column.fixed = item.fixed ? item.fixed : false
                column.hidden = item.hidden ? item.hidden : false
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
        doLayout()

        const res = await BtUseAppStore().saveSence(props.tableId, props.columns)
        if (res.code == 0) {
            ElMessage({
                type: 'success',
                message: '保存成功！',
            })
            emits('columnChange', props.columns)
        } else {
            ElMessage({
                type: 'error',
                message: res.msg,
            })
        }
    }

    /**
     * 拖动列头
     * @param newVal 新值
     * @param _oldVal 旧值
     * @param column 列
     * @param _events 事件
     */
    const onColumnHeaderDraged = (newVal, _oldVal, column, _events) => {
        const columnData = props.columns.find(i => {
            return i.id == column.id
        })
        if (columnData) {
            columnData.width = `${newVal}px`
        }
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
        state.sortParamList = formatSortParam(sort)
        // eltable不支持控制sort图标，暂时直接取消行内编辑
        optionMap.cancel()
    }

    /**
     * 重新布局
     */
    const doLayout = () => {
        const time = new Date().getTime()
        state.columns = props.columns?.map((item, index) => {
            item['uniqueIndex'] = `${time + index}`
            return { ...item }
        })
        nextTick(() => {
            elTableRef.value.doLayout()
        })
    }

    /**
     * 行内编辑相关
     * @param data 当前行数据
     * @param options 配置
     */
    const editCurrentRow = ref([]) as any //
    const addCurrentRow = ref([]) as any //
    const currentRow = computed(() => {
        return [...new Set(addCurrentRow.value), ...new Set(editCurrentRow.value)]
    })

    const resetOperate = width => {
        const operate = props.columns.find(item => item.type == 'operate')
        operate && (operate.width = `${width}px`)
        doLayout()
    }
    const optionMap = {
        initInnerDialog: () => {
            // 优先判断是否存在dialogStatus且是否是view状态，如果是view状态，禁用行内编辑
            if (props.editConfig?.dialogStatus && props.editConfig?.dialogStatus === 'view') {
                props.editConfig.enable = false
            }
            // 如果是弹窗场景并且开启表格的行内编辑，进入后默认所有数据置为编辑状态
            if (
                props.editConfig?.dialogStatus &&
                props.editConfig?.dialogStatus === 'add' &&
                props.editConfig?.enable &&
                props.editConfig?.type === 'dialog'
            ) {
                nextTick(() => {
                    // 第二次产品迭代的时候取消了勾选
                    // elTableRef.value.toggleAllSelection()
                    todoEdit(state.data, { type: 'edit' })
                    // 同时自动开启行内编辑
                    state.controlInnerEdit = true
                })
            }
        },
        rulesHandle: () => {
            for (const rule in props.editConfig.rules) {
                const element = props.editConfig.rules[rule]
                element.forEach(item => {
                    delete item['id']
                    delete item['label']
                    delete item['uniqueCodeName']
                    delete item['value']
                    delete item['patternStr']
                })
            }
            return props.editConfig.rules
        },
        getIndex: data => {
            // return datas.map(data =>
            //     getTableData().findIndex(t => JSON.stringify(t) === JSON.stringify(data)),
            // )
            return getTableData().findIndex(t => {
                // 获取新增的数据索引时需要剔除虚拟id
                // t.virtualId && delete t.virtualId
                return JSON.stringify(t) === JSON.stringify(data)
            })
        },
        getData: indexs => {
            return getTableData().filter((item, index) => {
                if (indexs.includes(index)) {
                    return item
                }
            })
        },
        setChecked: data => {
            elTableRef.value.toggleRowSelection(...data, true)
        },
        addDataHandle: columns => {
            const newData = {
                virtualId: true,
                id: Math.random().toString(24).slice(2),
            }
            const excludeProps = new Set(['index1', 'check', 'selection', 'operate'])
            for (const column of columns) {
                if (column.prop && !excludeProps.has(column.prop)) {
                    newData[column.prop] = null
                }
            }
            return [newData]
        },
        addOrEdit: (data, ref, options) => {
            const _index = [optionMap.getIndex(data)]
            const indexHandler = _index.includes(-1) ? [0] : _index
            if (data.virtualId) {
                // 如果是数据行的向下添加，直接获取getTableData数据中存在virtualId的数据的索引，重新对addCurrentRow赋值
                if (options && options.origin) {
                    ref.value = []
                    const getAllIndexs = getTableData().reduce((result, item, index) => {
                        if (item.virtualId) {
                            result.push(index)
                        }
                        return result
                    }, [])
                    ref.value.unshift(...getAllIndexs)
                } else {
                    // 新增逻辑专用
                    ref.value = ref.value.map(index => {
                        return ++index
                    })
                    ref.value.unshift(indexHandler[0])
                    // 常规的添加。如果editCurrentRow不为空，也需要同步处理
                    editCurrentRow.value = editCurrentRow.value.map(index => {
                        return ++index
                    })
                }
            } else {
                if (!ref.value.includes(...indexHandler)) {
                    ref.value.push(...new Set(indexHandler))
                }
            }
        },
        add: (columns, options) => {
            const data = optionMap.addDataHandle(columns)
            // 定位到勾选数据位置进行添加
            if (options.type === 'add' && options.position) {
                const originIndex = optionMap.getIndex(options.origin)
                if (options.position === 'up') {
                    // 取消向上添加的逻辑
                    getTableData().splice(originIndex, 0, ...data)
                } else {
                    getTableData().splice(originIndex + 1, 0, ...data)
                }
            } else {
                getTableData().unshift(...data)
                // 第二次迭代的时候产品又不要求勾选了
                // elTableRef.value.toggleRowSelection(...data, true)
            }
            optionMap.addOrEdit(...data, addCurrentRow, options)
            // 设置新增数据的勾选状态
            // 第二次迭代的时候产品又不要求勾选了
            // optionMap.setChecked(data)
        },
        edit: (data, options) => {
            if (Array.isArray(data)) {
                data.map(item => {
                    optionMap.addOrEdit(item, editCurrentRow)
                })
            } else {
                optionMap.addOrEdit(data, editCurrentRow)
            }
        },
        cancel: () => {
            // 取消时，取消全部
            editCurrentRow.value = []
            addCurrentRow.value = []
            elTableRef.value.clearSelection()
            // 刷新列表数据
            loadData()
        },
        // 静默批量删除
        deleteBatchSilent: datas => {
            if (datas) {
                datas.forEach(data => {
                    const index = optionMap.getIndex(data)
                    if (index != -1) {
                        getTableData().splice(index, 1)
                        const deleteIndex = addCurrentRow.value.findIndex(_item => _item === index)
                        if (deleteIndex !== -1) {
                            addCurrentRow.value.splice(deleteIndex, 1)
                            // 如果被删除的索引值不是最后一个，将后面的元素向前推进一位
                            if (deleteIndex < addCurrentRow.value.length) {
                                addCurrentRow.value = addCurrentRow.value.map(idx =>
                                    idx > index ? idx - 1 : idx,
                                )
                            }
                        }
                        // 如果editCurrentRow不为空，也需要同步处理
                        editCurrentRow.value = editCurrentRow.value.map(idx =>
                            idx > index ? idx - 1 : idx,
                        )
                    }
                })
            }
        },
        // 删除方法：删除新增但未保存的数据；删除已保存的数据
        delete: (data, options) => {
            ElMessageBox.confirm('是否确认删除选中的数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                const index = optionMap.getIndex(data)
                if (index != -1) {
                    if (data.virtualId) {
                        // 没有保存的数据
                        getTableData().splice(index, 1)
                        const deleteIndex = addCurrentRow.value.findIndex(_item => _item === index)
                        if (deleteIndex !== -1) {
                            addCurrentRow.value.splice(deleteIndex, 1)
                            // 如果被删除的索引值不是最后一个，将后面的元素向前推进一位
                            if (deleteIndex < addCurrentRow.value.length) {
                                addCurrentRow.value = addCurrentRow.value.map(idx =>
                                    idx > index ? idx - 1 : idx,
                                )
                            }
                        }
                        // 如果editCurrentRow不为空，也需要同步处理
                        editCurrentRow.value = editCurrentRow.value.map(idx =>
                            idx > index ? idx - 1 : idx,
                        )
                        ElMessage({
                            type: 'success',
                            message: '删除成功',
                        })
                    } else {
                        // 已经存在数据，直接调用配置的删除接口删除
                        props.editConfig
                            .deleteItem(data)
                            .then(res => {
                                if (res.code == 0) {
                                    ElMessage({
                                        type: 'success',
                                        message: '删除成功',
                                    })
                                    // 删除成功后从列表中剔除数据，处理索引
                                    getTableData().splice(index, 1)
                                    // 如果editCurrentRow不为空，当前删除的数据的索引值在editCurrentRow中删除，并且后续的索引值要向前推进一位
                                    if (editCurrentRow.value.length > 0) {
                                        const deleteIndex = editCurrentRow.value.findIndex(
                                            idx => idx === index,
                                        )
                                        if (deleteIndex !== -1) {
                                            editCurrentRow.value.splice(deleteIndex, 1)
                                            // 将后续的索引值向前推进一位
                                            editCurrentRow.value = editCurrentRow.value.map(idx =>
                                                idx > index ? idx - 1 : idx,
                                            )
                                        }
                                    }
                                } else {
                                    ElMessage({
                                        type: 'error',
                                        message: res.msg,
                                    })
                                }
                            })
                            .catch(err => {
                                console.error(err)
                            })
                    }
                }
            })
        },
        save: (data, options) => {
            Promise.all(innerEditValidate(data, optionMap.rulesHandle()))
                .then(res => {
                    // 遍历处理新增的数据，剔除虚拟id
                    res.map(item => {
                        item.virtualId && (delete item.id, delete item.virtualId)
                    })
                    props.editConfig
                        .saveOrUpdate(res)
                        .then(res => {
                            if (res.code == 0) {
                                ElMessage({
                                    type: 'success',
                                    message: '保存成功！',
                                })
                                editCurrentRow.value = []
                                addCurrentRow.value = []
                                // 保存后刷新列表页
                                if (options.callback && typeof options.callback === 'function') {
                                    options.callback()
                                } else {
                                    loadData()
                                }
                            } else {
                                ElMessage({
                                    type: 'error',
                                    message: res.msg,
                                })
                            }
                        })
                        .catch(err => {
                            console.error(err)
                        })
                })
                .catch(err => {
                    if (typeof err != 'number') {
                        console.error(err)
                        return
                    }
                    // promise.all返回第一条报错的数据，错误定位
                    const errIndex = optionMap.getIndex(err)
                    const top =
                        elTableRef.value.$el.getElementsByClassName('el-table__row')[errIndex]
                            .offsetTop
                    elTableRef.value.setScrollTop(top)
                })
        },
    }
    const todoEdit = (data, options) => {
        if (options.type == 'save') {
            // 通过当前编辑的索引获取对应数据
            optionMap.save(optionMap.getData(currentRow.value), options)
        } else if (optionMap[options.type]) {
            optionMap[options.type](data, options)
        } else {
            console.error(
                '[BtTableEx-InnerEdit]TypeError: optionMap[options.type] is not a function',
            )
        }
    }

    const handleControlInnerEdit = () => {
        // 退出行内编辑前判断是否存在编辑的数据
        if (currentRow.value.length) {
            ElMessageBox.confirm('当前页面存在未保存数据，确认离开?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                state.controlInnerEdit = !state.controlInnerEdit
                editCurrentRow.value = []
                addCurrentRow.value = []
            })
        } else {
            state.controlInnerEdit = !state.controlInnerEdit
            if (!state.controlInnerEdit) {
                // 重置一下操作列的列宽（开启行内编辑后，根据行内编辑需要的操作，重新设置了一下列宽，取消时需要重置）
                resetOperate(state.originalOperateWidth)
                optionMap.cancel()
            } else {
                // 动态控制一下操作列宽度，在行内编辑的状态
                resetOperate(120)
            }
        }
    }
    return {
        state,
        loadData,
        getTableData,
        isLastOperateColumn,
        onColumnSettingChange,
        onColumnHeaderDraged,
        onTableSortChange,
        onAdvSearchbarSearch,
        onAdvSearchbarReset,
        doLayout,
        // 行内编辑
        todoEdit,
        currentRow,
        handleControlInnerEdit,
        resetOperate,
        setPageSize,
    }
}

/**
 * 分页相关逻辑代码
 * @param state 数据状态
 * @param props 属性
 * @param emits 事件
 */
export const usePagination = (
    elTableRef,
    paginationRef,
    state,
    props,
    emits,
    loadData,
    currentRow,
) => {
    state.pagination = {
        // 实际的页码
        pageNumber: 1,
        pageSize: 20,
        total: 0,
        reserve: false,
        // 上一次的页码和条数（用于在判断行内编辑状态下的数据）
        previousPage: 1,
        previousPageSize: 20,
    }

    /**
     * 分页器页码变化
     */
    const onPaginationCurrentChange = newPage => {
        if (currentRow.value.length) {
            state.pagination.pageNumber = state.pagination.previousPage
        } else {
            state.pagination.previousPage = newPage
            state.pagination.pageNumber = newPage
            loadData()
        }
    }
    /**
     * 分页器页数变化
     */
    const onPaginationSizeChange = newPageSize => {
        if (currentRow.value.length) {
            state.pagination.pageSize = state.pagination.previousPageSize
        } else {
            state.pagination.previousPageSize = newPageSize
            state.pagination.pageNumber = 1
            loadData()
        }
    }
    /**
     * 分页器跨页勾选模式变化
     * @param value 跨页模式
     */
    const onPaginationReserveChange = value => {
        state.pagination.reserve = value
    }
    const onPaginationClearSelection = () => {
        elTableRef.value.clearSelection()
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

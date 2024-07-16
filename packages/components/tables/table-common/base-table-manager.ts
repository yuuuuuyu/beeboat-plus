import { nextTick } from 'vue'
import BTPUtils from '@beeboat/core/utils/btp-utils'
import BTPTableEditor from './table-editor'

export default class BTPBaseTableManager {
    public state = null as any
    public tableRef = null as any
    public emits = null as any
    public props = null as any
    public editor = null as any

    constructor(tableRef, props, state, emits) {
        this.tableRef = tableRef
        this.props = props
        this.state = state
        this.emits = emits
        this.editor = new BTPTableEditor(this, props, state, emits)
    }

    installTable() {
        this.initTable()
        if (this.props.initLoading && !this.props.search.enable) {
            this.loadData()
        }
    }

    /**
     * 计算显示行号
     * @param rowIndex 行号
     * @returns 显示行号
     */
    computeRowIndex(rowIndex) {
        if (this.state.pagination.reserve) {
            return rowIndex + 1 + (this.getPageNumber() - 1) * this.getPageSize()
        }
        return rowIndex + 1
    }

    /**
     * 获取当前页码
     * @returns 当前页码
     */
    getPageNumber() {
        return this.state.pagination.pageNumber
    }

    /**
     * 获取当前分页条数
     * @returns 获取当前分页条数
     */
    getPageSize() {
        return this.state.pagination.pageSize
    }

    /**
     * 获取分页组件监听事件列表
     * @returns 事件
     */
    getPaginationEvents() {
        return {
            'clear-selection': () => {
                this.onPaginationClearSelection()
            },
        }
    }
    /**
     * 获取高级搜索组件监听事件列表
     * @returns 事件
     */
    getAdvSearchbarEvents() {
        return {
            search: advQueryParam => {
                this.state.advQueryParam = advQueryParam
                this.loadData()
            },
        }
    }

    /**
     * 单选按钮点击
     * @param row 选中行
     */
    selectSingleRow(row) {
        this.tableRef.value.setCurrentRow(row)
        this.state.selection = [row]
        this.emits('select', this.state.selection)
    }

    reLayoutTable() {
        this.state.columns = this.props.columns?.map(item => {
            item['uniqueIndex'] = BTPUtils.uuid()
            return { ...item }
        })
        nextTick(() => {
            this.tableRef.value.doLayout()
        })
    }

    /**
     * 保存列主题场景
     */
    saveScene() {
        const columnList = [] as any
        this.props.columns.forEach(item => {
            columnList.push({
                id: item.id,
                prop: item.prop,
                width: item.width,
                fixed: item.fixed,
                hidden: item.hidden ? item.hidden : false,
            })
        })
        BTPUtils.getCacheManager()
            .saveScene(this.props.id, columnList)
            .then(res => {
                console.log('保存主题信息完成', res)
            })
    }

    /**
     * 初始化表格
     */
    async initTable() {
        const sceneList = await BTPUtils.getCacheManager().getScene(this.props.id)
        if (sceneList) {
            const sortedColumnList = [] as any
            //将全部列设置为隐藏
            this.props.columns.forEach(item => {
                item.hidden = true
            })
            //根据场景信息设置列信息
            sceneList.forEach((item: any) => {
                const column = this.props.columns.find(i => {
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
                const index = this.props.columns.findIndex(i => {
                    return i.prop == item.prop
                })
                if (index != -1) {
                    this.props.columns.splice(index, 1)
                }
            })
            this.props.columns.splice(0, 0, ...sortedColumnList)
        }
        this.reLayoutTable()
    }

    /**
     * 加载数据
     * @returns void
     */
    loadData() {
        this.state.loading = true
        //静态数据模式直接返回
        if (this.props.data) {
            this.loadLocalData()
            this.state.loading = false
            return
        }
        const params = JSON.parse(JSON.stringify(this.props.initParam || {}))
        //附加分页参数
        if (this.props.pagination?.enable) {
            params.pageNumber = this.state.pagination.pageNumber
            params.pageSize = this.state.pagination.pageSize
        }
        params.advQueryParam = this.state.advQueryParam
        params.sortParamList = this.state.sortParamList
        if (this.props.dataApi) {
            //执行请求
            this.props
                .dataApi(params)
                .then(res => {
                    if (this.props.pagination?.enable) {
                        this.state.data = res.data.records
                        this.state.pagination.total = res.data.total
                    } else {
                        this.state.data = res.data
                    }
                    this.state.loading = false
                    this.emits('data-loaded', this.state.data, this.state.pagination)
                })
                .catch(() => {
                    this.state.data = []
                    this.state.loading = false
                    this.state.pagination.total = 0
                })
        } else if (this.props.propEvents?.loadTableData) {
            this.props.propEvents
                .loadTableData(params)
                .then(res => {
                    if (this.props.pagination?.enable) {
                        this.state.data = res.data.records
                        this.state.pagination.total = res.data.total
                    } else {
                        this.state.data = res.data
                    }
                    this.state.loading = false
                    this.emits('data-loaded', this.state.data, this.state.pagination)
                })
                .catch(() => {
                    this.state.data = []
                    this.state.loading = false
                    this.state.pagination.total = 0
                })
        } else {
            this.state.loading = false
        }
    }

    /**
     * 加载本地静态数据
     * @returns void
     */
    loadLocalData() {
        this.state.data = this.props.data
    }

    /**
     * 获取表格数据
     * @returns 数据
     */
    getTableData() {
        return this.state.pagination?.reserve ? this.state.selection : this.state.data
    }

    /**
     * 清空选择
     */
    onPaginationClearSelection() {
        this.state.selection = []
        this.state.radioSelection = null
        this.tableRef.value.clearSelection()
    }

    /**
     * 列设置点击
     * @param columns 列
     */
    onColumnSettingChange(columns: any) {
        const sortedColumnList = [] as any
        columns.forEach((item: any) => {
            const column = this.props.columns.find(i => {
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
            const index = this.props.columns.findIndex(i => {
                return i.id == item.id
            })
            if (index != -1) {
                this.props.columns.splice(index, 1)
            }
        })
        this.props.columns.splice(0, 0, ...sortedColumnList)
        this.reLayoutTable()

        this.saveScene()
    }
}

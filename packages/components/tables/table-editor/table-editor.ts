import { reactive } from 'vue'
import cloneDeep from 'lodash-es/cloneDeep'
import Validator from 'async-validator'
import BTPUtils from '@beeboat/core/utils-ex/utils-ex'

/**
 * 表格行内编辑处理对象
 */
export default class BTPTableEditor {
    props: any

    getTableData: any

    /**
     * 行内编辑校验规则
     */
    rules = {} as any

    /**
     * 处于编辑中的行
     */
    editingRows = reactive({})
    /**
     * 处于编辑中的数据
     */
    editDataList = []

    constructor(props, getTableData, emits) {
        this.props = props
        this.getTableData = getTableData
        //处理列的校验信息
        this.props.columns.forEach(item => {
            if (item.editProps?.rules) {
                this.rules[item.prop] = item.editProps.rules
            }
        })
    }

    getRowKey() {
        return this.props.rowKey || 'id'
    }

    getData(row: any): any {
        return this.editingRows[row[this.getRowKey()]]?.data || null
    }

    createRow() {
        const data = {}
        data['_tmpl_'] = true
        data[this.getRowKey()] = BTPUtils.uuid()

        this.props.columns.forEach(item => {
            if (item.editProps?.enable) {
                data[item.prop] = item.editProps?.defaultValue
            }
        })

        return data
    }

    add(index: number): void {
        const data = this.createRow()
        const dataList = this.getTableData()
        if (index != -1) {
            dataList.splice(index + 1, 0, data)
        } else {
            dataList.unshift(data)
        }
    }

    edit(row: any): void {
        if (!this.editingRows[row[this.getRowKey()]]) {
            this.editingRows[row[this.getRowKey()]] = { origin: row, data: cloneDeep(row) }
        }
    }

    delete(row: any): void {
        const dataList = this.getTableData()
        const index = dataList.findIndex(item => item[this.getRowKey()] == row[this.getRowKey()])
        dataList.splice(index, 1)
    }
    cancel(row: any): void {
        delete this.editingRows[row[this.getRowKey()]]
    }
    cancelAll(): void {
        this.editingRows = {}
    }

    /**
     * 判断行是否处于编辑中
     * @param row 行
     * @returns 是否处于编辑中
     */
    isEditing(row: any): boolean {
        return this.editingRows[row[this.getRowKey()]] != undefined
    }

    getRowErrorMessage(row: any) {
        return this.editingRows[row[this.getRowKey()]]?.message || null
    }

    hasError(row: any, column: any): boolean {
        const message = this.getRowErrorMessage(row)
        return message && message[column.prop] != null
    }

    getErrorMessage(row: any, column: any): string {
        const message = this.getRowErrorMessage(row)
        return message[column.prop]
    }

    validate(): void {
        const validator = new Validator(this.rules)

        Object.keys(this.editingRows).forEach(key => {
            const row = this.editingRows[key]
            row.message = null
            new Promise((resolve, reject) => {
                validator
                    .validate(row.data)
                    .then(() => {
                        console.log('校验成功')
                    })
                    .catch(({ errors }) => {
                        row.message = {}
                        errors.forEach(item => {
                            row.message[item.field] = item.message
                        })
                    })
            })
        })
    }
}

import { reactive } from 'vue'
import cloneDeep from 'lodash-es/cloneDeep'
import Validator from 'async-validator'
import BTPUtils from '@beeboat/core/utils/btp-utils'

/**
 * 表格行内编辑处理对象
 */
export default class BTPTableEditor {
    manager: any
    props: any
    emits: any

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

    constructor(manager, props, state, emits) {
        this.manager = manager
        this.props = props
        this.emits = emits
        //处理列的校验信息
        this.props.columns.forEach(item => {
            if (item.editProps?.rules) {
                this.rules[item.prop] = item.editProps.rules
            }
        })
    }

    /**
     * 判断当前表格是否支持行内编辑
     * @returns 判断当前表格是否支持行内编辑
     */
    isEditable(): boolean {
        return this.props?.editProps?.enable || false
    }

    getRowKey() {
        return this.props.rowKey || 'id'
    }

    getData(row: any): any {
        return this.editingRows[row[this.getRowKey()]]?.data || null
    }

    getRowData(uniqueId) {
        const dataList = this.manager.getTableData()
        const data = dataList.find(item => item[this.getRowKey()] == uniqueId)
        return data
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
        const dataList = this.manager.getTableData()
        if (index != -1) {
            dataList.splice(index + 1, 0, data)
        } else {
            dataList.unshift(data)
        }
        if (!this.editingRows[data[this.getRowKey()]]) {
            this.editingRows[data[this.getRowKey()]] = { origin: data, data: cloneDeep(data) }
        }
        this.emits('row-edit-add', data)
        this.emits('row-edit-change')
    }

    edit(row: any): void {
        if (!this.editingRows[row[this.getRowKey()]]) {
            this.editingRows[row[this.getRowKey()]] = { origin: row, data: cloneDeep(row) }
        }
        this.emits('row-edit-edit', row)
        this.emits('row-edit-change')
    }

    delete(row: any): void {
        const dataList = this.manager.getTableData()
        const index = dataList.findIndex(item => item[this.getRowKey()] == row[this.getRowKey()])
        dataList.splice(index, 1)
        this.emits('row-edit-delete', [row])
        this.emits('row-edit-change')
    }
    cancel(row: any): void {
        const datas = this.editingRows[row[this.getRowKey()]]
        const data = this.getRowData(row[this.getRowKey()])
        if (data) {
            Object.assign(data, datas.origin)
        }
        delete this.editingRows[row[this.getRowKey()]]
        this.emits('row-edit-cancel', [row])
        this.emits('row-edit-change')
    }
    cancelAll(): void {
        const rows = [] as any
        Object.keys(this.editingRows).forEach(key => {
            const datas = this.editingRows[key]
            const data = this.getRowData(datas.data[this.getRowKey()])
            if (data) {
                Object.assign(data, datas.origin)
            }
            rows.push(datas.data)
            delete this.editingRows[key]
        })
        this.emits('row-edit-cancel', rows)
        this.emits('row-edit-change')
    }

    saveAll(): void {
        this.validate().then(validate => {
            if (!validate) {
                return
            }
            console.log('可以保存')
        })
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

    validate(): Promise<boolean> {
        const validator = new Validator(this.rules)
        const rows = [] as Array<Promise<any>>

        Object.keys(this.editingRows).forEach(key => {
            const editData = this.editingRows[key]
            rows.push(
                new Promise(resolve => {
                    validator
                        .validate(editData.data)
                        .then(() => {
                            editData.message = null
                            resolve(true)
                        })
                        .catch(({ errors }) => {
                            editData.message = {}
                            errors.forEach(item => {
                                editData.message[item.field] = item.message
                            })
                            resolve(false)
                        })
                }),
            )
        })
        return new Promise(resolve => {
            Promise.all(rows).then(values => {
                resolve(values.every(item => item === true))
            })
        })
    }

    validateRow(row: any): Promise<boolean> {
        const validator = new Validator(this.rules)
        const editData = this.editingRows[row[this.getRowKey()]]
        return new Promise(resolve => {
            validator
                .validate(editData.data)
                .then(() => {
                    editData.message = null
                    resolve(true)
                })
                .catch(({ errors }) => {
                    editData.message = {}
                    errors.forEach(item => {
                        editData.message[item.field] = item.message
                    })
                    resolve(false)
                })
        })
    }
}

import { ComponentInternalInstance } from 'vue'
import BtBaseComponentContext from './base-component-context'
import { resetFields, validate } from '../utils/form-extend'
/**
 * 表单逻辑处理基类
 * @author Enmaai
 */
export default class BtBaseFormContext extends BtBaseComponentContext {
    /**
     * 表单数据
     */
    public formRules
    constructor(vueInstance?: ComponentInternalInstance) {
        super(vueInstance)
        this.formRules = {}
    }

    initFormRules() {
        Object.keys(this.formRules).forEach(key => {
            const item = this.formRules[key]
            if (item && item.length > 0) {
                item.forEach(rule => {
                    rule.pattern = new RegExp(rule.patternStr)
                })
            }
        })
    }

    getFormRef() {
        return this.getRef(this.uniqueId)
    }

    onReset(_params: any): void {
        const formRef = this.getRef(this.uniqueId)
        if (formRef) {
            resetFields(formRef)
        }
    }
    /**
     * 执行表单提交
     */
    onSubmit() {
        this.validateForm().then(valid => {
            if (valid) {
                if (this.viewData && this.viewData.id) {
                    this.updateData()
                } else {
                    this.createData()
                }
            } else {
                console.log('表单校验失败')
            }
        })
    }

    /**
     * 新建数据
     */
    createData() {
        this.onCreateData()
    }

    /**
     * 新建数据
     */
    onCreateData() {
        console.log('新建数据方法未实现')
    }

    /**
     * 更新数据
     */
    updateData() {
        this.onUpdateData()
    }

    /**
     * 更新数据
     */
    onUpdateData() {
        console.log('修改数据方法未实现')
    }

    loadData(params: any): void {
        this.clearViewData()
        if (params && params.id) {
            this.onLoadData(params)
        }
    }

    onLoadData(params: any): void {
        console.log('方法loadData未实现', params)
    }

    loadComponentData(params: any): void {
        this.loadData(params)
    }

    /**
     * 加载数据完毕
     * @param res 返回值
     * @returns 无
     */
    loadDataFinished(res: any): void {
        this.resetForm()
        if (res.code != 0) {
            return
        }
        this.viewData = Object.assign(this.viewData, res.data)
    }

    validateForm(): Promise<unknown> {
        const formRef = this.getFormRef()
        return validate(formRef)
    }
    resetForm() {
        const formRef = this.getFormRef()
        resetFields(formRef)
    }

    /**
     * 获取属性校验规则
     * @param fieldName 属性
     * @returns 校验规则
     */
    getFieldRules(fieldName: string) {
        if (this.formRules && this.formRules[fieldName]) {
            this.formRules[fieldName].forEach(item => {
                delete item['id']
                delete item['label']
                delete item['uniqueCodeName']
                delete item['value']
                delete item['patternStr']
            })
            return this.formRules[fieldName]
        }
        return []
    }
    /**
     * 获取表单校验规则
     * @param fieldName 属性
     * @returns 校验规则
     */
    getRules() {
        return this.formRules
    }

    /**
     * 表单提交完成
     * @param res 返回值
     */
    submitFinished(res) {
        this.onSubmitFinished(res)
    }

    /**
     * <可重写>表单提交完成
     * @param res 返回值
     */
    onSubmitFinished(res) {
        console.log('表单提交完成', res)
    }
}

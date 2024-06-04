import { ComponentInternalInstance, reactive } from 'vue'
import BtComponentContext from './base-component-context'
/**
 * 表单逻辑处理基类
 * @author Enmaai
 */
export default class BtFormComponentContext extends BtComponentContext {
    /**
     * 组件双向绑定数据
     */
    public state

    /**
     * 初始化数据
     */
    public initData

    /**
     * 表单项列表
     */
    public formItemList

    /**
     * 构造函数
     */
    constructor() {
        super()
        this.state = reactive({
            formData: {},
        })
    }
    init(vueInstance: ComponentInternalInstance, pageContext: any): void {
        super.init(vueInstance, pageContext)
        this.initData = Object.keys(this.state.formData)
    }

    /**
     * 获取表单的Ref对象
     * @returns Ref对象
     */
    getFormRef() {
        return this.getRef(this.uniqueId)
    }

    /**
     * 获取表单规则
     * @param formItemId 表单项ID
     * @returns 校验规则
     */
    getItemRule(formItemId: string) {
        const rules = this.formItemList?.find(item => item.prop == formItemId)?.rules || []
        rules.forEach(item => {
            delete item['id']
            delete item['label']
            delete item['uniqueCodeName']
            delete item['value']
            delete item['patternStr']
        })
        return rules
    }

    /**
     * 获取组件绑定属性
     * @param componentName 组件唯一名称
     * @returns 组件绑定属性
     */
    getBindProps(componentName: string) {
        return this.formItemList.find(item => item.prop == componentName)?.props || {}
    }

    /**
     * 获取表单项对应的校验规则列表
     * @param componentName 组件唯一名称
     * @returns 校验规则列表
     */
    getRules(componentName: string) {
        return this.formItemList.find(item => item.prop == componentName)?.rules || []
    }

    /**
     * 执行表单校验
     * @returns Promise对象
     */
    validate() {
        return this.getFormRef()?.validate()
    }

    /**
     * 重置表单
     */
    resetValidate(): void {
        Object.keys(this.state.formData).forEach(key => {
            this.getFormRef()?.clearValidate(key)
        })
    }

    resetFormData(): void {
        this.getFormRef()?.resetFields()
        //清空V-MODEL中多余值
        Object.keys(this.state.formData).forEach(key => {
            if (this.initData.indexOf(key) == -1) {
                delete this.state.formData[key]
            }
        })
    }

    /**
     * 加载组件数据
     * @param params 参数
     */
    loadComponentData(params: any): void {
        this.onFormDataLoaded(params)
    }

    /**
     * 表单数据加载完毕
     * @param params 返回值
     */
    onFormDataLoaded(params): void {
        this.resetFormData()
        this.state.formData = Object.assign(this.state.formData, params)
    }

    /**
     * 提交表单
     */
    submit(): void {
        if (this.validate()) {
            this.saveOrUpdate()
        }
    }
    /**
     * 执行后台提交逻辑
     */
    saveOrUpdate(): void {}

    /**
     * 表单提交完成
     * @param res 返回值
     */
    submitFinished(res: any): void {
        console.log('表单提交完成', res)
    }
}

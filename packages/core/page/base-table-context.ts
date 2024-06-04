import { ComponentInternalInstance, reactive } from 'vue'
import BtBaseComponentContext from './base-component-context'
/**
 * 表格逻辑处理基类
 * @author Enmaai
 */
export default class BtBaseTableContext extends BtBaseComponentContext {
    /**
     * 表单数据
     */
    public dataList

    constructor(vueInstance?: ComponentInternalInstance) {
        super(vueInstance)
        this.dataList = reactive({})
    }

    loadComponentData(params: any): void {
        this.clearViewData()
        this.refresh(params)
    }
}

import { ComponentInternalInstance } from 'vue'
import BtComponentContext from './base-component-context'
/**
 * 表格逻辑处理基类
 * @author Enmaai
 */
export default class BtTableComponentContext extends BtComponentContext {
    /**
     * 构造函数
     * @param vueInstance 当前组件实例
     */
    constructor(vueInstance?: ComponentInternalInstance) {
        super(vueInstance)
    }

    getExpose() {
        return {
            ...super.getExpose(),
            getTable: () => {
                return this.getRef(this.uniqueId) || this.getRef(`${this.uniqueId}Ref`)
            },
        }
    }
}

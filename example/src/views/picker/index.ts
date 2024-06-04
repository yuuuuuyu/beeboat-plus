// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { reactive, ComponentInternalInstance, nextTick } from 'vue'

import { BtPickerDialogPageContext } from '@beeboat/core/index'
export {}

export default class BaseUnitInfoEditPageContext extends BtPickerDialogPageContext {
    constructor(parentPageContext: any, vueInstance?: ComponentInternalInstance) {
        super(parentPageContext, vueInstance)
        this.datasourceRefId = 'tableRef'
    }
}

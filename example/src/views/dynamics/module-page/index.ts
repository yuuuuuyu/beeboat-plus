import { BTPViewContext, BTPUtils } from '@beeboat/core/index'
export default class ModuleViewContext extends BTPViewContext {
    executeAction(vv) {
        if (vv.isEvent('loadTableData', 'Table1')) {
            const params = Object.assign({}, vv.params)
            params.serviceId = 'c1fa21724eae45499fae3d05b6c81daa'
            params.solutionId = '8b5c47c242fd4b1398f8692b11b1a613'
            params.branchId = 'b8d9815d-a546-47d8-1b9c-c5061360d4cb'
            return BTPUtils.getApp()
                .getHttp()
                .post('designer/model/serviceObject/listUserSolutionService', params)
        }
    }
}

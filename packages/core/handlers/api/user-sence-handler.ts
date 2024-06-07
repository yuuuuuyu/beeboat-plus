import { BTPBaseApiHandler } from '../base'

/**
 * 应用挂载处理对象
 * @author Enmaai
 */
export default class BTPUserSenceHandler extends BTPBaseApiHandler {
    readonly className: string = 'BTPUserSenceHandler'
    constructor() {
        super()
        this._rank = 100
    }
    getSence(_id: string) {
        return new Promise(resolve => {
            resolve(null)
        })
    }
    saveSence(_id: string, _sence: Object) {
        return new Promise(resolve => {
            resolve({ code: 0 })
        })
    }
    handle(params: any): void {}
}

import { v4 as uuidv4 } from 'uuid'
import { BTPApplication } from '../app'

export default class BTPUtils {
    /**
     * @description 获取应用程序对象
     * @returns 应用程序对象
     */
    static getApp() {
        return BTPApplication.getInstance()
    }
    /**
     * @description 获取应用缓存对象
     * @returns 应用缓存对象
     */
    static getCacheManager() {
        return this.getApp().getCacheManager()
    }
    /**
     * @description 创建一个新的uuidv4
     * @returns uuid
     */
    static uuid(): string {
        return uuidv4()
    }
}

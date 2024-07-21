import { BTPAppCacheManager } from '@beeboat/core'

export default class AppCacheManager extends BTPAppCacheManager {
    /**
     * @description 获取用户场景数据
     * @param sceneId 场景ID
     * @returns  用户场景数据
     */
    getScene(sceneId: string): Promise<any> {
        return new Promise(resolve => {
            resolve(null)
        })
    }

    /**
     * @description 保存用户场景数据
     * @param sceneId 场景ID
     * @param data 场景数据
     * @returns  结果
     */
    saveScene(sceneId: string, data: any): Promise<any> {
        const datas = {
            id: sceneId,
            data: data,
        }
        return new Promise(resolve => {
            resolve({ code: 0 })
        })
    }
}

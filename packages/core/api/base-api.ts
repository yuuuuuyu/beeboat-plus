import { AxiosInstance } from 'axios'
import BtApplication from '../app/application'
import { exportFile } from '../utils/export'

export const GetRequest =
    (url: string) => (target: any, key: PropertyKey, descriptor: PropertyDescriptor) => {
        descriptor.value = function (...rest) {
            return target.get(`${target.getUrl()}${url}`, ...rest)
        }
    }
export const PostRequest =
    (url: string) => (target: any, key: PropertyKey, descriptor: PropertyDescriptor) => {
        descriptor.value = function (...rest) {
            return target.post(`${target.getUrl()}${url}`, ...rest)
        }
    }
/**
 * 接口请求基类
 * @author Enmaai
 */
export default class BtBaseApi {
    /**
     * 导出字节流
     * @param blob 内容
     * @param fileName 文件名，默认从文件流中获取
     * @returns 导出结果
     */
    static exportFile(blob, fileName = ''): Promise<any> {
        return exportFile(blob, fileName)
    }
    /**
     * 获取Http对象
     * @returns http对象
     */
    static getHttp(): AxiosInstance {
        return BtApplication.getInstance().getHttp()
    }
    /**
     * GET请求
     * @param url 地址
     * @param params 参数
     * @returns 回调
     */
    static get(url: string, params = {}): Promise<any> {
        return this.getHttp().get(url, { params: params })
    }

    /**
     * POST请求
     * @param url 地址
     * @param params 参数
     * @param config 参数
     * @returns 回调
     */
    static post(url: string, params = {}, config = {}): Promise<any> {
        return this.getHttp().post(url, params, config)
    }
}

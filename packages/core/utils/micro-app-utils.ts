import { BtUseAppStore } from '../store/'
/**
 * 微应用工具类
 * @author Enmaai
 */
class BTMicroAppUtils {
    static getServiceData(serviceId: string) {
        const store = BtUseAppStore()
        const service = store.getServiceById(serviceId)
        if (!service) {
            return null
        }
        return {
            url: service.addr || '',
            appCode: service.appCode,
            functionName: this.toCamel(`event-center-for-${service.appCode}`, '-'),
            serviceData: service,
        }
    }

    /**
     * 字符串转 驼峰
     * @param str 目标字符串
     * @param spacer 间隔符号
     * @returns
     */
    static toCamel(str: string, spacer = '-' as string) {
        const reg = new RegExp(`\\${spacer}(\\w)`, 'g')
        return str.replace(reg, (all, letter) => letter.toUpperCase())
    }
}
export default BTMicroAppUtils
export { BTMicroAppUtils }

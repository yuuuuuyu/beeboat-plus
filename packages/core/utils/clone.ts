import { isArray } from './is'
/**
 * 克隆数组或对象
 * @param obj array | object
 * @returns
 */
interface IClone {
    [x: string]: any
    hasOwnProperty: (arg0: string) => any
}
function clone(obj: IClone | IClone[] | null) {
    // 判断是否需要递归
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }
    let result: any
    if (isArray(obj)) {
        result = []
    } else {
        result = {}
    }
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = clone(obj[key])
        }
    }
    return result
}
export { clone }

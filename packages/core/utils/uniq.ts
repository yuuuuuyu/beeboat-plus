/**
 * 如果是纯粹数组，用es6 Set去重，只需要传arr即可
 * @param  {} arr 数组 or 对象数组
 * @param  {} params 数组对象去重时根据key值去重
 */
export const uniq = (arr, params) => {
    if (!Array.isArray(arr)) {
        return arr
    }
    if (params) {
        const obj = {}
        const newArr = arr.reduce((perv, cur) => {
            obj[cur[params.key]] ? '' : (obj[cur[params.key]] = true && perv.push(cur))
            return perv
        }, [])
        return newArr
    } else {
        return Array.from(new Set(arr))
    }
}

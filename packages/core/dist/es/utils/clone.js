import { isArray } from './is';
function clone(obj) {
    // 判断是否需要递归
    if (typeof obj !== 'object' || obj == null) {
        return obj;
    }
    let result;
    if (isArray(obj)) {
        result = [];
    }
    else {
        result = {};
    }
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = clone(obj[key]);
        }
    }
    return result;
}
export { clone };

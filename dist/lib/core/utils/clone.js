"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
const is_1 = require("./is");
function clone(obj) {
    // 判断是否需要递归
    if (typeof obj !== 'object' || obj == null) {
        return obj;
    }
    let result;
    if ((0, is_1.isArray)(obj)) {
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
exports.clone = clone;

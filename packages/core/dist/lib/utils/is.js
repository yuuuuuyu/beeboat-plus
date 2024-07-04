"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNullOrUnDef = exports.isNullAndUnDef = exports.isNull = exports.isImageDom = exports.isServer = exports.isElement = exports.isWindow = exports.isClient = exports.isArray = exports.isBoolean = exports.isString = exports.isPromise = exports.isAsyncFunction = exports.isNumber = exports.isDate = exports.isObject = exports.isFirefox = exports.isUnDef = exports.isDef = exports.isFunction = exports.is = void 0;
const toString = Object.prototype.toString;
/**
 * 判断值是否未某个类型
 */
function is(val, type) {
    return toString.call(val) === `[object ${type}]`;
}
exports.is = is;
/**
 *  是否为函数
 */
function isFunction(val) {
    return is(val, 'Function');
}
exports.isFunction = isFunction;
/**
 * 是否已定义
 */
const isDef = (val) => {
    return typeof val !== 'undefined';
};
exports.isDef = isDef;
const isUnDef = (val) => {
    return !(0, exports.isDef)(val);
};
exports.isUnDef = isUnDef;
const isFirefox = function () {
    return !!window.navigator.userAgent.match(/firefox/i);
};
exports.isFirefox = isFirefox;
/**
 * 是否为对象
 */
const isObject = (val) => {
    return val !== null && is(val, 'Object');
};
exports.isObject = isObject;
/**
 *  是否为时间
 */
function isDate(val) {
    return is(val, 'Date');
}
exports.isDate = isDate;
/**
 *  是否为数值
 */
function isNumber(val) {
    return is(val, 'Number');
}
exports.isNumber = isNumber;
/**
 *  是否为AsyncFunction
 */
function isAsyncFunction(val) {
    return is(val, 'AsyncFunction');
}
exports.isAsyncFunction = isAsyncFunction;
/**
 *  是否为promise
 */
function isPromise(val) {
    return is(val, 'Promise') && (0, exports.isObject)(val) && isFunction(val.then) && isFunction(val.catch);
}
exports.isPromise = isPromise;
/**
 *  是否为字符串
 */
function isString(val) {
    return is(val, 'String');
}
exports.isString = isString;
/**
 *  是否为boolean类型
 */
function isBoolean(val) {
    return is(val, 'Boolean');
}
exports.isBoolean = isBoolean;
/**
 *  是否为数组
 */
function isArray(val) {
    return val && Array.isArray(val);
}
exports.isArray = isArray;
/**
 * 是否客户端
 */
const isClient = () => {
    return typeof window !== 'undefined';
};
exports.isClient = isClient;
/**
 * 是否为浏览器
 */
const isWindow = (val) => {
    return typeof window !== 'undefined' && is(val, 'Window');
};
exports.isWindow = isWindow;
const isElement = (val) => {
    return (0, exports.isObject)(val) && !!val.tagName;
};
exports.isElement = isElement;
exports.isServer = typeof window === 'undefined';
// 是否为图片节点
function isImageDom(o) {
    return o && ['IMAGE', 'IMG'].includes(o.tagName);
}
exports.isImageDom = isImageDom;
function isNull(val) {
    return val === null;
}
exports.isNull = isNull;
function isNullAndUnDef(val) {
    return (0, exports.isUnDef)(val) && isNull(val);
}
exports.isNullAndUnDef = isNullAndUnDef;
function isNullOrUnDef(val) {
    return (0, exports.isUnDef)(val) || isNull(val);
}
exports.isNullOrUnDef = isNullOrUnDef;

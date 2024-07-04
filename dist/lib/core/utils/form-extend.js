"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollToField = exports.clearValidate = exports.resetFields = exports.validateField = exports.validate = void 0;
/**
 * validate表单校验
 * @param ref 节点
 * @param isGetError 是否获取错误项
 */
function validate(ref, isGetError = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateFn = ref.validate;
        return new Promise(resolve => validateFn((valid, invalidFields) => isGetError ? resolve({ valid, invalidFields }) : resolve(valid)));
    });
}
exports.validate = validate;
/**
 * validateField对部分表单字段进行校验的方法
 * @param ref 节点
 * @param props 字段属性
 */
function validateField(ref, props) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateFieldFn = ref.validateField;
        return new Promise(resolve => validateFieldFn(props, errorMessage => resolve(errorMessage)));
    });
}
exports.validateField = validateField;
/**
 * resetFields重置表单
 * @param ref 节点
 */
function resetFields(ref) {
    const resetFieldsFn = ref.resetFields;
    resetFieldsFn();
}
exports.resetFields = resetFields;
/**
 * 移除表单项的校验结果
 * @param ref 节点
 * @param props 字段属性
 */
function clearValidate(ref, props) {
    const clearValidateFn = ref.clearValidate;
    props ? clearValidateFn(props) : clearValidateFn();
}
exports.clearValidate = clearValidate;
/**
 * 滚动到指定的字段
 * @param ref 节点
 * @param prop 字段属性
 */
function scrollToField(ref, prop) {
    const scrollToFieldFn = ref.scrollToField;
    scrollToFieldFn(prop);
}
exports.scrollToField = scrollToField;

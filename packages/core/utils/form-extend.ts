/**
 * validate表单校验
 * @param ref 节点
 * @param isGetError 是否获取错误项
 */
export async function validate(ref, isGetError = false): Promise<any> {
    const validateFn = ref.validate
    return new Promise(resolve =>
        validateFn((valid: boolean, invalidFields) =>
            isGetError ? resolve({ valid, invalidFields }) : resolve(valid),
        ),
    )
}

/**
 * validateField对部分表单字段进行校验的方法
 * @param ref 节点
 * @param props 字段属性
 */
export async function validateField(ref, props) {
    const validateFieldFn = ref.validateField
    return new Promise(resolve => validateFieldFn(props, errorMessage => resolve(errorMessage)))
}

/**
 * resetFields重置表单
 * @param ref 节点
 */
export function resetFields(ref) {
    const resetFieldsFn = ref.resetFields
    resetFieldsFn()
}

/**
 * 移除表单项的校验结果
 * @param ref 节点
 * @param props 字段属性
 */
export function clearValidate(ref, props) {
    const clearValidateFn = ref.clearValidate
    props ? clearValidateFn(props) : clearValidateFn()
}

/**
 * 滚动到指定的字段
 * @param ref 节点
 * @param prop 字段属性
 */
export function scrollToField(ref, prop) {
    const scrollToFieldFn = ref.scrollToField
    scrollToFieldFn(prop)
}

/**
 * validate表单校验
 * @param ref 节点
 * @param isGetError 是否获取错误项
 */
export declare function validate(ref: any, isGetError?: boolean): Promise<any>;
/**
 * validateField对部分表单字段进行校验的方法
 * @param ref 节点
 * @param props 字段属性
 */
export declare function validateField(ref: any, props: any): Promise<unknown>;
/**
 * resetFields重置表单
 * @param ref 节点
 */
export declare function resetFields(ref: any): void;
/**
 * 移除表单项的校验结果
 * @param ref 节点
 * @param props 字段属性
 */
export declare function clearValidate(ref: any, props: any): void;
/**
 * 滚动到指定的字段
 * @param ref 节点
 * @param prop 字段属性
 */
export declare function scrollToField(ref: any, prop: any): void;

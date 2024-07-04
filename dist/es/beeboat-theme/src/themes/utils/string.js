// 字符串下划线转驼峰
// export const formatToHump = (value: string, str: string) => {
//     return value.replace(/\_(\w)/g, (_, letter) => letter.toUpperCase())
// }
// 字符串驼峰转 连字符
export const formatToLine = (value, str) => {
    return value.replace(/([A-Z])/g, `${str}$1`).toLowerCase();
};

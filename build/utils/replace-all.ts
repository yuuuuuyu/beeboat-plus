export const definedReplaceAll = function (str, find, replace) {
    const backReg = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    return str.replace(new RegExp(backReg, 'g'), replace)
}

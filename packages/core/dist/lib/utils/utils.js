"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArrEqual = exports.treeFindPath = exports.treeToList = exports.listToTree = void 0;
/**
 * 数组列表转树形结构
 */
const listToTree = (list, childName = 'children') => {
    const res = [];
    const map = list.reduce((res, v) => ((res[v.id] = v), res), {});
    for (const item of list) {
        if (item.parentId === null || item.parentId === '') {
            res.push(item);
            continue;
        }
        if (item.parentId in map) {
            const parent = map[item.parentId];
            parent[childName] = parent[childName] || [];
            parent[childName].push(item);
        }
    }
    return res;
};
exports.listToTree = listToTree;
/**
 * 树形结构转扁平数组
 */
const treeToList = (data, childName = 'children') => {
    // if (!Array.isArray(data)) {
    //     return []
    // }
    return data.reduce((prev, cur) => prev.concat([cur], treeToList(cur[childName] || [])), []);
};
exports.treeToList = treeToList;
// let re = treeFindPath(tree, node => node.id === '2-1')
/** *查找节点路径 */
const treeFindPath = (tree, func, path = []) => {
    if (!tree)
        return [];
    for (const data of tree) {
        path.push(data);
        if (func(data))
            return path;
        if (data.children) {
            const findChildren = treeFindPath(data.children, func, path);
            if (findChildren.length)
                return findChildren;
        }
        path.pop();
    }
    return [];
};
exports.treeFindPath = treeFindPath;
/** *根据相同值生成新数组 */
const getArrEqual = (arr1, arr2) => {
    const newArr = arr1.filter(t => arr2.includes(t));
    return newArr;
};
exports.getArrEqual = getArrEqual;

/**
 * 数组列表转树形结构
 */
declare const listToTree: (list: any, childName?: string) => any;
/**
 * 树形结构转扁平数组
 */
declare const treeToList: (data: any, childName?: string) => any;
/** *查找节点路径 */
declare const treeFindPath: (tree: any, func: any, path?: any) => any;
/** *根据相同值生成新数组 */
declare const getArrEqual: (arr1: any, arr2: any) => any;
export { listToTree, treeToList, treeFindPath, getArrEqual };

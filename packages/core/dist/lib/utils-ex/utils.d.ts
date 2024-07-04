/**
 * 工具类
 */
export default class Utils {
    /**
     * @description 将普通列表转换成树列表数据
     * @param list 列表
     * @param childName 子节点名称
     * @returns 树列表数据
     */
    static listToTree(list: any, childName?: string): any;
    /**
     * @description 将树列表数据转换成普通列表
     * @param list 树列表数据
     * @param childName 子节点名称
     * @returns 普通列表
     */
    static treeToList(dataTreeList: any, childName?: string): any;
    /**
     * 转字符串为驼峰字符串
     * @param str 字符串
     * @returns 驼峰字符串
     */
    static varName(str: any): string;
}

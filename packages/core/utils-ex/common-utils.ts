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
    static listToTree(list: any, childName = 'children'): any {
        const res = [] as any
        const map = list.reduce((res, v) => ((res[v.id] = v), res), {})
        for (const item of list) {
            if (item.parentId === null || item.parentId === '') {
                res.push(item)
                continue
            }
            if (item.parentId in map) {
                const parent = map[item.parentId]
                parent[childName] = parent[childName] || []
                parent[childName].push(item)
            }
        }
        return res
    }

    /**
     * @description 将树列表数据转换成普通列表
     * @param list 树列表数据
     * @param childName 子节点名称
     * @returns 普通列表
     */
    static treeToList(dataTreeList, childName = 'children') {
        if (!Array.isArray(dataTreeList)) {
            return []
        }
        return dataTreeList.reduce(
            (prev, cur) => prev.concat([cur], this.treeToList(cur[childName] || [])),
            [],
        )
    }

    /**
     * 转字符串为驼峰字符串
     * @param str 字符串
     * @returns 驼峰字符串
     */
    static varName(str: any): string {
        if (str && str.length > 0) {  
            return str[0].toLowerCase() + str.slice(1);  
        }  
        return str;
    }
}

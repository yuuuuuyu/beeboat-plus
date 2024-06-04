import { reactive } from 'vue'
import { treeToList } from '../../../core/utils'

export const useInitFileMirror = (btTreeTarget, btTreeOrigin, originData, targetData) => {
    const state = reactive({
        dialogvisible: false,
    } as any)
    // sort
    const loadData = () => {
        const o = treeToList(originData)
        o.map(node => {
            node.children && node.children.sort((a, b) => a.code.localeCompare(b.code))
        })
        const t = treeToList(targetData)
        t.map(node => {
            node.children && node.children.sort((a, b) => a.code.localeCompare(b.code))
        })
    }
    // 同步展开节点
    const syncExpandTarget = expandedNode => {
        btTreeOrigin.value.setSyncExpanded(expandedNode)
    }
    const syncExpandOrigin = expandedNode => {
        btTreeTarget.value.setSyncExpanded(expandedNode)
    }
    const toJson = object => {
        return JSON.stringify(object, null, '\n').replace(/\n{2,}/g, '\n')
    }
    // 获取要对比的数据
    const getDiffData = (data, type) => {
        if (type === 'source') {
            const a = treeToList(targetData).filter(d => d.id == data.id)
            return {
                source: toJson(data),
                target: (a.length && toJson(a[0])) || null,
            }
        } else {
            const a = treeToList(originData).filter(d => d.id == data.id)
            return {
                source: (a.length && toJson(a[0])) || null,
                target: toJson(data),
            }
        }
    }
    const getDiffObject = (targetObj, sourceObject) => {
        // 获取两个对象的所有键
        const targetKeys = Object.keys(targetObj)
        const sourceKeys = Object.keys(sourceObject)
        // 不需要对比的属性
        const excludedKeys = [
            'id',
            'uid',
            'branchId',
            'children',
            'creatorId',
            'gmtCreate',
            'gmtModified',
            'modifiedId',
        ]
        for (const key of sourceKeys) {
            // 检查是否需要排除该属性
            if (!excludedKeys.includes(key)) {
                // 检查第二个对象中是否存在相同的键
                if (targetKeys.includes(key)) {
                    // 比较两个对象中相同键的值
                    if (targetObj[key] !== sourceObject[key]) {
                        targetObj.__isDiff__ = true
                        sourceObject.__isDiff__ = true
                    }
                } else {
                    // 对比出目标对象中不存在源对象中的属性，进行添加操作
                    targetObj.__isDiff__ = true
                    sourceObject.__isDiff__ = true
                    targetObj[key] = sourceObject[key]
                }
            }
        }
    }

    const compareData = () => {
        const _t = treeToList(targetData),
            _s = treeToList(originData)
        // 遍历源分支数据，对比与目标分支差异
        _s.map(item => {
            // 去目标分支中寻找
            const _get = _t.find(titem => titem.id === item.id)
            // 在目标分支内找到，进行对象的差异对比
            _get && getDiffObject(_get, item)
            // 在目标分支内没匹配到，但是确定不是一级节点，可以进行遍历合并
            !_get &&
                item.treeParentId &&
                mergeToTarget(targetData, {
                    id: item.id,
                    name: item.name,
                    code: item.code,
                    treeParentId: item.treeParentId,
                    __isAdd__: true,
                })
            // 在目标分支内没匹配到，且没有parentId，说明是一级
            !_get &&
                !item.treeParentId &&
                targetData.push({
                    id: item.id,
                    name: item.name,
                    code: item.code,
                    treeParentId: item.treeParentId,
                    __isAdd__: true,
                })
        })
    }
    const mergeToTarget = (arr, obj) => {
        arr.find(node => {
            if (node.id == obj.treeParentId) {
                node?.children.push(obj)
                node?.children.sort((a, b) => a.code.localeCompare(b.code))
            } else if (node.id != obj.treeParentId && obj.treeParentId) {
                mergeToTarget(node.children || [], obj)
            }
        })
    }
    return {
        state,
        loadData,
        syncExpandTarget,
        syncExpandOrigin,
        getDiffData,
        compareData,
    }
}

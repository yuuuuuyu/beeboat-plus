import { getCurrentInstance } from 'vue'
import cloneDeep from 'lodash-es/cloneDeep'

export const useAdvSearchbar = (props, emits, state) => {
    const getSence = async (senceId: string) => {
        const app = getCurrentInstance()?.appContext.config.globalProperties.$btApplication

        return (await app?.getHandler('BtSenceHandler')?.getSence(senceId)) || []
    }

    //获取外露条件的值
    const getAdvQueryParam = searchList => {
        const advQueryParam: any = []
        if (searchList.length > 0) {
            searchList.forEach((item: any) => {
                if (item.searchCondition == 'isNull' || item.searchCondition == 'isNotNull') {
                    advQueryParam.push({
                        value: item.searchValue,
                        express: item.searchCondition,
                        field:
                            item.columnConfig.searchProps.searchPropKey || item.columnConfig.prop,
                    })
                } else {
                    if (
                        item.searchValue &&
                        Array.isArray(item.searchValue) &&
                        item.searchValue.length > 0
                    ) {
                        advQueryParam.push({
                            value: item.searchValue,
                            express: item.searchCondition,
                            field:
                                item.columnConfig.searchProps.searchPropKey ||
                                item.columnConfig.prop,
                        })
                    }
                }
            })
        }
        return advQueryParam
    }

    //抛出事件
    const emitSearchEvent = searchList => {
        emits('search', getAdvQueryParam(searchList))
    }

    // 动态获取方案
    const loadSenceData = async () => {
        //请求缓存的场景数据
        const cachedSenceData = (await getSence(props.senceId)) as any
        const staticSenceData = props.senceInfo || cachedSenceData
        const localSenceData = {
            defaultSenceId: '',
            senceList: [],
        } as any

        if (staticSenceData && staticSenceData.senceList) {
            //解析缓存的场景数据封装到一个完整的数据对象中
            if (cachedSenceData?.senceList?.length > 0) {
                localSenceData.defaultSenceId =
                    cachedSenceData.defaultSenceId || cachedSenceData.defaultSence
                cachedSenceData.senceList.forEach(cachedSence => {
                    //获取静态方案
                    const staticSence = staticSenceData.senceList.find(item => {
                        return item.id == cachedSence.id
                    })
                    //版本不同则用静态代码中的方案代替,否则用缓存的方案
                    if (staticSence && staticSence.version != cachedSence.version) {
                        localSenceData.senceList.push(staticSence)
                    } else {
                        localSenceData.senceList.push(cachedSence)
                    }
                })
            } else {
                localSenceData.defaultSenceId =
                    staticSenceData.defaultSenceId || staticSenceData.defaultSence
                localSenceData.senceList = staticSenceData.senceList
            }
        } else {
            localSenceData.defaultSenceId =
                cachedSenceData.defaultSenceId || cachedSenceData.defaultSence
            localSenceData.senceList = cachedSenceData.senceList
        }
        //处理各个方案下的无效列
        if (localSenceData?.senceList?.length > 0) {
            localSenceData.senceList.forEach(sence => {
                if (sence.searchList) {
                    sence.searchList.forEach((item, _index) => {
                        const column = props.columnList.find(column => {
                            return column.id == item.id
                        })
                        if (column) {
                            item.columnConfig = column
                        } else {
                            sence.searchList.splice(item, 1)
                        }
                    })
                }
            })
        }
        //处理完场景数据后加载新的
        state.senceData = cloneDeep(localSenceData) as any
        state.senceData.senceList?.forEach(item => {
            if (item.id == state.senceData.defaultSenceId) {
                item.setDefaultSence = true
                item.searchList.forEach(el => {
                    state.exposeSearchList.push(el)
                })
            }
        })
        state.defaultSenceId = state.senceData.defaultSenceId
        state.originSenceData = cloneDeep(localSenceData) as any

        // 当禁止默认加载数据开启后，在动态获取方案后需要控制抛出事件
        Boolean(props.initLoading) && emitSearchEvent(state.exposeSearchList)
    }
    return { getAdvQueryParam, loadSenceData, emitSearchEvent }
}

export const expressConfig = {
    in: {
        name: '包含',
        value: '⊃',
    },
    notIn: {
        name: '不包含',
        value: '⊅',
    },
    eq: {
        name: '等于',
        value: '=',
    },
    ne: {
        name: '不等于',
        value: '≠',
    },
    like: {
        name: '包含',
        value: '⊃',
    },
    notlike: {
        name: '不包含',
        value: '⊅',
    },
    isNull: {
        name: '为空',
        value: '∅',
    },
    isNotNull: {
        name: '不为空',
        value: 'N∅',
    },
    gt: {
        name: '大于',
        value: '>',
    },
    lt: {
        name: '小于',
        value: '<',
    },
    ge: {
        name: '大于等于',
        value: '≥',
    },
    le: {
        name: '小于等于',
        value: '≤',
    },
    gele: {
        name: '等于(范围)',
        value: '~',
    },
}
/**
 * 字段默认搜索条件
 * @param currentComponentType 字段类型
 * @returns 字段默认搜索条件
 */
export const getDefaultSearchCondition = currentComponentType => {
    if (currentComponentType) {
        switch (currentComponentType) {
            case 'text':
                return 'like'
            case 'number':
                return 'eq'
            case 'date':
                return 'gele'
            case 'month':
                return 'gele'
            case 'datetime':
                return 'gele'
            case 'time':
                return 'gele'
            case 'select':
                return 'in'
            case 'tree':
                return 'in'
            default:
                return ''
        }
    }
}

/**
 * 判断是否需要显示值输入框
 * @param searchCondition 表达式
 * @returns 是否支持输入
 */
export const supportInput = (searchCondition: string) => {
    return searchCondition == 'isNull' || searchCondition == 'isNotNull'
}

/**
 * 判断列是否支持表达式
 * @param id 列
 * @param key
 * @returns
 */
export const supportCondition = (column, key: string) => {
    if (column && column.searchProps && column.searchProps.supportConditionList) {
        return column.searchProps.supportConditionList.indexOf(key) != -1
    }
    return false
}

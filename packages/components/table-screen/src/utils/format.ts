import { TableScreen } from '../../types/table-screen'
import screenConfig from '../config'
import { BtUseAppStore } from '@beeboat/core/store'

/**
 * 根据类型获取 操作符
 * @param type
 * @returns
 */
function getCondition(type) {
    // 日期时间与日期的condition相同
    (type == 'date' || type == 'datetime') ? (type = 'datetime') : null
    const fields = screenConfig.term.field[type] || []
    const condition = fields.map(v => {
        return {
            label: screenConfig.term.config[v],
            value: v,
        }
    })
    return condition
}

/**
 * 处理 config
 * @param config
 * @returns
 */
function formatConfig(
    configData: TableScreen.Config[],
    typeItem: 'exposure' | 'all',
): TableScreen.Term[] {
    // const typeObj = screenConfig.typeObj
    // const types = screenConfig.typeArr
    const appStore = BtUseAppStore()
    const termList: TableScreen.Term[] = []

    configData.forEach(v => {
        // 1. 是否高级筛选
        if (v.enableAdvSearch && v.enableAdvSearch == 0) {
            return
        }
        // 2. 外露
        if (v.defaultSearchItem && typeItem == 'exposure' && v.defaultSearchItem == 0) {
            return
        }
        let type = v.searchPropType
        let enumData: any = v.selectData
        if (v.dictId != undefined) {
            type = 'select'
            enumData = appStore.getDictById(v.dictId) || []
        }
        // else {
        //     if (typeof v.propType == 'number') {
        //         type = typeObj[v.propType] || 'text'
        //     } else {
        //         type = (types.indexOf(v.propType) == -1 ? 'text' : v.propType) ?? 'text'
        //     }
        // }
        const condition = getCondition(type)
        // 将string转为对象
        let newSearchKeyProp: any = undefined

        if (typeof v.searchKeyProp == 'string') {
            newSearchKeyProp = v.searchKeyProp.trim()
            try {
                newSearchKeyProp = JSON.parse(newSearchKeyProp)
            } catch (e) {
                newSearchKeyProp = undefined
            }
        } else {
            newSearchKeyProp = undefined
        }
        termList.push({
            id: v.id,
            prop: v.prop,
            label: v.label,
            defaultSearchItem: v.defaultSearchItem,
            propType: v.propType as TableScreen.ConfigType,
            selectData: enumData,
            searchDefaultValue: v.searchDefaultValue || '', // 筛选默认值
            condition,
            conditionValue: condition?.[0]?.value,
            searchPropType: v.searchPropType, // 组件标签名称
            searchProp: v.searchProp, // 筛选属性
            searchDisabled: v.searchDisabled || false, // 筛选是否失效
            searchKeyProp: newSearchKeyProp, // select option 赋值对象 { label: 'name', value: 'id' }
            searchDynamicApi: v?.searchDynamicApi,
        })
    })
    return termList
}

/**
 * 处理返回参数
 * @param data
 * @returns
 */
function processingResults(data: TableScreen.Term[] = []): TableScreen.Term[] {
    const parameter: TableScreen.Term[] = []
    data.forEach(v => {
        const val = v.value?.replace(';', ',').replace('；', ',').split(',')
        parameter.push({
            ...v,
            ...{
                value: val,
            },
        })
    })

    return parameter
}

export { getCondition, formatConfig, processingResults }

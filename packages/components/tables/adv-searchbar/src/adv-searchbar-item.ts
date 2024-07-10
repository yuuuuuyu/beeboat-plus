import BTPUtils from '@beeboat/core/utils/btp-utils'
import { expressConfigList } from './adv-searchbar-common'

const toJSON = value => {
    return typeof value == 'string' ? JSON.parse(value) : value
}

export const useAdvSearchbarItem = (props, emits, state) => {
    //初始化
    const initAdvSearchItem = () => {
        if (props.props.columnConfig?.searchProps?.dataSourceProps) {
            state.dsProp = toJSON(props.props.columnConfig.searchProps.dataSourceProps)
        }
        state.options = []
        if (props.props.columnConfig?.dictId) {
            const itemList = BTPUtils.getCacheManager().getDictItemList(
                props.props.columnConfig.dictId,
            )
            if (itemList) {
                itemList.forEach(item => {
                    state.options.push({
                        id: item.value,
                        value: item.value,
                        name: item.name,
                        label: item.name,
                    })
                })
            }
        }
        if (props.props.columnConfig?.searchProps?.dataSource) {
            props.props.columnConfig.searchProps.dataSource().then(res => {
                state.options = res.data || []
                state.options.forEach(item => {
                    item.label = item[state.dsProp.label]
                    item.value = item[state.dsProp.value]
                })
                if (props.props.columnConfig?.searchProps?.treeProps?.disabledRoot) {
                    if (state.options.length == 1) {
                        state.options[0].disabled = true
                    }
                }
            })
        }
    }

    const getColumnRenderType = () => {
        return props.props.columnConfig?.searchProps?.componentType || ''
    }

    const shouldShowItem = () => {
        return props.props.searchCondition == 'isNull' || props.props.searchCondition == 'isNotNull'
    }

    /**
     * 不是时间、日期、时间日期 段的形式
     */
    const isNotRangeModel = () => {
        return !(
            props.props.searchCondition == 'eq' ||
            props.props.searchCondition == 'ne' ||
            props.props.searchCondition == 'gt' ||
            props.props.searchCondition == 'lt' ||
            props.props.searchCondition == 'ge' ||
            props.props.searchCondition == 'le'
        )
    }

    const getExpressText = condition => {
        if (!condition || condition == '') {
            return '-'
        }
        return expressConfigList[condition].name
    }

    const getExpressValue = condition => {
        if (!condition || condition == '') {
            return '-'
        }
        return expressConfigList[condition].value
    }

    const isColumnSupportCondition = condition => {
        return props.props.columnConfig.searchProps.supportConditionList.indexOf(condition) != -1
    }

    const onValueChange = value => {
        if (!value || value == '') {
            emits('update:modelValue', [])
        } else {
            emits('update:modelValue', Array.isArray(value) ? value : [value])
        }
    }

    // 数字值变化
    const onNumberValueChange = () => {
        emits('update:modelValue', [state.leftNumberValue, state.rightNumberValue])
    }

    //树型选择变化
    const onTreeSelectValueChange = () => {
        emits('update:modelValue', state.treeSelectValue)
    }

    const onConditionChange = (key: any) => {
        props.props.searchCondition = key
        state.dataValue = null
        state.leftNumberValue = null
        state.rightNumberValue = null
        state.treeSelectValue = []
    }

    const onEnterClick = () => {
        emits('search')
    }

    return {
        onEnterClick,
        onValueChange,
        onNumberValueChange,
        onTreeSelectValueChange,
        onConditionChange,
        shouldShowItem,
        getColumnRenderType,
        isNotRangeModel,
        initAdvSearchItem,
        isColumnSupportCondition,
        getExpressText,
        getExpressValue,
    }
}

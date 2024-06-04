import { PropType } from 'vue'
import { TableScreen } from '../types/table-screen'
import { formatConfig } from './utils'

export const tableScreenProps = {
    /** 是否开启+工具列 */
    isToolColumn: {
        type: [Boolean, Number],
        default: false,
    },
    /** 是否保存数据 */
    isSaveData: {
        type: [Boolean, Number],
        default: true,
    },
    /** 是否显示高级筛选 */
    isSenior: {
        type: [Boolean, Number],
        default: false,
    },
    /** 是否显示 查询、重置、高级筛选按钮 */
    isBtnShow: {
        type: [Boolean, Number],
        default: true,
    },
    /** 固定条件 数据 */
    itemData: {
        type: Object as PropType<TableScreen.currencyObject>,
        default: function () {
            return {}
        },
    },
    /** 配置 */
    config: {
        type: Array as PropType<TableScreen.Config[]>,
        default: function () {
            return []
        },
    },
}

export const tableScreenEmits = {
    click: (data: any) => data,
}

/**
 * 获取 获取外露的筛选项
 * @param configData
 * @returns
 */
export function getConfigExposure(configData: TableScreen.Config[]): TableScreen.Term[] {
    return formatConfig(configData, 'exposure')
}

/**
 * 获取 所有高级筛选项
 * @param configData
 * @returns
 */
export function getConfigAll(configData: TableScreen.Config[]): TableScreen.Term[] {
    return formatConfig(configData, 'all')
}

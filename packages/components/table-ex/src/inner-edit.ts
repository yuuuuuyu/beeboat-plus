import { computed, watch } from 'vue'
import { BtUseAppStore } from '@beeboat/core/store'

export const useInnerEdit = (state, props) => {
    const showInput = computed(() => {
        return (
            props.column?.editProps?.componentType == 'text' ||
            props.column?.editProps?.componentType == 'number'
        )
    })
    const showSelect = computed(() => {
        return props.column?.editProps?.componentType == 'select'
    })
    const showDate = computed(() => {
        return (
            props.column?.editProps?.componentType == 'date' ||
            props.column?.editProps?.componentType == 'daterange'
        )
    })
    const showDateTime = computed(() => {
        return (
            props.column?.editProps?.componentType == 'datetime' ||
            props.column?.editProps?.componentType == 'datetimerange'
        )
    })
    const showTime = computed(() => {
        return (
            props.column?.editProps?.componentType == 'time' ||
            props.column?.editProps?.componentType == 'timerange'
        )
    })
    const showTree = computed(() => {
        return props.column?.editProps?.componentType == 'tree'
    })

    const getDSLabelValue = (data: any) => {
        let searchProps = { value: 'id', label: 'name' }
        if (props.column?.editProps?.dataSourceProps) {
            //TODO 根据类型判断是否需要转换
            searchProps =
                typeof props.column?.editProps?.dataSourceProps == 'string'
                    ? JSON.parse(props.column?.editProps?.dataSourceProps)
                    : props.column?.editProps?.dataSourceProps
        }
        if (searchProps.label) {
            return data[searchProps.label]
        }
        return data.name
    }
    const getDSValueValue = (data: any) => {
        let searchProps = { value: 'id', label: 'name' }
        if (props.column?.editProps?.dataSourceProps) {
            //TODO 根据类型判断是否需要转换
            searchProps =
                typeof props.column?.editProps?.dataSourceProps == 'string'
                    ? JSON.parse(props.column?.editProps?.dataSourceProps)
                    : props.column?.editProps?.dataSourceProps
        }
        if (searchProps.value) {
            return data[searchProps.value]
        }
        return data.value
    }
    const initEditItem = () => {
        //数据源
        state.datasourceList = []

        if (props.column?.dictId) {
            const appStore = BtUseAppStore()
            const itemList = appStore.getDictById(props.column?.dictId)
            if (itemList) {
                itemList.forEach(item => {
                    state.datasourceList.push({
                        id: item.value,
                        value: item.value,
                        name: item.name,
                    })

                    state.options.push({
                        id: item.value,
                        value: item.value,
                        name: item.name,
                        label: item.name,
                    })
                })
            }
        }
        if (props.column?.editProps?.dataSource) {
            props.column.editProps.dataSource().then(res => {
                state.datasourceList = res.data || []
                state.options = res.data || []
                if (state.options.length > 0) {
                    state.options.forEach(item => {
                        item.label = getDSLabelValue(item)
                        item.value = getDSValueValue(item)
                    })
                }
            })
        }
    }

    const getTreeProps = { label: 'name', children: 'children', value: 'id' }
    watch(
        () => props.column?.editProps,
        value => {
            // 仅对下拉生效
            if (value?.dataSourceProps) {
                getTreeProps.value = value?.dataSourceProps.value
                getTreeProps.label = value?.dataSourceProps.label
            }
            if (value?.dataSource) {
                initEditItem()
            }
        },
        {
            immediate: true,
            deep: true,
        },
    )

    return {
        showInput,
        showSelect,
        showTree,
        showDate,
        showDateTime,
        showTime,
        initEditItem,
        getTreeProps,
    }
}

import { ref, computed } from 'vue'

/**
 * 表格多选数据操作
 * */
export const useSelection = () => {
    const hasSelection = ref<boolean>(false) // 是否显示勾选的数据
    // 是否选中数据
    const isSelected = ref<boolean>(false)
    // 选中的数据列表
    const selectedList = ref([] as any[])

    // 当前选中的所有ids(数组)
    const selectedListIds = computed((): string[] => {
        const ids: string[] = []
        selectedList.value.forEach(item => {
            ids.push(item['id'])
        })
        return ids
    })

    // 获取行数据的 Key,用来优化 Table 的渲染;在使用跨页多选时,该属性是必填的
    const getRowKeys = (row: { id: string }) => {
        return row.id
    }

    /**
     * 多选操作
     * @param {Array} rowArr 当前选择的所有数据
     * @return {selectedList:Array}
     */
    const selectionChange = (rowArr: any) => {
        rowArr.length === 0 ? (isSelected.value = false) : (isSelected.value = true)
        selectedList.value = rowArr
        return selectedList.value
    }

    const headerDragend = (newWidth, oldWidth, column, event) => {
        console.log(newWidth, oldWidth, column, event)
    }

    return {
        hasSelection,
        isSelected,
        selectedList,
        selectedListIds,
        selectionChange,
        getRowKeys,
        headerDragend,
    }
}

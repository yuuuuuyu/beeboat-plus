export const useTableEvents = (props, state, status, tableRef, emits, editor) => {
    /**
     * 拖动列头
     * @param newVal 新值
     * @param _oldVal 旧值
     * @param column 列
     * @param _events 事件
     */
    const onColumnHeaderDraged = (newVal, _oldVal, $column, _events) => {
        const column = props.columns.find(item => item.prop == $column.property)
        if (column) {
            column.width = `${newVal}px`
        }
    }

    const emitEvents = {
        select: (v1, v2) => {
            console.log('-----select-------')
            emits('select', v1, v2)
        },
        'select-all': v1 => {
            emits('select-all', v1)
        },
        'cell-mouse-enter': (v1, v2, v3, v4) => {
            emits('cell-mouse-enter', v1, v2, v3, v4)
        },
        'cell-mouse-leave': (v1, v2, v3, v4) => {
            emits('cell-mouse-leave', v1, v2, v3, v4)
        },
        'cell-click': (v1, v2, v3, v4) => {
            editor.edit(v1)
            emits('cell-click', v1, v2, v3, v4)
        },
        'cell-dblclick': (v1, v2, v3, v4) => {
            emits('cell-dblclick', v1, v2, v3, v4)
        },
        'cell-contextmenu': (v1, v2, v3, v4) => {
            emits('cell-contextmenu', v1, v2, v3, v4)
        },
        'row-click': (v1, v2, v3) => {
            emits('row-click', v1, v2, v3)
        },
        'row-contextmenu': (v1, v2, v3) => {
            emits('row-contextmenu', v1, v2, v3)
        },
        'row-dblclick': (v1, v2, v3) => {
            emits('row-dblclick', v1, v2, v3)
        },
        'header-click': (v1, v2) => {
            emits('header-click', v1, v2)
        },
        'header-contextmenu': (v1, v2) => {
            emits('header-contextmenu', v1, v2)
        },
        'sort-change': sort => {
            emits('sort-change', sort)
        },
        'filter-change': v1 => {
            emits('filter-change', v1)
        },
        'selection-change': rows => {
            console.log('-----selection-change-------')
            state.selection = rows
            emits('selection-change', rows)
        },
        'current-change': (v1, v2) => {
            emits('current-change', v1, v2)
        },
        'header-dragend': (v1, v2, v3, v4) => {
            onColumnHeaderDraged(v1, v2, v3, v4)
            emits('header-dragend', v1, v2, v3, v4)
        },
        'expand-change': (v1, v2) => {
            emits('expand-change', v1, v2)
        },
        'edit-change': (v1, v2) => {
            emits('edit-change', v1, v2)
        },
    }
    return { emitEvents }
}

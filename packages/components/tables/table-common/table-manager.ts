import BTPBaseTableManager from './base-table-manager'

export default class BTPTableManager extends BTPBaseTableManager {
    constructor(tableRef, props, state, emits) {
        super(tableRef, props, state, emits)
    }

    getEmitsEvent() {
        return {
            select: (v1, v2) => {
                this.emits('select', v1, v2)
            },
            'select-all': v1 => {
                this.emits('select-all', v1)
            },
            'cell-mouse-enter': (v1, v2, v3, v4) => {
                this.emits('cell-mouse-enter', v1, v2, v3, v4)
            },
            'cell-mouse-leave': (v1, v2, v3, v4) => {
                this.emits('cell-mouse-leave', v1, v2, v3, v4)
            },
            'cell-click': (v1, v2, v3, v4) => {
                this.editor.edit(v1)
                this.emits('cell-click', v1, v2, v3, v4)
            },
            'cell-dblclick': (v1, v2, v3, v4) => {
                this.emits('cell-dblclick', v1, v2, v3, v4)
            },
            'cell-contextmenu': (v1, v2, v3, v4) => {
                this.emits('cell-contextmenu', v1, v2, v3, v4)
            },
            'row-click': (v1, v2, v3) => {
                this.emits('row-click', v1, v2, v3)
            },
            'row-contextmenu': (v1, v2, v3) => {
                this.emits('row-contextmenu', v1, v2, v3)
            },
            'row-dblclick': (v1, v2, v3) => {
                this.emits('row-dblclick', v1, v2, v3)
            },
            'header-click': (v1, v2) => {
                this.emits('header-click', v1, v2)
            },
            'header-contextmenu': (v1, v2) => {
                this.emits('header-contextmenu', v1, v2)
            },
            'sort-change': sort => {
                this.emits('sort-change', sort)
            },
            'filter-change': v1 => {
                this.emits('filter-change', v1)
            },
            'selection-change': rows => {
                this.state.selection = rows
                this.emits('selection-change', rows)
            },
            'current-change': (v1, v2) => {
                this.emits('current-change', v1, v2)
            },
            'header-dragend': (v1, v2, v3, v4) => {
                this.emits('header-dragend', v1, v2, v3, v4)
            },
            'expand-change': (v1, v2) => {
                this.emits('expand-change', v1, v2)
            },
            'edit-change': (v1, v2) => {
                this.emits('edit-change', v1, v2)
            },
        }
    }
}

export declare const useTableEvents: (props: any, state: any, status: any, tableRef: any, emits: any, editor: any) => {
    emitEvents: {
        select: (v1: any, v2: any) => void;
        'select-all': (v1: any) => void;
        'cell-mouse-enter': (v1: any, v2: any, v3: any, v4: any) => void;
        'cell-mouse-leave': (v1: any, v2: any, v3: any, v4: any) => void;
        'cell-click': (v1: any, v2: any, v3: any, v4: any) => void;
        'cell-dblclick': (v1: any, v2: any, v3: any, v4: any) => void;
        'cell-contextmenu': (v1: any, v2: any, v3: any, v4: any) => void;
        'row-click': (v1: any, v2: any, v3: any) => void;
        'row-contextmenu': (v1: any, v2: any, v3: any) => void;
        'row-dblclick': (v1: any, v2: any, v3: any) => void;
        'header-click': (v1: any, v2: any) => void;
        'header-contextmenu': (v1: any, v2: any) => void;
        'sort-change': (sort: any) => void;
        'filter-change': (v1: any) => void;
        'selection-change': (rows: any) => void;
        'current-change': (v1: any, v2: any) => void;
        'header-dragend': (v1: any, v2: any, v3: any, v4: any) => void;
        'expand-change': (v1: any, v2: any) => void;
        'edit-change': (v1: any, v2: any) => void;
    };
};

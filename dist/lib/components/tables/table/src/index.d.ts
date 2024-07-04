export declare const useTable: (props: any, state: any, status: any, tableRef: any, emits: any) => {
    computeRowIndex: (rowIndex: any) => any;
    radioSelectionChange: (row: any) => void;
};
export declare const useTableLoader: (props: any, state: any, status: any, tableRef: any, emits: any) => {
    initTable: () => Promise<void>;
    loadData: () => void;
    getTableData: () => any;
    onPaginationClearSelection: () => void;
    onColumnSettingChange: (columns: any) => Promise<void>;
};

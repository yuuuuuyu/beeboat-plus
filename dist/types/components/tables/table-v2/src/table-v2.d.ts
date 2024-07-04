export declare const useInit: (elTableRef: any, props: any, emits: any) => {
    state: any;
    loadData: () => void;
    getTableData: () => any;
    getTableDataId: (id?: any) => String[];
    onTableSortChange: (sort: any) => void;
    onAdvSearchbarSearch: (advQueryParam: any) => void;
    onAdvSearchbarReset: () => void;
    onRadioSelectionChange: (row: any) => void;
    onCheckboxSelectionChange: (row: any, checked: any) => void;
    onCheckboxSelectionAllChange: (checked: any) => void;
};
/**
 * 分页相关逻辑代码
 * @param state 数据状态
 * @param props 属性
 * @param emits 事件
 */
export declare const usePagination: (elTableRef: any, paginationRef: any, state: any, props: any, emits: any, loadData: any) => {
    computeRowIndex: (rowIndex: any) => any;
    onPaginationCurrentChange: (newPage: any) => void;
    onPaginationSizeChange: (newPageSize: any) => void;
    onPaginationReserveChange: (value: any) => void;
    onPaginationClearSelection: () => void;
};

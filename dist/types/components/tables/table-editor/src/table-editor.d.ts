/**
 * 表格行内编辑处理对象
 */
export default class BTPTableEditor {
    props: any;
    emits: any;
    getTableData: any;
    /**
     * 行内编辑校验规则
     */
    rules: any;
    /**
     * 处于编辑中的行
     */
    editingRows: {};
    /**
     * 处于编辑中的数据
     */
    editDataList: any[];
    constructor(props: any, getTableData: any, emits: any);
    getRowKey(): any;
    getData(row: any): any;
    getRowData(uniqueId: any): any;
    createRow(): {};
    add(index: number): void;
    edit(row: any): void;
    delete(row: any): void;
    cancel(row: any): void;
    cancelAll(): void;
    saveAll(): void;
    /**
     * 判断行是否处于编辑中
     * @param row 行
     * @returns 是否处于编辑中
     */
    isEditing(row: any): boolean;
    getRowErrorMessage(row: any): any;
    hasError(row: any, column: any): boolean;
    getErrorMessage(row: any, column: any): string;
    validate(): Promise<boolean>;
    validateRow(row: any): Promise<boolean>;
}

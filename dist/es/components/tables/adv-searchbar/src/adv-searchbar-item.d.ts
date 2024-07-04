export declare const useAdvSearchbarItem: (props: any, emits: any, state: any) => {
    onEnterClick: () => void;
    onValueChange: (value: any) => void;
    onNumberValueChange: () => void;
    onTreeSelectValueChange: () => void;
    onConditionChange: (key: any) => void;
    shouldShowItem: () => boolean;
    getColumnRenderType: () => any;
    isNotRangeModel: () => boolean;
    initAdvSearchItem: () => void;
    isColumnSupportCondition: (condition: any) => boolean;
    getExpressText: (condition: any) => any;
    getExpressValue: (condition: any) => any;
};

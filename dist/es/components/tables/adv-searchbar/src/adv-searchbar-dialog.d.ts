export declare const useAdvSearchbarDailog: (props: any, emits: any, state: any, saveAsDialogRef: any) => {
    openDialog: (currentSceneId: any) => void;
    sceneInEditingMode: (scene: any) => boolean;
    onSceneEditClick: () => void;
    sceneShowShouldButton: (scene: any) => boolean;
    onSceneSaveNameClick: (scene: any) => void;
    onSceneDeleteClick: (scene: any, index: any) => void;
    shouldShowItem: (item: any) => boolean;
    shouldShowProp: (column: any) => boolean;
    isColumnSupportCondition: (seachItem: any, condition: any) => boolean;
    validate: (callback: any) => void;
    onSceneClick: (sceneId: any) => void;
    onSearchItemPropChange: (item: any) => void;
    onItemConditionChange: (item: any) => void;
    onExposeClick: () => void;
    onDeleteSearchItem: (_item: any, index: any) => void;
    onAddSearchItem: () => void;
    onSetDefaultSceneClick: () => void;
    onExposeAllClick: () => void;
    onSearchClick: () => void;
    onSaveSceneClick: () => void;
    onSaveAsSceneClick: () => void;
};
/**
 * 字段默认搜索条件
 * @param componentType 字段类型
 * @returns 字段默认搜索条件
 */
export declare const getDefaultSearchCondition: (componentType: any) => "" | "like" | "eq" | "gele" | "in";

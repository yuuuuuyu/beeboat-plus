export declare const useAdvSearchbar: (props: any, emits: any, state: any) => {
    initAdvSearchbar: () => Promise<void>;
    onSceneChange: () => void;
    sceneUpdateName: (scene: any) => void;
    sceneUpdateDefault: (defaultId: any) => void;
    sceneDelete: (scene: any) => void;
    sceneSearch: (scene: any) => void;
    sceneSave: (scene: any) => void;
    sceneUpdate: (scene: any) => void;
};

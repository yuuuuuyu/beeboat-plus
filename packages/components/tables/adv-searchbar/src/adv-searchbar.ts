import cloneDeep from 'lodash-es/cloneDeep'
import BTPUtils from '@beeboat/core/utils-ex/utils-ex'

export const useAdvSearchbar = (props, emits, state) => {
    const getColumn = columnId => {
        return props.columnList.find(item => item.id == columnId)
    }

    const getCacheManager = () => {
        return BTPUtils.getCacheManager()
    }

    const saveScene = () => {
        getCacheManager()
            .saveScene(props.scene.id, state.cachedSceneData)
            .then(res => {
                console.log('保存主题信息完成', res)
            })
    }

    const initAdvSearchbar = async () => {
        let sceneList = props.scene.sceneList
        state.currentSceneId = props.scene.defaultId
        //1.从服务器加载数据
        const scene = await getCacheManager().getScene(props.scene.id)
        if (scene) {
            state.currentSceneId = scene.defaultId
            sceneList = scene.sceneList
        }
        state.cachedSceneData = scene
        state.sceneList = cloneDeep(sceneList)

        state.sceneList.forEach(data => {
            data.searchList.forEach(item => {
                item.columnConfig = getColumn(item.id)
            })
        })
        onSceneChange()
    }

    const sceneUpdateName = scene => {
        state.cachedSceneData.sceneList.forEach(item => {
            if (item.id == scene.id) {
                item.name = scene.name
            }
        })
        state.sceneList.forEach(item => {
            if (item.id == scene.id) {
                item.name = scene.name
            }
        })
        saveScene()
    }

    const sceneUpdateDefault = defaultId => {
        state.cachedSceneData.defaultId = defaultId
        state.cachedSceneData.sceneList.forEach(item => {
            item.isDefault = item.id == defaultId
        })
        state.sceneList.forEach(item => {
            item.isDefault = item.id == defaultId
        })
        saveScene()
    }

    const sceneDelete = scene => {
        const index = state.cachedSceneData.sceneList.findIndex(item => {
            return item.id == scene.id
        })
        state.cachedSceneData.sceneList.splice(index, 1)
        const index2 = state.sceneList.findIndex(item => {
            return item.id == scene.id
        })
        state.sceneList.splice(index2, 1)
    }

    const sceneSearch = scene => {
        state.currentSceneId = scene.id
        const sceneData = state.sceneList.find(item => item.id == scene.id)
        sceneData.searchList = cloneDeep(scene.searchList)
        onSceneChange()
    }

    const onSceneChange = () => {
        state.exposeSearchList = []
        const scene = state.sceneList.find(item => {
            return item.id == state.currentSceneId
        })
        if (scene) {
            scene.searchList.forEach(item => {
                if (item.searchVisible) {
                    state.exposeSearchList.push(item)
                }
            })
        }
    }
    const sceneSave = scene => {
        state.sceneList.push(cloneDeep(scene))
        state.cachedSceneData.sceneList.push(cloneDeep(scene))
        saveScene()
    }
    const sceneUpdate = scene => {
        const sceneData = state.sceneList.find(item => item.id == scene.id)
        sceneData.searchList = cloneDeep(scene.searchList)

        const sceneData2 = state.cachedSceneData.sceneList.find(item => item.id == scene.id)
        sceneData2.searchList = cloneDeep(scene.searchList)
        saveScene()
    }

    return {
        initAdvSearchbar,
        onSceneChange,
        sceneUpdateName,
        sceneUpdateDefault,
        sceneDelete,
        sceneSearch,
        sceneSave,
        sceneUpdate,
    }
}

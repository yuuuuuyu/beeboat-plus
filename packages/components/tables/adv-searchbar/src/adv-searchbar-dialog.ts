import { ElMessage, ElMessageBox } from 'element-plus'
import cloneDeep from 'lodash-es/cloneDeep'

export const useAdvSearchbarDailog = (props, emits, state, saveAsDialogRef) => {
    const getColumn = columnId => {
        return props.columnList.find(item => item.id == columnId)
    }

    const getScene = sceneId => {
        return state.sceneList.find(item => item.id == sceneId)
    }

    const openDialog = currentSceneId => {
        state.dialogVisible = true
        state.currentSceneId = currentSceneId
        state.sceneList = cloneDeep(props.sceneList)
        onSceneClick(state.currentSceneId)
        updateDefaultSceneId()
        updateExposeAllState()
    }

    const updateDefaultSceneId = () => {
        state.defaultSceneValue = false
        state.sceneList.forEach(item => {
            if (item.isDefault && item.id == state.currentSceneId) {
                state.defaultSceneValue = true
            }
        })
    }

    const updateExposeAllState = () => {
        onExposeClick()
    }

    const sceneInEditingMode = scene => {
        return state.sceneEditing && scene.id == state.currentSceneId
    }

    const onSceneEditClick = () => {
        state.sceneEditing = true
    }

    const sceneShowShouldButton = scene => {
        return !state.sceneEditing && scene.id == state.currentSceneId
    }

    const onSceneSaveNameClick = scene => {
        state.sceneEditing = false
        emits('scene-update-name', scene)
    }

    /**
     * 删除方案
     */
    const onSceneDeleteClick = (scene, index) => {
        ElMessageBox.confirm('是否确认删除该方案?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            appendTo: '.bt-advsearchbar-ex-dialog',
        }).then(() => {
            onSceneClick(state.sceneList[0].id)
            state.sceneList.splice(index, 1)
            emits('scene-delete', scene)
        })
    }

    const shouldShowItem = item => {
        return (
            item.columnConfig &&
            (item.searchCondition == 'isNull' || item.searchCondition == 'isNotNull')
        )
    }

    /**
     * 判断字段是否已经选择。如果已选择，disabled= true
     */
    const shouldShowProp = column => {
        let searchVisible = false
        state.searchList.forEach(item => {
            if (item.id == column.id) {
                searchVisible = true
            }
        })
        return searchVisible
    }

    const isColumnSupportCondition = (seachItem, condition) => {
        return seachItem.columnConfig?.searchProps?.supportConditionList.indexOf(condition) != -1
    }

    /**
     * 校验方案是否可查询
     * @param callback 回调
     * @returns
     */
    const validate = callback => {
        const index = state.searchList.findIndex(item => {
            return !item.id
        })
        if (index != -1) {
            ElMessage({
                type: 'error',
                message: '筛选条件不能为空',
            })
            return
        }
        callback && callback()
    }

    /**
     * 点击方案
     */
    const onSceneClick = sceneId => {
        state.currentSceneId = sceneId
        const scene = getScene(state.currentSceneId)
        state.searchList = cloneDeep(scene.searchList)
        updateDefaultSceneId()
        updateExposeAllState()
    }

    /**
     * 选项变化
     * @param item 选项
     */
    const onSearchItemPropChange = item => {
        item.columnConfig = getColumn(item.id)
        item.searchValue = []
        item.searchCondition =
            item.columnConfig.searchProps.searchCondition ||
            getDefaultSearchCondition(item.columnConfig.searchProps.componentType)
    }

    /**
     * 选项条件变化
     * @param item 选项
     */
    const onItemConditionChange = item => {
        item.searchValue = []
    }

    /**
     * 外露点击，响应变化全部外露按钮
     */
    const onExposeClick = () => {
        const index = state.searchList.findIndex(item => {
            return !item.searchVisible
        })
        state.exposeAll = index == -1
    }

    /**
     * 删除选项
     */
    const onDeleteSearchItem = (_item, index) => {
        state.searchList.splice(index, 1)
    }
    /**
     * 添加选项
     */
    const onAddSearchItem = () => {
        state.searchList.push({ searchVisible: true })
    }

    /**
     * 设置默认方案点击变化
     */
    const onSetDefaultSceneClick = () => {
        state.defaultSceneValue = true
        state.sceneList.forEach(item => {
            item.isDefault = item.id == state.currentSceneId
        })
        updateDefaultSceneId()
        emits('scene-update-default', state.currentSceneId)
    }

    /**
     * 全部外露点击变化
     */
    const onExposeAllClick = () => {
        state.searchList.forEach(item => {
            item.searchVisible = state.exposeAll
        })
    }

    /**
     * 点击查询按钮
     */
    const onSearchClick = () => {
        validate(() => {
            state.dialogVisible = false
            const scene = getScene(state.currentSceneId)
            scene.searchList = cloneDeep(state.searchList)

            emits('scene-search', scene)
        })
    }

    const onSaveSceneClick = () => {
        validate(() => {
            const scene = getScene(state.currentSceneId)
            scene.searchList = cloneDeep(state.searchList)

            emits('scene-update', scene)
        })
    }

    const onSaveAsSceneClick = () => {
        saveAsDialogRef.value.openDialog(name => {
            const scene = cloneDeep(getScene(state.currentSceneId))
            scene.name = name
            scene.isDefault = false
            scene.id = `scene${Math.round(Math.random() * 100000000).toString()}`
            scene.searchList = cloneDeep(state.searchList)
            state.sceneList.push(scene)
            onSceneClick(scene.id)

            emits('scene-save', scene)
        })
    }

    return {
        openDialog,
        sceneInEditingMode,
        onSceneEditClick,
        sceneShowShouldButton,
        onSceneSaveNameClick,
        onSceneDeleteClick,
        shouldShowItem,
        shouldShowProp,
        isColumnSupportCondition,
        validate,
        onSceneClick,
        onSearchItemPropChange,
        onItemConditionChange,
        onExposeClick,
        onDeleteSearchItem,
        onAddSearchItem,
        onSetDefaultSceneClick,
        onExposeAllClick,
        onSearchClick,
        onSaveSceneClick,
        onSaveAsSceneClick,
    }
}

/**
 * 字段默认搜索条件
 * @param componentType 字段类型
 * @returns 字段默认搜索条件
 */
export const getDefaultSearchCondition = componentType => {
    if (componentType) {
        switch (componentType) {
            case 'text':
                return 'like'
            case 'number':
                return 'eq'
            case 'date':
                return 'gele'
            case 'month':
                return 'gele'
            case 'datetime':
                return 'gele'
            case 'time':
                return 'gele'
            case 'select':
                return 'in'
            case 'tree':
                return 'in'
            default:
                return ''
        }
    }
}

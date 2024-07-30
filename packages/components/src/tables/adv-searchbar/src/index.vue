<template>
    <div class="btp-adv-searchbar" :class="{ 'expand--all': state.isExposePanelExpanded }">
        <div>
            <el-scrollbar>
                <el-space class="btp-adv-searchbar-toolbar">
                    <el-button type="info" link @click="onExpandClick">
                        {{ state.isExposePanelExpanded ? '折叠' : '展开' }}
                        <el-icon class="el-icon--right">
                            <CaretTop v-if="state.isExposePanelExpanded"></CaretTop>
                            <CaretBottom v-else></CaretBottom>
                        </el-icon>
                    </el-button>
                    <el-button :size="size" type="primary" @click="onSearchClick()">
                        查 询
                    </el-button>
                    <el-button :size="size" plain @click="onReset">重 置</el-button>
                    <template v-if="props.enableAdvSearch">
                        <el-button
                            :size="size"
                            type="primary"
                            plain
                            @click="onAdvSearchDialogClick"
                        >
                            高级查询
                        </el-button>
                        <el-select
                            v-model="state.currentSceneId"
                            :size="size"
                            @change="onSceneChange"
                        >
                            <el-option
                                v-for="item in state.sceneList"
                                :key="`${item.id}Select`"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </template>
                </el-space>
                <!--前置插槽-->
                <slot> </slot>
                <!--外露搜索项-->
                <template v-for="item in state.exposeSearchList" :key="item.id">
                    <AdvSearchItem
                        v-if="item.searchVisible"
                        v-model:modelValue="item.searchValue"
                        :props="item"
                        class="expose-item"
                        :size="size"
                        @search="onSearchClick()"
                    ></AdvSearchItem>
                </template>
            </el-scrollbar>
        </div>
        <AdvSearchDialog
            ref="advSearchDialogRef"
            :scene-list="state.sceneList"
            :column-list="props.columnList"
            :size="size"
            @scene-update-default="sceneUpdateDefault"
            @scene-update-name="sceneUpdateName"
            @scene-delete="sceneDelete"
            @scene-search="sceneSearch"
            @scene-save="sceneSave"
            @scene-update="sceneUpdate"
        ></AdvSearchDialog>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import AdvSearchItem from './adv-searchbar-item.vue'
import AdvSearchDialog from './adv-searchbar-dialog.vue'
import { useAdvSearchbar } from './adv-searchbar'

import { UseElementConfig } from '@beeboat/core'

const emits = defineEmits(['search', 'reset'])

interface IProps {
    scene: any
    columnList?: any
    initLoading?: boolean
    enableAdvSearch?: boolean
    size?: string
}
const props = withDefaults(defineProps<IProps>(), {
    scene: {},
    columnList: [],
    initLoading: true,
    enableAdvSearch: true,
    size: '',
})

const { size } = UseElementConfig(
    {
        componentName: 'btp-adv-searchbar',
    },
    props,
)

const advSearchDialogRef = ref()

//当前页面数据绑定对象
const state = reactive({
    searchText: '',
    sceneList: [] as any,
    currentSceneId: '',
    isExposePanelExpanded: false,
    exposeSearchList: [] as any,
    cachedSceneData: {},
})

const {
    initAdvSearchbar,
    onSceneChange,
    sceneUpdateName,
    sceneUpdateDefault,
    sceneDelete,
    sceneSearch,
    sceneSave,
    sceneUpdate,
} = useAdvSearchbar(props, emits, state)

initAdvSearchbar()

/**
 * 点击查询按钮
 */
const onSearchClick = () => {
    if (state.isExposePanelExpanded) {
        state.isExposePanelExpanded = !state.isExposePanelExpanded
    }
}

/**
 * 重置参数
 */
const onReset = () => {
    state.exposeSearchList.forEach(column => {
        column.searchValue = []
    })
    state.isExposePanelExpanded = false
    emits('reset', {})
}
/**
 * 展开按钮点击
 */
const onExpandClick = () => {
    state.isExposePanelExpanded = !state.isExposePanelExpanded
}

const onAdvSearchDialogClick = () => {
    advSearchDialogRef.value.openDialog(state.currentSceneId)
}
</script>

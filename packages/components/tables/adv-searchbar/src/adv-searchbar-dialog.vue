<template>
    <el-dialog
        v-model="state.dialogVisible"
        class="btp-adv-searchbar-dialog"
        title="高级查询"
        :append-to-body="true"
        :close-on-click-modal="false"
        draggable
    >
        <div class="btp-adv-searchbar-dialog--content">
            <!-- 左侧方案列表 -->
            <div class="btp-adv-searchbar-dialog--sence">
                <template v-for="(item, index) in state.sceneList" :key="item.id">
                    <div
                        class="btp-adv-searchbar-dialog--scene--item"
                        :class="item.id == state.currentSceneId ? 'active' : ''"
                        @click="onSceneClick(item.id)"
                    >
                        <div class="btp-adv-searchbar-dialog--scene--item__label">
                            <span v-if="!sceneInEditingMode(item)">{{ item.name }}</span>
                            <el-input
                                v-else
                                v-model="item.name"
                                @blur="onSceneSaveNameClick(item)"
                            ></el-input>
                        </div>
                        <el-space v-if="sceneShowShouldButton(item)">
                            <el-icon @click.stop="onSceneEditClick(item)">
                                <EditPen></EditPen>
                            </el-icon>
                            <el-icon
                                v-if="!item.isDefault"
                                @click.stop="onSceneDeleteClick(item, index)"
                            >
                                <Delete></Delete>
                            </el-icon>
                        </el-space>
                    </div>
                </template>
            </div>
            <div class="btp-adv-searchbar-dialog--container">
                <el-scrollbar>
                    <el-space
                        v-for="(item, index) in state.searchList"
                        :key="item.id"
                        class="btp-adv-searchbar-dialog--container--item"
                    >
                        <el-select
                            v-model="item.id"
                            class="btp-adv-searchbar-dialog--container--item__label"
                            placeholder="请选择"
                            filterable
                            :size="size"
                            @change="onSearchItemPropChange(item)"
                        >
                            <template v-for="opt in props.columnList" :key="opt.id">
                                <el-option
                                    v-if="opt.searchProps.enable"
                                    :label="opt.label"
                                    :value="opt.id"
                                    :disabled="shouldShowProp(opt)"
                                ></el-option>
                            </template>
                        </el-select>
                        <el-select
                            v-model="item.searchCondition"
                            class="btp-adv-searchbar-dialog--container--item__condition"
                            placeholder="请选择"
                            @change="onItemConditionChange(item)"
                            :size="size"
                        >
                            <template v-for="(condition, key) in expressConfigList" :key="key">
                                <el-option
                                    v-if="isColumnSupportCondition(item, key)"
                                    :label="condition.value + condition.name"
                                    :value="key"
                                ></el-option>
                            </template>
                        </el-select>
                        <AdvSearchItem
                            v-if="!shouldShowItem(item)"
                            v-model:modelValue="item.searchValue"
                            :props="item"
                            :size="size"
                            :expose-mode="false"
                        ></AdvSearchItem>
                        <el-space>
                            <el-button link @click="onDeleteSearchItem(item, index)">
                                <el-icon>
                                    <CircleClose></CircleClose>
                                </el-icon>
                            </el-button>
                            <el-checkbox
                                v-model="item.searchVisible"
                                label="外露"
                                @change="onExposeClick"
                                :size="size"
                            ></el-checkbox>
                        </el-space>
                    </el-space>
                    <div class="btp-adv-searchbar-dialog--toolbar">
                        <el-button :size="size" type="info" :link="true" @click="onAddSearchItem">
                            <el-icon>
                                <Plus></Plus>
                            </el-icon>
                            <span>添加筛选条件</span>
                        </el-button>
                    </div>
                    <div class="btp-adv-searchbar-dialog--toolbar">
                        <el-checkbox
                            label="设置为默认"
                            v-model="state.defaultSceneValue"
                            @change="onSetDefaultSceneClick"
                            :size="size"
                        ></el-checkbox>
                    </div>
                    <div class="btp-adv-searchbar-dialog--toolbar">
                        <el-checkbox
                            v-model="state.exposeAll"
                            label="全部外露"
                            @change="onExposeAllClick"
                            :size="size"
                        ></el-checkbox>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <template #footer>
            <el-button :size="size" type="info" @click="state.dialogVisible = false"
                >取 消</el-button
            >
            <el-button :size="size" type="primary" plain @click="onSaveSceneClick"
                >保存方案</el-button
            >
            <el-button :size="size" type="primary" plain @click="onSaveAsSceneClick"
                >另存方案</el-button
            >
            <el-button :size="size" type="primary" @click="onSearchClick">查 询</el-button>
        </template>
    </el-dialog>
    <AdvSaveAsDialog ref="saveAsDialogRef"></AdvSaveAsDialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import AdvSearchItem from './adv-searchbar-item.vue'
import AdvSaveAsDialog from './adv-searchbar-saveas-dialog.vue'
import { expressConfigList } from './adv-searchbar-common'
import { useAdvSearchbarDailog } from './adv-searchbar-dialog'

import { useElementConfig } from '@beeboat/core/utils-ex/use-element-config'

const emits = defineEmits([
    'scene-search',
    'scene-save',
    'scene-delete',
    'scene-update',
    'scene-update-name',
    'scene-update-default',
])

interface IProps {
    sceneList?: any
    columnList?: any
    size?: string
}
const props = withDefaults(defineProps<IProps>(), {
    sceneList: {},
    columnList: [],
    size: '',
})

const { sizeClass, size } = useElementConfig(
    {
        componentName: 'btp-adv-searchbar-dialog',
    },
    props,
)

const saveAsDialogRef = ref()

const state = reactive({
    dialogVisible: false,
    sceneEditing: false,
    currentSceneId: '',
    sceneList: [] as any,
    searchList: [] as any,
    exposeAll: false,
    defaultSceneValue: false,
})

const {
    openDialog,
    sceneInEditingMode,
    onSceneEditClick,
    sceneShowShouldButton,
    onSceneSaveNameClick,
    onSceneDeleteClick,
    shouldShowItem,
    shouldShowProp,
    isColumnSupportCondition,
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
} = useAdvSearchbarDailog(props, emits, state, saveAsDialogRef)

defineExpose({
    openDialog,
})
</script>

<template>
    <div class="bt-advsearchbar-ex" :class="{ 'expand--all': state.isExposePanelExpanded }">
        <div>
            <el-scrollbar max-height="500px">
                <div class="bt-advsearchbar-ex-toolbar">
                    <el-button type="info" :link="true" @click="onExpandClick">
                        {{ state.isExposePanelExpanded ? '折叠' : '展开' }}
                        <el-icon class="el-icon--right">
                            <CaretTop v-if="state.isExposePanelExpanded" />
                            <CaretBottom v-else />
                        </el-icon>
                    </el-button>
                    <el-button type="primary" @click="onSearchClick()">查 询</el-button>
                    <el-button plain @click="onReset">重 置</el-button>
                    <el-button
                        v-if="Boolean(props.enableAdvSearch) || Boolean(props.isSenior)"
                        type="primary"
                        plain
                        @click="onOpenDialogClick"
                    >
                        高级查询
                    </el-button>
                    <el-select
                        v-if="Boolean(props.enableAdvSearch) || Boolean(props.isSenior)"
                        v-model="state.defaultSenceId"
                        @change="onSenceChange"
                    >
                        <el-option
                            v-for="item in state.senceData?.senceList"
                            :key="`${item.id}Select`"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </div>
                <!--前置插槽-->
                <slot> </slot>
                <!--外露搜索项-->
                <template v-for="item in state.exposeSearchList" :key="item.id">
                    <AdvSearchItem
                        v-if="item.searchVisible"
                        v-model:modelValue="item.searchValue"
                        class="expose-item"
                        :column-props="item.columnConfig"
                        :search-props="item"
                        :show-condition="true"
                        @onSearchClick="onSearchClick()"
                    />
                </template>
            </el-scrollbar>
        </div>
        <AdvSearchDialog
            ref="advDialogRef"
            :column-list="props.columnList"
            :sence-info="state.senceData"
            @search="onDialogSearchClick"
            @save-sence="onDialogSaveAsClick"
            @update-sence="onDialogSaveClick"
            @delete-sence="onDialogDeleteClick"
            @update-sencename="onDialogUpdateNameClick"
            @defaultsence-change="onDialogDefaultChange"
        />
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import cloneDeep from 'lodash-es/cloneDeep'
import AdvSearchItem from './adv-searchbar-item.vue'
import AdvSearchDialog from './adv-searchbar-dialog.vue'
import { CaretBottom, CaretTop } from '@element-plus/icons-vue'
import { useAdvSearchbar } from './bt-adv-searchbar'
import { BtUseAppStore } from '@beeboat/core'
import { ElMessage } from 'element-plus'

const advDialogRef = ref()
// reset重置搜索栏数据
const emits = defineEmits(['search', 'reset'])
//当前页面数据绑定对象
const state = reactive({
    isExposePanelExpanded: false,
    isIndexExpanded: false,
    searchText: '',
    exposeSearchList: [] as any,
    senceData: null as any,
    originSenceData: null as any,
    defaultSenceId: null,
})

interface IProps {
    enableAdvSearch?: any //是否现实高级搜索按钮
    columnList?: any
    isSenior?: any //是否现实高级搜索按钮 兼容写法
    senceInfo?: any
    senceId: string
    initLoading?: boolean | number // 默认不加载数据时，在查询玩方案后也需要控制search事件的暴露
}
const props = withDefaults(defineProps<IProps>(), {
    enableAdvSearch: false,
    columnList: [],
    isSenior: false,
    senceInfo: {},
    senceId: '',
    initLoading: true,
})

const { getAdvQueryParam, loadSenceData, emitSearchEvent } = useAdvSearchbar(props, emits, state)

loadSenceData()

/**
 * 点击查询按钮
 */
const onSearchClick = () => {
    if (state.isExposePanelExpanded) {
        state.isExposePanelExpanded = !state.isExposePanelExpanded
    }

    emitSearchEvent(state.exposeSearchList)
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

const onSenceChange = () => {
    const sence = state.senceData.senceList?.find(item => {
        return item.id == state.defaultSenceId
    })
    state.exposeSearchList = []
    if (sence) {
        sence.searchList.forEach(el => {
            state.exposeSearchList.push(el)
        })
    }
}

const onOpenDialogClick = () => {
    advDialogRef.value.openDialog(cloneDeep(state.senceData), state.defaultSenceId)
}

/**
 * 弹窗中点击查询按钮
 */
const onDialogSearchClick = sence => {
    state.defaultSenceId = sence.id
    const oldSence = state.senceData.senceList.find(item => {
        return item.id == sence.id
    })
    if (oldSence) {
        oldSence.searchList = cloneDeep(sence.searchList)
    }
    state.exposeSearchList = []
    sence.searchList.forEach(item => {
        state.exposeSearchList.push(cloneDeep(item))
    })
    onSearchClick()
}

const onDialogSaveAsClick = sence => {
    state.senceData.senceList.push(cloneDeep(sence))
    onSaveSence()
}

const onDialogSaveClick = sence => {
    const oldSence = state.senceData.senceList.find(item => {
        return item.id == sence.id
    })
    if (oldSence) {
        oldSence.name = sence.name
        oldSence.searchList = cloneDeep(sence.searchList)

        if (state.defaultSenceId == sence.id) {
            state.exposeSearchList = []
            sence.searchList.forEach(item => {
                state.exposeSearchList.push(cloneDeep(item))
            })
        }
    }
    onSaveSence()
}

/**
 * 删除方案
 * @param sence 方案
 * @param currenSenceId  新选中方案ID
 */
const onDialogDeleteClick = (sence: any, currenSenceId) => {
    const oldSenceIndex = state.senceData.senceList.findIndex(item => {
        return item.id == sence.id
    })
    if (oldSenceIndex != -1) {
        state.senceData.senceList.splice(oldSenceIndex, 1)
    }
    state.defaultSenceId = currenSenceId
    onSaveSence()
}

const onDialogUpdateNameClick = sence => {
    const oldSence = state.senceData.senceList.find(item => {
        return item.id == sence.id
    })
    if (oldSence) {
        oldSence.name = sence.name
    }
    onSaveSence()
}

const onDialogDefaultChange = senceId => {
    state.senceData.defaultSenceId = senceId
    onSaveSence()
}

const onSaveSence = async () => {
    const res = await BtUseAppStore().saveSence(props.senceId, state.senceData)
    if (res.code == 0) {
        ElMessage({
            type: 'success',
            message: '保存成功！',
            appendTo: '.bt-advsearchbar-ex-dialog',
        })
    } else {
        ElMessage({
            type: 'error',
            message: res.msg,
            appendTo: '.bt-advsearchbar-ex-dialog',
        })
    }
}

defineExpose({
    //获取外露条件
    getAdvOutQueryParam: () => {
        return getAdvQueryParam(state.exposeSearchList)
    },
    advParamReset: onReset,
    reset: () => {
        onReset()
    },
    getAllAdvOutQueryParam: () => {
        return state.exposeSearchList
    },
})
</script>

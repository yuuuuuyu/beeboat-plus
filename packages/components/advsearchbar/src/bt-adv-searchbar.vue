<template>
    <div
        class="bt-adv-search-bar"
        :class="[
            state.isExposePanelExpanded
                ? 'unfold-index'
                : !state.isExposePanelExpanded && state.isIndexExpanded
                    ? 'unfold-overflow'
                    : 'fold-index',
        ]"
    >
        <div :class="['bt-advsearchbar', { 'bt-advsearchbar--all': state.isExposePanelExpanded }]">
            <div class="bt-advsearchbar-item bt-advsearchbar-toolbar">
                <bt-button type="blank" :link="true" @click="onExpandClick">
                    {{ state.isExposePanelExpanded ? '折叠' : '展开' }}
                    <el-icon class="el-icon--right">
                        <CaretTop v-if="state.isExposePanelExpanded" />
                        <CaretBottom v-else />
                    </el-icon>
                </bt-button>
                <el-button type="primary" @click="onSearchClick">查 询</el-button>
                <el-button plain @click="onResetClick">重 置</el-button>

                <AdvSearchDialog
                    v-if="Boolean(props.enableAdvSearch) || Boolean(props.isSenior)"
                    :column-list="props.columnList"
                    @search="onAdvSearchClick"
                    @visibleChange="onZIndexChange"
                />
            </div>
            <!--前置插槽-->
            <slot> </slot>

            <!--外露搜索项-->
            <template v-for="item in state.exposeSearchList" :key="item.id">
                <AdvSearchItem
                    v-if="item.searchProps?.exposeSearchVisible"
                    v-model:modelValue="item.searchProps.exposeSearchValue"
                    :column-props="item"
                    :search-props="item.searchProps"
                    class="bt-advsearchbar-item"
                    :class="
                        item.searchProps.componentType == 'datetime'
                            ? 'bt-advsearchbar-searchitem-datetime'
                            : 'bt-advsearchbar-searchitem'
                    "
                    @removeItem="onRemoveSearchItem"
                />
            </template>
            <!--外露增加按钮及气泡框-->
            <div
                v-if="props.enableExposeSearch"
                class="bt-advsearchbar-item bt-advsearchbar--expose-btn"
            >
                <el-popover ref="exposePopoverRef" trigger="click" width="280">
                    <template #reference>
                        <bt-button type="blank" style="margin-left: 8px">
                            <i class="bt-icon bt-icon-plus"></i>
                        </bt-button>
                    </template>
                    <div>
                        <el-input v-model="state.searchText" clearable placeholder="搜索显示条件" />
                        <div>
                            <div style="padding: 12px 0; font-weight: bold">显示条件</div>
                        </div>
                        <el-scrollbar style="height: 240px; overflow-y: auto">
                            <div
                                v-for="item in props.columnList"
                                :key="`adv-search-popover-item-${item.id}`"
                                @click="onExposeColumn(item)"
                            >
                                <template v-if="isColumnNotExposed(item)">
                                    {{ item.label }}
                                </template>
                            </div>
                        </el-scrollbar>
                    </div>
                </el-popover>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtAdvSearch',
}
</script>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import AdvSearchItem from './adv-searchbar-item.vue'
import AdvSearchDialog from './adv-searchbar-dialog.vue'
import { CaretBottom, CaretTop } from '@element-plus/icons-vue'
// reset重置搜索栏数据 selectReset:表格复选框清空重置，searchBarChange:列数据变更事件
const emits = defineEmits(['search', 'reset', 'searchBarChange', 'selectReset'])
//当前页面数据绑定对象
const state = reactive({
    isExposePanelExpanded: false,
    isIndexExpanded: false,
    searchText: '',
    exposeSearchList: [] as any,
})
//外露气泡框
const exposePopoverRef = ref()
interface IProps {
    enableAdvSearch?: any //是否现实高级搜索按钮
    enableExposeSearch?: any
    columnList?: any
    isSenior?: any //是否现实高级搜索按钮 兼容写法
}
const props = withDefaults(defineProps<IProps>(), {
    enableAdvSearch: false,
    enableExposeSearch: true,
    columnList: [],
    isSenior: false,
})
// 搜索栏的数据变更
const emitSearchBarChange = () => {
    emits('searchBarChange', state.exposeSearchList)
}
//获取外露条件的值
const getAdvOutQueryParam = () => {
    const advOutQueryParam: any = []
    state.exposeSearchList.forEach((item: any, index) => {
        if (item.searchProps) {
            item.searchProps.exposeSearchIndex = index + 1
        }
        if (
            item.searchProps.exposeSearchValue &&
            Array.isArray(item.searchProps.exposeSearchValue) &&
            item.searchProps.exposeSearchValue.length > 0
        ) {
            advOutQueryParam.push({
                fieldType: item.propType,
                value: item.searchProps.exposeSearchValue,
                express: item.searchProps.defaultConditionValue,
                field: item.searchProps.searchPropKey || item.prop,
            })
        }
    })
    return advOutQueryParam
}

//列未外露到界面上
const isColumnNotExposed = (column: any) => {
    return (
        column?.searchProps?.enable &&
        column?.searchProps?.exposeSearchVisible == false &&
        column.label.indexOf(state.searchText) != -1
    )
}
//展开按钮点击
const onExpandClick = () => {
    state.isExposePanelExpanded = !state.isExposePanelExpanded
}
//添加列到外露
const onExposeColumn = (column: any) => {
    state.searchText = ''
    column.searchProps.exposeSearchVisible = true
    state.exposeSearchList.push(column)
    exposePopoverRef.value.hide()
}
//重置参数
const onResetClick = () => {
    state.exposeSearchList.forEach(column => {
        if (column.searchProps.defaultValue) {
            const value = column.searchProps.defaultValue
            column.searchProps.exposeSearchValue = Array.isArray(value) ? value : [value]
        } else {
            column.searchProps.exposeSearchValue = []
        }
    })
    emits('reset', {})
    emits('selectReset')
    emitSearchBarChange()
}
// 仅仅重置查询参数，不暴露事件
const onOnlyResetParam = () => {
    state.exposeSearchList.forEach(column => {
        if (column.searchProps.defaultValue) {
            const value = column.searchProps.defaultValue
            column.searchProps.exposeSearchValue = Array.isArray(value) ? value : [value]
        } else {
            column.searchProps.exposeSearchValue = []
        }
    })
}

//点击搜索按钮
const onSearchClick = () => {
    const advOutQueryParam = getAdvOutQueryParam()

    //触发外露搜索事件
    emits('search', { advOutQueryParam: advOutQueryParam, advQueryParam: [] })
    emitSearchBarChange()
}
//点击高级搜索按钮
const onAdvSearchClick = params => {
    //触发外露搜索事件
    emits('search', params)
    emitSearchBarChange()
}
const onZIndexChange = param => {
    state.isIndexExpanded = param
}
const onRemoveSearchItem = params => {
    state.exposeSearchList = state.exposeSearchList.filter(item => item.id != params)
}
//初始化
const initAdvSearch = () => {
    state.exposeSearchList = []

    props.columnList.forEach(item => {
        if (!item.searchProps) {
            item.searchProps = {
                enable: false,
                exposeSearchVisible: 1,
            }
        }
        if (item.searchProps?.exposeSearchVisible) {
            state.exposeSearchList.push(item)
        }
    })
    //对上次的进行排序
    state.exposeSearchList.sort((a1: any, a2: any) => {
        const v1 = a1.columnConfig?.searchProps.exposeSearchIndex || 1000
        const v2 = a2.columnConfig?.searchProps.exposeSearchIndex || 1000

        return v1 - v2
    })
}
initAdvSearch()

defineExpose({
    //获取外露条件
    getAdvOutQueryParam: getAdvOutQueryParam,
    advParamReset: onResetClick,
    resetParamValue: onOnlyResetParam,
})
</script>

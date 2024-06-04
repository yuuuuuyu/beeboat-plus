<template>
    <div
        class="bt-adv-search-bar2"
        :class="[
            state.isExposePanelExpanded
                ? 'unfold-index'
                : !state.isExposePanelExpanded && state.isIndexExpanded
                    ? 'unfold-overflow'
                    : 'fold-index',
        ]"
    >
        <div :class="['bt-advsearchbar2', { 'bt-advsearchbar--all': state.isExposePanelExpanded }]">
            <el-scrollbar max-height="500px">
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
                        :sence-info="senceInfoMation"
                        :expose-search-list="state.exposeSearchList"
                        :sence-id="senceId"
                        @search="onAdvSearchClick"
                        @searchBarChange="emitSearchBarChange"
                        @visibleChange="onZIndexChange"
                        @watchSearchList="watchSearchList"
                    />
                </div>
                <!--前置插槽-->
                <slot> </slot>

                <!--外露搜索项-->
                <template v-for="item in state.exposeSearchList" :key="item.id">
                    <AdvSearchItem
                        v-if="item.searchVisible"
                        v-model:modelValue="item.searchValue"
                        :column-props="item.columConfig"
                        :search-props="item"
                        :show-condition="true"
                        class="bt-advsearchbar-item"
                        :class="
                            item.columConfig?.searchProps?.componentType == 'datetime'
                                ? 'bt-advsearchbar-searchitem-datetime'
                                : 'bt-advsearchbar-searchitem'
                        "
                        @onSearchClick="onSearchClick"
                    />
                </template>
            </el-scrollbar>
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
import { BtUseAppStore } from '@beeboat/core'
import cloneDeep from 'lodash-es/cloneDeep'
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
// const exposePopoverRef = ref()
interface IProps {
    enableAdvSearch?: any //是否现实高级搜索按钮
    enableExposeSearch?: any
    columnList?: any
    isSenior?: any //是否现实高级搜索按钮 兼容写法
    senceInfo?: any
    senceId?: any
}
const props = withDefaults(defineProps<IProps>(), {
    enableAdvSearch: false,
    enableExposeSearch: true,
    columnList: [],
    isSenior: false,
    senceInfo: {},
})

// 动态获取方案，获取不到时，取默认方案
const senceInfoMation = ref({}) as any

// 搜索栏的数据变更
const emitSearchBarChange = (val: any) => {
    // let data = JSON.parse(JSON.stringify(val))
    let data = cloneDeep(val)
    console.log(
        '搜索栏的数据变更前---- state.exposeSearchList, senceInfoMation.value',
        state.exposeSearchList,
        senceInfoMation.value,
        data,
    )
    //添加列到外露
    state.exposeSearchList = []
    if (data?.senceList.length) {
        data?.senceList.forEach(item => {
            if (item.id == data.defaultSence) {
                item.searchList.forEach(el => {
                    if (el.id && el.searchCondition) {
                        state.exposeSearchList.push(el)
                    }
                })
            }
        })
    }
    console.log('搜索栏的数据变更后----state.exposeSearchList', state.exposeSearchList)
    emits('searchBarChange', state.exposeSearchList)
}
// 获取所有外露条件的
const getAllAdvOutQueryParam = () => {
    return state.exposeSearchList
}
//获取外露条件的值
const getAdvOutQueryParam = () => {
    console.log('获取外露条件的值----', state.exposeSearchList)
    const advQueryParam: any = []
    if (state.exposeSearchList.length > 0) {
        state.exposeSearchList.forEach((item: any) => {
            if (item.searchCondition == 'isNull' || item.searchCondition == 'isNotNull') {
                advQueryParam.push({
                    value: item.searchValue,
                    express: item.searchCondition,
                    field: item.columConfig.searchProps.searchPropKey || item.columConfig.prop,
                })
            } else {
                if (
                    item.searchValue &&
                    Array.isArray(item.searchValue) &&
                    item.searchValue.length > 0
                ) {
                    advQueryParam.push({
                        value: item.searchValue,
                        express: item.searchCondition,
                        field: item.columConfig.searchProps.searchPropKey || item.columConfig.prop,
                    })
                }
            }
        })
    }
    console.log('获取外露条件的值advQueryParam----', advQueryParam)
    return advQueryParam
}

//展开按钮点击
const onExpandClick = () => {
    state.isExposePanelExpanded = !state.isExposePanelExpanded
}

//重置参数
const onResetClick = () => {
    state.exposeSearchList.forEach(column => {
        column.searchValue = []
    })
    state.isExposePanelExpanded = false
    emits('reset', {})
    emits('selectReset')
    // emitSearchBarChange(senceInfoMation.value)
    emits('searchBarChange', state.exposeSearchList)
}

//点击搜索按钮
const onSearchClick = () => {
    if (state.isExposePanelExpanded) {
        state.isExposePanelExpanded = !state.isExposePanelExpanded
    }
    const advQueryParam = getAdvOutQueryParam()

    //触发外露搜索事件
    emits('search', { advQueryParam: advQueryParam })
    console.log('点击搜索按钮-advQueryParam----------', advQueryParam)
    // emitSearchBarChange(senceInfoMation.value)
}

//点击高级搜索弹窗里的查询按钮
const onAdvSearchClick = params => {
    console.log('点击高级搜索查询params, props.columnList-----', params, props.columnList)

    //触发外露搜索事件
    emits('search', params)
    if (state.isExposePanelExpanded) {
        state.isExposePanelExpanded = !state.isExposePanelExpanded
    }
    console.log('点击高级搜索弹窗里的查询按钮-----------', state.exposeSearchList)
    // emitSearchBarChange(senceInfoMation.value)
}
const onZIndexChange = param => {
    state.isIndexExpanded = param
}

const watchSearchList = val => {
    state.exposeSearchList = val.searchList
    console.log('*val,state.exposeSearchList********************', val, state.exposeSearchList)
}

//初始化
const initAdvSearch = () => {
    state.exposeSearchList = []
    console.log(
        '初始化---senceInfoMation.value----props.columnList',
        senceInfoMation.value,
        props.columnList,
    )
    // 把columnList信息塞到方案下
    senceInfoMation.value?.senceList.forEach(item => {
        item.searchList.forEach(el => {
            if (item.id == senceInfoMation.value.defaultSence) {
                item.setDefaultSence = true
                state.exposeSearchList.push(el)
            } else {
                item.setDefaultSence = false
            }
            let col = props.columnList.find(col => {
                return col.id == el.id
            })
            if (el.id == col?.id) {
                el.columConfig = col
            }
        })
    })

    console.log(
        '初始化state.exposeSearchList,senceInfoMation.value----',
        state.exposeSearchList,
        senceInfoMation.value,
    )
    // 查询
    onSearchClick()
}
// 动态获取方案
const getSenceList = async () => {
    senceInfoMation.value = props.senceInfo
    console.log(
        '获取默认方案--props.senceInfo----senceInfoMation.value--------',
        props.senceInfo,
        senceInfoMation.value,
    )
    console.log('动态获取方案11------------------', await BtUseAppStore().getSence(props.senceId))
    const senceObj = await BtUseAppStore().getSence(props.senceId)
    if (senceObj?.senceList?.length > 0) {
        console.log('动态获取方案222------------------', senceObj, props.senceInfo)
        senceInfoMation.value = senceObj
        // 需要将当前方案和保存的方案做对比：有在设计器新增的和删除的
        // senceObj.senceList.forEach(item => {

        // })
    } else {
        //获取默认方案
        senceInfoMation.value = props.senceInfo
        console.log(
            '获取默认方案333--props.senceInfo----senceInfoMation.value--------',
            props.senceInfo,
            senceInfoMation.value,
        )
    }
    initAdvSearch()
}
getSenceList()

defineExpose({
    //获取外露条件
    getAdvOutQueryParam: getAdvOutQueryParam,
    advParamReset: onResetClick,
    getAllAdvOutQueryParam,
})
</script>

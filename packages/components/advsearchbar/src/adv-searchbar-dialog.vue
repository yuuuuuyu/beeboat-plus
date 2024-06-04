<template>
    <el-button type="primary" plain @click="onDialogVisibleClick"> 高级查询 </el-button>
    <el-dialog
        v-model="state.dialogVisible"
        width="900px"
        class="bt-advsearchbar-dialog"
        title="高级查询"
        draggable
        top="5vh"
    >
        <div class="bt-advsearchbar-dialog--subtitle">高级条件</div>
        <el-scrollbar max-height="60vh">
            <div class="bt-advsearchbar-dialog--container">
                <ul v-for="(item, index) in state.searchList" :key="item.id">
                    <li class="bt-advsearchbar-dialog--item">
                        <el-select
                            v-model="item.id"
                            placeholder="请选择"
                            @change="onColumnChanged(item)"
                        >
                            <template v-for="option in props.columnList" :key="option.id">
                                <el-option
                                    v-if="option.searchProps.enable"
                                    :label="option.label"
                                    :value="option.id"
                                    :disabled="option.searchProps.advSearchVisible"
                                />
                            </template>
                        </el-select>
                    </li>
                    <li class="bt-advsearchbar-dialog--expression">
                        <el-select v-model="item.advSearchCondition" placeholder="请选择">
                            <template v-for="(name, key) in expressConfig" :key="key">
                                <el-option
                                    v-if="supportCondition(item.id, key)"
                                    :label="name"
                                    :value="key"
                                />
                            </template>
                        </el-select>
                    </li>
                    <li class="bt-advsearchbar-dialog--value">
                        <AdvSearchItem
                            v-if="item.columnConfig && supportInputElement(item)"
                            v-model:modelValue="item.advSearchValue"
                            :show-label="false"
                            :column-props="item.columnConfig"
                            :search-props="item.columnConfig.searchProps"
                        />
                    </li>
                    <li class="bt-advsearchbar-dialog--delete">
                        <em class="bt-icon bt-icon-delete" @click="onDeleteItem(item, index)"></em>
                    </li>
                </ul>
            </div>
        </el-scrollbar>

        <div class="bt-advsearchbar-dialog--toolbar">
            <bt-button type="text" @click="onAddItem">
                <em class="bt-icon bt-icon-plus"></em>
                <span>添加筛选条件</span>
            </bt-button>
        </div>

        <template #footer>
            <bt-button type="blank" @click="state.dialogVisible = false">取消</bt-button>
            <bt-button @click="onSubmit">确 定</bt-button>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, watch } from 'vue'
import AdvSearchItem from './adv-searchbar-item.vue'
const emits = defineEmits(['search', 'visibleChange'])

const expressConfig = {
    like: '包含',
    notlike: '不包含',
    eq: '等于',
    ne: '不等于',
    isNull: '为空',
    isNotNull: '不为空',
    gt: '大于',
    ge: '大于等于',
    lt: '小于',
    le: '小于等于',
    gele: '范围',
    in: '范围内',
    notIn: '范围外',
}

//当前页面数据绑定对象
const state = reactive({
    dialogVisible: false,
    searchList: [] as any,
    searchText: '',
})
interface IProps {
    columnList?: any
}
const props = withDefaults(defineProps<IProps>(), {
    columnList: [],
})
watch(
    () => state.dialogVisible,
    val => {
        emits('visibleChange', val)
    },
)
//选择的列发生变化
const onColumnChanged = currentItem => {
    // 清空上一次的值
    currentItem.advSearchValue = []
    props.columnList.forEach(column => {
        const searchColumn = state.searchList.find(item => {
            return column.id == item.id
        })
        if (searchColumn) {
            searchColumn.columnConfig = column
            column.searchProps.advSearchVisible = true
            if (searchColumn.id == currentItem.id) {
                searchColumn.advSearchCondition = column.searchProps.defaultConditionValue
            }
        } else {
            column.searchProps.advSearchVisible = false
        }
    })
}
//添加新列
const onAddItem = () => {
    state.searchList.push({
        id: '',
        advSearchCondition: '',
        advSearchValue: [],
        columnConfig: null,
    })
}
//删除列
const onDeleteItem = (item, index) => {
    if (item?.id) {
        props.columnList.forEach(column => {
            if (column.id == item.id) {
                column.searchProps.advSearchVisible = false
            }
        })
    }
    state.searchList.splice(index, 1)
}

//判断列是否支持表达式
const supportCondition = (id: string, key: string) => {
    const column = props.columnList.find(column => {
        return column.id == id
    })
    if (column && column.searchProps && column.searchProps.supportConditionList) {
        return column.searchProps.supportConditionList.indexOf(key) != -1
    }
    return false
}

//const 判断是否需要显示值输入框
const supportInputElement = (item: any) => {
    if (
        item.advSearchCondition &&
        (item.advSearchCondition == 'isNull' || item.advSearchCondition == 'isNotNull')
    ) {
        return false
    }
    return true
}

//提交
const onSubmit = () => {
    const advQueryParam: any = []
    state.searchList.forEach((item, index) => {
        if (item.columnConfig) {
            item.columnConfig.searchProps.advSearchIndex = index + 1
            item.columnConfig.searchProps.advSearchValue = item.advSearchValue
            item.columnConfig.searchProps.advSearchCondition = item.advSearchCondition
        }
        if (item.advSearchCondition == 'isNull' || item.advSearchCondition == 'isNotNull') {
            advQueryParam.push({
                fieldType: item.columnConfig.propType,
                value: [],
                express: item.advSearchCondition,
                field: item.columnConfig.searchProps.searchPropKey || item.columnConfig.prop,
            })
        } else if (
            item.advSearchValue &&
            Array.isArray(item.advSearchValue) &&
            item.advSearchValue.length > 0
        ) {
            advQueryParam.push({
                fieldType: item.columnConfig.propType,
                value: item.advSearchValue,
                express: item.advSearchCondition,
                field: item.columnConfig.searchProps.searchPropKey || item.columnConfig.prop,
            })
        }
    })
    //触发搜索事件
    emits('search', { advOutQueryParam: [], advQueryParam: advQueryParam })
    state.dialogVisible = false
}

//初始化弹窗
const initDialog = () => {
    state.searchList = []
    props.columnList.forEach(item => {
        if (item.searchProps.advSearchVisible) {
            state.searchList.push({
                id: item.id,
                advSearchCondition: item.searchProps.defaultConditionValue,
                advSearchValue: item.searchProps.advSearchValue || [],
                columnConfig: item,
            })
        }
    })
    //对上次的进行排序
    state.searchList.sort((a1, a2) => {
        const v1 = a1.columnConfig?.searchProps.advSearchIndex || 1000
        const v2 = a2.columnConfig?.searchProps.advSearchIndex || 1000

        return v1 - v2
    })
    if (state.searchList.length == 0) {
        onAddItem()
    }
}
initDialog()
//点击高级搜索按钮
const onDialogVisibleClick = () => {
    state.dialogVisible = true
}
</script>

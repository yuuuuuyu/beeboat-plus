<template>
    <bt-button type="secondary-plain" @click="onClick"> 高级搜索 </bt-button>
    <el-dialog
        v-model="dialogVisible"
        width="920px"
        class="ever-el-dialog"
        title="高级搜索"
        draggable
        top="5vh"
    >
        <div class="ever-el-dialog__title">高级条件</div>
        <el-scrollbar max-height="60vh">
            <div class="ever-el-dialog-trem">
                <ul v-for="(item, index) in termList" :key="item.id">
                    <li class="ever-el-dialog-trem__field">
                        <el-select
                            v-model="item.prop"
                            placeholder="请选择"
                            @change="
                                val => {
                                    onChangeField(val, item)
                                }
                            "
                        >
                            <el-option
                                v-for="itemOption in selectField"
                                :key="itemOption.value"
                                :label="itemOption.label"
                                :value="itemOption.value"
                                :disabled="itemOption.disabled"
                            />
                        </el-select>
                    </li>
                    <li class="ever-el-dialog-trem__condition">
                        <el-select
                            v-model="item.conditionValue"
                            placeholder="请选择"
                            @change="
                                () => {
                                    onChangeCondition(item)
                                }
                            "
                        >
                            <el-option
                                v-for="conditionItem in item.condition"
                                :key="conditionItem.value"
                                :label="conditionItem.label"
                                :value="conditionItem.value"
                            />
                        </el-select>
                    </li>
                    <li class="ever-el-dialog-trem__value">
                        <secondary-plain-term
                            v-model="item.value"
                            :field="item.searchPropType"
                            :term="item.conditionValue"
                            :select-data="item.selectData"
                            :select-prop="item.searchKeyProp"
                            :request-api="item?.searchDynamicApi"
                        />
                    </li>
                    <li class="ever-el-dialog-trem__close">
                        <em class="bt-icon bt-icon-delete" @click="onClickRemove(index, item)"></em>
                    </li>
                </ul>
            </div>
        </el-scrollbar>

        <div class="ever-el-dialog__add">
            <bt-button type="text" @click="onClickAdd">
                <em class="bt-icon bt-icon-plus"></em>
                <span>添加筛选条件</span>
            </bt-button>
        </div>

        <template #footer>
            <bt-button type="blank" @click="dialogVisible = false">取消</bt-button>
            <bt-button @click="onSubmit">确 定</bt-button>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { TableScreen } from '../../types/table-screen'
import screenConfig from '../config'

import SecondaryPlainTerm from './secondary-plain-term.vue'
// const emit = defineEmits<{
//     (e: 'submit', value: TableScreen.Term[]): void
// }>()

const emits = defineEmits(['submit'])
interface IProps {
    config?: TableScreen.Term[]
}
const props = withDefaults(defineProps<IProps>(), { config: [] as any })

/** 弹窗状态 */
const dialogVisible = ref(false)
/** 条件 列表 */
const termList = ref([]) as Ref<TableScreen.Term[]>
/** 字段 下来列表项 */
const selectField = ref([]) as Ref<any[]>

/** 页面初始化 */
function init() {
    props.config?.forEach(v => {
        selectField.value.push({
            value: v.prop,
            label: v.label,
            type: v.searchPropType,
            tag: v.searchPropType,
            disabled: v.defaultSearchItem == 1 ? true : false,
        })
        if (v.defaultSearchItem) {
            const obj = { ...JSON.parse(JSON.stringify(v)), searchDynamicApi: v.searchDynamicApi }
            termList.value.push(obj)
        }
    })
}

/** 高级搜索 按钮点击事件 */
function onClick() {
    dialogVisible.value = true
}

/** 增加 条件 */
function onClickAdd() {
    termList.value.push({
        /** 唯一标识 */
        id: '',
        /** 表格列 字段 */
        prop: '',
        /** 中文名称 */
        label: '',
        /** 表格列类型 */
        propType: 1,
        /** 筛选条件 操作符集合 */
        condition: [],
        /** 选中的操作符 */
        conditionValue: '',
        /** 是否外露 */
        defaultSearchItem: 0,
        /** 下拉框数据 */
        selectData: [],
        /** 值 */
        value: '',
        searchPropType: 'text',
    })
}
/** 删除 条件 */
function onClickRemove(index, i) {
    if (i?.prop) {
        selectField.value.forEach(item => {
            if (i.prop == item.value) {
                item.disabled = false //不可选
            }
        })
    }
    termList.value.splice(index, 1)
}

/** 字段 选择完成后 */
function onChangeField(value, item) {
    selectField.value.forEach(val => {
        if (val.value == value) {
            const index = termList.value.findIndex(i => i.prop == item.prop)
            termList.value[index] = props.config?.find(i => i.prop == item.prop) || item
            // item = props.config?.find(i => i.prop == item.prop) || {}
            termList.value[index].value = ''
            termList.value[index].condition = screenConfig.term.field[
                val.tag == 'date' || val.tag == 'datetime' ? 'datetime' : val.tag
            ]?.map(v => {
                return {
                    label: screenConfig.term.config[v],
                    value: v,
                }
            })
            termList.value[index].conditionValue = termList.value[index].condition[0].value
        }
        val.disabled = false
    })
    termList.value.forEach(i => {
        selectField.value.forEach(item => {
            if (i.prop == item.value) {
                item.disabled = true //不可选
            }
        })
    })
}
/** 条件切换完成后清空上一个条件的值 */
function onChangeCondition(item) {
    item.value = null
}
/** 表单提交，确定事件 */
function onSubmit() {
    // 搜索条件值为空时，不应传递给接口
    let filter: TableScreen.Term[] = []
    termList.value.forEach(item => {
        item.value && filter.push(item)
    })
    emits('submit', filter)
    dialogVisible.value = false
}

// 初始调用
init()
</script>

<template>
    <el-button type="primary" plain @click="onDialogVisibleClick"> 高级查询 </el-button>
    <!-- 方案选择 -->
    <bt-select
        v-model="state.copySenceInfo.defaultSence"
        :clearable="false"
        @change="handleSelDefSence"
    >
        <el-option
            v-for="item in state.copySenceInfo?.senceList"
            :key="`${item.id}Select`"
            :label="item.name"
            :value="item.id"
        />
    </bt-select>
    <el-dialog
        v-if="state.dialogVisible"
        v-model="state.dialogVisible"
        width="1140px"
        class="bt-advsearchbar-dialog2"
        title="高级查询"
        :append-to-body="true"
        draggable
        :close-on-click-modal="false"
        @close="handleClose"
    >
        <el-scrollbar max-height="60vh">
            <div class="bt-advsearchbar-dialog--content">
                <!-- 左侧方案列表 -->
                <div class="bt-advsearchbar-dialog--sence">
                    <div v-for="(item, index) in state.copySenceInfo?.senceList" :key="item.id">
                        <div
                            v-if="!item.edit"
                            class="bt-advsearchbar-list-item"
                            :class="item.active ? 'bt-advsearchbar-list-item-active' : ''"
                            @click="handleSelSence(item, index)"
                        >
                            <div class="bt-advsearchbar-list-label">
                                {{ item.name }}
                            </div>
                            <div class="bt-advsearchbar-icon">
                                <el-icon
                                    :color="item.active ? '#5C84F2' : ''"
                                    @click.stop="handleEditSence(item, index)"
                                >
                                    <EditPen />
                                </el-icon>
                            </div>
                            <div class="bt-advsearchbar-icon">
                                <el-icon
                                    v-if="item.canDel && !item?.innerSence"
                                    :color="item.active ? '#5C84F2' : ''"
                                    @click.stop="handleDelSence(item, index)"
                                >
                                    <Delete />
                                </el-icon>
                            </div>
                        </div>
                        <div
                            v-else
                            class="bt-advsearchbar-list-item"
                            :class="item.edit ? 'bt-advsearchbar-list-item-edit' : ''"
                        >
                            <el-input
                                :ref="el => getInputRef(el, item.id)"
                                v-model="item.name"
                                :name="item.id"
                                @blur="handleBlur"
                            />
                        </div>
                    </div>
                </div>
                <div class="bt-advsearchbar-dialog--container2">
                    <ul
                        v-for="(item, index) in state.copySenceInfo?.senceList[
                            state.activeSenceIndex
                        ]?.searchList"
                        :key="item.id"
                    >
                        <li class="bt-advsearchbar-dialog--item">
                            <el-select
                                v-model="item.id"
                                placeholder="请选择"
                                filterable
                                @change="onColumnChanged(item)"
                            >
                                <template v-for="opt in props.columnList" :key="opt.id">
                                    <el-option
                                        v-if="opt.searchProps.enable"
                                        :label="opt.label"
                                        :value="opt.id"
                                        :disabled="
                                            checkPropDisabled(
                                                opt,
                                                state.copySenceInfo?.senceList[
                                                    state.activeSenceIndex
                                                ],
                                            )
                                        "
                                    />
                                </template>
                            </el-select>
                        </li>
                        <li class="bt-advsearchbar-dialog--expression">
                            <el-select
                                v-model="item.searchCondition"
                                placeholder="请选择"
                                filterable
                                @change="onSearchConditionChanged(item)"
                            >
                                <template v-for="(obj, key) in expressConfig" :key="key">
                                    <el-option
                                        v-if="supportCondition(item.id, key)"
                                        :label="obj.value + obj.name"
                                        :value="key"
                                    />
                                </template>
                            </el-select>
                        </li>
                        <li class="bt-advsearchbar-dialog--value">
                            <AdvSearchItem
                                v-if="item.columConfig && supportInputElement(item)"
                                v-model:modelValue="item.searchValue"
                                :show-label="false"
                                :column-props="item.columConfig"
                                :search-props="item"
                                :show-condition="false"
                            />
                        </li>
                        <li class="bt-advsearchbar-dialog--delete">
                            <el-icon class="bt-advsearchbar-icon-delete">
                                <CircleClose @click="onDeleteItem(item, index)" />
                            </el-icon>
                            <el-checkbox
                                v-model="item.searchVisible"
                                label="外露"
                                size="large"
                                @change="handleItemExopse"
                            />
                        </li>
                    </ul>
                    <div class="bt-advsearchbar-align">
                        <div class="bt-advsearchbar-dialog--toolbar">
                            <bt-button type="blank" :link="true" @click="onAddItem">
                                <em class="bt-icon bt-icon-plus"></em>
                                <span class="bt-ml">添加筛选条件</span>
                            </bt-button>
                        </div>
                        <div class="bt-advsearchbar-dialog--toolbar">
                            <bt-button type="blank" :link="true">
                                <el-checkbox
                                    v-model="
                                        state.copySenceInfo.senceList[state.activeSenceIndex]
                                            .setDefaultSence
                                    "
                                    label="设置为默认"
                                    size="large"
                                    @change="handleSetDefaultSence"
                                />
                            </bt-button>
                        </div>
                        <div class="bt-advsearchbar-dialog--toolbar">
                            <bt-button type="blank" :link="true">
                                <el-checkbox
                                    v-model="
                                        state.copySenceInfo.senceList[state.activeSenceIndex]
                                            .allExpose
                                    "
                                    label="全部外露"
                                    size="large"
                                    @change="handleAllExpose"
                                />
                            </bt-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>

        <template #footer>
            <!-- <bt-button type="blank" @click="state.dialogVisible = false">取消</bt-button> -->
            <bt-button type="blank" @click="handleClose">取 消</bt-button>
            <el-button type="primary" plain @click="handleSaveSence">保存方案</el-button>
            <el-button type="primary" plain @click="handleSaveAs">另存方案</el-button>
            <bt-button @click="onSubmit">查 询</bt-button>
        </template>
    </el-dialog>
    <el-dialog
        v-if="state.dialogSaveVisible"
        v-model="state.dialogSaveVisible"
        width="432px"
        class="bt-advsearchbar-dialog2"
        title="另存方案"
        :append-to-body="true"
        draggable
    >
        <el-form
            ref="ruleFormRef"
            :model="state.ruleForm"
            :rules="rules"
            label-width="120px"
            label-position="top"
            status-icon
            class="bt-advsearchbar-form"
        >
            <el-form-item label="方案名称" prop="name">
                <el-input v-model="state.ruleForm.name" />
            </el-form-item>
            <span class="bt-advsearchbar-form-desc">说明：对页面配置的筛选条件进行另存方案</span>
        </el-form>
        <template #footer>
            <bt-button type="blank" @click="state.dialogSaveVisible = false">取消</bt-button>
            <bt-button @click="handleSaveAsConfirm(ruleFormRef)">确 定</bt-button>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { nextTick, reactive, ref, watch } from 'vue'
import { EditPen, Delete, CircleClose } from '@element-plus/icons-vue'
import AdvSearchItem from './adv-searchbar-item.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { BtUseAppStore } from '@beeboat/core'
import cloneDeep from 'lodash-es/cloneDeep'
const emits = defineEmits(['search', 'visibleChange', 'watchSearchList', 'searchBarChange'])
const ruleFormRef = ref<FormInstance>()

const expressConfig = {
    in: {
        name: '包含',
        value: '⊃',
    },
    notIn: {
        name: '不包含',
        value: '⊅',
    },
    eq: {
        name: '等于',
        value: '=',
    },
    ne: {
        name: '不等于',
        value: '≠',
    },
    like: {
        name: '包含',
        value: '⊃',
    },
    notlike: {
        name: '不包含',
        value: '⊅',
    },
    isNull: {
        name: '为空',
        value: '∅',
    },
    isNotNull: {
        name: '不为空',
        value: 'N∅',
    },
    gt: {
        name: '大于',
        value: '>',
    },
    lt: {
        name: '小于',
        value: '<',
    },
    ge: {
        name: '大于等于',
        value: '≥',
    },
    le: {
        name: '小于等于',
        value: '≤',
    },
    gele: {
        name: '等于(范围)',
        value: '~',
    },
}

//当前页面数据绑定对象
const state = reactive({
    dialogVisible: false,
    searchText: '',
    dialogSaveVisible: false, // 另存为弹窗
    ruleForm: {
        name: '',
    },
    activeSenceIndex: 0, // 左侧方案选中index
    activeSenceId: '', // 左侧方案选中id
    exposeSearchList: [] as any, // 外露查询条件

    baseSenceInfo: {} as any, // 初始方案数据，仅用于保存和另存。因为修改了方案1，又修改了方案2，这时候点保存，需要保证方案1不变，仅保存方案2
    copySenceInfo: {} as any, // copy一分方案信息，用于弹窗内
    initSenceInfo: {} as any, // 用于处理问题：另存一个方案1后，切换到方案1，修改方案1，不保存直接关闭，再次打开弹窗，需要恢复到未修改前的状态
    closeSenceInfo: {} as any, // 用于关闭弹窗赋值用
})

const rules = reactive<FormRules>({
    name: [{ required: true, message: '请输入方案名称', trigger: 'blur' }],
})

interface IProps {
    columnList?: any
    componentId?: any
    senceInfo?: any
    senceId?: any
    exposeSearchList?: any
}
const props = withDefaults(defineProps<IProps>(), {
    columnList: [],
    senceInfo: {},
    exposeSearchList: [],
})
watch(
    () => state.dialogVisible,
    val => {
        emits('visibleChange', val)
    },
)

// 选择左侧方案
const handleSelSence = (item, index) => {
    state.activeSenceIndex = index // 获取选中方案的index值
    state.activeSenceId = item.id // 获取选中方案id
    // 先把所有列信息的searchVisible转为false
    props.columnList.forEach(el => {
        if (el.searchProps) {
            el.searchProps.searchVisible = false
        }
    })
    // 改变columnList的 searchVisible, 当被选择后禁用下拉选项
    state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList.forEach(senceItem => {
        if (props.columnList.length > 0) {
            props.columnList.filter(el => {
                if (el.id == senceItem.id) {
                    el.searchProps.searchVisible = true
                }
            })
        }
    })
    // 处理选中
    state.copySenceInfo?.senceList.forEach(el => {
        if (el.id === item.id) {
            el.active = true
        } else {
            el.active = false
        }
        el.edit = false
    })
    // 处理全部外露复选框状态
    let flag = true
    state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList.forEach(searchItem => {
        if (!searchItem.searchVisible) {
            flag = false
        }
    })
    if (state.copySenceInfo?.senceList[state.activeSenceIndex]) {
        state.copySenceInfo.senceList[state.activeSenceIndex].allExpose = flag
        // // 根据选择的方案，更改外层默认选择的方案
        // state.copySenceInfo.defaultSence = state.copySenceInfo.senceList[state.activeSenceIndex].id
        // // 根据选择的方案，更改外层外露查询条件
        // emits('searchBarChange')
    }

    console.log('handleSelSence----------', state.copySenceInfo.senceList, state.activeSenceIndex)
}

// 为了使左侧方案列表点编辑时获取焦点
const inputRef = reactive({})
const getInputRef = (el, id) => {
    inputRef[id] = el
}

const handleEditSence = (item, index) => {
    state.activeSenceIndex = index
    state.copySenceInfo?.senceList.forEach(el => {
        if (el.id === item.id) {
            el.edit = true
            el.active = true
        } else {
            el.edit = false
            el.active = false
        }
    })
    nextTick(() => {
        inputRef[item.id].focus()
    })
    console.log('handleEditSence----------', item, index)
}

const handleDelSence = async (item, index) => {
    console.log('handleDelSence----------', item)
    state.baseSenceInfo.senceList.splice(index, 1)
    const res = await BtUseAppStore().saveSence(props.senceId, state.baseSenceInfo)
    if (res.code == 0) {
        state.copySenceInfo?.senceList.splice(index, 1)
        state.copySenceInfo?.senceList.forEach((el, num) => {
            if (el?.setDefaultSence) {
                state.activeSenceIndex = num
                state.copySenceInfo.defaultSence = el.id
                el.active = true
            } else {
                el.active = false
            }
        })

        state.initSenceInfo = cloneDeep(state.copySenceInfo)
        if (state.copySenceInfo?.senceList.length > 1) {
            state.copySenceInfo?.senceList.forEach((el, elIndex) => {
                if (el.id == state.activeSenceId) {
                    state.activeSenceIndex = elIndex
                }
            })
        } else if (state.copySenceInfo?.senceList.length == 1) {
            state.activeSenceIndex = 0
            state.copySenceInfo.defaultSence =
                state.copySenceInfo.senceList[state.activeSenceIndex].id
            state.copySenceInfo.senceList[state.activeSenceIndex].active = true
        }
        console.log('handleDelSence--after--------', state.copySenceInfo, state.activeSenceIndex)
        ElMessage({
            type: 'success',
            message: '删除成功！',
            zIndex: 1000000,
        })
    } else {
        ElMessage({
            type: 'error',
            message: res.msg,
            zIndex: 1000000,
        })
    }
}

const handleBlur = async () => {
    state.copySenceInfo?.senceList.forEach(el => {
        el.edit = false
    })
    // 失去焦点调用保存
    console.log('-失去焦点调用保存----------------------', state.baseSenceInfo.senceList)
    state.baseSenceInfo.senceList[state.activeSenceIndex].name =
        state.copySenceInfo?.senceList[state.activeSenceIndex].name
    const res = await BtUseAppStore().saveSence(props.senceId, state.baseSenceInfo)
    if (res.code == 0) {
        state.initSenceInfo = cloneDeep(state.copySenceInfo)
        ElMessage({
            type: 'success',
            message: '修改成功！',
            zIndex: 1000000,
        })
    } else {
        ElMessage({
            type: 'error',
            message: res.msg,
            zIndex: 1000000,
        })
    }
}

//判断字段是否已经选择
const checkPropDisabled = (column, senceData) => {
    let searchVisible = false
    senceData.searchList.forEach(item => {
        if (item.id == column.id) {
            searchVisible = item.searchVisible
        }
    })
    return searchVisible
}

//选择的列发生变化
const onColumnChanged = currentItem => {
    // 清空上一次的值
    currentItem.searchValue = []
    props.columnList.forEach(column => {
        const searchColumn = state.copySenceInfo?.senceList[
            state.activeSenceIndex
        ]?.searchList.find(item => {
            return column.id == item.id
        })
        if (searchColumn) {
            searchColumn.columConfig = column
        }
    })

    console.log('11111',currentItem)
    let currentComponentType = JSON.parse(JSON.stringify(currentItem?.columConfig?.searchProps?.componentType))
    if (currentComponentType) {
        switch (currentComponentType) {
            case 'text':
                currentItem.searchCondition = 'like'
                break
            case 'number':
                currentItem.searchCondition = 'eq'
                break
            case 'date':
                currentItem.searchCondition = 'gele'
                break
            case 'datetime':
                currentItem.searchCondition = 'gele'
                break
            case 'time':
                currentItem.searchCondition = 'gele'
                break
            case 'select':
                currentItem.searchCondition = 'in'
                break
            case 'tree':
                currentItem.searchCondition = 'in'
                break
            default:
                currentItem.searchCondition = ''
                break
        }
    }
    console.log(
        '选择的列发生变化--------props.columnList----',
        state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList,
        props.columnList,
    )
}

const onSearchConditionChanged = currentItem => {
    currentItem.searchValue = []
}
//添加新列
const onAddItem = () => {
    if (state.copySenceInfo?.senceList[state.activeSenceIndex].allExpose) {
        state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList.push({
            id: '',
            searchCondition: '',
            searchValue: [],
            searchVisible: true,
        })
    } else {
        state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList.push({
            id: '',
            searchCondition: '',
            searchValue: [],
            searchVisible: false,
        })
    }
    console.log(
        '添加新列--state.senceInfo.searchList------',
        state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList,
    )
}
//删除列
const onDeleteItem = (item, index) => {
    if (item?.id) {
        props.columnList.forEach(column => {
            if (column.id == item.id) {
                column.searchProps.searchVisible = false
            }
        })
    }
    state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList.splice(index, 1)
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
        item.searchCondition &&
        (item.searchCondition == 'isNull' || item.searchCondition == 'isNotNull')
    ) {
        return false
    }
    return true
}

// 筛选条件外露设置
const handleItemExopse = val => {
    let flag = true
    state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList.forEach(item => {
        if (!item.searchVisible) {
            flag = false
        }
    })
    if (state.copySenceInfo?.senceList[state.activeSenceIndex]) {
        state.copySenceInfo.senceList[state.activeSenceIndex].allExpose = flag
    }
    console.log(
        '外露项------',
        val,
        state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList,
    )
}

// 设置为默认方案
const handleSetDefaultSence = () => {
    state.copySenceInfo?.senceList.forEach((item, index) => {
        if (index == state.activeSenceIndex) {
            state.copySenceInfo.defaultSence = item.id
            state.baseSenceInfo.defaultSence = item.id
            item.setDefaultSence = true
            item.canDel = false
        } else {
            item.setDefaultSence = false
            item.canDel = true
        }
    })
    state.baseSenceInfo?.senceList.forEach((item, index) => {
        if (index == state.activeSenceIndex) {
            item.setDefaultSence = true
            item.canDel = false
        } else {
            item.setDefaultSence = false
            item.canDel = true
        }
    })
    console.log('设置为默认方案-state.copySenceInfo----------', state.copySenceInfo)
}

// 全部外露
const handleAllExpose = val => {
    console.log(
        '全部外露------',
        val,
        state.copySenceInfo?.senceList[state.activeSenceIndex],
        state.baseSenceInfo.senceList[state.activeSenceIndex],
    )
    if (state.copySenceInfo?.senceList[state.activeSenceIndex]) {
        state.copySenceInfo.senceList[state.activeSenceIndex].allExpose = val
        state.baseSenceInfo.senceList[state.activeSenceIndex].allExpose = val
    }
    if (val) {
        state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList.forEach(item => {
            item.searchVisible = true
        })
        state.baseSenceInfo?.senceList[state.activeSenceIndex]?.searchList.forEach(item => {
            item.searchVisible = true
        })
    } else {
        state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList.forEach(item => {
            item.searchVisible = false
        })
        state.baseSenceInfo?.senceList[state.activeSenceIndex]?.searchList.forEach(item => {
            item.searchVisible = false
        })
    }
}

const handleClose = () => {
    state.copySenceInfo = cloneDeep(state.closeSenceInfo)
    state.dialogVisible = false
    console.log(
        '关闭弹窗--state.copySenceInfo, state.closeSenceInfo, state.initSenceInfo, state.baseSenceInfo,---------',
        state.copySenceInfo,
        state.closeSenceInfo,
        state.initSenceInfo,
        state.baseSenceInfo,
    )
}

// 保存方案
const handleSaveSence = async () => {
    state.initSenceInfo = cloneDeep(state.copySenceInfo)
    state.baseSenceInfo.senceList[state.activeSenceIndex] = state.copySenceInfo?.senceList[state.activeSenceIndex]

    // state.closeSenceInfo.senceList[state.activeSenceIndex] = state.copySenceInfo?.senceList[state.activeSenceIndex]
    console.log(
        '保存方案---state.activeSenceIndex, state.baseSenceInfo, state.copySenceInfo, state.closeSenceInfo-------',
        state.activeSenceIndex,
        state.baseSenceInfo,
        state.copySenceInfo,
        state.closeSenceInfo,
    )
    const res = await BtUseAppStore().saveSence(props.senceId, state.baseSenceInfo)
    console.log('保存方案----res-------====================------------', res)
    if (res.code == 0) {
        ElMessage({
            type: 'success',
            message: '保存成功！',
            zIndex: 1000000,
        })

    } else {
        ElMessage({
            type: 'error',
            message: res.msg,
            zIndex: 1000000,
        })
    }
}

// 另存为
const handleSaveAs = () => {
    state.ruleForm.name = ''
    state.dialogSaveVisible = true
}

// 另存为确定
const handleSaveAsConfirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async valid => {
        if (valid) {
            let obj = JSON.parse(
                JSON.stringify(state.copySenceInfo?.senceList[state.activeSenceIndex]),
            )
            obj.name = state.ruleForm.name
            obj.id = Math.round(Math.random() * 100000000).toString()
            obj.active = false
            obj.canDel = true
            obj.innerSence = false
            obj.setDefaultSence = false
            // 判断方案名是否重复
            const el = state.copySenceInfo?.senceList.find(item => {
                return item.name == obj.name
            })
            if (el) {
                ElMessage({
                    type: 'warning',
                    message: '方案名不能重复！',
                    zIndex: 1000000,
                })
            } else {
                state.copySenceInfo?.senceList.push(obj)
                state.baseSenceInfo.senceList.push(obj)
                state.closeSenceInfo.senceList.push(obj)
                state.initSenceInfo = cloneDeep(state.copySenceInfo)

                console.log(
                    '另存方案-state.activeSenceIndex,state.baseSenceInfo,state.copySenceInfo,state.initSenceInfo,state.closeSenceInfo,---------',
                    state.activeSenceIndex,
                    state.baseSenceInfo,
                    state.copySenceInfo,
                    state.initSenceInfo,
                    state.closeSenceInfo,
                )
                const res = await BtUseAppStore().saveSence(props.senceId, state.baseSenceInfo)
                if (res.code == 0) {
                    ElMessage({
                        type: 'success',
                        message: '保存成功！',
                        zIndex: 1000000,
                    })
                    state.dialogSaveVisible = false
                } else {
                    ElMessage({
                        type: 'error',
                        message: res.msg,
                        zIndex: 1000000,
                    })
                }
            }
        }
    })
}

// 查询
const onSubmit = () => {
    const advQueryParam: any = []
    state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList.forEach(item => {
        if (item.searchCondition == 'isNull' || item.searchCondition == 'isNotNull') {
            advQueryParam.push({
                value: [],
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

    // 根据选择的方案，更改外层默认选择的方案
    state.copySenceInfo.defaultSence = state.copySenceInfo.senceList[state.activeSenceIndex].id
    // 根据选择的方案，更改外层外露查询条件
    emits('searchBarChange', state.copySenceInfo)
    console.log(
        '提交:advQueryParam, state.copySenceInfo----------',
        advQueryParam,
        state.copySenceInfo,
        state.copySenceInfo?.defaultSence,
    )
    //触发搜索事件
    emits('search', { advQueryParam: advQueryParam })
    state.dialogVisible = false
}

//初始化弹窗
const initDialog = (data: any) => {
    data?.senceList.forEach((item, index) => {
        // 根据下拉列表设置弹窗内默认选中方案
        if (item.id == data.defaultSence) {
            item.active = true
            state.activeSenceIndex = index // 获取弹窗左侧选中方案的index
        } else {
            item.active = false
        }
    })
    // 改变columnList的 searchVisible, 当被选择后禁用下拉选项
    data?.senceList[state.activeSenceIndex]?.searchList.forEach(item => {
        if (props.columnList.length > 0) {
            props.columnList.filter(el => {
                if (el.id == item.id) {
                    el.searchProps.searchVisible = true
                }
            })
        }
    })
    if (data?.senceList[state.activeSenceIndex]?.searchList.length == 0) {
        onAddItem()
    }
    console.log(
        'state.baseSenceInfo,state.copySenceInfo-------------',
        state.baseSenceInfo,
        state.copySenceInfo,
    )
}

watch(
    () => props.senceInfo,
    (newValue, oldValue) => {
        // state.copySenceInfo = JSON.parse(JSON.stringify(newValue))
        state.copySenceInfo = cloneDeep(newValue)
        console.log(
            '监听props.senceInfo变化，改变copySenceInfo-----state.copySenceInfo--------',
            newValue,
            oldValue,
            state.copySenceInfo,
        )
        initDialog(state.copySenceInfo)
    },
    {
        deep: true,
        immediate: true,
    },
)

// 选择方案
const handleSelDefSence = val => {
    state.copySenceInfo?.senceList.forEach((item, index) => {
        if (item?.id == val) {
            state.activeSenceIndex = index
        }
    })
    // 先把所有列信息的searchVisible转为false
    props.columnList.forEach(el => {
        if (el.searchProps) {
            el.searchProps.searchVisible = false
        }
    })
    // 改变columnList的 searchVisible, 当被选择后禁用下拉选项
    state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList.forEach(item => {
        if (props.columnList.length > 0) {
            props.columnList.filter(el => {
                if (el.id == item.id) {
                    el.searchProps.searchVisible = true
                }
            })
        }
    })
    // emits('watchSearchList', {
    //     searchList: props.senceInfo?.senceList[state.activeSenceIndex]?.searchList,
    // })
    console.log(
        '选择默认方案---state.copySenceInfo------------',
        state.activeSenceIndex,
        state.copySenceInfo,
    )
    onSubmit()
}

//点击高级搜索按钮
const onDialogVisibleClick = () => {
    if (state.initSenceInfo?.senceList?.length > 0) {
        state.copySenceInfo = cloneDeep(state.initSenceInfo)
    }
    console.log(
        '点击高级搜索按钮--props.senceInfo--props.exposeSearchList,--state.copySenceInfo-----------',
        props.senceInfo,
        props.exposeSearchList,
        state.copySenceInfo,
        state.activeSenceIndex,
    )
    if (props.exposeSearchList?.length) {
        props.exposeSearchList.forEach(item => {
            state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList.filter(subItem => {
                if (item.id == subItem.id) {
                    subItem.searchValue = item.searchValue
                }
            })
        })
    }
    console.log(
        '点击高级搜索按钮修改值后--state.copySenceInfo-----------',
        props.senceInfo,
        state.copySenceInfo,
    )
    state.dialogVisible = true
    // 给baseSenceInfo 赋值，并设置defaultSence为默认不可删除方案
    // state.baseSenceInfo = JSON.parse(JSON.stringify(state.copySenceInfo))
    state.baseSenceInfo = cloneDeep(state.copySenceInfo)
    state.baseSenceInfo?.senceList.find(item => {
        if (item.setDefaultSence) {
            state.baseSenceInfo.defaultSence = item.id
        }
    })
    state.copySenceInfo?.senceList.forEach((item, index) => {
        // 根据下拉列表设置弹窗内默认选中方案
        if (item?.id == state.copySenceInfo.defaultSence) {
            item.active = true
            state.activeSenceIndex = index // 获取弹窗左侧选中方案的index
        } else {
            item.active = false
        }
    })
    let flag = true
    state.copySenceInfo?.senceList[state.activeSenceIndex]?.searchList.forEach(item => {
        if (!item.searchVisible) {
            flag = false
        }
    })
    if (state.copySenceInfo?.senceList[state.activeSenceIndex]) {
        state.copySenceInfo.senceList[state.activeSenceIndex].allExpose = flag
    }

    state.closeSenceInfo = cloneDeep(state.copySenceInfo)
    console.log(
        '点击高级搜索按钮 state.copySenceInfo, state.baseSenceInfo, state.closeSenceInfo-------------',
        state.copySenceInfo,
        state.baseSenceInfo,
        state.closeSenceInfo,
    )
}
</script>

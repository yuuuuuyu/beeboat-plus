<template>
    <el-dialog
        v-model="state.dialogVisible"
        width="1140px"
        class="bt-advsearchbar-ex-dialog"
        title="高级查询"
        :append-to-body="true"
        :close-on-click-modal="false"
        draggable
    >
        <el-scrollbar max-height="60vh">
            <div class="bt-advsearchbar-dialog--content">
                <!-- 左侧方案列表 -->
                <div class="bt-advsearchbar-dialog--sence">
                    <div v-for="(item, index) in state.senceData?.senceList" :key="item.id">
                        <div
                            class="bt-advsearchbar-list-item"
                            :class="item.active ? 'active' : ''"
                            @click="onSenceClick(item.id)"
                        >
                            <div class="bt-advsearchbar-list-label">
                                <span v-if="!item.editing">{{ item.name }}</span>
                                <el-input
                                    v-if="item.editing"
                                    :ref="el => getInputRef(el, item.id)"
                                    v-model="item.name"
                                    @blur="onSaveSenceName(item)"
                                />
                            </div>
                            <div v-if="item.active && !item.editing" style="display: flex">
                                <el-icon @click.stop="onEditSenceNameClick(item)">
                                    <EditPen />
                                </el-icon>
                                <el-icon
                                    v-if="!item.inner"
                                    @click.stop="onSenceDeleteClick(item, index)"
                                >
                                    <Delete />
                                </el-icon>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bt-advsearchbar-ex-dialog--container">
                    <div
                        v-for="(item, index) in state.searchList"
                        :key="item.id"
                        style="display: flex; flex-direction: row; margin-bottom: 12px"
                    >
                        <el-select
                            v-model="item.id"
                            class="bt-advsearchbar-ex-dialog--label"
                            placeholder="请选择"
                            filterable
                            @change="onItemChange(item)"
                        >
                            <template v-for="opt in props.columnList" :key="opt.id">
                                <el-option
                                    v-if="opt.searchProps.enable"
                                    :label="opt.label"
                                    :value="opt.id"
                                    :disabled="checkPropDisabled(opt)"
                                />
                            </template>
                        </el-select>
                        <el-select
                            v-model="item.searchCondition"
                            class="bt-advsearchbar-ex-dialog--condition"
                            placeholder="请选择"
                            @change="onItemConditionChange(item)"
                        >
                            <template v-for="(obj, key) in expressConfig" :key="key">
                                <el-option
                                    v-if="supportCondition(item.columnConfig, key)"
                                    :label="obj.value + obj.name"
                                    :value="key"
                                />
                            </template>
                        </el-select>
                        <AdvSearchItem
                            v-if="!supportInput(item.searchCondition)"
                            v-model:modelValue="item.searchValue"
                            :show-label="false"
                            :column-props="item.columnConfig"
                            :search-props="item"
                            :show-condition="false"
                        />
                        <el-button
                            class="bt-advsearchbar-ex-dialog--delete"
                            :icon="CircleClose"
                            link
                            @click="onDeleteItem(item, index)"
                        />
                        <el-checkbox
                            v-model="item.searchVisible"
                            label="外露"
                            @change="onExposeClick"
                        />
                    </div>
                    <div class="bt-advsearchbar-ex-dialog--toolbar">
                        <el-button
                            type="info"
                            :link="true"
                            style="margin-left: -4px"
                            @click="onAddItem"
                        >
                            <em class="bt-icon bt-icon-plus"></em>
                            <span class="bt-ml">添加筛选条件</span>
                        </el-button>
                    </div>
                    <div class="bt-advsearchbar-ex-dialog--toolbar">
                        <el-checkbox
                            v-model="state.defaultSence"
                            label="设置为默认"
                            @change="onDefaultClick"
                        />
                    </div>
                    <div class="bt-advsearchbar-ex-dialog--toolbar">
                        <el-checkbox
                            v-model="state.exposeAll"
                            label="全部外露"
                            @change="onExposeAllClick"
                        />
                    </div>
                </div>
            </div>
        </el-scrollbar>
        <template #footer>
            <el-button type="info" @click="state.dialogVisible = false">取 消</el-button>
            <el-button type="primary" plain @click="onSaveClick">保存方案</el-button>
            <el-button type="primary" plain @click="onSaveAsClick">另存方案</el-button>
            <el-button @click="onSearchClick">查 询</el-button>
        </template>
    </el-dialog>
    <el-dialog
        v-model="state.dialogSaveVisible"
        width="432px"
        class="bt-advsearchbar-dialog2"
        title="另存方案"
        :append-to-body="true"
        draggable
    >
        <el-form
            ref="formRef"
            :model="state.sence"
            :rules="{ name: [{ required: true, message: '请输入方案名称', trigger: 'blur' }] }"
            label-width="120px"
            label-position="top"
            status-icon
            class="bt-advsearchbar-form"
        >
            <el-form-item label="方案名称" prop="name">
                <el-input v-model="state.sence.name" />
            </el-form-item>
            <span class="bt-advsearchbar-form-desc">说明：对页面配置的筛选条件进行另存方案</span>
        </el-form>
        <template #footer>
            <el-button type="info" @click="state.dialogSaveVisible = false">取消</el-button>
            <el-button @click="onSaveAsDialogClick">确 定</el-button>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
import cloneDeep from 'lodash-es/cloneDeep'
import { ElMessageBox, ElMessage } from 'element-plus'
import { EditPen, Delete, CircleClose } from '@element-plus/icons-vue'
import AdvSearchItem from './adv-searchbar-item.vue'
import {
    expressConfig,
    getDefaultSearchCondition,
    supportInput,
    supportCondition,
} from './bt-adv-searchbar'

const formRef = ref()
const emits = defineEmits([
    'save-sence',
    'update-sence',
    'delete-sence',
    'search',
    'defaultsence-change',
    'update-sencename',
])

interface IProps {
    senceInfo?: any
    columnList?: any
}
const props = withDefaults(defineProps<IProps>(), {
    senceInfo: {},
    columnList: [],
})

const state = reactive({
    dialogVisible: false,
    dialogSaveVisible: false,
    senceData: null as any,
    searchList: [] as any,
    sence: { name: '' },
    exposeAll: false,
    defaultSence: false,
})
const verifyNull = (list, callback) => {
    let isNull = false
    list.find((item: any) => {
        if (!item.id) {
            isNull = true
        }
    })
    if (isNull) {
        ElMessage({
            type: 'error',
            message: '筛选条件不能为空',
            appendTo: '.bt-advsearchbar-ex-dialog',
        })
        return false
    }
    callback && callback()
    return true
}
/**
 * 打开弹窗
 */
const openDialog = (senceData: any, _defaultSenceId: string) => {
    state.dialogVisible = true
    state.senceData = senceData || {}
    onSenceClick(_defaultSenceId)
    onExposeClick()
}

/**
 * 点击方案
 */
const onSenceClick = senceId => {
    let currentSence = null as any
    state.senceData.senceList.forEach(item => {
        item.editing = false
        if (item.id == senceId) {
            currentSence = item
            item.active = true
        } else {
            item.active = false
        }
    })
    const orignSence = props.senceInfo.senceList.find(item => {
        return item.id == currentSence.id
    })
    if (orignSence) {
        state.searchList = currentSence.searchList = cloneDeep(orignSence.searchList)
    }
    state.defaultSence = currentSence.id == state.senceData.defaultSenceId
}

/**
 * 保存方案名称
 * @param item 方案
 */
const onSaveSenceName = item => {
    item.editing = false
    emits('update-sencename', item)
}

/**
 * 删除方案
 */
const onSenceDeleteClick = (sence, index) => {
    ElMessageBox.confirm('是否确认删除该方案?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        appendTo: '.bt-advsearchbar-ex-dialog',
    }).then(() => {
        if (props.senceInfo.defaultSenceId == sence.id) {
            //删除默认方案后，设置第一个方案为默认方案，且选中
            onSenceClick(state.senceData.senceList[0].id)
        } else {
            //删除后选择上一个
            onSenceClick(state.senceData.senceList[index == 0 ? 1 : index - 1].id)
            state.senceData.senceList.splice(index, 1)
        }
        emits('delete-sence', sence)
    })
}

/**
 * 添加选项
 */
const onAddItem = () => {
    const index = state.searchList.findIndex(item => {
        return !item.searchVisible
    })
    state.searchList.push({ searchVisible: index == -1 })
}

/**
 * 选项变化
 * @param item 选项
 */
const onItemChange = item => {
    item.columnConfig = props.columnList.find(column => {
        return item.id == column.id
    })
    item.searchCondition =
        item.columnConfig.searchProps.searchCondition ||
        getDefaultSearchCondition(item.columnConfig.searchProps.componentType)
    item.searchValue = []
}

/**
 * 选项条件变化
 * @param item 选项
 */
const onItemConditionChange = item => {
    item.searchValue = []
}

/**
 * 设置默认方案点击变化
 */
const onDefaultClick = () => {
    state.defaultSence = true
    const currentSence = state.senceData.senceList.find(item => {
        return item.active
    })
    if (currentSence) {
        state.senceData.defaultSenceId = currentSence.id
        emits('defaultsence-change', currentSence.id)
    }
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
const onDeleteItem = (_item, index) => {
    state.searchList.splice(index, 1)
}

const onSaveClick = () => {
    const sence = state.senceData?.senceList.find(item => {
        return item.active
    })
    sence.searchList = cloneDeep(state.searchList)
    verifyNull(sence.searchList, () => {
        emits('update-sence', sence)
    })
}
const onSaveAsClick = () => {
    const sence = state.senceData?.senceList.find(item => {
        return item.active
    })
    sence.searchList = cloneDeep(state.searchList)
    verifyNull(sence.searchList, () => {
        state.dialogSaveVisible = true
        state.sence.name = ''
    })
}

const onSaveAsDialogClick = () => {
    formRef.value.validate(valid => {
        if (valid) {
            state.dialogSaveVisible = false
            const sence = state.senceData?.senceList.find(item => {
                return item.active
            })
            const newSence = Object.assign(cloneDeep(sence), {
                id: `sence${Math.round(Math.random() * 100000000).toString()}`,
                name: state.sence.name,
                inner: false,
            })
            newSence.searchList = cloneDeep(state.searchList)
            state.senceData.senceList.push(newSence)
            onSenceClick(newSence.id)
            emits('save-sence', newSence)
        }
    })
}

const onSearchClick = () => {
    verifyNull(state.searchList, () => {
        const sence = state.senceData?.senceList.find(item => {
            return item.active
        })
        state.dialogVisible = false
        emits('search', sence)
    })
}
// 为了使左侧方案列表点编辑时获取焦点
const inputRef = reactive({})
const getInputRef = (el, id) => {
    inputRef[id] = el
}

const onEditSenceNameClick = item => {
    item.editing = true
    nextTick(() => {
        inputRef[item.id].focus()
    })
}
/**
 * 判断字段是否已经选择。如果已选择，disabled= true
 */
const checkPropDisabled = column => {
    let searchVisible = false
    state.searchList.forEach(item => {
        if (item.id == column.id) {
            searchVisible = item.searchVisible
        }
    })
    return searchVisible
}

/**
 * 暴露给父组件的参数和方法
 */
defineExpose({
    openDialog,
})
</script>

<template>
    <div ref="everDom" :class="['ever-table-screen', { 'ever-table-screen--all': isShowFold }]">
        <div
            ref="everTjDom"
            class="ever-table-screen-tj"
            :class="[isShowFold ? 'unfold-index' : 'fold-index']"
        >
            <div v-if="props.isBtnShow" class="ever-table-screen__operation">
                <bt-button v-if="isShowFoldBtn" type="text" @click="onZheDie">
                    {{ isShowFold ? '折叠' : '展开' }}
                    <el-icon class="el-icon--right">
                        <CaretTop v-if="isShowFold" />
                        <CaretBottom v-else />
                    </el-icon>
                </bt-button>
                <bt-button @click="onSubmit([])">查 询</bt-button>
                <bt-button type="blank" @click="onReset">重 置</bt-button>
                <secondary-plain v-if="props.isSenior" :config="configAll" @submit="onSubmit" />
            </div>

            <slot></slot>
            <template v-for="item in configExposure" :key="item.id">
                <div v-if="Boolean(item.defaultSearchItem)" class="ever-table-screen__item">
                    <div class="ever-table-screen__item--label">
                        <div :title="item.label.length > 6 ? item.label : ''" class="ever-table-screen__item--name">{{ item.label }}</div>
                    </div>
                    <div class="ever-table-screen__item--content">
                        <div
                            v-if="props.isToolColumn"
                            class="item--remove"
                            @click="onExposureRemove(item)"
                        >
                            <i class="bt-icon bt-icon-delete-x item-icon--remove"></i>
                        </div>
                        <item
                            v-model="item.value"
                            :type="item.searchPropType as TableScreen.ItemType"
                            :request-api="item.searchDynamicApi"
                            :select-data="item.selectData"
                            :select-prop="item.searchKeyProp"
                        />
                    </div>
                </div>
            </template>
            <div v-if="props.isToolColumn" class="ever-table-screen__item--add">
                <el-popover ref="addPopoverRef" :visible="addVisible" trigger="click" width="280">
                    <template #reference>
                        <bt-button
                            ref="addButtonRef"
                            type="blank"
                            @click="addVisible = !addVisible"
                        >
                            <i class="bt-icon bt-icon-plus"></i>
                        </bt-button>
                    </template>
                    <div>
                        <search-item-setting
                            ref="colRef"
                            v-click-outside="onClickOutside"
                            :list="configExposure"
                            @visibleChange="onChangeColumn"
                        />
                    </div>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, unref, nextTick } from 'vue'
import { ElPopover, ClickOutside as vClickOutside } from 'element-plus'
import { BtButton } from '@beeboat/components/button'
import { CaretBottom, CaretTop } from '@element-plus/icons-vue'
import { tableScreenProps, getConfigExposure, getConfigAll } from './table-screen'
import { TableScreen } from '../types/table-screen'
import { processingResults } from './utils'

import Item from './components/item.vue'
import SecondaryPlain from './components/secondary-plain.vue'
// 增加搜索条件
import SearchItemSetting from './components/search-item-setting.vue'

const props = defineProps(tableScreenProps)
const emit = defineEmits<{
    (e: 'loaded', data: TableScreen.Term[]): void
    (e: 'submit', data: { data: TableScreen.Term[]; type: number }): void
    (e: 'advSearch', data: { data: TableScreen.Term[]; type: number }): void
    (e: 'reset', data: {}): void
    (e: 'change', data: TableScreen.Term[]): void
}>()

/** 是否显示折叠 按钮 */
const isShowFoldBtn = ref(false) as Ref<boolean>
/** 折叠按钮状态 */
const isShowFold = ref(false) as Ref<boolean>

const everDom = ref() as Ref<HTMLElement>
const everTjDom = ref() as Ref<HTMLElement>

/** 外露条件 */
const configExposure = ref(getConfigExposure([...props.config])) as Ref<TableScreen.Term[]>
/** 所有字段 */
const configAll = ref(getConfigAll([...props.config])) as Ref<TableScreen.Term[]>
// 监听元素高度变化
const handleResize = () => {
    nextTick(() => {
        isShowFoldBtn.value = everDom.value.offsetHeight <= everTjDom.value.offsetHeight
    })
}

onMounted(() => {
    // isShowFoldBtn.value = everDom.value.offsetHeight <= everTjDom.value.offsetHeight
    handleResize()
    emit('loaded', processingResults(configExposure.value))
})

/** 折叠 */
function onZheDie() {
    isShowFold.value = !isShowFold.value
}

/** 按钮提交方法 */
function onSubmit(value: TableScreen.Term[] = []) {
    let advExposure: TableScreen.Term[] = []
    let exposure: TableScreen.Term[] = []
    // value.length>0 高级搜索
    if (value.length > 0) {
        value.forEach(v => {
            if (v.defaultSearchItem) {
                let val = JSON.parse(JSON.stringify(v))
                exposure.push({ ...val, value: '' })
                advExposure.push(val)
            } else {
                exposure.push({ ...v, value: '' })
                advExposure.push(v)
            }
        })
        // configExposure.value = exposure
        emit('advSearch', {
            data: processingResults(advExposure),
            type: 1, // 1 高级搜索
        })
    } else {
        // 正常搜索查询 只返回显示的默认项
        emit('submit', {
            data: configExposure.value.filter(i => i.defaultSearchItem == 1),
            type: 0, // 0 正常搜索
        })
    }
}

/** 手动提交方法 */
function submit() {
    return { data: configExposure.value, type: 0 }
}

/** 重置方法 */
function onReset() {
    // 清空外置条件默认值
    configExposure.value.forEach(key => {
        key.value = undefined
    })
    emit('reset', {})
}

/**
 * 删除外露项
 * @param item
 */
function onExposureRemove(item) {
    const columnList = configExposure.value
    for (let i = 0; i < columnList.length; i++) {
        if (columnList[i].id == item.id) {
            columnList[i].defaultSearchItem = 0
            break
        }
    }
    onClickOutside()
    // 返回实时变更的列数据
    emit('change', columnList)
}

const addVisible = ref(false)
const addButtonRef = ref()
const addPopoverRef = ref()
const onClickOutside = () => {
    unref(addPopoverRef).popperRef?.delayHide?.()
    addVisible.value = false
}
const onChangeColumn = () => {
    emit('change', configExposure.value)
    onClickOutside()
    handleResize()
}
/** 对外提供 表单提交方法 */
defineExpose({
    submit,
})
</script>

<template>
    <el-popover :visible="setVisible" trigger="click" :width="370">
        <template #reference>
            <em
                style="cursor: pointer"
                class="bt-icon bt-icon-col-setting"
                @click="setVisible = !setVisible"
            ></em>
        </template>
        <template #default>
            <div class="bt-table-col-setting">
                <el-input v-model="name" clearable placeholder="搜索显示字段" @input="onInput" />
                <div>
                    <div class="field-title">显示字段</div>
                </div>

                <el-scrollbar class="field-list">
                    <div
                        v-for="(item, index) in dataList"
                        :key="`bt-${item.id}`"
                        :class="[
                            getVerify(item) ? 'field-items' : 'field-items-none',
                            overActive == item.id || isActive == item.id ? 'active' : '',
                            hoverIndex == item.id ? 'hover' : '',
                        ]"
                        draggable="true"
                        @dragover.prevent="dragover($event)"
                        @dragstart="dragstart(item.id)"
                        @dragenter="dragenter($event, item.id)"
                        @dragend="dragend(item.id)"
                        @mouseover="mouseover(item.id)"
                        @mouseleave="mouseleave(item.id)"
                        @click="isActive = item.id"
                    >
                        <template v-if="getVerify(item)">
                            <el-checkbox
                                v-model="item.showValue"
                                :label="item.id"
                                @change="onCheckChange"
                            >
                                {{ item.label }}
                            </el-checkbox>
                            <span>
                                <el-space :size="24">
                                    <el-tooltip content="是否固定" placement="top" effect="light">
                                        <em
                                            class="pointer bt-icon bt-icon-lock"
                                            :class="[Boolean(item.fixed) ? 'icon-active' : '']"
                                            @click.stop="onFixed(index, item.fixed)"
                                        ></em>
                                    </el-tooltip>
                                    <em
                                        v-if="dataList.length == colSetting.length"
                                        class="move bt-icon bt-icon-move icon-active"
                                        :class="[overActive == item.id ? '' : 'hidden']"
                                        @click.stop="onFixed(index, item.fixed)"
                                    ></em>
                                </el-space>
                            </span>
                        </template>
                    </div>
                </el-scrollbar>

                <div class="field-footer">
                    <bt-button type="primary" @click="onColSave"> 保存 </bt-button>
                    <bt-button type="secondary-plain" @click="onColReset"> 重置 </bt-button>
                </div>
            </div>
        </template>
    </el-popover>
</template>
<script lang="ts">
export default {
    name: 'ColSetting',
    inheritAttrs: false,
}
</script>
<script setup lang="ts">
import { ElPopover } from 'element-plus'
import { clone } from '@beeboat/core/utils/clone'
import { ref } from 'vue'

const emits = defineEmits(['fresh', 'visibleChange'])
const props = defineProps<{ colSetting: any; tableRef: any }>()

const setVisible = ref(false) // 工具栏下拉pop是否显示
const oldVal = ref('0')
const newOld = ref('0')
const isActive = ref('-1') // 点击选中行
const overActive = ref('-1') // 鼠标拖拽的行
const hoverIndex = ref(null) // 拖拽经过元素样式改变
const name = ref('') // 搜索项
let dataList = ref(clone(props.colSetting)) // 列数据
let originList = [...dataList.value] // 列数据
const dragstart = val => {
    // 保存旧的节点和当前正在操作的节点
    oldVal.value = val
    isActive.value = val
}
const dragend = _val => {
    if (oldVal.value != newOld.value) {
        let oldIndex = originList.findIndex(i => i.id == oldVal.value)
        let newIndex = originList.findIndex(i => i.id == newOld.value)
        let newItems = [...originList]
        // 删除老的节点
        originList.splice(oldIndex, 1)
        // 增加新的节点
        originList.splice(
            newIndex,
            0,
            newItems.find(i => i.id == oldVal.value),
        )
        // items结构发生变化触发transition-group的动画
        dataList.value = originList
        // 重置正在操作的节点
        isActive.value = '-1'
        // emits('fresh', originList)
    }
}
// 记录移动过程中信息
const dragenter = (e, val) => {
    e.dataTransfer.effectAllowed = 'move'
    // 即保存要将当前移动的节点放到那个位置
    newOld.value = val
    hoverIndex.value = val
}
const mouseover = val => {
    overActive.value = val
}
const mouseleave = val => {
    overActive.value = '-1'
    hoverIndex.value = null
}
const dragover = e => {
    e.dataTransfer.dropEffect = 'move'
}
// 过滤搜索
const onInput = val => {
    if (val) dataList.value = originList.filter(i => i.label?.indexOf(val) >= 0)
    else dataList.value = originList
}
const onCheckChange = val => {
    if (Number(isActive.value) > -1) {
        originList.forEach(i => {
            if (i.id == isActive.value) {
                i.showValue = val == true
            }
        })
        // emits('fresh', originList)
    }
}
const onFixed = (index, val) => {
    originList[index].fixed = val && val.trim().length > 0 ? '' : 'left'
    // emits('fresh', originList)
}
// 操作列展示数据过滤校验
const getVerify = item => {
    return (
        item.type !== 'selection' &&
        item.type !== 'index' &&
        item.type !== 'expand' &&
        item.prop !== 'operation'
    )
}
// 操作列保存
const onColSave = () => {
    // 操作列同步保存操作
    emits('fresh', dataList.value)
    setVisible.value = false
}
// 操作列重置操作
const onColReset = () => {
    dataList.value = clone(props.colSetting)
    originList = [...dataList.value]
}
</script>

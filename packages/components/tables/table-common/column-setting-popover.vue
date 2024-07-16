<template>
    <el-popover ref="popoverRef" trigger="hover" :width="370" @show="onPopoverShow">
        <template #reference>
            <em style="cursor: pointer" class="bt-icon bt-icon-col-setting"></em>
        </template>
        <template #default>
            <div class="btp-table-ex--setting">
                <el-input
                    v-model="state.searchText"
                    clearable
                    placeholder="搜索显示字段"
                    class="btp-table-ex--setting-search"
                ></el-input>
                <div class="btp-table-ex--setting-title">显示字段</div>
                <el-scrollbar class="btp-table-ex--setting-content">
                    <template v-for="(item, index) in state.dataList" :key="`${index}`">
                        <div
                            class="btp-table-ex--setting-line"
                            :class="{
                                active: state.overActive == item.id,
                            }"
                            draggable="true"
                            @dragover.prevent="dragover($event)"
                            @dragstart="dragstart(item.id)"
                            @dragenter="dragenter($event, item.id)"
                            @dragend="dragend(item.id)"
                            @mouseover="mouseover(item.id)"
                            @mouseleave="mouseleave(item.id)"
                        >
                            <template v-if="getVerify(item)">
                                <el-checkbox v-model="item.showValue" @change="onCheckChange(item)">
                                    {{ item.label }}
                                </el-checkbox>
                                <el-space class="setting-toolbar">
                                    <el-button link>
                                        <el-tooltip
                                            content="是否固定"
                                            placement="top"
                                            effect="light"
                                        >
                                            <em
                                                class="pointer bt-icon bt-icon-lock"
                                                :class="{ 'icon-active': Boolean(item.fixed) }"
                                                @click.stop="onFixed(index, item.fixed)"
                                            ></em>
                                        </el-tooltip>
                                    </el-button>

                                    <el-button link>
                                        <em
                                            class="bt-icon bt-icon-move"
                                            :class="{ hidden: state.overActive != item.id }"
                                            @click.stop="onFixed(index, item.fixed)"
                                        ></em>
                                    </el-button>
                                </el-space>
                            </template>
                        </div>
                    </template>
                </el-scrollbar>

                <div class="btp-table-ex--setting-footer">
                    <el-button @click="onColReset"> 取 消 </el-button>
                    <el-button type="primary" @click="onColSave"> 保 存 </el-button>
                </div>
            </div>
        </template>
    </el-popover>
</template>
<script lang="ts">
export default {
    inheritAttrs: false,
}
</script>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import cloneDeep from 'lodash-es/cloneDeep'

interface IProps {
    columns?: any
}
const props = withDefaults(defineProps<IProps>(), {
    columns: [],
})
const emits = defineEmits(['change'])
const popoverRef = ref()

const state = reactive({
    searchText: null,
    oldVal: '-1',
    newOld: '-1',
    overActive: '-1',
    dataList: [] as any,
    originList: [] as any,
})

/**
 * 打开弹窗
 */
const onPopoverShow = () => {
    state.dataList = cloneDeep(props.columns)
    state.originList = [...cloneDeep(props.columns)]
    state.dataList.forEach(item => {
        item.showValue = !item.hidden
    })
}

const dragstart = val => {
    // 保存旧的节点和当前正在操作的节点
    state.oldVal = val
}
const dragend = _val => {
    if (state.oldVal != state.newOld) {
        let oldIndex = state.dataList.findIndex(i => i.id == state.oldVal)
        let newIndex = state.dataList.findIndex(i => i.id == state.newOld)
        let newItems = [...state.dataList]
        // 删除老的节点
        state.dataList.splice(oldIndex, 1)
        // 增加新的节点
        state.dataList.splice(
            newIndex,
            0,
            newItems.find(i => i.id == state.oldVal),
        )

        // 对originList做拖拽处理
        let oldIndex1 = state.originList.findIndex(i => i.id == state.oldVal)
        let newIndex1 = state.originList.findIndex(i => i.id == state.newOld)
        let newItems1 = [...state.originList]
        // 删除老的节点
        state.originList.splice(oldIndex1, 1)
        // 增加新的节点
        state.originList.splice(
            newIndex1,
            0,
            newItems1.find(i => i.id == state.oldVal),
        )
    }
}
/**
 * 记录移动过程中信息
 * @param e 事件
 * @param val 值
 */
const dragenter = (e, val) => {
    e.dataTransfer.effectAllowed = 'move'
    state.newOld = val
}
const mouseover = val => {
    state.overActive = val
}
const mouseleave = val => {
    state.overActive = '-1'
}
const dragover = e => {
    e.dataTransfer.dropEffect = 'move'
}

/**
 * 点击是否显示勾选事件
 * @param item 列
 */
const onCheckChange = item => {
    item.hidden = !item.showValue
    state.originList.filter(item => {
        if (item.id == item.id) {
            item.hidden = !item.showValue
        }
    })
}

/**
 * 设置锁定
 * @param index 序号
 * @param val 值
 */
const onFixed = (index, val) => {
    state.dataList[index].fixed = val && val.trim().length > 0 ? '' : 'left'
}

/**
 * 操作列展示数据过滤校验
 * @param item 列
 */
const getVerify = item => {
    return item.label?.indexOf(state.searchText || '') >= 0
}

/**
 * 点击保存按钮
 */
const onColSave = () => {
    emits('change', state.dataList)
}

/**
 * 点击取消按钮
 */
const onColReset = () => {
    popoverRef.value.hide()
}
</script>

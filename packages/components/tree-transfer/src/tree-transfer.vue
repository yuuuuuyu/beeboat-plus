<template>
    <div class="bt-tree-transfer">
        <div class="bt-left-tree">
            <div class="bt-tree-list">
                <p class="bt-el-transfer-panel__header">
                    <label class="bt-el-checkbox">
                        <span class="bt-el-checkbox__label">
                            {{ props.leftTit || '列表1' }}
                            <!-- <span>0/13</span> -->
                        </span>
                    </label>
                </p>
                <div class="el-transfer-panel__body is-with-footer">
                    <div class="el-transfer-panel__filter">
                        <el-input
                            v-model="leftFilterText"
                            placeholder="请输入搜索内容"
                            :prefix-icon="Search"
                            clearable
                        />
                    </div>
                    <div class="is-filterable">
                        <el-tree
                            ref="treeRef"
                            :data="props.treeData"
                            show-checkbox
                            default-expand-all
                            :node-key="props.nodeKey"
                            highlight-current
                            :props="props.defaultProps"
                            :default-checked-keys="data.defToData"
                            :filter-node-method="filterNode"
                            @check="check"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="el-transfer__buttons">
            <el-button type="primary" :icon="ArrowLeft" :disabled="!rightChecks" @click="toLeft()" />
            <el-button type="primary" :icon="ArrowRight" :disabled="leftChecks.length == 0" @click="toRight()" />
        </div>
        <div class="bt-right-tree">
            <div class="bt-tree-list">
                <p class="bt-el-transfer-panel__header">
                    <label class="bt-el-checkbox">
                        <span class="bt-el-checkbox__label">
                            {{ props.rightTit || '列表2' }}
                            <!-- <span>0/13</span> -->
                        </span>
                    </label>
                </p>
                <div class="el-transfer-panel__body is-with-footer">
                    <div class="el-transfer-panel__filter">
                        <el-input
                            v-model="rightFilterText"
                            placeholder="请输入搜索内容"
                            :prefix-icon="Search"
                            clearable
                        />
                    </div>
                    <div class="is-filterable">
                        <template v-if="rightData.length > 0 && rightFilterText == ''">
                            <div
                                v-for="(item, index) in rightData"
                                :key="index"
                                :class="['item', { active: item.active }]"
                                @click="checkNode(item)"
                            >
                                {{ item[props.defaultProps.label] }}
                            </div>
                        </template>
                        <template v-else-if="rightFilterData.length > 0 && rightFilterText != ''">
                            <div
                                v-for="(item, index) in rightFilterData"
                                :key="index"
                                :class="['item', { active: item.active }]"
                                @click="checkNode(item)"
                            >
                                {{ item[props.defaultProps.label] }}
                            </div>
                        </template>
                        <template v-else>
                            <div class="el-tree__empty-block">
                                <span class="el-tree__empty-text">暂无数据</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtTreeTransfer',
}
</script>
<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { ArrowLeft, ArrowRight, Search } from '@element-plus/icons-vue'

interface baseState {
    nodeKey?: any
    treeData?: any
    defToData?: any
    defaultProps?: any
    leftTit?: any
    rightTit?: any
}
const leftFilterText = ref('') // 左侧过滤内容
const rightFilterText = ref('') // 右侧过滤内容
const rightFilterData = ref([] as any) // 右侧过滤后的数据

const leftChecks = ref([] as any) // 左侧被选中数据
const rightChecks = ref(false) // 右侧有被选中数据时，设为true

const props = withDefaults(defineProps<baseState>(), {})
const data = reactive({ ...props })
//定义emit
const emit = defineEmits(['checkVal'])
const treeRef = ref()

//右侧数据
const rightData = ref([] as any)

onMounted(() => {
    if (props.treeData.length > 0) {
        rightData.value = treeRef.value.getCheckedNodes(false, false)
        treeRef.value.setCheckedKeys([], false)
    }
})

// 监听左侧过滤内容变化
watch(leftFilterText, val => {
    treeRef.value!.filter(val)
})
// 监听右侧过滤内容变化
watch(rightFilterText, val => {
    rightFilterData.value = rightData.value.filter(item => {
        return item[`${props.defaultProps.label}`].includes(val)
    })
})

const check = () => {
    const checkNodes = treeRef.value.getCheckedNodes(false, false)
    leftChecks.value = checkNodes
}

// 左侧树过滤
const filterNode = (value: string, data: any) => {
    if (!value) return true
    return data[`${props.defaultProps.label}`].includes(value)
}

//去右边
const toRight = () => {
    const checkNodes = treeRef.value.getCheckedNodes(false, false)
    const newArr = rightData.value.concat(checkNodes)
    let obj = {} as any
    let peon = newArr.reduce((cur, next) => {
        obj[next[props.nodeKey]] ? '' : (obj[next[props.nodeKey]] = true && cur.push(next))
        return cur
    }, []) //设置cur默认类型为数组，并且初始值为空的数组
    rightData.value = peon
    treeRef.value.setCheckedKeys([], false)
    leftChecks.value = []
    checkVal()
}
//去左边
const toLeft = () => {
    for (var i = 0; i < rightData.value.length; i++) {
        if (rightData.value[i].active) {
            rightData.value[i].active = false
            rightData.value.splice(i, 1)
            i -= 1
        }
    }
    rightChecks.value = false
    checkVal()
}
//右侧item点击
const checkNode = item => {
    item.active = !item.active
    if (item.active) {
        rightChecks.value = true
    } else {
        rightChecks.value = false
    }
}
//返回父组件
const checkVal = () => {
    emit('checkVal', rightData.value)
}
</script>
<style lang="scss" scoped>
.bt-tree-transfer {
    --el-transfer-border-color: var(--el-border-color-lighter);
    --el-transfer-border-radius: var(--el-border-radius-base);
    --el-transfer-panel-width: 200px;
    --el-transfer-panel-header-height: 40px;
    --el-transfer-panel-header-bg-color: var(--el-fill-color-light);
    --el-transfer-panel-footer-height: 40px;
    --el-transfer-panel-body-height: 278px;
    --el-transfer-item-height: 30px;
    --el-transfer-filter-height: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .bt-left-tree,
    .bt-right-tree {
        position: relative;
        box-sizing: border-box;
        display: inline-block;
        width: var(--el-transfer-panel-width);
        max-height: 100%;
        overflow: hidden;
        text-align: left;
        vertical-align: middle;
        background: var(--el-bg-color-overlay);
        .bt-tree-list {
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            width: var(--el-transfer-panel-width);
            height: 400px;
            max-height: 100%;
            overflow: hidden;
            text-align: left;
            vertical-align: middle;
            background: var(--el-bg-color-overlay);
            border: 1px solid var(--el-transfer-border-color);
            border-radius: 4px;

            .bt-el-transfer-panel__header {
                box-sizing: border-box;
                display: flex;
                align-items: center;
                height: var(--el-transfer-panel-header-height);
                padding-left: 15px;
                margin: 0;
                color: var(--el-color-black);
                background: var(--el-transfer-panel-header-bg-color);
                border-top-left-radius: var(--el-transfer-border-radius);
                border-top-right-radius: var(--el-transfer-border-radius);
                .bt-el-checkbox {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 100%;
                    .bt-el-checkbox__label {
                        font-size: 16px;
                        font-weight: 400;
                        color: var(--el-text-color-primary);
                        span {
                            position: absolute;
                            top: 50%;
                            right: 15px;
                            font-size: 12px;
                            font-weight: 400;
                            color: var(--el-text-color-secondary);
                            transform: translate3d(0, -50%, 0);
                        }
                    }
                }
            }
            .el-transfer-panel__body {
                height: calc(100% - 20px);
                border: none;
            }
            .el-transfer-panel__filter {
                box-sizing: border-box;
                width: auto;
                margin: 15px;
                text-align: center;
            }

            .is-filterable {
                box-sizing: border-box;
                height: calc(100% - var(--el-transfer-filter-height) - 50px);
                padding: 6px 0 0 0;
                padding-top: 0;
                margin: 0;
                overflow: auto;
                list-style: none;
                .el-tree__empty-block {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    height: 60px;
                    text-align: center;
                    .el-tree__empty-text {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        font-size: var(--el-font-size-base);
                        color: var(--el-text-color-secondary);
                        transform: translate(-50%,-50%);
                    }
                }
            }

            .item {
                padding: 3px 10px;
                margin-bottom: 1px;
                cursor: pointer;
                &.active {
                    background: #b9d7fa;
                }
            }
        }
    }
}
</style>

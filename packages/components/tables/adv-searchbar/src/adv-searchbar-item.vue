<template>
    <div class="btp-adv-searchbar-item" style="position: relative">
        <template v-if="props.exposeMode">
            <el-text :size="size">
                <div class="btp-adv-searchbar-item--label">
                    <el-tooltip
                        effect="dark"
                        :content="props.props.columnConfig.label"
                        placement="top-start"
                    >
                        {{ props.props.columnConfig.label || '' }}
                    </el-tooltip>
                </div>
            </el-text>
            <el-button :size="size" class="btp-adv-searchbar-item--condition">
                <el-dropdown @command="onConditionChange">
                    <span class="el-dropdown-link">
                        {{ getExpressValue(props.props.searchCondition) }}
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <template :key="key" v-for="(condition, key) in expressConfigList">
                                <el-dropdown-item
                                    v-if="isColumnSupportCondition(key)"
                                    :command="key"
                                >
                                    {{ condition.value + condition.name }}
                                </el-dropdown-item>
                            </template>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-button>
        </template>
        <el-input
            v-if="getColumnRenderType() == 'text'"
            v-model.trim="state.dataValue"
            placeholder="多个条件请用;隔开"
            autosize
            clearable
            :disabled="shouldShowItem()"
            :size="size"
            @change="onValueChange"
            @keyup.enter="onEnterClick"
        ></el-input>
        <template v-else-if="getColumnRenderType() == 'number'">
            <el-input
                v-if="props.props.searchCondition != 'gele'"
                v-model.trim="state.dataValue"
                type="number"
                placeholder="请输入"
                autosize
                clearable
                :disabled="shouldShowItem()"
                :size="size"
                @change="onValueChange"
                @keyup.enter="onEnterClick"
            ></el-input>
            <div v-else class="input-range">
                <el-input
                    v-model.trim="state.leftNumberValue"
                    type="number"
                    placeholder="请输入"
                    autosize
                    clearable
                    :disabled="shouldShowItem()"
                    :size="size"
                    style="width: 46%; height: 100%"
                    @change="onNumberValueChange"
                    @keyup.enter="onEnterClick"
                ></el-input>
                <div style="width: 8%; text-align: center">-</div>
                <el-input
                    v-model.trim="state.rightNumberValue"
                    type="number"
                    placeholder="请输入"
                    autosize
                    clearable
                    :disabled="shouldShowItem()"
                    :size="size"
                    style="width: 46%; height: 100%"
                    @change="onNumberValueChange"
                    @keyup.enter="onEnterClick"
                ></el-input>
            </div>
        </template>
        <template v-else-if="getColumnRenderType() == 'datetime'">
            <el-date-picker
                v-if="isNotRangeModel()"
                v-model="state.dataValue"
                type="datetimerange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                clearable
                :disabled="shouldShowItem()"
                :size="size"
                value-format="YYYY-MM-DD HH:mm:ss"
                @change="onValueChange"
                @keyup.enter="onEnterClick"
            ></el-date-picker>
            <el-date-picker
                v-else
                v-model="state.dataValue"
                type="datetime"
                placeholder="请选择时间"
                end-placeholder="结束时间"
                clearable
                :disabled="shouldShowItem()"
                :size="size"
                value-format="YYYY-MM-DD HH:mm:ss"
                @change="onValueChange"
                @keyup.enter="onEnterClick"
            ></el-date-picker>
        </template>
        <template v-else-if="getColumnRenderType() == 'date'">
            <el-date-picker
                v-if="isNotRangeModel()"
                v-model="state.dataValue"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                :disabled="shouldShowItem()"
                :size="size"
                value-format="YYYY-MM-DD"
                @change="onValueChange"
                @keyup.enter="onEnterClick"
            ></el-date-picker>
            <el-date-picker
                v-else
                v-model="state.dataValue"
                type="date"
                placeholder="请选择日期"
                clearable
                :disabled="shouldShowItem()"
                :size="size"
                value-format="YYYY-MM-DD"
                @change="onValueChange"
                @keyup.enter="onEnterClick"
            ></el-date-picker>
        </template>
        <template v-else-if="getColumnRenderType() == 'month'">
            <el-date-picker
                v-if="isNotRangeModel()"
                v-model="state.dataValue"
                type="monthrange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                :disabled="shouldShowItem()"
                :size="size"
                value-format="YYYY-MM-DD"
                @change="onValueChange"
                @keyup.enter="onEnterClick"
            ></el-date-picker>
            <el-date-picker
                v-else
                v-model="state.dataValue"
                type="month"
                placeholder="请选择日期"
                clearable
                :disabled="shouldShowItem()"
                :size="size"
                value-format="YYYY-MM-DD"
                @change="onValueChange"
                @keyup.enter="onEnterClick"
            ></el-date-picker>
        </template>
        <template v-else-if="getColumnRenderType() == 'time'">
            <el-time-picker
                v-if="isNotRangeModel()"
                v-model="state.dataValue"
                is-range
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                clearable
                :disabled="shouldShowItem()"
                :size="size"
                format="HH:mm:ss"
                @change="onValueChange"
                @keyup.enter="onEnterClick"
            ></el-time-picker>
            <el-time-picker
                v-else
                v-model="state.dataValue"
                is-range
                start-placeholder="请选择时间"
                clearable
                :disabled="shouldShowItem()"
                :size="size"
                format="HH:mm:ss"
                @change="onValueChange"
                @keyup.enter="onEnterClick"
            ></el-time-picker>
        </template>
        <template v-else-if="getColumnRenderType() == 'select'">
            <el-select-v2
                v-model="state.dataValue"
                multiple
                :options="state.options"
                placeholder="请选择"
                clearable
                filterable
                :disabled="shouldShowItem()"
                :size="size"
                collapse-tags
                collapse-tags-tooltip
                @change="onValueChange"
                @keyup.enter="onEnterClick"
            >
                <template #default="{ item }">
                    <el-tooltip
                        effect="dark"
                        :content="item.label"
                        :placement="
                            props.props.columnConfig?.searchProps?.selectProps?.placement || ''
                        "
                    >
                        {{ item.label }}
                    </el-tooltip>
                </template>
            </el-select-v2>
        </template>
        <template v-else-if="getColumnRenderType() == 'tree'">
            <el-tree-select
                v-model="state.treeSelectValue"
                :node-key="state.dsProp.value"
                :props="state.dsProp"
                multiple
                :data="state.options"
                :render-after-expand="false"
                show-checkbox
                placeholder="请选择"
                :check-strictly="props.props.columnConfig?.searchProps?.treeProps?.checkStrictly"
                check-on-click-node
                clearable
                filterable
                :disabled="shouldShowItem()"
                :size="size"
                collapse-tags
                collapse-tags-tooltip
                @check-change="onTreeSelectValueChange"
            ></el-tree-select>
        </template>
    </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue'
import { expressConfigList } from './adv-searchbar-common'
import { useAdvSearchbarItem } from './adv-searchbar-item'

import { useElementConfig } from '@beeboat/core/utils/use-element-config'

const emits = defineEmits(['update:modelValue', 'search'])

interface IProps {
    props?: any
    modelValue?: any
    exposeMode?: any
    size?: string
}
const props = withDefaults(defineProps<IProps>(), {
    props: {},
    modelValue: '',
    exposeMode: true,
    size: '',
})
const { sizeClass, size } = useElementConfig(
    {
        componentName: 'btp-adv-searchbar-item',
    },
    props,
)

const state = reactive({
    options: [],
    dataValue: null,
    treeSelectValue: [],
    leftNumberValue: null,
    rightNumberValue: null,
    dsProp: { value: 'id', label: 'name', children: 'children' },
})

watch(
    () => props.modelValue,
    val => {
        if (!val || val.length < 1) {
            state.dataValue = null
            state.leftNumberValue = null
            state.rightNumberValue = null
            state.treeSelectValue = []
        } else {
            const componentType = props.props.columnConfig?.searchProps?.componentType

            state.treeSelectValue = Array.isArray(val) ? val : [val]

            if (componentType == 'number' && props.props.searchCondition == 'gele') {
                state.leftNumberValue = val[0]
                state.rightNumberValue = val[1]
            }
            if (componentType == 'select') {
                state.dataValue = val
            } else {
                state.dataValue = val.length == 1 ? val[0] : val
            }
        }
    },
    { immediate: true },
)

const {
    shouldShowItem,
    getColumnRenderType,
    isNotRangeModel,
    initAdvSearchItem,
    isColumnSupportCondition,
    getExpressValue,
    onValueChange,
    onNumberValueChange,
    onTreeSelectValueChange,
    onConditionChange,
    onEnterClick,
} = useAdvSearchbarItem(props, emits, state)

initAdvSearchItem()
</script>

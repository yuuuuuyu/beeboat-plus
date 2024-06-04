<template>
    <!-- 文本/数字 -->
    <div v-if="showInput" class="inner-edit-item">
        <el-input
            v-if="column?.editProps?.componentType == 'text'"
            v-model.trim="props.row[column.prop!]"
            :class="{ error: props.row[column.prop!+'_message'] }"
            v-bind="column?.editProps?.componentProps"
            clearable
            @change="onEditChange && onEditChange(column, $event, props.row, null)"
        />
        <el-input-number
            v-if="column?.editProps?.componentType == 'number'"
            v-model.trim="props.row[column.prop!]"
            placeholder="请输入"
            clearable
            controls-position="right"
            :class="{ error: props.row[column.prop!+'_message'] }"
            v-bind="column?.editProps?.componentProps"
            @change="onEditChange && onEditChange(column, $event, props.row, null)"
        />
        <InnerEditError :row="props.row" :column="props.column" />
    </div>
    <!-- 下拉 -->
    <div v-else-if="showSelect" class="inner-edit-item">
        <!-- 需要处理dictId/dataapi -->
        <el-select-v2
            v-model.trim="props.row[column.prop!]"
            :options="state.options"
            placeholder="请选择"
            clearable
            filterable
            collapse-tags
            collapse-tags-tooltip
            :class="{ error: props.row[column.prop!+'_message'] }"
            v-bind="column?.editProps?.componentProps"
            @change="onEditChange && onEditChange(column, $event, props.row, state.options)"
        >
            <template #default="{ item }">
                <template v-if="column?.editProps?.selectProps?.showTooltip">
                    <el-tooltip
                        effect="dark"
                        :content="item.label?.toString()"
                        :placement="column?.editProps?.selectProps?.placement"
                    >
                        {{ item.label }}
                    </el-tooltip>
                </template>
                <template v-else>
                    {{ item.label }}
                </template>
            </template>
        </el-select-v2>
        <InnerEditError :row="props.row" :column="props.column" />
    </div>
    <!-- 下拉树 -->
    <div v-else-if="showTree" class="inner-edit-item">
        <el-tree-select
            v-model="props.row[column.prop!]"
            :node-key="getTreeProps.value"
            :props="getTreeProps"
            :data="state.datasourceList"
            :render-after-expand="false"
            show-checkbox
            placeholder="请选择"
            check-strictly
            check-on-click-node
            clearable
            filterable
            collapse-tags
            collapse-tags-tooltip
            v-bind="column?.editProps?.componentProps"
            @change="onEditChange && onEditChange(column, $event, props.row, state.datasourceList)"
        />
    </div>
    <!-- 日期/日期范围 -->
    <div v-else-if="showDate" class="inner-edit-item">
        <el-date-picker
            v-if="column?.editProps?.componentType == 'date'"
            v-model="props.row[column.prop!]"
            type="date"
            placeholder="请选择日期"
            clearable
            value-format="YYYY-MM-DD"
            :class="{ error: props.row[column.prop!+'_message'] }"
            v-bind="column?.editProps?.componentProps"
            @change="onEditChange && onEditChange(column, $event, props.row, null)"
        />
        <el-date-picker
            v-if="column?.editProps?.componentType == 'daterange'"
            v-model="props.row[column.prop!]"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
            value-format="YYYY-MM-DD"
            :class="{ error: props.row[column.prop!+'_message'] }"
            v-bind="column?.editProps?.componentProps"
            @change="onEditChange && onEditChange(column, $event, props.row, null)"
        />
        <InnerEditError :row="props.row" :column="props.column" />
    </div>
    <!-- 日期时间/日期时间范围 -->
    <div v-else-if="showDateTime" class="inner-edit-item">
        <el-date-picker
            v-if="column?.editProps?.componentType == 'datetime'"
            v-model="props.row[column.prop!]"
            type="datetime"
            placeholder="请选择日期"
            clearable
            value-format="YYYY-MM-DD HH:mm:ss"
            :class="{ error: props.row[column.prop!+'_message'] }"
            v-bind="column?.editProps?.componentProps"
            @change="onEditChange && onEditChange(column, $event, props.row, null)"
        />
        <el-date-picker
            v-if="column?.editProps?.componentType == 'datetimerange'"
            v-model="props.row[column.prop!]"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
            value-format="YYYY-MM-DD HH:mm:ss"
            :class="{ error: props.row[column.prop!+'_message'] }"
            v-bind="column?.editProps?.componentProps"
            @change="onEditChange && onEditChange(column, $event, props.row, null)"
        />
        <InnerEditError :row="props.row" :column="props.column" />
    </div>
    <!-- 时间 -->
    <div v-else-if="showTime" class="inner-edit-item">
        <el-time-picker
            v-model="props.row[column.prop!]"
            :is-range="props.column?.editProps?.componentType == 'timerange'"
            range-separator="-"
            clearable
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="HH:mm:ss"
            :class="{ error: props.row[column.prop!+'_message'] }"
            v-bind="column?.editProps?.componentProps"
            @change="onEditChange && onEditChange(column, $event, props.row, null)"
        />
        <InnerEditError :row="props.row" :column="props.column" />
    </div>
</template>

<script setup lang="ts">
import { reactive, inject } from 'vue'
import InnerEditError from './inner-edit-error.vue'
import { useInnerEdit } from './inner-edit'

const onEditChange =
    inject<(column: any, event: any, row: any, datasource: any) => void>('onEditChange')

interface ItemProps {
    currentRow?: any
    row?: any
    column?: any
}
const props = withDefaults(defineProps<ItemProps>(), {
    currentRow: [],
    row: {},
    column: {},
})
const state = reactive({
    options: [],
    datasourceList: [],
})

const {
    showInput,
    showSelect,
    showDate,
    showDateTime,
    showTime,
    showTree,
    initEditItem,
    getTreeProps,
} = useInnerEdit(state, props)

// 初始化item
initEditItem()
</script>

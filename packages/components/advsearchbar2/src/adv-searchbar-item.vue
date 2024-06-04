<template>
    <div style="position: relative">
        <div v-if="props.showLabel" class="bt-advsearchbar-searchitem--label">
            <template v-if="props.columnProps.label && props.columnProps.label.length > 6">
                <el-tooltip
                    effect="dark"
                    :content="props.columnProps.label"
                    placement="bottom-start"
                >
                    {{ props.columnProps.label || '' }}
                </el-tooltip>
            </template>
            <template v-else>
                {{ props.columnProps.label || '' }}
            </template>
        </div>

        <div class="bt-advsearchbar-searchitem--content">
            <component :is="searchComponent" v-if="searchComponent" />
            <div
                v-else-if="props.columnProps?.searchProps?.componentType == 'text'"
                class="bt-advserchbar-searchitem--compontent"
            >
                <div v-if="props.showCondition" class="bt-advserchbar-searchitem--leftcompontent">
                    <el-dropdown @command="handleSelConfig">
                        <span class="el-dropdown-link">
                            {{
                                props.searchProps?.searchCondition
                                    ? expressConfig[props.searchProps.searchCondition]?.value
                                    : ''
                            }}
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <template v-for="(obj, key) in expressConfig">
                                    <el-dropdown-item
                                        v-if="
                                            props.columnProps.searchProps.supportConditionList.indexOf(
                                                key,
                                            ) != -1
                                        "
                                        :key="key"
                                        :command="key"
                                    >
                                        {{ obj.value + obj.name }}
                                    </el-dropdown-item>
                                </template>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="bt-advserchbar-searchitem--rightcompontent">
                    <el-input
                        v-model.trim="resultValue"
                        :placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ''
                                : '多个条件请用;隔开'
                        "
                        autosize
                        clearable
                        :disabled="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                        "
                        style="width: 100%; height: 100%"
                        @change="onInputValueChanged"
                        @keyup.enter="onEnterClick"
                    />
                </div>
            </div>
            <div
                v-else-if="props.columnProps?.searchProps?.componentType == 'number'"
                class="bt-advserchbar-searchitem--compontent"
            >
                <div v-if="props.showCondition" class="bt-advserchbar-searchitem--leftcompontent">
                    <el-dropdown @command="handleSelConfig">
                        <span class="el-dropdown-link">
                            {{
                                props.searchProps?.searchCondition
                                    ? expressConfig[props.searchProps.searchCondition]?.value
                                    : ''
                            }}
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <template v-for="(obj, key) in expressConfig">
                                    <el-dropdown-item
                                        v-if="
                                            props.columnProps.searchProps.supportConditionList.indexOf(
                                                key,
                                            ) != -1
                                        "
                                        :key="key"
                                        :command="key"
                                    >
                                        {{ obj.value + obj.name }}
                                    </el-dropdown-item>
                                </template>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div
                    v-if="props.searchProps.searchCondition != 'gele'"
                    class="bt-advserchbar-searchitem--rightcompontent"
                >
                    <el-input
                        v-model.trim="resultValue"
                        type="number"
                        :placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ''
                                : '请输入'
                        "
                        autosize
                        clearable
                        :disabled="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                        "
                        style="width: 100%; height: 100%"
                        @change="onInputValueChanged"
                        @keyup.enter="onEnterClick"
                    />
                </div>
                <div
                    v-if="props.searchProps.searchCondition == 'gele'"
                    class="bt-advserchbar-searchitem--rightcompontent"
                >
                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: space-between;
                        "
                    >
                        <el-input
                            v-model.trim="state.numLeftResultVal"
                            type="number"
                            :placeholder="
                                props.showCondition &&
                                    (props.searchProps.searchCondition == 'isNull' ||
                                        props.searchProps.searchCondition == 'isNotNull')
                                    ? ''
                                    : '请输入'
                            "
                            autosize
                            clearable
                            :disabled="
                                props.showCondition &&
                                    (props.searchProps.searchCondition == 'isNull' ||
                                        props.searchProps.searchCondition == 'isNotNull')
                            "
                            style="width: 46%; height: 100%"
                            @change="onNumInputValueChanged"
                            @keyup.enter="onEnterClick"
                        />
                        <div style="width: 8%; text-align: center">-</div>
                        <el-input
                            v-model.trim="state.numRightResultVal"
                            type="number"
                            :placeholder="
                                props.showCondition &&
                                    (props.searchProps.searchCondition == 'isNull' ||
                                        props.searchProps.searchCondition == 'isNotNull')
                                    ? ''
                                    : '请输入'
                            "
                            autosize
                            clearable
                            :disabled="
                                props.showCondition &&
                                    (props.searchProps.searchCondition == 'isNull' ||
                                        props.searchProps.searchCondition == 'isNotNull')
                            "
                            style="width: 46%; height: 100%"
                            @change="onNumInputValueChanged"
                            @keyup.enter="onEnterClick"
                        />
                    </div>
                </div>
            </div>
            <div
                v-else-if="props.columnProps?.searchProps?.componentType == 'datetime'"
                class="bt-advserchbar-searchitem--compontent"
            >
                <div v-if="props.showCondition" class="bt-advserchbar-searchitem--leftcompontent">
                    <el-dropdown @command="handleSelConfig">
                        <span class="el-dropdown-link">
                            {{
                                props.searchProps?.searchCondition
                                    ? expressConfig[props.searchProps.searchCondition]?.value
                                    : ''
                            }}
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <template v-for="(obj, key) in expressConfig">
                                    <el-dropdown-item
                                        v-if="
                                            props.columnProps.searchProps.supportConditionList.indexOf(
                                                key,
                                            ) != -1
                                        "
                                        :key="key"
                                        :command="key"
                                    >
                                        {{ obj.value + obj.name }}
                                    </el-dropdown-item>
                                </template>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="bt-advserchbar-searchitem--rightcompontent">
                    <el-date-picker
                        v-if="
                            props.searchProps.searchCondition != 'eq' &&
                                props.searchProps.searchCondition != 'ne' &&
                                props.searchProps.searchCondition != 'gt' &&
                                props.searchProps.searchCondition != 'lt' &&
                                props.searchProps.searchCondition != 'ge' &&
                                props.searchProps.searchCondition != 'le'
                        "
                        v-model="resultValue"
                        type="datetimerange"
                        :start-placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ''
                                : '开始时间'
                        "
                        :end-placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ''
                                : '结束时间'
                        "
                        clearable
                        :disabled="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                        "
                        value-format="YYYY-MM-DD HH:mm:ss"
                        style="width: 100%"
                        @change="onInputValueChanged"
                        @keyup.enter="onEnterClick"
                    />
                    <el-date-picker
                        v-if="
                            props.searchProps.searchCondition == 'eq' ||
                                props.searchProps.searchCondition == 'ne' ||
                                props.searchProps.searchCondition == 'gt' ||
                                props.searchProps.searchCondition == 'lt' ||
                                props.searchProps.searchCondition == 'ge' ||
                                props.searchProps.searchCondition == 'le'
                        "
                        v-model="resultValue"
                        type="datetime"
                        :placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ''
                                : '请选择时间'
                        "
                        clearable
                        :disabled="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                        "
                        value-format="YYYY-MM-DD HH:mm:ss"
                        style="width: 100%"
                        @change="onInputValueChanged"
                        @keyup.enter="onEnterClick"
                    />
                </div>
            </div>
            <div
                v-else-if="props.columnProps?.searchProps?.componentType == 'date'"
                class="bt-advserchbar-searchitem--compontent"
            >
                <div v-if="props.showCondition" class="bt-advserchbar-searchitem--leftcompontent">
                    <el-dropdown @command="handleSelConfig">
                        <span class="el-dropdown-link">
                            {{
                                props.searchProps?.searchCondition
                                    ? expressConfig[props.searchProps.searchCondition]?.value
                                    : ''
                            }}
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <template v-for="(obj, key) in expressConfig">
                                    <el-dropdown-item
                                        v-if="
                                            props.columnProps.searchProps.supportConditionList.indexOf(
                                                key,
                                            ) != -1
                                        "
                                        :key="key"
                                        :command="key"
                                    >
                                        {{ obj.value + obj.name }}
                                    </el-dropdown-item>
                                </template>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="bt-advserchbar-searchitem--rightcompontent">
                    <el-date-picker
                        v-if="
                            props.searchProps.searchCondition != 'eq' &&
                                props.searchProps.searchCondition != 'ne' &&
                                props.searchProps.searchCondition != 'gt' &&
                                props.searchProps.searchCondition != 'lt' &&
                                props.searchProps.searchCondition != 'ge' &&
                                props.searchProps.searchCondition != 'le'
                        "
                        v-model="resultValue"
                        type="daterange"
                        :start-placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ''
                                : '开始日期'
                        "
                        :end-placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ''
                                : '结束日期'
                        "
                        clearable
                        :disabled="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                        "
                        value-format="YYYY-MM-DD"
                        style="width: 100%"
                        @change="onInputValueChanged"
                        @keyup.enter="onEnterClick"
                    />
                    <el-date-picker
                        v-if="
                            props.searchProps.searchCondition == 'eq' ||
                                props.searchProps.searchCondition == 'ne' ||
                                props.searchProps.searchCondition == 'gt' ||
                                props.searchProps.searchCondition == 'lt' ||
                                props.searchProps.searchCondition == 'ge' ||
                                props.searchProps.searchCondition == 'le'
                        "
                        v-model="resultValue"
                        type="date"
                        :placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ''
                                : '请选择日期'
                        "
                        clearable
                        :disabled="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                        "
                        value-format="YYYY-MM-DD"
                        style="width: 100%"
                        @change="onInputValueChanged"
                        @keyup.enter="onEnterClick"
                    />
                </div>
            </div>
            <div
                v-else-if="props.columnProps?.searchProps?.componentType == 'time'"
                class="bt-advserchbar-searchitem--compontent"
            >
                <div v-if="props.showCondition" class="bt-advserchbar-searchitem--leftcompontent">
                    <el-dropdown @command="handleSelConfig">
                        <span class="el-dropdown-link">
                            {{
                                props.searchProps?.searchCondition
                                    ? expressConfig[props.searchProps.searchCondition]?.value
                                    : ''
                            }}
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <template v-for="(obj, key) in expressConfig">
                                    <el-dropdown-item
                                        v-if="
                                            props.columnProps.searchProps.supportConditionList.indexOf(
                                                key,
                                            ) != -1
                                        "
                                        :key="key"
                                        :command="key"
                                    >
                                        {{ obj.value + obj.name }}
                                    </el-dropdown-item>
                                </template>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="bt-advserchbar-searchitem--rightcompontent">
                    <el-time-picker
                        v-if="
                            props.searchProps.searchCondition != 'eq' &&
                                props.searchProps.searchCondition != 'ne' &&
                                props.searchProps.searchCondition != 'gt' &&
                                props.searchProps.searchCondition != 'lt' &&
                                props.searchProps.searchCondition != 'ge' &&
                                props.searchProps.searchCondition != 'le'
                        "
                        v-model="resultValue"
                        is-range
                        :start-placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ''
                                : '开始时间'
                        "
                        :end-placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ''
                                : '结束时间'
                        "
                        clearable
                        :disabled="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                        "
                        format="HH:mm:ss"
                        style="width: 100%"
                        @change="onInputValueChanged"
                        @keyup.enter="onEnterClick"
                    />
                    <el-time-picker
                        v-if="
                            props.searchProps.searchCondition == 'eq' ||
                                props.searchProps.searchCondition == 'ne' ||
                                props.searchProps.searchCondition == 'gt' ||
                                props.searchProps.searchCondition == 'lt' ||
                                props.searchProps.searchCondition == 'ge' ||
                                props.searchProps.searchCondition == 'le'
                        "
                        v-model="resultValue"
                        is-range
                        :start-placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ''
                                : '请选择时间'
                        "
                        clearable
                        :disabled="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                        "
                        format="HH:mm:ss"
                        style="width: 100%"
                        @change="onInputValueChanged"
                        @keyup.enter="onEnterClick"
                    />
                </div>
            </div>
            <div
                v-else-if="props.columnProps?.searchProps?.componentType == 'select'"
                class="bt-advserchbar-searchitem--compontent"
            >
                <div v-if="props.showCondition" class="bt-advserchbar-searchitem--leftcompontent">
                    <el-dropdown @command="handleSelConfig">
                        <span class="el-dropdown-link">
                            {{
                                props.searchProps?.searchCondition
                                    ? expressConfig[props.searchProps.searchCondition]?.value
                                    : ''
                            }}
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <template v-for="(obj, key) in expressConfig">
                                    <el-dropdown-item
                                        v-if="
                                            props.columnProps.searchProps.supportConditionList.indexOf(
                                                key,
                                            ) != -1
                                        "
                                        :key="key"
                                        :command="key"
                                    >
                                        {{ obj.value + obj.name }}
                                    </el-dropdown-item>
                                </template>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="bt-advserchbar-searchitem--rightcompontent">
                    <el-select-v2
                        v-model.trim="resultValue"
                        multiple
                        :options="state.options"
                        :placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ' '
                                : '请选择'
                        "
                        clearable
                        filterable
                        :disabled="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                        "
                        collapse-tags
                        collapse-tags-tooltip
                        style="width: 100%; height: 100%"
                        @change="onInputValueChanged"
                        @keyup.enter="onEnterClick"
                    />
                    <!-- <el-select
                        v-model.trim="resultValue"
                        multiple
                        :placeholder="props.showCondition && (props.searchProps.searchCondition == 'isNull' || props.searchProps.searchCondition == 'isNotNull') ? '' : '请选择'"
                        clearable
                        filterable
                        :disabled="
                            props.showCondition &&
                            (props.searchProps.searchCondition == 'isNull' ||
                                props.searchProps.searchCondition == 'isNotNull')
                        "
                        collapse-tags
                        collapse-tags-tooltip
                        style="width: 100%; height: 100%"
                        @change="onInputValueChanged"
                        @keyup.enter="onEnterClick"
                    >
                        <el-option
                            v-for="item in state.datasourceList"
                            :key="item.id"
                            :label="getDSLabelValue(item)"
                            :value="getDSValueValue(item)"
                        />
                    </el-select> -->
                </div>
            </div>
            <div
                v-else-if="props.columnProps?.searchProps?.componentType == 'tree'"
                class="bt-advserchbar-searchitem--compontent"
            >
                <div v-if="props.showCondition" class="bt-advserchbar-searchitem--leftcompontent">
                    <el-dropdown @command="handleSelConfig">
                        <span class="el-dropdown-link">
                            {{
                                props.searchProps?.searchCondition
                                    ? expressConfig[props.searchProps.searchCondition]?.value
                                    : ''
                            }}
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <template v-for="(obj, key) in expressConfig">
                                    <el-dropdown-item
                                        v-if="
                                            props.columnProps.searchProps.supportConditionList.indexOf(
                                                key,
                                            ) != -1
                                        "
                                        :key="key"
                                        :command="key"
                                    >
                                        {{ obj.value + obj.name }}
                                    </el-dropdown-item>
                                </template>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="bt-advserchbar-searchitem--rightcompontent">
                    <el-tree-select
                        v-model="state.treeSelectValue"
                        :node-key="getDSTreeProps().id"
                        :props="getDSTreeProps()"
                        multiple
                        :data="state.datasourceList"
                        :render-after-expand="false"
                        show-checkbox
                        :placeholder="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                                ? ''
                                : '请选择'
                        "
                        check-strictly
                        check-on-click-node
                        clearable
                        filterable
                        :disabled="
                            props.showCondition &&
                                (props.searchProps.searchCondition == 'isNull' ||
                                    props.searchProps.searchCondition == 'isNotNull')
                        "
                        collapse-tags
                        collapse-tags-tooltip
                        @check-change="onTreeSelectValueChanged"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref, watch, h, onMounted } from 'vue'
import { BtUseAppStore } from '@beeboat/core/store'

onMounted(() => {
    // 禁用tab
    document.onkeydown = function (e) {
        if (e.keyCode == 9) {
            e.returnValue = false
        }
    }
})
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
    datasourceList: [] as any,
    options: [] as any,
    treeSelectValue: [] as any,
    numLeftResultVal: [] as any,
    numRightResultVal: [] as any,
    showPopover: Boolean,
})

const emits = defineEmits(['update:modelValue', 'onSearchClick'])
interface IProps {
    modelValue?: any
    columnProps?: any
    searchProps?: any
    showLabel?: any
    showCondition?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
    showLabel: true,
    modelValue: '',
    columnProps: {},
    searchProps: {},
    showCondition: false,
})

const getDSLabelValue = (data: any) => {
    let searchProps = { value: 'id', label: 'name' }
    if (props.columnProps.searchProps?.dataSourceProps) {
        //TODO 根据类型判断是否需要转换
        searchProps =
            typeof props.columnProps.searchProps?.dataSourceProps == 'string'
                ? JSON.parse(props.columnProps.searchProps?.dataSourceProps)
                : props.columnProps.searchProps?.dataSourceProps
    }
    if (searchProps.label) {
        return data[searchProps.label]
    }
    return data.name
}
const getDSValueValue = (data: any) => {
    let searchProps = { value: 'id', label: 'name' }
    if (props.columnProps.searchProps?.dataSourceProps) {
        //TODO 根据类型判断是否需要转换
        searchProps =
            typeof props.columnProps.searchProps?.dataSourceProps == 'string'
                ? JSON.parse(props.columnProps.searchProps?.dataSourceProps)
                : props.columnProps.searchProps?.dataSourceProps
    }
    if (searchProps.value) {
        return data[searchProps.value]
    }
    return data.value
}

const getDSTreeProps = () => {
    const treeProps = { label: 'name', children: 'children', id: 'id' }
    if (props.searchProps?.columConfig?.searchProps?.dataSourceProps) {
        let obj = props.searchProps?.columConfig?.searchProps?.dataSourceProps
        if (obj?.value) {
            treeProps.id = obj?.value
        }
        if (obj?.label) {
            treeProps.label = obj?.label
        }
        if (obj?.children) {
            treeProps.children = obj?.children
        }
    }
    return treeProps
}
//自定义组件
const searchComponent = props.searchProps?.searchComponent
    ? h(props.searchProps.searchComponent, {
          ['onUpdate:modelValue']: value => {
              props.modelValue = Array.isArray(value) ? value : [value]
          },
          props: props.searchProps,
          columnProps: props.columnProps,
      })
    : null

//值变化
const onInputValueChanged = value => {
    if (!value || value == '') {
        emits('update:modelValue', [])
    } else {
        console.log('值变化------', Array.isArray(value), props.modelValue, value)
        emits('update:modelValue', Array.isArray(value) ? value : [value])
    }
}

// 数字值变化
const onNumInputValueChanged = () => {
    // if (state.numLeftResultVal && state.numRightResultVal) {
    nextTick(() => {
        emits('update:modelValue', [state.numLeftResultVal, state.numRightResultVal])
    })
    // }
}

//值绑定对象
const resultValue = ref(props.modelValue)
watch(
    () => props.modelValue,
    val => {
        if (props.columnProps?.searchProps?.componentType == 'select') {
            resultValue.value = val
        } else if (
            props.columnProps?.searchProps?.componentType == 'number' &&
            props?.searchProps?.searchCondition == 'gele'
        ) {
            state.numLeftResultVal = val[0]
            state.numRightResultVal = val[1]
        } else {
            if (val.length == 1) {
                resultValue.value = val[0]
            } else {
                resultValue.value = val
            }
        }
        // console.log('props.modelValue-------------', resultValue)
        if (val) {
            state.treeSelectValue = Array.isArray(val) ? val : [val]
        }
    },
    { immediate: true },
)

// 选择条件
const handleSelConfig = (key: any) => {
    nextTick(() => {
        resultValue.value = null
        emits('update:modelValue', [])
    })
    props.columnProps.searchCondition = key
    props.searchProps.searchCondition = key
}

//树型选择变化
const onTreeSelectValueChanged = () => {
    nextTick(() => {
        emits('update:modelValue', state.treeSelectValue)
    })
}

const onEnterClick = () => {
    if (props.showCondition) {
        emits('onSearchClick')
    }
}
//初始化
const initItem = () => {
    //数据源
    state.datasourceList = []
    if (props.columnProps?.dictId) {
        const appStore = BtUseAppStore()
        const itemList = appStore.getDictById(props.columnProps.dictId)
        if (itemList) {
            itemList.forEach(item => {
                state.datasourceList.push({
                    id: item.value,
                    value: item.value,
                    name: item.name,
                })

                state.options.push({
                    id: item.value,
                    value: item.value,
                    name: item.name,
                    label: item.name,
                })
            })
        }
    }
    // console.log('条件初始化props-----state.options-----------', props, state.options)
    if (props.columnProps?.searchProps?.dataSource) {
        props.columnProps.searchProps.dataSource({}).then(res => {
            state.datasourceList = res.data || []
            state.options = res.data || []
            if (state.options.length > 0) {
                state.options.forEach(item => {
                    item.label = getDSLabelValue(item)
                    item.value = getDSValueValue(item)
                })
            }
            // console.log('222条件初始化res.data，state.options-----------', res.data, state.options)
        })
    }
    // console.log('333条件初始化state.options-----------', state.options)
}
initItem()
</script>

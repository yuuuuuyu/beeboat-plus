<template>
    <div class="bt-advsearchbar-item" style="position: relative">
        <el-button v-if="props.showLabel" link>
            <div class="bt-advsearchbar-item--label">
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
        </el-button>
        <el-button v-if="props.showLabel" class="bt-advserchbar-item--condition">
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
        </el-button>
        <component :is="searchComponent" v-if="searchComponent" />
        <el-input
            v-else-if="props.columnProps?.searchProps?.componentType == 'text'"
            v-model.trim="resultValue"
            placeholder="多个条件请用;隔开"
            autosize
            clearable
            :disabled="showValueComponent()"
            @change="onInputValueChanged"
            @keyup.enter="onEnterClick"
        />
        <template v-else-if="props.columnProps?.searchProps?.componentType == 'number'">
            <el-input
                v-if="props.searchProps.searchCondition != 'gele'"
                v-model.trim="resultValue"
                type="number"
                placeholder="请输入"
                autosize
                clearable
                :disabled="showValueComponent()"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
            <div v-else class="input-range">
                <el-input
                    v-model.trim="state.numLeftResultVal"
                    type="number"
                    placeholder="请输入"
                    autosize
                    clearable
                    :disabled="showValueComponent()"
                    style="width: 46%; height: 100%"
                    @change="onNumInputValueChanged"
                    @keyup.enter="onEnterClick"
                />
                <div style="width: 8%; text-align: center">-</div>
                <el-input
                    v-model.trim="state.numRightResultVal"
                    type="number"
                    placeholder="请输入"
                    autosize
                    clearable
                    :disabled="showValueComponent()"
                    style="width: 46%; height: 100%"
                    @change="onNumInputValueChanged"
                    @keyup.enter="onEnterClick"
                />
            </div>
        </template>
        <template v-else-if="props.columnProps?.searchProps?.componentType == 'datetime'">
            <el-date-picker
                v-if="isNotRangeModel()"
                v-model="resultValue"
                type="datetimerange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                clearable
                :disabled="showValueComponent()"
                value-format="YYYY-MM-DD HH:mm:ss"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
            <el-date-picker
                v-else
                v-model="resultValue"
                type="datetime"
                placeholder="请选择时间"
                end-placeholder="结束时间"
                clearable
                :disabled="showValueComponent()"
                value-format="YYYY-MM-DD HH:mm:ss"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
        </template>
        <template v-else-if="props.columnProps?.searchProps?.componentType == 'date'">
            <el-date-picker
                v-if="isNotRangeModel()"
                v-model="resultValue"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                :disabled="showValueComponent()"
                value-format="YYYY-MM-DD"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
            <el-date-picker
                v-else
                v-model="resultValue"
                type="date"
                placeholder="请选择日期"
                clearable
                :disabled="showValueComponent()"
                value-format="YYYY-MM-DD"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
        </template>
        <template v-else-if="props.columnProps?.searchProps?.componentType == 'month'">
            <el-date-picker
                v-if="isNotRangeModel()"
                v-model="resultValue"
                type="monthrange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                :disabled="showValueComponent()"
                value-format="YYYY-MM-DD"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
            <el-date-picker
                v-else
                v-model="resultValue"
                type="month"
                placeholder="请选择日期"
                clearable
                :disabled="showValueComponent()"
                value-format="YYYY-MM-DD"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
        </template>
        <template v-else-if="props.columnProps?.searchProps?.componentType == 'time'">
            <el-time-picker
                v-if="isNotRangeModel()"
                v-model="resultValue"
                is-range
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                clearable
                :disabled="showValueComponent()"
                format="HH:mm:ss"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
            <el-time-picker
                v-else
                v-model="resultValue"
                is-range
                start-placeholder="请选择时间"
                clearable
                :disabled="showValueComponent()"
                format="HH:mm:ss"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
        </template>
        <template v-else-if="props.columnProps?.searchProps?.componentType == 'select'">
            <el-select-v2
                v-model="resultValue"
                multiple
                :options="state.options"
                placeholder="请选择"
                clearable
                filterable
                :disabled="showValueComponent()"
                collapse-tags
                collapse-tags-tooltip
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            >
                <template #default="{ item }">
                    <template v-if="props.columnProps?.searchProps?.selectProps?.showTooltip">
                        <el-tooltip
                            effect="dark"
                            :content="item.label"
                            :placement="props.columnProps?.searchProps?.selectProps?.placement"
                        >
                            {{ item.label }}
                        </el-tooltip>
                    </template>
                    <template v-else>
                        {{ item.label }}
                    </template>
                </template>
            </el-select-v2>
        </template>
        <template v-else-if="props.columnProps?.searchProps?.componentType == 'tree'">
            <el-tree-select
                v-model="state.treeSelectValue"
                :node-key="getTreeProps.value"
                :props="getTreeProps"
                multiple
                :data="state.datasourceList"
                :render-after-expand="false"
                show-checkbox
                placeholder="请选择"
                :check-strictly="props.columnProps?.searchProps?.treeProps?.checkStrictly"
                check-on-click-node
                clearable
                filterable
                :disabled="showValueComponent()"
                collapse-tags
                collapse-tags-tooltip
                @check-change="onTreeSelectValueChanged"
            />
        </template>
    </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref, watch, h, onMounted } from 'vue'
import { BTPApplication } from '@beeboat/core/app'

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

/**
 * 为空不为空的时候,无需填写值
 */
const showValueComponent = () => {
    return (
        props.showCondition &&
        (props.searchProps.searchCondition == 'isNull' ||
            props.searchProps.searchCondition == 'isNotNull')
    )
}

/**
 * 不是时间、日期、时间日期 段的形式
 */
const isNotRangeModel = () => {
    return !(
        props.searchProps.searchCondition == 'eq' ||
        props.searchProps.searchCondition == 'ne' ||
        props.searchProps.searchCondition == 'gt' ||
        props.searchProps.searchCondition == 'lt' ||
        props.searchProps.searchCondition == 'ge' ||
        props.searchProps.searchCondition == 'le'
    )
}

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
const getTreeProps = { label: 'name', children: 'children', value: 'id' }
watch(
    () => props.searchProps,
    value => {
        // 仅对下拉生效
        if (value.columnConfig?.searchProps?.dataSourceProps) {
            getTreeProps.value = value.columnConfig?.searchProps?.dataSourceProps.value
            getTreeProps.label = value.columnConfig?.searchProps?.dataSourceProps.label
        }
    },
    {
        immediate: true,
        deep: true,
    },
)
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
        emits('update:modelValue', Array.isArray(value) ? value : [value])
    }
}

// 数字值变化
const onNumInputValueChanged = () => {
    nextTick(() => {
        emits('update:modelValue', [state.numLeftResultVal, state.numRightResultVal])
    })
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
        if (val) {
            state.treeSelectValue = Array.isArray(val) ? val : [val]
        }
    },
    { immediate: true },
)

// 选择条件
const handleSelConfig = (key: any) => {
    let type = props.columnProps?.searchProps?.componentType
    if (type != 'text' && type != 'number' && type != 'select' && type != 'tree') {
        nextTick(() => {
            resultValue.value = null
            emits('update:modelValue', [])
        })
    }
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
        const itemList = BTPApplication.getInstance().getCacheManager().getDictItemList(props.columnProps.dictId)
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
    if (props.columnProps?.searchProps?.dataSource) {
        props.columnProps.searchProps
            .dataSource()
            .then(res => {
                state.datasourceList = res.data || []
                state.options = res.data || []
                if (state.options.length > 0) {
                    state.options.forEach(item => {
                        item.label = getDSLabelValue(item)
                        item.value = getDSValueValue(item)
                    })
                }
            })
            .then(() => {
                // 如果设置了根节点禁用，需要处理数据
                if (props.columnProps?.searchProps?.treeProps?.disabledRoot) {
                    state.datasourceList.length === 1 && (state.datasourceList[0].disabled = true)
                }
            })
    }
}
initItem()
</script>

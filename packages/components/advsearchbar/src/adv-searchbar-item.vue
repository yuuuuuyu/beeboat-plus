<template>
    <div style="position: relative">
        <div v-if="props.showLabel" class="bt-advsearchbar-searchitem--label">
            <template v-if="props.columnProps.label && props.columnProps.label.length > 6">
                <el-tooltip effect="dark" :content="props.columnProps.label" placement="left">
                    {{ props.columnProps.label || '' }}
                </el-tooltip>
            </template>
            <template v-else>
                {{ props.columnProps.label || '' }}
            </template>
        </div>

        <div class="bt-advsearchbar-searchitem--content">
            <div
                v-if="props.showLabel"
                class="bt-advsearchbar--searchitem--remove"
                @click="onItemRemove(props)"
            >
                <i class="bt-icon bt-icon-delete-x item-icon--remove"></i>
            </div>
            <component :is="searchComponent" v-if="searchComponent" />
            <el-input
                v-else-if="props.searchProps.componentType == 'text'"
                v-model.trim="resultValue"
                placeholder="请输入"
                autosize
                clearable
                style="width: 100%; height: 100%"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
            <el-input
                v-else-if="props.searchProps.componentType == 'number'"
                v-model.trim="resultValue"
                type="number"
                placeholder="请输入"
                autosize
                clearable
                style="width: 100%; height: 100%"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
            <el-date-picker
                v-else-if="props.searchProps.componentType == 'datetime'"
                v-model="resultValue"
                type="datetimerange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                clearable
                value-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
            <el-date-picker
                v-else-if="props.searchProps.componentType == 'date'"
                v-model="resultValue"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                value-format="YYYY-MM-DD"
                style="width: 100%"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
            <el-time-picker
                v-else-if="props.searchProps.componentType == 'time'"
                v-model="resultValue"
                is-range
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                clearable
                format="HH:mm:ss"
                style="width: 100%"
                @change="onInputValueChanged"
                @keyup.enter="onEnterClick"
            />
            <el-select
                v-else-if="props.searchProps.componentType == 'select'"
                v-model.trim="resultValue"
                multiple
                placeholder="请选择"
                clearable
                filterable
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
            </el-select>
            <el-tree-select
                v-else-if="props.searchProps.componentType == 'tree'"
                v-model="state.treeSelectValue"
                :node-key="getDSTreeProps().id"
                :props="getDSTreeProps()"
                multiple
                :data="state.datasourceList"
                :render-after-expand="false"
                show-checkbox
                filterable
                check-strictly
                check-on-click-node
                clearable
                collapse-tags
                collapse-tags-tooltip
                @check-change="onTreeSelectValueChanged"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref, watch, h } from 'vue'
import { BtUseAppStore } from '@beeboat/core/store'

//当前页面数据绑定对象
const state = reactive({
    datasourceList: [] as any,
    treeSelectValue: [] as any,
})

const emits = defineEmits(['update:modelValue', 'removeItem'])
interface IProps {
    modelValue?: any
    columnProps?: any
    searchProps?: any
    showLabel?: any
}
const props = withDefaults(defineProps<IProps>(), {
    showLabel: true,
    modelValue: '',
    columnProps: {},
    searchProps: {},
})

const getDSLabelValue = (data: any) => {
    if (props.searchProps?.dataSourceProps?.label) {
        return data[props.searchProps?.dataSourceProps?.label]
    }
    return data.name
}
const getDSValueValue = (data: any) => {
    if (props.searchProps?.dataSourceProps?.value) {
        return data[props.searchProps?.dataSourceProps?.value]
    }
    return data.value
}

const getDSTreeProps = () => {
    const treeProps = { label: 'name', children: 'children', id: 'id' }
    if (props.searchProps?.dataSourceProps?.value) {
        treeProps.id = props.searchProps?.dataSourceProps?.value
    }
    if (props.searchProps?.dataSourceProps?.label) {
        treeProps.label = props.searchProps?.dataSourceProps?.label
    }
    if (props.searchProps?.dataSourceProps?.children) {
        treeProps.children = props.searchProps?.dataSourceProps?.children
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
//值绑定对象
const resultValue = ref(props.modelValue)

watch(
    () => props.modelValue,
    val => {
        resultValue.value = val
        if (val) {
            state.treeSelectValue = Array.isArray(val) ? val : [val]
        }
    },
    { immediate: true },
)
//树型选择变化
const onTreeSelectValueChanged = () => {
    nextTick(() => {
        emits('update:modelValue', state.treeSelectValue)
    })
}
//值变化
const onInputValueChanged = value => {
    if (!value || value == '') {
        emits('update:modelValue', [])
    } else {
        emits('update:modelValue', Array.isArray(value) ? value : [value])
    }
}
//删除当前外露搜索项
const onItemRemove = props => {
    props.searchProps.exposeSearchVisible = false
    props.modelValue = '' // 移除已经输入条件的搜索项，需要同步删除搜索的内容
    emits('removeItem', props.columnProps.id)
}
const onEnterClick = () => {
    console.log('点击回车,暂时不支持回车直接搜索')
}
//初始化
const initItem = () => {
    //数据源
    state.datasourceList = []
    if (props.columnProps?.dictId) {
        const appStore = BtUseAppStore()
        const itemList = appStore.getDictById(props.columnProps.dictId)
        console.log(props.columnProps.dictId, itemList)
        if (itemList) {
            itemList.forEach(item => {
                state.datasourceList.push({
                    id: item.value,
                    value: item.value,
                    name: item.name,
                })
            })
        }
    }
    if (props.searchProps.dataSource) {
        props.searchProps.dataSource({}).then(res => {
            state.datasourceList = res.data || []
        })
    }
}
initItem()
</script>

<template>
    <el-autocomplete
        ref="autocompleteRef"
        v-bind="{ ...$props, ...$attrs }"
        v-model="state.value"
        class="bt-autocomplete"
        :fetch-suggestions="querySearch"
        @change="$emit('update:modelValue', $event), $emit('change', $event)"
        @select="onSelect"
    >
        <template v-if="$slots.append" #default><slot name="default"></slot></template>
        <template v-if="$slots.append" #prefix><slot name="prefix"></slot></template>
        <template v-if="$slots.append" #suffix><slot name="suffix"></slot></template>
        <template v-if="$slots.append" #prepend><slot name="prepend"></slot></template>
        <template v-if="$slots.append" #append><slot name="append"></slot></template>
    </el-autocomplete>
</template>
<script lang="ts">
export default {
    name: 'BtAutocomplete',
}
</script>
<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
import { BtUseAppStore } from '@beeboat/core/store'

const emits = defineEmits(['update:modelValue', 'change', 'select'])
const autocompleteRef = ref()
const appStore = BtUseAppStore()

interface BtAutocompleteProps {
    valueKey?: string
    options?: any
    dataApi?: Function
    dictId?: string
    modelValue?: string
    fetchSuggestions?: Function
}
const props = withDefaults(defineProps<BtAutocompleteProps>(), {
    valueKey: 'name',
    dictId: undefined,
    dataApi: undefined,
    modelValue: undefined,
    fetchSuggestions: undefined,
})

//定义V-Model响应值
const state = reactive({
    value: props.modelValue as any,
    options: props.options || ([] as any),
})

watch(
    () => props.dictId,
    () => {
        loadOptionData()
    },
)
watch(
    () => props.dataApi,
    () => {
        loadOptionData()
    },
)
/**
 * 进行V-Model监控
 */
watch(
    () => props.modelValue,
    value => {
        state.value = value
    },
)

const querySearch = (queryString: string, callback: any) => {
    if (props.fetchSuggestions) {
        props.fetchSuggestions(queryString, callback)
    } else {
        const datas = state.options.filter(item => {
            return item[props.valueKey].indexOf(queryString) != -1
        })
        callback(datas)
    }
}
const onSelect = item => {
    emits('update:modelValue', item[props.valueKey])
    emits('select', item[props.valueKey])
}

/**
 * 将ElementPlus的内置方法继续暴露出去
 */
defineExpose({
    autocompleteRef,
    refresh: () => {
        loadOptionData()
    },
    blur: () => {
        autocompleteRef.value.blur()
    },
    close: () => {
        autocompleteRef.value.close()
    },
    focus: () => {
        autocompleteRef.value.focus()
    },
    handleSelect: () => {
        autocompleteRef.value.handleSelect()
    },
    handleKeyEnter: () => {
        autocompleteRef.value.handleKeyEnter()
    },
    highlight: itemIndex => {
        autocompleteRef.value.highlight(itemIndex)
    },
})

/**
 * 加载动态选项数据
 */
const loadOptionData = () => {
    if (props.options) {
        return
    }
    if (props.dictId) {
        state.options = JSON.parse(
            JSON.stringify(appStore.getDictById(props.dictId as string) || []),
        )
        state.options.forEach((item: any) => {
            item.value = item.name
        })
    } else if (props.dataApi) {
        props.dataApi().then((res: any) => {
            const datas = JSON.parse(JSON.stringify(res.data || []))
            datas.forEach((item: any) => {
                item.value = item[props.valueKey]
            })
            state.options = datas
        })
    }
}

//初始化数据
loadOptionData()
</script>

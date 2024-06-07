<template>
    <el-tree-select :data="props.data || state.options" :props="props.props">
        <template v-if="$slots.default" #default="{ node, data }">
            <slot :node="node" :data="data" />
        </template>
        <template v-if="$slots.empty" #empty><slot name="empty" /></template>
    </el-tree-select>
</template>
<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { useSelects } from '../../use-selects'

const props = defineProps({
    /**
     * @description 数据字典标识
     */
    dictId: {
        type: String,
        default: undefined,
    },
    /**
     * @description 动态数据接口
     */
    dataApi: {
        type: Object,
        default: undefined,
    },
    /**
     * @description 选项内容
     */
    data: {
        type: Array,
        default: undefined,
    },
    /**
     * @description 动态数据接口
     */
    props: {
        type: Object,
        default() {
            return { label: 'name', children: 'children' }
        },
    },
    /**
     * @description 视图动态配置
     */
    btConfig: {
        type: Object,
        default: undefined,
    },
    /**
     * @description 视图动态配置
     */
    btViewContext: {
        type: Object,
        default: undefined,
    },
})

const state = reactive({
    options: [] as any,
})

const { loadOptionData } = useSelects(state, props)

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
loadOptionData()

/**
 * 将ElementPlus的内置方法继续暴露出去
 */
defineExpose({
    refresh: () => {
        loadOptionData()
    },
})
</script>

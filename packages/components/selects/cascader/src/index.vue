<template>
    <el-cascader class="btp-cascader" ref="cascaderRef" :options="props.options || state.options">
        <template v-if="$slots.default" #default="{ node, data }">
            <slot :node="node" :data="data" />
        </template>
        <template v-if="$slots.empty" #empty><slot name="empty" /></template>
    </el-cascader>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue'
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
    options: {
        type: Array,
        default: undefined,
    },
    /**
     * @description 动态数据接口
     */
    props: {
        type: Object,
        default() {
            return { label: 'name', value: 'id' }
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

const cascaderRef = ref()
const contentRef = ref()
const cascaderPanelRef = ref()

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

onMounted(() => {
    //复制ElementPlus内置Ref对象
    contentRef.value = cascaderRef.value.contentRef
    cascaderPanelRef.value = cascaderRef.value.contentRef
})

/**
 * 将ElementPlus的内置方法继续暴露出去
 */
defineExpose({
    getCheckedNodes: () => {
        return cascaderRef.value.getCheckedNodes()
    },
    togglePopperVisible: () => {
        return cascaderRef.value.togglePopperVisible()
    },
    refresh: () => {
        loadOptionData()
    },
    cascaderRef,
    contentRef,
    cascaderPanelRef,
})
</script>

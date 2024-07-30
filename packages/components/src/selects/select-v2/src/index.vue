<template>
    <el-select-v2
        ref="selectRef"
        class="btp-select-v2"
        :options="props.options || state.options"
        :props="props.props"
    >
        <template v-if="$slots.default" #default="{ item }">
            <slot :item="item" />
        </template>
        <template v-if="$slots.prefix" #prefix>
            <slot name="prefix" />
        </template>
        <template v-if="$slots.empty" #empty>
            <slot name="empty" />
        </template>
        <template v-if="$slots.tag" #tag>
            <slot name="tag" />
        </template>
        <template v-if="$slots.loading" #loading>
            <slot name="loading" />
        </template>
        <template v-if="$slots.label" #label>
            <slot name="label" />
        </template>
    </el-select-v2>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
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
            return { label: 'name', value: 'id', options: 'children' }
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
const selectRef = ref()

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

defineExpose({
    focus: () => {
        selectRef.value.focus()
    },
    blur: () => {
        selectRef.value.blur()
    },
    refresh: () => {
        loadOptionData()
    },
})
</script>

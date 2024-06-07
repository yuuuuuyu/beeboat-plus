<template>
    <el-radio-group>
        <slot>
            <template v-if="props.buttonMode">
                <el-radio-button
                    v-for="item of state.options"
                    :key="item.value"
                    :value="item.value"
                >
                    {{ item.name }}
                </el-radio-button>
            </template>
            <template v-else>
                <el-radio
                    v-for="item of state.options"
                    :key="item.value"
                    :border="props.border"
                    :value="item.value"
                >
                    {{ item.name }}
                </el-radio>
            </template>
        </slot>
    </el-radio-group>
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
     * @description 是否显示边框
     */
    border: {
        type: Boolean,
        default: false,
    },
    /**
     * @description 是否以按钮模式展示
     */
    buttonMode: {
        type: Boolean,
        default: false,
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
    refresh: () => {
        loadOptionData()
    },
})
</script>

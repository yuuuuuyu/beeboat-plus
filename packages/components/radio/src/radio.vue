<template>
    <div class="bt-radio">
        <el-radio-group
            :model-value="props.defaultValue"
            :size="props.size"
            :text-color="props.textColor"
            :fill="props.fillColor"
            :validate-event="props.validateEvent"
            v-bind="mergePropsBind"
            @change="change"
        >
            <template v-if="!$slots.default">
                <template v-if="props.showRadioButton">
                    <el-radio-button
                        v-for="item of state.options"
                        :key="item.value"
                        :border="Boolean(props.border)"
                        :label="item.value"
                    >
                        {{ item.name }}
                    </el-radio-button>
                </template>
                <template v-else>
                    <el-radio
                        v-for="item of state.options"
                        :key="item.value"
                        :border="Boolean(props.border)"
                        :label="item.value"
                    >
                        {{ item.name }}
                    </el-radio>
                </template>
            </template>
            <slot></slot>
        </el-radio-group>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtRadio',
}
</script>
<script setup lang="ts">
import { watch, reactive } from 'vue'
import { BtUseAppStore } from '@beeboat/core/store'
import { useMergeBind } from '@beeboat/core/hook/useMergeBind'
const emit = defineEmits(['onPropChange', 'change'])
let { mergePropsBind } = useMergeBind()

interface baseState {
    size?: any // 'large' | 'default' | 'small'
    textColor?: string
    fillColor?: string
    border?: boolean
    options?: any
    showRadioButton?: boolean
    validateEvent?: boolean
    defaultValue?: any
    dictId?: string
    valueProp?: string
    nameProp?: string
    dataApi?: () => Promise<any>
}
const props = withDefaults(defineProps<baseState>(), {
    size: '',
    showRadioButton: false,
    options: [] as any,
    valueProp: 'id',
    nameProp: 'name',
})

watch(
    () => mergePropsBind.value?.modelValue,
    () => {
        emit('onPropChange', mergePropsBind.value?.config?.prop || 'unknown')
    },
)

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

const state = reactive({
    options: [] as any,
})

const appStore = BtUseAppStore()

/**
 *加载动态选项数据
 */
const loadOptionData = () => {
    if (props.dictId) {
        //加载数据字典
        state.options = appStore.getDictById(props.dictId) || []
    } else if (props.dataApi) {
        props.dataApi().then((res: any) => {
            res.data.forEach((item: any) => {
                item.name = `${item[props.nameProp]}`
                item.value = `${item[props.valueProp]}`
            })
            state.options = res.data
        })
    } else if (props.options.length) {
        state.options = props.options
    }
}

//初始化数据
if (props.dictId || props.dataApi) {
    loadOptionData()
}

const change = val => {
    emit('change', { val: val })
}
</script>

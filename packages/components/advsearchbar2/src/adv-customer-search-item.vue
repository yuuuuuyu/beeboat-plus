<!--示例代码-->
<template>
    <el-input
        v-model.trim="resultValue"
        placeholder="请输入"
        autosize
        clearable
        style="width: 100%"
        @change="onInputValueChanged"
    />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const emits = defineEmits(['update:modelValue'])
interface IProps {
    modelValue?: any
    props?: any
    columnProps?: any
}
const searchItemProps = withDefaults(defineProps<IProps>(), {
    modelValue: '',
    columnProps: {},
    props: {},
})
//值绑定对象
const resultValue = ref(searchItemProps.modelValue)
watch(
    () => searchItemProps.modelValue,
    val => {
        resultValue.value = val
    },
)
//值变化
const onInputValueChanged = value => {
    emits('update:modelValue', Array.isArray(value) ? value : [value])
}
</script>

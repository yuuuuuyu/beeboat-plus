<template>
    <btp-input v-model="state.value"></btp-input>
    <btp-input-number v-model="state.value2" @change="onChange"></btp-input-number>
    <el-button @click="onClick">1</el-button>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const state = reactive({
    value: '',
    value2: 2,
})

const onClick = () => {}

const onChange = v => {
    console.log('111', v)
}
</script>

<style lang="scss" scoped></style>

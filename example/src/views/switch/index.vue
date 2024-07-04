<template>
    <btp-switch v-model="state.value" class="btp-switch2" ref="switchRef">
        <template #active-action>
            <span class="custom-active-action">T</span>
        </template>
        <template #inactive-action>
            <span class="custom-inactive-action">F</span>
        </template>
    </btp-switch>
    <btp-switch v-model="state.value" class="btp-switch2" ref="switchRef3"> </btp-switch>
    <el-switch v-model="state.value" class="btp-switch2" ref="switchRef2"></el-switch>
    <el-button @click="onClick">1</el-button>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const state = reactive({
    value: false,
})
const switchRef = ref()
const switchRef2 = ref()

const onClick = () => {
    switchRef.value.focus()
    switchRef2.value.focus()
}
</script>

<style lang="scss" scoped>
.btp-switch2:focus {
    background: red;
}
</style>

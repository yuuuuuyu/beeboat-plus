<template>
    <div>
        <div>v-btFocus 聚焦指令</div>
        <br />
        <input v-bt-focus type="text" value="未聚焦.." />
        <div>&nbsp;</div>
        <el-input v-model="inputValue" v-bt-focus />
        <el-input v-model="inputValue" v-btFocus />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('聚焦..')
</script>

<style scoped></style>

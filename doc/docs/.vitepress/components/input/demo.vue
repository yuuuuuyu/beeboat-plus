<template>
  <input class="input" type="text" v-model="input" />
  <bt-button type="primary" @click="onSubmit">提交</bt-button>
  <div style="margin-top: 16px">输出内容：{{ content }}</div>
</template>
<script lang="ts">
export default {
  name: 'InputDemo',
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'

interface IObject {
  [k: string]: any
}

const input = ref<any>()
const content = ref<any>()

function onSubmit() {
  content.value = input.value
}
</script>
<style lang="scss">
.input {
  width: 300px;
  padding: 14px;
  margin-right: 16px;
  font-size: 16px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
}
</style>

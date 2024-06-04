<template>
    <component :is="customWidget" />
    <div>{{ bus.queue }}</div>
</template>

<script lang="ts" setup>
import UseEventBus from '@beeboat/core/hook/useEventBus'
import { h } from 'vue'
const customWidget = () => {
    return h('div', '发布、订阅模式库 UseEventBus使用')
}
const bus = new UseEventBus()
console.log(bus.queue, 'bus.queue')
let fn = (res, b = 'i do..') => {
    console.log(34, res, b) // 34 {a: 34} 456
}
let fn2 = () => {
    console.log(2)
}
let fn3 = () => {
    console.log(3)
}
// 发布
bus.$on('fn1', fn)
bus.$on('fn1', fn2)
bus.$on('fn1', fn3)
// 订阅
bus.$emit('fn1', { value: 34 }, 'hello..')

// 取消发布
bus.$off('fn1', fn3)
// 查看队列数据
console.log(bus.queue, 'bus.queue2')
</script>

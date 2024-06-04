<template>
    <h2 :style="`color: ${color}`">{{ color }}</h2>
    <h2 :style="`color: ${a}`">{{ a }}</h2>

    <h2 :style="`color: ${hoverColor}`">{{ hoverColor }}</h2>
    <h2 :style="`color: ${clickColor}`">{{ clickColor }}</h2>
    <h2 :style="`color: ${cColor}`">{{ cColor }}</h2>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import beeTheme from '@beeboat/bee-theme'
import {
    calculationHoverColor,
    calculationClickColor,
    calculationColor,
} from '@beeboat/bee-theme/src/utils/index'

import { TinyColor } from '@ctrl/tinycolor'

// console.log(beeTheme.getBtTheme())

// beeTheme.start({
//     color: {
//         primary: '#ffffff',
//     },
// })

const a = ref('')
const color = '#5c84f2'
const color222 = '#409EFF'

let color1 = new TinyColor(color)
let color2 = new TinyColor('#ffffff')

a.value = color1.mix(color2, 85).toHexString() // #808080

const hoverColor = calculationHoverColor(color)
const clickColor = calculationClickColor(color)
const cColor = calculationColor(color, 0, 20, -10)
</script>

<style lang="scss">
h1 {
    color: red;
}
</style>

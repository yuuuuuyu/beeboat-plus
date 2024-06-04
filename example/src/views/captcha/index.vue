<template>
    <div>
        <li>width:默认80，最小60，小于60默认60</li>
        <li>height:默认40</li>
        <li>size:字体默认26，宽度小于60时固定字体20</li>
        <li>back-effects:默认true,背景圆点干扰开启</li>
    </div>
    <bt-captcha v-model="value" :width="80" :back-effects="true" />
    <br />
    结果值：{{ value }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

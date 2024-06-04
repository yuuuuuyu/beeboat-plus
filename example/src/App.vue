<template>
    <el-config-provider :locale="zhCn" size="default">
        <router-view />
    </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import cookies from 'vue-cookies'
;(cookies as any).set('mickey', '18')
console.log(cookies.get('mickey'), 'get...')
</script>
<style>
body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
.examples {
    margin: 20px;
}
</style>

<template>
    <el-config-provider size="default">
        <router-view />
    </el-config-provider>
</template>

<script lang="ts" setup>

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

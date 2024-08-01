<template>
    <el-config-provider :locale="zhCn" size="large">
        <router-view />
    </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn'
import beeTheme from 'beeboat-plus/es/beeboat-theme/index'
beeTheme.start()
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

<template>
    <el-config-provider size="default">
        <el-scrollbar>
            <router-view />
        </el-scrollbar>
    </el-config-provider>
</template>

<script lang="ts" setup>
import beeTheme from '@beeboat/beeboat-theme'
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

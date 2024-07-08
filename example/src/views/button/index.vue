<template>
    <h1>常规按钮</h1>
    <btp-button type="primary" icon="111">主要按钮</btp-button>
    <btp-button type="secondary">次要按钮</btp-button>
    <btp-button type="success">成功按钮</btp-button>
    <btp-button type="danger">危险按钮</btp-button>
    <btp-button type="warning">警告按钮</btp-button>

    <h1>禁用按钮</h1>
    <btp-button type="primary" disabled>主要按钮</btp-button>
    <btp-button type="secondary" disabled>次要按钮</btp-button>
    <btp-button type="success" disabled>成功按钮</btp-button>
    <btp-button type="danger" disabled>危险按钮</btp-button>
    <btp-button type="warning" disabled>警告按钮</btp-button>

    <h1>文字按钮</h1>
    <btp-button type="primary" link>主要按钮</btp-button>
    <btp-button type="secondary" link>次要按钮</btp-button>
    <btp-button type="success" link>成功按钮</btp-button>
    <btp-button type="danger" link>危险按钮</btp-button>
    <btp-button type="warning" link>警告按钮</btp-button>

    <h1>朴素按钮</h1>
    <btp-button type="primary" plain>主要按钮</btp-button>
    <btp-button type="secondary" plain>次要按钮</btp-button>
    <btp-button type="success" plain>成功按钮</btp-button>
    <btp-button type="danger" plain>危险按钮</btp-button>
    <btp-button type="warning" plain>警告按钮</btp-button>

    <h1>图标按钮</h1>
    <el-button type="primary" :icon="Share" />
</template>
<script setup lang="ts">
import { Share } from '@element-plus/icons-vue'
</script>

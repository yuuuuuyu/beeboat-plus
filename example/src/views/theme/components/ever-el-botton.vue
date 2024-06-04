<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Button 按钮</span>
            </div>
        </template>
        <div>
            <el-divider content-position="left">普通bt-button</el-divider>
            <el-row class="ever-el-row">
                <bt-button :disabled="true">aaabbbcc</bt-button>
                <bt-button v-for="button in buttonsBt" :key="button.text" :type="button.type">
                    {{ button.type }}
                </bt-button>
            </el-row>
            <el-row class="ever-el-row">
                <bt-button
                    v-for="button in buttonsBt"
                    :key="button.text"
                    :type="button.type"
                    disabled
                >
                    {{ button.text }}
                </bt-button>
            </el-row>
        </div>
        <div>
            <el-divider content-position="left">普通</el-divider>
            <el-row class="ever-el-row">
                <el-button v-for="button in buttons" :key="button.text" :type="button.type">
                    {{ button.text }}
                </el-button>
            </el-row>

            <el-row class="ever-el-row">
                <el-button v-for="button in buttons" :key="button.text" :type="button.type" plain>
                    {{ button.text }}
                </el-button>
            </el-row>

            <el-row class="ever-el-row">
                <el-button v-for="button in buttons" :key="button.text" :type="button.type" round>
                    {{ button.text }}
                </el-button>
            </el-row>

            <el-row class="ever-el-row">
                <bt-button :icon="Search" circle />
                <el-button type="primary" :icon="Edit" circle />
                <el-button type="success" :icon="Check" circle />
                <el-button type="info" :icon="Message" circle />
                <el-button type="warning" :icon="Star" circle />
                <el-button type="danger" :icon="Delete" circle />
            </el-row>
        </div>
        <div>
            <el-divider content-position="left">禁用</el-divider>
            <el-row class="ever-el-row">
                <el-button
                    v-for="button in buttons"
                    :key="button.text"
                    :type="button.type"
                    disabled
                >
                    {{ button.text }}
                </el-button>
            </el-row>

            <el-row class="ever-el-row">
                <el-button
                    v-for="button in buttons"
                    :key="button.text"
                    :type="button.type"
                    plain
                    disabled
                >
                    {{ button.text }}
                </el-button>
            </el-row>
        </div>
        <div>
            <el-divider content-position="left">链接按钮</el-divider>
            <el-row class="ever-el-row">
                <el-button v-for="button in buttons" :key="button.text" :type="button.type" link>
                    {{ button.text }}
                </el-button>
            </el-row>
            <el-row class="ever-el-row">
                <el-button
                    v-for="button in buttons"
                    :key="button.text"
                    :type="button.type"
                    link
                    disabled
                >
                    {{ button.text }}
                </el-button>
            </el-row>
        </div>
        <div>
            <el-divider content-position="left">文字按钮</el-divider>
            <el-row class="ever-el-row">
                <el-button v-for="button in buttons" :key="button.text" :type="button.type" text>
                    {{ button.text }}
                </el-button>
            </el-row>
            <el-row class="ever-el-row">
                <el-button v-for="button in buttons" :key="button.text" :type="button.type" text bg>
                    {{ button.text }}
                </el-button>
            </el-row>
            <el-row class="ever-el-row">
                <el-button
                    v-for="button in buttons"
                    :key="button.text"
                    :type="button.type"
                    text
                    disabled
                >
                    {{ button.text }}
                </el-button>
            </el-row>
        </div>
        <div>
            <el-divider content-position="left">图标按钮</el-divider>
            <el-row class="ever-el-row">
                <el-button type="primary" :icon="Edit" />
                <el-button type="primary" :icon="Share" />
                <el-button type="primary" :icon="Delete" />
                <el-button type="primary" :icon="Search">Search</el-button>
                <el-button type="primary">
                    Upload<el-icon class="el-icon--right"><Upload /></el-icon>
                </el-button>
            </el-row>
        </div>
        <div>
            <el-divider content-position="left">按钮组</el-divider>
            <el-row class="ever-el-row">
                <el-button-group>
                    <el-button type="primary" :icon="ArrowLeft">Previous Page</el-button>
                    <el-button type="primary">
                        Next Page<el-icon class="el-icon--right"><ArrowRight /></el-icon>
                    </el-button>
                </el-button-group>
                &nbsp;
                <el-button-group>
                    <el-button type="primary" :icon="Edit" />
                    <el-button type="primary" :icon="Share" />
                    <el-button type="primary" :icon="Delete" />
                </el-button-group>
            </el-row>
        </div>
        <div>
            <el-divider content-position="left">加载状态按钮</el-divider>
            <el-row class="ever-el-row">
                <el-button type="primary" loading>Loading</el-button>
                <el-button type="primary" :loading-icon="Eleme" loading>Loading</el-button>
                <el-button type="primary" loading>
                    <template #loading>
                        <div class="custom-loading">
                            <svg class="circular" viewBox="-10, -10, 50, 50">
                                <path
                                    class="path"
                                    d="M 30 15 L 28 17 M 25.61 25.61 A 15 15, 0, 0, 1, 15 30 A 15 15, 0, 1, 1, 27.99 7.5 L 15 15"
                                    style="fill: rgba(0, 0, 0, 0); stroke-width: 4px"
                                />
                            </svg>
                        </div>
                    </template>
                    Loading
                </el-button>
            </el-row>
        </div>

        <div>
            <el-divider content-position="left">调整尺寸</el-divider>
            <el-row class="ever-el-row">
                <el-button size="large">Large</el-button>
                <el-button>Default</el-button>
                <el-button size="small">Small</el-button>
                <el-button size="large" :icon="Search">Search</el-button>
                <el-button :icon="Search">Search</el-button>
                <el-button size="small" :icon="Search">Search</el-button>
            </el-row>
            <el-row class="ever-el-row">
                <el-button size="large" round>Large</el-button>
                <el-button round>Default</el-button>
                <el-button size="small" round>Small</el-button>
                <el-button size="large" :icon="Search" round>Search</el-button>
                <el-button :icon="Search" round>Search</el-button>
                <el-button size="small" :icon="Search" round>Search</el-button>
            </el-row>
            <el-row class="ever-el-row">
                <el-button :icon="Search" size="large" circle />
                <el-button :icon="Search" circle />
                <el-button :icon="Search" size="small" circle />
            </el-row>
        </div>
        <!-- <div>
            <el-divider content-position="left">自定义颜色</el-divider>
            <el-button color="#626aef" :dark="isDark">Default</el-button>
            <el-button color="#626aef" :dark="isDark" plain>Plain</el-button>

            <el-button color="#626aef" :dark="isDark" disabled>Disabled</el-button>
            <el-button color="#626aef" :dark="isDark" disabled plain>Disabled Plain</el-button>
        </div> -->
    </el-card>
</template>
<script setup lang="ts">
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
    Share,
    ArrowLeft,
    Eleme,
} from '@element-plus/icons-vue'
// import { isDark } from 'element-plus/'
const buttonsBt = [
    { type: 'primary', text: 'primary' },
    { type: 'secondary', text: 'success' },
    { type: 'warning', text: 'warning' },
    { type: 'danger', text: 'danger' },
] as const
const buttons = [
    { type: 'plain', text: 'plain' },
    { type: 'primary', text: 'primary' },
    { type: 'secondary', text: 'success' },
    { type: 'info', text: 'info' },
    { type: 'warning', text: 'warning' },
    { type: 'danger', text: 'danger' },
] as const
</script>

<style scoped>
.el-button .custom-loading .circular {
    width: 18px;
    height: 18px;
    margin-right: 6px;
    animation: loading-rotate 2s linear infinite;
}
.el-button .custom-loading .circular .path {
    stroke: var(--el-button-text-color);
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    stroke-width: 2;
    animation: loading-dash 1.5s ease-in-out infinite;
}
</style>

<template>
    <el-config-provider :size="themeSize">
        <el-row class="ever-row" :gutter="10">
            <el-col :span="12">
                <el-radio-group v-model="themeRadio" @change="onChangeThemeRadio">
                    <el-radio-button label="default" />
                    <el-radio-button label="theme1" />
                    <el-radio-button label="theme2" />
                    <el-radio-button label="theme5" />
                </el-radio-group>
            </el-col>
            <el-col :span="12">
                <el-radio-group v-model="themeSize">
                    <el-radio-button label="small" />
                    <el-radio-button label="default" />
                    <el-radio-button label="large" />
                </el-radio-group>
            </el-col>
        </el-row>
        <el-row class="ever-row" :gutter="10">
            <el-col :span="12">
                <ever-el-bootom />
            </el-col>
            <el-col :span="12">
                <ever-el-link />
                <ever-el-calendar class="ever-row" />
            </el-col>
        </el-row>
        <el-row class="ever-row" :gutter="10">
            <el-col :span="24">
                <ever-el-form />
            </el-col>
        </el-row>
        <el-row class="ever-row" :gutter="10">
            <el-col class="ever-row" :span="12">
                <ever-el-pagination />
                <ever-el-tree class="ever-row" />
            </el-col>
            <el-col class="ever-row" :span="12">
                <ever-el-progress />
            </el-col>
        </el-row>
        <el-row class="ever-row" :gutter="10">
            <el-col :span="24">
                <ever-el-tag />
            </el-col>
        </el-row>
        <el-row class="ever-row" :gutter="10">
            <el-col :span="12">
                <ever-el-steps />
                <ever-el-alert class="ever-row" />
            </el-col>
            <el-col :span="12">
                <ever-el-tabs />
                <ever-el-tooltip class="ever-row" />
            </el-col>
        </el-row>
        <el-row class="ever-row" :gutter="10">
            <el-col :span="8">
                <ever-el-message />
            </el-col>
            <el-col :span="8">
                <ever-el-message-box />
            </el-col>
            <el-col :span="8">
                <ever-el-dropdown />
            </el-col>
        </el-row>
        <el-row class="ever-row" :gutter="10">
            <el-col :span="24">
                <ever-el-table />
            </el-col>
        </el-row>
    </el-config-provider>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import EverElBootom from './components/ever-el-botton.vue'
import EverElLink from './components/ever-el-link.vue'
import EverElForm from './components/ever-el-form.vue'
import EverElCalendar from './components/ever-el-calendar.vue'
import EverElPagination from './components/ever-el-pagination.vue'
import EverElProgress from './components/ever-el-progress.vue'
import EverElTable from './components/ever-el-table.vue'
import EverElTag from './components/ever-el-tag.vue'
import EverElTree from './components/ever-el-tree.vue'
import EverElDropdown from './components/ever-el-dropdown.vue'
import EverElSteps from './components/ever-el-steps.vue'
import EverElTabs from './components/ever-el-tabs.vue'
import EverElAlert from './components/ever-el-alert.vue'
import EverElMessage from './components/ever-el-message.vue'
import EverElMessageBox from './components/ever-el-message-box.vue'
import EverElTooltip from './components/ever-el-tooltip.vue'
import beeTheme from '@beeboat/bee-theme'

const themeRadio = ref('default')
const themeSize = ref('default') as Ref<'default' | 'large' | 'small'>

beeTheme.start()

function onChangeThemeRadio(value: string) {
    console.log(value)
    beeTheme.switchTheme(value)
}
</script>

<style>
html,
body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

.home {
    width: 100%;
    height: 100%;
}
.el-header {
    border-bottom: 1px solid black;
}
.el-container {
    height: 100%;
}
.ever-el-row {
    margin-bottom: 10px;
}
.ever-row {
    margin-top: 20px;
}

.color-btn {
    position: absolute;
    top: 20px;
    right: 10px;
}
.color-btndx {
    position: absolute;
    top: 20px;
    right: 300px;
}
</style>

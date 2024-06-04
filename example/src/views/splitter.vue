<template>
    <div>
        <div>splitter/splitter-item 组件</div>
        <div>
            <el-switch v-model="isCheck" active-color="#13ce66" inactive-color="#ff4949" />
            <div>
                align
                <el-select v-model="value" placeholder="align" size="large">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </div>
            <br />
            <bt-splitter
                :mode="isCheck ? 'horizontal' : 'vertical'"
                :align="value"
                gutter="12"
                background-color="#555555"
            >
                <template v-if="isCheck">
                    <bt-splitter-item unit-type="px" :default-width="200">
                        <div>第一列</div>
                    </bt-splitter-item>
                    <bt-splitter-item unit-type="%" :default-width="100">
                        <div style="height: 100px; background-color: #ffffff">
                            <div>第二列</div>
                        </div>
                    </bt-splitter-item>
                    <bt-splitter-item unit-type="%" :default-width="100">
                        <div style="background-color: #ffffff">第三列</div>
                    </bt-splitter-item>
                    <bt-splitter-item unit-type="auto">
                        <div style="background-color: #ffffff">第四列</div>
                    </bt-splitter-item>
                </template>
                <template v-else>
                    <bt-splitter-item unit-type="px" default-height="200">
                        <div style="background-color: #ffffff">第一行</div>
                    </bt-splitter-item>
                    <bt-splitter-item>
                        <div style="background-color: #ffffff">第二行</div>
                    </bt-splitter-item>
                </template>
            </bt-splitter>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isCheck = ref(true)
const value = ref('top')
const options = [
    {
        value: 'top',
        label: '顶部对齐',
    },
    {
        value: 'middle',
        label: '居中对齐',
    },
    {
        value: 'bottom',
        label: '底部对齐',
    },
    {
        value: 'baseline',
        label: '内容间等间距',
    },
    {
        value: 'stretch',
        label: '两侧等间距',
    },
]
</script>

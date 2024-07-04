<template>
    <div style="display: flex; width: 100%; height: 500px">
        <div style="width: 200px; background: yellow">组件树</div>
        <div style="position: relative; flex: 1; background: lightcyan"></div>
        <div style="width: 800px; padding: 40px; background: lightskyblue">
            <div>
                <label>-----------变量定义-------------</label>
            </div>
            <template v-for="(item, index) in state.items" :key="index">
                <el-space>
                    <el-tree-select
                        size="small"
                        v-model="state.source"
                        :data="data"
                        :render-after-expand="false"
                        style="width: 240px"
                    />
                    <el-select size="small" v-model="state.eq" style="width: 60px">
                        <el-option value="=" label="="></el-option>
                    </el-select>
                    <el-select size="small" v-model="state.tp" style="width: 90px">
                        <el-option value="3" label="空"></el-option>
                        <el-option value="1" label="固定值"></el-option>
                        <el-option value="2" label="变量"></el-option>
                    </el-select>
                    <el-input v-if="state.tp == '1'" size="small" style="width: 90px"></el-input>
                    <el-tree-select
                        v-if="state.tp == '2'"
                        size="small"
                        v-model="state.target"
                        :data="data"
                        :render-after-expand="false"
                        style="width: 240px"
                    />
                    <el-select size="small" v-model="state.tpt" style="width: 90px">
                        <el-option value="1" label="默认"></el-option>
                        <el-option value="2" label="深度拷贝"></el-option>
                        <el-option value="2" label="转Int"></el-option>
                        <el-option value="2" label="转JSON"></el-option>
                    </el-select>
                </el-space>
            </template>
            <div>
                <p></p>
                <p></p>
                <p></p>
                <label>-----------赋值-------------</label>
            </div>
            <template v-for="(item, index) in state.items" :key="index">
                <el-space>
                    <el-tree-select
                        size="small"
                        v-model="state.source"
                        :data="data"
                        :render-after-expand="false"
                        style="width: 240px"
                    />
                    <el-select size="small" v-model="state.eq" style="width: 60px">
                        <el-option value="=" label="="></el-option>
                        <el-option value="追加" label="追加"></el-option>
                    </el-select>
                    <el-select size="small" v-model="state.tp" style="width: 90px">
                        <el-option value="1" label="固定值"></el-option>
                        <el-option value="2" label="变量"></el-option>
                    </el-select>
                    <el-input v-if="state.tp == '1'" size="small" style="width: 90px"></el-input>
                    <el-tree-select
                        v-if="state.tp == '2'"
                        size="small"
                        v-model="state.target"
                        :data="data"
                        :render-after-expand="false"
                        style="width: 240px"
                    />
                    <el-select size="small" v-model="state.tpt" style="width: 90px">
                        <el-option value="1" label="默认"></el-option>
                        <el-option value="2" label="深度拷贝"></el-option>
                        <el-option value="2" label="转Int"></el-option>
                        <el-option value="2" label="转JSON"></el-option>
                    </el-select>
                </el-space>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
const state = reactive({
    items: [{}, {}],
    source: null,
    eq: '=',
    tp: '1',
    target: null,
    tpt: '1',
})
const data = [
    {
        label: '组件',
        value: '1',
        children: [
            {
                label: '表格',
                value: '2',
                children: [
                    {
                        label: '初始化参数[initParam]',
                        value: '3',
                    },
                ],
            },
        ],
    },
    {
        label: '入参',
        value: '21',
        children: [
            {
                label: '表格',
                value: '22',
                children: [
                    {
                        label: '初始化参数[initParam]',
                        value: '23',
                    },
                ],
            },
        ],
    },
    {
        label: '局部变量',
        value: '31',
        children: [
            {
                label: '表格',
                value: '32',
                children: [
                    {
                        label: '初始化参数[initParam]',
                        value: '33',
                    },
                ],
            },
        ],
    },
]
</script>

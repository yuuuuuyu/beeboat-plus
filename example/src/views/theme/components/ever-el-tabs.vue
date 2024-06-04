<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Tabs 标签页</span>
            </div>
        </template>
        <div>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="24">
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane label="User" name="first">User</el-tab-pane>
                        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
                        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
                        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
                    </el-tabs>
                    <br /><br /><br />
                    <el-tabs type="border-card">
                        <el-tab-pane label="User">User</el-tab-pane>
                        <el-tab-pane label="Config">Config</el-tab-pane>
                        <el-tab-pane label="Role">Role</el-tab-pane>
                        <el-tab-pane label="Task">Task</el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
    padding: 32px;
    font-size: 32px;
    font-weight: 600;
    color: #6b778c;
}
</style>

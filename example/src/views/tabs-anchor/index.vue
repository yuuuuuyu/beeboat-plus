<template>
    <div style="padding: 50px">
        <div>tabs-anchor组件</div>
        <el-select v-model="state.position">
            <el-option value="top">top</el-option>
            <el-option value="left">left</el-option>
            <el-option value="right">right</el-option>
            <el-option value="bottom">bottom</el-option>
        </el-select>
        <bt-tabs-anchor2
            v-model="state.tabName"
            style="height: 300px"
            :tab-position="state.position"
            @tab-change="tabChange"
        >
            <el-tab-pane label="User" name="first">
                <div>User</div>
                <div>User</div>
                <div>User</div>
                <div>User</div>
                <div>User</div>
                <div>User</div>
                <div>User</div>
                <div>User</div>
            </el-tab-pane>
            <el-tab-pane label="Config" name="second">
                <div>Config</div>
                <div>Config</div>
                <div>Config</div>
                <div>Config</div>
                <div>Config</div>
                <div>Config</div>
                <div>Config</div>
                <div>Config</div>
            </el-tab-pane>
            <el-tab-pane label="Role" name="third">
                <div>Role</div>
                <div>Role</div>
                <div>Role</div>
                <div>Role</div>
                <div>Role</div>
                <div>Role</div>
                <div>Role</div>
                <div>Role</div>
                <div>Role</div>
                <div>Role</div>
            </el-tab-pane>
            <el-tab-pane label="Task" name="fourth">
                <div>Task</div>
                <div>Task</div>
                <div>Task</div>
                <div>Task</div>
                <div>Task</div>
                <div>Task</div>
                <div>Task</div>
                <div>Task</div>
                <div>Task</div>
                <div>Task</div>
                <div>Task</div>
            </el-tab-pane>
        </bt-tabs-anchor2>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
    tabName: 'first',
    type: 'card',
    position: 'top',
    tabs: [
        {
            name: '用户管理',
            refName: 'setOneRef',
        },
        {
            name: '配置管理',
            refName: 'setTwoRef',
        },
        {
            name: '角色管理',
            refName: 'setThreeRef',
        },
        {
            name: '权限管理',
            refName: 'setFourRef',
        },
    ],
})

const tabChange = (name: string) => {
    console.log('tabName', name)
}
</script>

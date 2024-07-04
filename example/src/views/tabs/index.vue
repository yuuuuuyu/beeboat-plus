<template>
    <btp-tabs class="btp-tabs" v-model="state.value" style="width: 90%; height: 100%">
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </btp-tabs>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const state = reactive({
    value: 'second',
    value2: 2,
})

const onClick = () => {}

const onChange = v => {
    console.log('111', v)
}
</script>

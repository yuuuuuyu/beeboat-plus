<template>
    <btp-tabs-anchor
        v-model2="state.value"
        style="width: 100%; height: 100%"
        @tab-change="onChange"
    >
        <el-tab-pane label="User" name="first">
            <div style="height: 300px">User</div>
        </el-tab-pane>
        <el-tab-pane label="Config" name="second">
            <div style="height: 300px">Config</div>
        </el-tab-pane>
        <el-tab-pane label="Role" name="third">
            <div style="height: 300px">Role</div>
        </el-tab-pane>
        <el-tab-pane label="Task" name="fourth">
            <div style="height: 300px">Task</div>
        </el-tab-pane>
    </btp-tabs-anchor>
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

<style lang="scss" scoped></style>

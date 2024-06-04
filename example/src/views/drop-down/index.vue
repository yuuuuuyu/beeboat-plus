<template>
    <div style="margin-top: 300px; margin-left: 500px">
        <div>下拉菜单组件</div>
        <BtDropDown
            ref="btDropDown"
            :title="baseState.title"
            :drop-options="baseState.dropOptions"
            :size="baseState.size"
            :trigger="baseState.trigger"
            :type="baseState.type"
            style="margin-bottom: 30px"
            @command="clickDropItem"
        />
        <el-dropdown class="bt-dropdown btDropdownIqcExport" split-button type="secondary">
            导出
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="1">勾选导出</el-dropdown-item>
                    <el-dropdown-item command="1" disabled>勾选导出</el-dropdown-item>
                    <el-dropdown-item command="2">全部导出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <br />
        <br />
        <br />
        <el-dropdown class="bt-dropdown btDropdownIqcExport" disabled split-button type="secondary">
            导出
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="1">勾选导出</el-dropdown-item>
                    <el-dropdown-item command="1" disabled>勾选导出</el-dropdown-item>
                    <el-dropdown-item command="2">全部导出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <br />
        <br />
        <br />
        <el-dropdown class="bt-dropdown btDropdownIqcExport" type="secondary">
            <el-button type="secondary"> 导出 <i class="bt-icon bt-icon-unfold"></i> </el-button>
            <!-- 导出 -->
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="1">勾选导出</el-dropdown-item>
                    <el-dropdown-item command="1" disabled>勾选导出</el-dropdown-item>
                    <el-dropdown-item command="2">全部导出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <br />
        <br />
        <br />
        <el-dropdown class="bt-dropdown btDropdownIqcExport" disabled type="secondary">
            <el-button type="secondary"> 导出 <i class="bt-icon bt-icon-unfold"></i> </el-button>
            <!-- 导出 -->
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="1">勾选导出</el-dropdown-item>
                    <el-dropdown-item command="1" disabled>勾选导出</el-dropdown-item>
                    <el-dropdown-item command="2">全部导出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const baseState = reactive({
    title: 'dropdown',
    size: 'default',
    trigger: 'hover',
    type: 'primary',
    dropOptions: [
        {
            label: 'option1',
            disabled: false,
            divided: false,
        },
        {
            label: 'option2',
            disabled: false,
            divided: true,
        },
        {
            label: 'option3',
            disabled: true,
            divided: true,
        },
    ],
})
const clickDropItem = data => {
    console.log('---------', data)
}
</script>

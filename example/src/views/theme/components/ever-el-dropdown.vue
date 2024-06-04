<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Tag 标签</span>
            </div>
        </template>
        <div>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="12">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            Dropdown List
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>Action 1</el-dropdown-item>
                                <el-dropdown-item>Action 2</el-dropdown-item>
                                <el-dropdown-item>Action 3</el-dropdown-item>
                                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                                <el-dropdown-item divided>Action 5</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-col>
                <el-col :span="12">
                    <el-dropdown split-button type="primary">
                        Large
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>Action 1</el-dropdown-item>
                                <el-dropdown-item>Action 2</el-dropdown-item>
                                <el-dropdown-item>Action 3</el-dropdown-item>
                                <el-dropdown-item>Action 4</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>
<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
</script>

<style scoped>
.example-showcase .el-dropdown-link {
    display: flex;
    align-items: center;
    color: var(--el-color-primary);
    cursor: pointer;
}
</style>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Steps 步骤条</span>
            </div>
        </template>
        <div>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="24">
                    <el-steps :active="2" align-center>
                        <el-step title="Step 1" description="Some description" />
                        <el-step title="Step 2" description="Some description" />
                        <el-step title="Step 3" description="Some description" />
                        <el-step title="Step 4" description="Some description" />
                    </el-steps>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>
<script setup lang="ts"></script>

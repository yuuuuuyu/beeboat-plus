<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Pagination 分页</span>
            </div>
        </template>
        <div>
            <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="1000"
            />
        </div>
    </el-card>
</template>
<script setup lang="ts"></script>

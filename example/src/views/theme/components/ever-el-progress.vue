<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Progress 进度条</span>
            </div>
        </template>
        <div>
            <div class="demo-progress">
                <el-progress :percentage="50" />
                <el-progress :percentage="100" :format="format" />
                <el-progress :percentage="100" status="success" />
                <el-progress :percentage="100" status="warning" />
                <el-progress :percentage="50" status="exception" />
            </div>
            <div class="demo-progress">
                <el-progress :text-inside="true" :stroke-width="26" :percentage="70" />
                <el-progress
                    :text-inside="true"
                    :stroke-width="24"
                    :percentage="100"
                    status="success"
                />
                <el-progress
                    :text-inside="true"
                    :stroke-width="22"
                    :percentage="80"
                    status="warning"
                />
                <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="50"
                    status="exception"
                />
            </div>
            <div class="demo-progress">
                <el-progress type="circle" :percentage="0" />
                <el-progress type="circle" :percentage="25" />
                <el-progress type="circle" :percentage="100" status="success" />
                <el-progress type="circle" :percentage="70" status="warning" />
                <el-progress type="circle" :percentage="50" status="exception" />
            </div>
        </div>
    </el-card>
</template>
<script setup lang="ts">
const format = (percentage: any) => (percentage === 100 ? 'Full' : `${percentage}%`)
</script>

<style scoped>
.demo-progress .el-progress--line {
    width: 350px;
    margin-bottom: 15px;
}
.demo-progress .el-progress--circle {
    margin-right: 15px;
}
</style>

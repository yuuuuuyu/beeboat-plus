<template>
    <div class="bt-component-setting">
        <div class="bt-flex-center el-font-size">
            导入模式
            <el-popover
                placement="top-start"
                :width="446"
                trigger="hover"
            >
                <template #reference>
                    <InfoFilled class="bt-icon-sty el-margin-left" />
                </template>
                <template #default>
                    <div class="bt-popover-font">
                        <div>说明:</div>
                        <div>1.新增并更新：增加系统中没有的内容，并更新系统已有的内容。 如系统中已有A、B，现导入B、C，则更新B&增加C。</div>
                        <div>2.新增：只增加系统中没有的内容，已有的内容不处理。如系统 中已有A、B，现导入B、C，则只增加C。</div>
                        <div>3.更新：只更新系统已有的内容。如系统中已有A、B，现导入 B、C，则只更新B。</div>
                    </div>
                </template>
            </el-popover>
        </div>
        <el-radio-group v-model="radioModel" size="default">
            <el-radio label="1">新增并更新</el-radio>
            <el-radio label="2">新增</el-radio>
            <el-radio label="3">更新</el-radio>
        </el-radio-group>
        <div class="bt-flex-center el-font-size el-margin-top">
            数据出错时处理
        </div>
        <el-radio-group v-model="radioData" size="default">
            <el-radio label="1">跳过错误执行</el-radio>
            <el-radio label="2">出现错误立即停止</el-radio>
        </el-radio-group>
    </div>
</template>
<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'

const radioModel = ref('1')
const radioData = ref('1')

// 将值传递给父组件
const emit = defineEmits(['getSettingData'])
watch([radioModel, radioData], newValue=> {
    emit('getSettingData', {
        radioModel: newValue[0],
        radioData: newValue[1],
    })
})
</script>
<style lang="scss" scoped>
.bt-component-setting {
    .bt-flex-center {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .bt-icon-sty {
        width: 14px;
        height: 14px;
        cursor: pointer;
    }
    :deep(.el-radio__input.is-checked+.el-radio__label) {
        color: #3E4A6B;
    }
    :deep(.el-radio__input.is-checked .el-radio__inner) {
        background: #5C84F2;
        border-color: #5C84F2;
    }
    .el-font-size {
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: 700;
        line-height: 16px;
        color: #3e4a6b;
    }
    .el-margin-left {
        margin-left: 3px;
    }
    .el-margin-top{
        margin-top: 30px;
    }
}
    .bt-popover-font {
        line-height: 22px;
        color: #3e4a6b;
    }
</style>

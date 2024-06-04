<template>
    <div>
        <div>注：1.选择出现错误立即停止时，需要将已导入的数据清空，确保导入失败，导入条数为0</div>
        <div>
            2.导入设置里的导入模式三个值都是字符串，分别是：新增并更新:'1'，新增:'2',更新:'3',导入接口接收时用
        </div>
        <div>
            3.导入设置里的数据出错时处理两个值都是字符串，分别是：跳过错误执行:'1'，出现错误立即停止:'2',导入接口接收时用
        </div>
        <BtExcelImport
            ref="excelImport"
            :dialog-title="dialogTitle"
            :request-api="requestApi"
            :down-load-url="downLoadUrl"
            :down-error-data-rul="downErrorDataUrl"
        >
            <el-button type="primary" @click="showDialog">点我</el-button>
        </BtExcelImport>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BtHttp from '../../utils/http'

const downLoadUrl = '' // 下载模板地址(必须提供，项目上提供)
const upLoadApi = 'http://10.20.20.20:33011/eam/check/checkTemplateDetail/doImpoetCheckDetail' // 文件导入地址(必须提供，项目上提供)
const downErrorDataUrl = '' // 下载错误数据地址(非必须，项目上可以提供也可以不提供)
// 文件上传 必须
const requestApi = async data => {
    const cList = await new BtHttp().$http.post(upLoadApi, data, {
        params: {},
    })
    return cList
}
const excelImport = ref()
const dialogTitle = ref('导入')

const showDialog = () => {
    excelImport.value.open()
}
</script>

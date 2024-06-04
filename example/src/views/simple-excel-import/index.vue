<template>
    <div>
        <div>导入成功返回信息里必须携带successRows参数，导入失败必须返回错误列表文件id</div>
        <BtSimpleExcelImport
            ref="excelImport"
            :dialog-title="dialogTitle"
            :request-api="requestApi"
            :down-load-url="downLoadUrl"
            :down-error-data-url="downErrorDataUrl"
        >
            <el-button type="primary" @click="showDialog">点我</el-button>
        </BtSimpleExcelImport>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BtHttp from '../../utils/http'

const downLoadUrl = '' // 下载模板地址(必须提供，项目上提供)
const upLoadApi = 'http://10.20.11.20:23333/designer/resource/tsDemo/importData' // 文件导入地址(必须提供，项目上提供)
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

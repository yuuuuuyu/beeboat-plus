<template>
    <button @click="toggleVisibleFlag">切换form disabled</button>
    <el-form :disabled="visibleFlag">
        <el-descriptions title="基础组件列表" :column="1" border>
            <el-descriptions-item label="BtPagination示例">
                <template #label>
                    <div style="min-width: 200px">BtPagination示例</div>
                </template>
                <div style="width: 600px">
                    <BtPagination
                        :multi-page-selection="false"
                        :pageable="pageable"
                        :handle-size-change="() => {}"
                        :handle-current-change="() => {}"
                    />
                </div>
            </el-descriptions-item>
            <el-descriptions-item label="BtSlot示例">
                <template #label>
                    <div style="min-width: 200px">BtSlot示例</div>
                </template>
                <div style="width: 600px">
                    <BtSlot>
                        <div>基础组件</div>
                    </BtSlot>
                </div>
                <bt-captcha v-model="aaa" />
                {{ aaa }}
            </el-descriptions-item>
            <el-descriptions-item label="BtLabel示例">
                <template #label>
                    <div style="min-width: 200px">BtLabel示例</div>
                </template>
                <div style="width: 600px">
                    <BtLabel
                        text="text"
                        :mark="true"
                        :code="true"
                        :delete-line="true"
                        :underline="true"
                        :strong="true"
                    />
                    &nbsp;
                    <BtLabel
                        text="text22"
                        :mark="false"
                        :code="false"
                        :delete-line="false"
                        :underline="false"
                        :strong="false"
                    />
                </div>
            </el-descriptions-item>

            <el-descriptions-item label="BtIcon示例">
                <template #label>
                    <div style="min-width: 200px">BtIcon示例</div>
                </template>
                <div style="width: 600px">
                    <BtIcon icon="bt-icon-title" size="22" color="red" />
                </div>
            </el-descriptions-item>

            <el-descriptions-item label="BtUpload示例">
                <template #label>
                    <div style="min-width: 200px">BtUpload示例</div>
                </template>
                <div style="width: 600px">
                    <el-form-item>
                        <BtUpload
                            ref="btUploadRef"
                            v-model:fileList="fileList"
                            :multiple="true"
                            :limit="5"
                            :request-api="uploadApi"
                            :show-size="2"
                            :drag="false"
                            :auto-slide="false"
                            :disabled-pre-view="true"
                            :disabled-delete="disabledDelete"
                            @fileChange="fileChange"
                        >
                            <template #empty>
                                <el-icon><Picture /></el-icon>

                                <!-- <span>请上传照片</span> -->
                            </template>
                            <template #tip> 圆形组件，图片最大为 5M（禁止拖拽上传）</template>
                        </BtUpload>
                    </el-form-item>
                </div>
            </el-descriptions-item>
            <!-- <el-descriptions-item label="BtImageCarousel示例">
                <template #label>
                    <div style="min-width: 200px">BtUpload示例</div>
                </template>
                <div style="width: 600px">
                    <BtImageCarousel :images="fileList" />
                </div>
            </el-descriptions-item> -->
            <el-descriptions-item label="BtUploadFile示例">
                <BtFileUpload
                    v-model:fileList="fileList"
                    :multiple="true"
                    :limit="5"
                    :request-api="fileUploadApi"
                    :drag="false"
                    :enabled-slot-file="true"
                    :file-type="['jpg', 'txt']"
                    @fileChange="fileChange"
                >
                    <template #empty>
                        <bt-button type="primary" @click="fn1">下载</bt-button>
                        <bt-button type="primary">删除</bt-button>
                    </template>
                    <template #customFile="{ file }"> {{ file }}</template>
                </BtFileUpload>
            </el-descriptions-item>
        </el-descriptions>
    </el-form>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { Picture } from '@element-plus/icons-vue'
import BtHttp from '../../utils/http'
const btUploadRef = ref()
const aaa = ref('')
const visibleFlag = ref(false)
const disabledDelete = ref(false)
const toggleVisibleFlag = () => {
    visibleFlag.value = !visibleFlag.value
    disabledDelete.value = !disabledDelete.value
    fileList.value = []
}

const pageable = ref({
    // 当前页数
    pageNumber: 1,
    // 每页显示条数
    pageSize: 10,
    // 总条数
    total: 100,
})
const fileList = ref([
    {
        name: 'img',
        url: 'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF',
    },
    // // {
    // //     name: '1',
    // //     url: 'https://www.runoob.com/try/demo_source/movie.mp4',
    // // },
    // {
    //     name: 'img4',
    //     url: 'https://img2.baidu.com/it/u=1361506290,4036378790&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    // },
    // {
    //     name: 'img5',
    //     url: 'https://inews.gtimg.com/newsapp_bt/0/14297516724/641',
    // },
    // {
    //     name: 'img3',
    //     url: 'https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
    // },
])
// watch(
//     () => fileList.value,
//     () => {
//         console.log(fileList, 'fileList...')
//     },
// )
const fn1 = () => {
    fileList.value = [
        {
            name: 'img',
            url: 'https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110013.jpg',
        },
        {
            name: 'img4',
            url: 'https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110015.jpg',
        },
    ]
    nextTick(() => {
        btUploadRef.value.doLayout()
    })
}
const abc = [
    {
        name: 'img',
        filePath: 'https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110013.jpg',
    },
    // {
    //     name: '1',
    //     url: 'https://www.runoob.com/try/demo_source/movie.mp4',
    // },

    {
        name: 'img4',
        filePath: 'https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110015.jpg',
    },
    {
        name: 'img5',
        filePath: 'https://img2.woyaogexing.com/2023/01/26/210480da6ab2ad8e33e02e9165a83cbe.jpg',
    },

    {
        name: 'img3',
        filePath: 'https://img2.woyaogexing.com/2023/01/27/d0170e9a54c3a36fd84b6981412b2145.jpg',
    },
    // {
    //     name: 'img7',
    //     url: 'https://admin.spicyboy.cn/assets/gif/avatar-ea67286d.gif',
    // },
]
const validUrl = url => {
    const pattern = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/)
    return pattern.test(url)
}
const uploadApi = () => {
    // {
    //                 // filePath: 'https://www.runoob.com/try/demo_source/movie.mp4',
    //                 filePath:
    //                     'https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110015.jpg',
    //             }
    return new Promise<any>(resolve => {
        const data: any = abc.pop()

        // data.id = 'a6e8de50200c2b26f7ef9c78596ee6d7'
        // data.filePath = '/image/bb/1.png'
        console.log(data)
        setTimeout(() => {
            // if (data.id && !validUrl(data.filePath)) {
            //     data.filePath = `http://10.20.20.20:33011/system22/app/fileObject/preview?id=${data.id}`
            // }

            return resolve({
                code: 200,
                data: data,
                msg: '图片上传成功！',
            })
        }, 5000)
    })
}
const randomNum = () => {
    return Math.floor(Math.random() * 1000 + 1)
}

const fileUploadApi = async data => {
    const cList = await new BtHttp().$http.post(
        'http://10.20.20.20:33011/system22/app/fileObject/upload',
        data,
        {
            params: { t: randomNum() },
        },
    )
    return cList
}
const fileChange = data => {
    // 实时返回文件列表
    console.log(data)
}
</script>

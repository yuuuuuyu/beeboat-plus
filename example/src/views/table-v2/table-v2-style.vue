<template>
    <div class="bt-table-ex">
        <div class="bt-table-ex--searchbar" style="background: red">
            <div class="bt-advsearchbar-ex"></div>
        </div>
        <div class="bt-table-ex--toolbar" style="background: red"></div>
        <div class="bt-table-ex--table">
            <div class="bt-table-ex--table--container">
                <el-auto-resizer>
                    <template #default="{ height, width }">
                        <div :style="{ width: width + 'px', height: height + 'px' }">
                            <el-table-v2
                                :columns="columnList"
                                :data="datas"
                                :width="width"
                                :height="height"
                                fixed
                            />
                        </div>
                    </template>
                </el-auto-resizer>
            </div>
        </div>
        <div class="bt-table-ex--paginatioin" style="background: red">
            <div class="bt-pagination-ex"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
//<el-table-v2 :columns="columns" :data="datas" :width="700" :height="200" fixed />

const columns = [] as any
const datas = [] as any

for (let i = 0; i < 4; i++) {
    let width = 150
    if (i == 1) {
        width = 1300
    }
    columns.push({
        key: `aa${i}`,
        dataKey: `data${i}`,
        title: `Column ${i}`,
        width: width,
    })
}

for (let i = 0; i < 1000; i++) {
    datas.push({
        data0: `index${i}`,
    })
}

const columnList = [
    {
        title: '索引',
        width: 150,
    },
    {
        title: '2222',
        width: 100,
    },
    {
        title: 'checkbox',
        width: 100,
    },
    {
        title: 'serviceName2',
        dataKey: 'serviceName',
        width: 1200,
    },
    {
        title: 'serviceName',
        dataKey: 'serviceName',
        width: 300,
    },
]
</script>

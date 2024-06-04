# table-screen 搜索栏

搜索栏，列表页面的通用搜索栏，配合bt-table表格使用。

## 基础用法

基础的搜索栏用法。

:::demo 支持展开/折叠、查询、重置

```vue
<template>
    <div>
        <bt-table-screen :is-btn-show="true" v-on:submit="onSubmit">
            <bt-table-screen-item label="审批单号">
                <el-input
                    clearable
                    placeholder="请输入"
                />
            </bt-table-screen-item>
        </bt-table-screen>
    </div>
</template>

<script setup lang="ts">
console.log(1111)
    function onSubmit(val) {
        console.log(val,'search submit..')
    }
</script>

<style>
.ever-table-screen__item--content{
    width:160px;
}
</style>
```

:::

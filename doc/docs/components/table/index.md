# Table 表格

用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。
::: tip
El-Table二次封装。
:::

## 基础表格

基础的表格展示用法。

:::demo

```vue
<template>
    <div style="height: 500px">
        <bt-table
            ref="proTable"
            :request-api="getUserList"
            :init-param="initParam"
            :columns="columns"
            :staticData="[]"
            :show-border="true"
            :pagination="false"
            @selection-change="selectionChange"
            @data-change="onDataChange"
            @error="onTableError"
        >
            <!-- 搜索栏-->
            <template #tableHeaderSearch>
                搜索栏
            </template>
            <!-- 操作栏-->
            <template #tableHeaderLeft="scope">
                <el-button>导出</el-button>
            </template>
            <!-- 工具栏-->
            <template #tableHeaderRight="scope">工具栏扩展</template>
            <!-- 用户状态 slot -->
            <template #status="scope">
                <!-- 如果插槽的值为 el-switch，第一次加载会默认触发 switch 的 @change 方法，所有在外层包一个盒子，点击触发盒子 click 方法 -->
                <div @click="changeStatus(scope.row)">
                    <el-switch
                        :value="scope.row.status"
                        :active-text="scope.row.status === 1 ? '启用' : '禁用'"
                        :active-value="1"
                        :inactive-value="0"
                    />
                </div>
            </template>
            <!-- 表格操作 -->

            <template #operationHeader> 重写操作列Header内容 </template>
            <template #operation="scope">
                <el-button text>查看</el-button>
                <el-button text>编辑</el-button>
            </template>
        </bt-table>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
// 接口
const getUserList = () => {
    return Promise.reject({msg:'暂无数据'})
}
// 接收表格数据
const tableData = ref({} as { pageData: { pageNumber: number; pageSize: number; total: number }; tableData: any[] })
// 获取 page-table 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref()
// 如果表格需要初始化请求参数,直接定义传给 page-table(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({
    code: '',
    sortParamList: [],
})
const columns: any = ref([
    {
        id: '0',
        type: 'selection',
        width: 60, // 宽度不写，自适应宽度
        reserveSelection: true, // 跨页勾选必须设置为true
    },
    {
        id: '1',
        prop: 'id',
        label: '项目名称',
        propType: 2,
        formatter: (_item, _row, _value) => {
            //格式化内容
            console.log(_value)
            return _value
        },
    },
    {
        id: '5',
        prop: 'operation',
        label: '操作',
        align: 'right',
    },
])
// 保存表格数据及分页对象
const onDataChange = data => {
    tableData.value = data
    console.log(tableData.value, 'tableData.value...')
}
// 监听table api错误
const onTableError = data => {
    console.log(data, 'error...')
}
// 监听勾选
const selectionChange = val => {
    console.log(
        val.map(i => i.id),
        'arr...',
    )
}
</script>
```

:::

## Table API

### 属性&事件&插槽&方法

> bt-table 表格组件支持el-table组件的全部属性、方法、事件。
> 支持el-table-column的部分属性、方法、事件。

## 属性

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :--- | :--- | :--- | :--- |
| tableHeight | 对应el-table的height,默认不填，可以根据外层元素自动获取高度 | string  | 是 | calc(100% - 1px) |
| columns | 列配置项，数组对象格式，具体内容看列属性介绍 | array  | 否 | [] |
| requestApi | 请求表格数据的api  | promise  | 否，暂时是必填项，后期会扩展增加静态data | [] |
| pagination | 是否需要分页组件 | boolean , number（true,false,1,0）  | 是 | true |
| initParam | 默认初始化请求参数 | object  | 是 | {} |
| border | 表格是否显示边框 | boolean  | 是 | true |
| showBorder | 表格是否显示边框，对el-table的样式特殊封装属性 | boolean  | 是 | true |
| stripe | 是否带斑马纹表格 | boolean  | 是 | false |
| toolButton | 是否显示表格功能按钮 | boolean  | 是 | false |
| tools | 开启表格功能栏显示的按钮 | array  | 是 | [] |
| rowKey | 支持树类型的数据的显示 | string  | 是 | 'id' |
| childrenName | 当数据存在 children 时，指定 children key 名字 | string  | 是 | 'children' |
| multiPageSelection | 是否开启跨页勾选 | boolean  | 是 | false |
| rightToolColumn | 是否显示表格header右侧工具列 | boolean  | 是 | false |

## 事件

| 事件名 | 说明 | 参数 |
| :---: | :--- | :--- |
| selectionChange | 表格多选返回勾选数据 | -- |
| dataChange | 表格数据及分页对象 | object : { pageData: { pageNumber: number; pageSize: number; total: number }; tableData: any[] } |
| error | 表格api错误返回error数据 | -- |
| search | 搜索栏条件搜索 | -- |
| reset | 搜索栏条件重置 | -- |
| advSearch | 搜索栏高级搜索 | -- |

## 插槽

| 插槽名 | 说明 | 插槽作用域 |
| :---: | :--- | :--- |
| tableHeaderSearch | `<template #tableHeaderSearch="{ids,list,isSelected}">`,ids勾选列id集合，list勾选列对象集合，isSelected是否勾选 | xxx |
| tableHeaderLeft | `<template #tableHeaderLeft="{ids,list,isSelected}">`,ids勾选列id集合，list勾选列对象集合，isSelected是否勾选 | xxx |
| tableHeaderRight | scope={ids,list,isSelected},,ids勾选列id集合，list勾选列对象集合，isSelected是否勾选 | xxx |
| 动态的columns.prop | 重写列内容，例子：列的prop='states',  `<template #states>xx</template>` | xxx |
| 动态的columns.prop+Header | 重写列标题， 例子：列的prop='states', `<template #statesHeader>xx</template>`   | xxx |

## 方法

| 方法名 | 说明 | 类型 |
| :---: | :--- | :--- |
| el-table的方法 | xxxx | xxx |

## columns属性

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :--- | :--- | :--- | :--- |
| id | 列唯一标识，列设置依赖id, | string,number  | 是 | -- |
| type | 列类型 | string  | 是  |-- |
| prop | 列属性code | string  | 否  |-- |
| label |列属性名称 | string  | 是 | -- |
| width | 列固定宽度 | string / number  | 是 | -- |
| minWidth | 列最小宽度 | string / number  | 是 | -- |
| fixed | 列是否固定在左侧或者右侧。  `true`  表示固定在左侧 | string / boolean  | 是 | true / 'left' / 'right' |
| align | 对齐方式，left / center / right | string  | 是 | 'left' |
| reserveSelection | 是否支持跨页勾选| boolean  | 是 | false |
| sortable | 支持排序 | boolean / number  | 是 | false  |
| propType | 列属性code 对应的数据类型 | number   | 是 | -- |
| dictId | 数据字典code | string  | 是 | -- |
| tag | 是否显示标签样式 | boolean / number  | 是 | -- |
| image | 是否显示图片 | boolean / number  | 是 | -- |
| columnType | 值为1，2，3，4，1对应type='index',索引列，2.对应type='selection'开启复选框，3.是正常列，4.是操作列 | string  | 是 | -- |
| showValue | 是否显示列 | boolean / number  | 是 | -- |
| enableAdvSearch | 是否高级搜索项 | boolean / number  | 是 | 0 |
| searchProp | 筛选属性 | string  | 是 | -- |
| defaultSearchItem | 外露筛选 | boolean / number  | 是 | -- |
| searchDefaultValue | 搜索默认值 | string  | 是 | -- |
| searchPropType | 搜索框显示类型：input,select,date,time,tree等 | string  | 是 | input |
| searchItemDataPreLoad | 选项加载数据类型，要求是同步方法，不能返回promise 要直接return数据 | function  | 是 | -- |
| searchItemDataChange | 选项值变化 | function  | 是 | -- |
| onCellClick | 点击列方法 | function(row,cell)  | 是 | -- |
| formatter | 格式化方法 | function  | 是 | -- |

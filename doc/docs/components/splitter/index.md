# Splitter 布局

::: tip
组件默认使用 Flex 布局。
请注意父容器避免使用 inline 相关样式，会导致组件宽度不能撑满。
:::

## 基础布局

<code>bt-splitter</code>默认`horizontal`水平向右增加列，`vertical`垂直向下增加行。

:::demo

```vue
<template>
    <div>
            布局：<el-switch v-model="isCheck" 
            active-text="horizontal" inactive-text="vertical"  />
            <div>
                对齐方式
                <el-select v-model="value" placeholder="align">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </div>
            <br />
            <div style="background-color:#555555;">
            <bt-splitter
                :mode="isCheck ? 'horizontal' : 'vertical'"
                :align="value"
                :gutter="12"
            >
                <template v-if="isCheck">
                    <bt-splitter-item unit-type="px" :default-width="200">
                        <div style="width:100%;height:100%;">第一列</div>
                    </bt-splitter-item>
                    <bt-splitter-item unit-type="%" :default-width="50">
                        <div style="height: 100px; background-color: #ffffff">
                            <div style="width:100%;height:100%;">第二列</div>
                        </div>
                    </bt-splitter-item>
                    <bt-splitter-item unit-type="%" :default-width="50">
                        <div style="background-color: #ffffff">第三列</div>
                    </bt-splitter-item>
                    <bt-splitter-item unit-type="auto">
                        <div style="background-color: #ffffff">第四列</div>
                    </bt-splitter-item>
                </template>
                <template v-else>
                    <bt-splitter-item unit-type="px" default-height="200">
                        <div style="width:100%;height:100%;background-color: #ffffff">第一行</div>
                    </bt-splitter-item>
                    <bt-splitter-item>
                        <div style="background-color: #ffffff">第二行</div>
                    </bt-splitter-item>
                </template>
            </bt-splitter>
            </div>
        </div>
</template>

<script setup >
import { ref } from 'vue'
const isCheck = ref(true)
const value = ref('top')
const options = [
    {
        value: 'top',
        label: '顶部对齐',
    },
    {
        value: 'middle',
        label: '居中对齐',
    },
    {
        value: 'bottom',
        label: '底部对齐',
    },
    {
        value: 'baseline',
        label: '内容间等间距',
    },
    {
        value: 'stretch',
        label: '两侧等间距',
    },
]
</script>

```

:::

## Splitter API

## bt-splitter属性&插槽

### 属性

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :--- | :--- | :--- | :--- |
| mode | 布局组件模式 | string | 否 | horizontal，vertical 默认horizontal    |
| gutter | 布局水槽间隔 | number  | 是 | 0 |
| backgroundColor | 背景颜色 | string  | 是 | transparent |
| backgroundImage | 背景图片 | string  | 是 | 只支持http:url网络格式图片 |

### 插槽

| 插槽名 | 说明 | 插槽作用域 |
| :---: | :--- | :--- |
| -- | 自定义默认内容 | 默认插槽 |

## bt-splitter-item组件 属性&插槽

### 属性

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :--- | :--- | :--- | :--- |
| unitType | 宽度单位类型 | string  | 是 | 'px' , '%' , 'vw', 'vh' , 'auto' 默认auto |
| defaultWidth | 栅格的默认宽度，只能是数值,mode=horizontal时使用 | string，number | 是 |单位为px，默认值100，单位为%,vm时，默认值10，单位auto为自适应   |
| defaultHeight | 栅格的默认宽度，只能是数值,mode=vertical时使用 | string，number | 是 |单位为px，默认值100，单位为%,vh时，默认值10，单位auto为自适应   |

### 插槽

| 插槽名 | 说明 | 插槽作用域 |
| :---: | :--- | :--- |
| -- | 自定义默认内容 | 默认插槽 |

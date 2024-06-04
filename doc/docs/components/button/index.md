# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<template>
  <el-space  class="mb-4">
    <bt-button>Default</bt-button>
    <bt-button type="secondary">secondary</bt-button>
    <bt-button type="secondary-plain">secondary-plain</bt-button>
    <bt-button type="danger">Danger</bt-button>
    <bt-button type="success">Success</bt-button>
    <bt-button type="info">Info</bt-button>
    <bt-button type="warning">Warning</bt-button>
    <bt-button type="danger">Danger</bt-button>
    <bt-button type="blank">blank</bt-button>
    <bt-button type="text">text</bt-button>
  </el-space>
  <el-space  class="mb-4">
    <bt-button plain>Plain</bt-button>
    <bt-button type="primary" plain>Primary</bt-button>
    <bt-button type="secondary" plain>secondary</bt-button>
    <bt-button type="secondary-plain" plain>secondary-plain</bt-button>
    <bt-button type="success" plain>Success</bt-button>
    <bt-button type="info" plain>Info</bt-button>
    <bt-button type="warning" plain>Warning</bt-button>
    <bt-button type="danger" plain>Danger</bt-button>
    <bt-button type="blank" plain>blank</bt-button>
  </el-space>

  <el-space  class="mb-4">
    <bt-button round>Round</bt-button>
    <bt-button type="primary" round>Primary</bt-button>
    <bt-button type="secondary" round>secondary</bt-button>
    <bt-button type="secondary-plain" round>secondary-plain</bt-button>
    <bt-button type="success" round>Success</bt-button>
    <bt-button type="info" round>Info</bt-button>
    <bt-button type="warning" round>Warning</bt-button>
    <bt-button type="danger" round>Danger</bt-button>
    <bt-button type="blank" round>blank</bt-button>
  </el-space>
  <el-space >
    <bt-button circle >c1</bt-button>
    <bt-button type="primary" circle >p2</bt-button>
    <bt-button type="secondary" circle >s3</bt-button>
    <bt-button type="secondary-plain" circle >sp</bt-button>
    <bt-button type="success" circle >r5</bt-button>
    <bt-button type="info" circle >n6</bt-button>
    <bt-button type="warning" circle >w7</bt-button>
    <bt-button type="danger" circle >d8</bt-button>
    <bt-button type="blank" circle >b9</bt-button>
  </el-space>

</template>
<style lang="scss">
.mb-4 {
    margin-bottom:16px;
}
</style>
```

:::

## 不同尺寸

`type`、`plain`、`round`提供三种不同尺寸的按钮。

:::demo

```vue
<template>
  <el-row class="mb-4">
    <bt-button size="large">Default</bt-button>
    <bt-button>Default</bt-button>
    <bt-button size="small">Default</bt-button>
  </el-row>
  <el-row  class="mb-4">
    <bt-button plain size="large">Plain</bt-button>
    <bt-button plain>Plain</bt-button>
    <bt-button plain size="small">Plain</bt-button>
  </el-row>

  <el-row>
    <bt-button round size="large">Round</bt-button>
    <bt-button round>Round</bt-button>
    <bt-button round size="small">Round</bt-button>
  </el-row>

</template>

```

:::

## 禁用

你可以使用 <code>disabled</code> 属性来定义按钮是否被禁用。

使用 <code>disabled</code> 属性来控制按钮是否为禁用状态。 该属性接受一个 <code>Boolean</code> 类型的值。

:::demo

```vue
<template>
  <el-space>
    <bt-button>默认按钮</bt-button>
    <bt-button type="primary" disabled>主要按钮</bt-button>
    <bt-button type="secondary" disabled>secondary</bt-button>
    <bt-button type="secondary-plain" disabled>secondary-plain</bt-button>
    <bt-button type="warning" disabled>警告按钮</bt-button>
    <bt-button type="danger" disabled>危险按钮</bt-button>
  </el-space>
</template>
```

:::

## Button API

### 属性

| 属性名    |   <div style="width:80px">说明</div>     |  类型    | 可选值                                             | 默认值  |
| ------- | --------  | -------  | -------------------------------------------------- | ------- |
| size    | 尺寸   | string  | large / default / small                               | default |
| type    | 类型   | string  | primary / secondary / secondary-plain / warning / danger / dashed / text / blank  | primary |
| loading | 加载中 | boolean | —                                                  | false   |

### 插槽

|       插槽名              |                说明              | 是否支持                 |
| ------------------------------------------ | ------------------------------------  | -----------------------------------  |
|default |自定义默认内容 |  支持 |
|loading |自定义加载中组件| 不支持  |
|icon | 自定义图标组件| 不支持|

# 快速开始

## 安装

### npm

`npm install beeboat-plus`

### yarn

`yarn add beeboat-plus`

### pnpm

`pnpm add beeboat-plus`

## 全局引入

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@beeboat/theme/src/index.scss'
import * as components from '@beeboat/components'
import * as directives from '@beeboat/directives'
const app = createApp(App)
app.use(createPinia())
Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
})
Object.entries(directives).forEach(([name, component]) => {
    app.directive(name, component)
})
app.use(router).use(ElementPlus).mount('#app')

```

## 按需引入（待完善）

### vite

`npm install unplugin-vue-components`

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import BeeboatUIResolver from 'beeboat-plus/resolver'
export default defineConfig({
  plugins: [
    Components({
      resolvers: [BeeboatUIResolver()]
    })
  ]
})
```

### Volar 支持（待完善）

如果你在使用 Volar，那么可以在 tsconfig.json 中配置 compilerOptions.types 来指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["beeboat-plus/volar"]
  }
}
```

以上配置完就可以在`template`得到代码提示了

<!-- <img src="http://cdn.coderly.top/imgs/代码提示.gif" style="width:500px" /> -->

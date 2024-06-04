// @ts-nocheck
// TODO 不可删除 注册演示组件
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

import InputDemo from '../components/input/demo.vue'
export function useComponents(app) {
  app.component('Demo', Demo)
  app.component('DemoBlock', DemoBlock)
  app.component('InputDemo', InputDemo)
}

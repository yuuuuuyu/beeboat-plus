import BtBaseMountHandler from '../base/base-mount-handler'

/**
 * 应用挂载处理对象
 * @author Enmaai
 */
export default class BtAppMountHandler extends BtBaseMountHandler {
    readonly className: string = 'BtAppMountHandler'

    handle() {
        // 加载组件
        if (this.getApp().options.component) {
            Object.entries(this.getApp().options.component).forEach(([name, component]: any) => {
                this.getVueApp().component(name, component)
            })
        }
        // 加载指令
        if (this.getApp().options.directive) {
            Object.entries(this.getApp().options.directive).forEach(([name, component]: any) => {
                this.getVueApp().directive(name, component)
            })
        }
        // 加载组件库
        if (this.getApp().options.componentKit) {
            this.getApp().options.componentKit.forEach(kit => {
                this.getVueApp().use(kit)
            })
        }
    }
}

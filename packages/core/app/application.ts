import { createApp } from 'vue'
import BTPBaseApplication from './base-application'

export default class BTPApplication extends BTPBaseApplication {
    constructor(options: any) {
        super(options)
        BTPApplication.setInstance(this)
    }

    /**
     * 静态方法 获取应用实例对象
     * @returns 应用实例
     */
    public static getInstance(): BTPApplication {
        return super.getInstance() as BTPApplication
    }

    /**
     * 获取微应用事件
     * @returns 微应用事件
     */
    getMicroAppEvent(): any {
        return (window as any)[this.getEnv('VITE_APP_CHILD_EVENT_NAME')] || (window as any).microApp
    }

    async mount() {
        if (this.getMicroAppEvent()) {
            this.initMicroApp()
        }
        this.$app = createApp(this.options.appTemplate)
        this.$app.config.globalProperties.$btApplication = this
        await this.loadHandler('setup')

        this.$app.use(this.$router)
        if (this.getToken()) {
            // 可重写需要加载的缓存数据
            await this.loadCacheData()
        }
        if (!this.isMicroApp()) {
            await this.$router.isReady()
        }
        this.loadHandler('mount')
        this.$app.mount(`#${this.getEnv('VITE_APP_MOUNT_NAME')}`)
    }

    /**
     * 卸载应用
     */
    unmount(): void {
        this.$app?.unmount()
        this.getMicroAppEvent()?.clearDataListener()
        this.$app = null as any
        this.$router = null as any
    }

    /**
     * 初始化微应用
     */
    initMicroApp(): void {
        let status = false
        this.getMicroAppEvent()?.addDataListener(data => {
            const router = this.$router
            if (data.path && typeof data.path === 'string') {
                data.path = data.path.replace(/^#/, '')
                if (status) {
                    router.push(data.path)
                } else {
                    //TODO 此处延迟代码又缺陷
                    setTimeout(() => {
                        router.push(data.path)
                        status = true
                    }, 800)
                }
            }
        }, true)
        window.addEventListener('unmount', () => {
            this.unmount()
        })
    }
}

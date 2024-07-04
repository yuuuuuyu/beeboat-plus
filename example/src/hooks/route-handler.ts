import { BTPRouterCreateHandler } from '@beeboat/core/handlers/index'
import { routes } from '../router/index'
import { Router, RouterHistory, createRouter, createWebHashHistory } from 'vue-router'

export default class RouteHandler extends BTPRouterCreateHandler {
    async handle() {
        const router = await this.createRouterInstance()

        await this.addRouteBeforeListener(router, routes)
        await this.addRouteAfterListener(router, routes)
        await this.getApp().setRouter(router)
    }

    /**
     * @description 创建路由对象
     * @returns 路由信息
     */
    async createRouterInstance(): Promise<Router> {
        const history = this.createHistory()
        const scrollBehavior = this.createScrollBehavior as any

        this.formatRouteView(routes)

        const router = createRouter({
            history,
            routes,
            strict: true,
            scrollBehavior(to, from, savedPosition) {
                return scrollBehavior(to, from, savedPosition)
            },
        })
        return new Promise(resolve => {
            resolve(router)
        })
    }

    /**
     * @description 添加路由的前监听器
     * @param router 路由
     * @param routes 路由数据
     */
    addRouteBeforeListener(router: any, routes: any): Promise<Boolean> {
        return new Promise(resolve => {
            router.beforeEach(async (to, _from, next) => {
                next()
            })
            resolve(true)
        })
    }

    /**
     * @description 添加路由的后监听器
     * @param router 路由
     * @param _routes 路由数据
     */
    addRouteAfterListener(router: any, _routes: any): Promise<Boolean> {
        return new Promise(resolve => {
            resolve(true)
        })
    }
}

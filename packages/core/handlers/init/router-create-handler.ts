import { BTPBaseInitHandler } from '../base/index'
import { Router, RouterHistory, createRouter, createWebHashHistory } from 'vue-router'
import BtNProgress from '../../utils/nprogress'
import BTPUtils from '../../utils/btp-utils'

/**
 * 路由创建对象
 * @author Enmaai
 */
export default class BTPRouterCreateHandler extends BTPBaseInitHandler {
    readonly className = 'BTPRouterCreateHandler'
    /**
     * 进度条
     */
    protected nprogress = new BtNProgress()

    async handle() {
        const routes = (await this.loadRemoteRouteData()) as any
        const router = await this.createRouterInstance()

        await this.addRouteBeforeListener(router, routes)
        await this.addRouteAfterListener(router, routes)
        await this.getApp().setRouter(router)
    }

    /**
     * @description 创建滚动行为对象
     * @param to 目标
     * @param from  原始
     * @param savedPosition 已保存位置
     * @returns 对象
     */
    createScrollBehavior(to, from, savedPosition): Promise<any> {
        return new Promise(resolve => {
            if (savedPosition) {
                return savedPosition
            } else {
                if (from.meta.saveScrollTop) {
                    const top: number =
                        document.documentElement.scrollTop || document.body.scrollTop
                    resolve({ left: 0, top })
                }
            }
        })
    }

    /**
     * @description 创建路由对象
     * @returns 路由信息
     */
    async createRouterInstance(): Promise<Router> {
        const history = this.createHistory()
        const routes = await this.loadRemoteRouteData()
        const scrollBehavior = this.createScrollBehavior as any

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
     * @description 初始化URL路由模式
     * @returns 历史信息
     */
    createHistory(): RouterHistory {
        return createWebHashHistory()
    }

    /**
     * @description 添加路由的前监听器
     * @param router 路由
     * @param routes 路由数据
     */
    addRouteBeforeListener(router: Router, routes: any): Promise<Boolean> {
        return new Promise(resolve => {
            router.beforeEach(async (to, _from, next) => {
                this.nprogress.start()
                if (this.getApp().getToken()) {
                    if (!this.getCacheManager().getUserId()) {
                        //重新加载用户、菜单数据
                        await this.getApp().loadCacheData()
                        //进行路由菜单权限处理
                        this.loadRouteData(router, routes)
                    }
                    next()
                    return
                }
                if (this.isWhiteUrl(to.path) || to.meta?.dynamicLoad == false) {
                    next()
                    return
                }
                next({ path: this.getApp().getLoginUrl() })
            })
            resolve(true)
        })
    }

    /**
     * @description 添加路由的后监听器
     * @param router 路由
     * @param _routes 路由数据
     */
    addRouteAfterListener(router: Router, _routes: any): Promise<Boolean> {
        return new Promise(resolve => {
            router.afterEach(() => {
                this.nprogress.done()
            })
            resolve(true)
        })
    }

    /**
     * @description 判断是否白名单地址
     * @param path 地址
     * @returns 是否白名单地址
     */
    isWhiteUrl(path) {
        return this.getApp().getEnv('VITE_WHITELIST')?.includes(path)
    }

    /**
     * @description 加载远程路由数据
     * @returns 路由数据
     */
    loadRemoteRouteData(): Promise<any> {
        return new Promise(resolve => {
            BTPUtils.getAppManager()
                .loadRemoteRouteData()
                .then(data => {
                    this.formatRouteView(data)
                    this.getCacheManager().setAllRouter(data)
                    resolve(data)
                })
        })
    }

    /**
     * @description 格式化路由视图
     * @param routes 路由信息
     */
    formatRouteView(routes): void {
        if (routes) {
            routes.forEach(item => {
                if (item.meta?.viewId) {
                    item.component = BTPUtils.getAppManager().getPage(
                        item.meta.viewId,
                        item.meta.viewModelId,
                    )
                }
                if (item.children) {
                    this.formatRouteView(item.children)
                }
            })
        }
    }

    /**
     * @description 加载动态权限路由
     * @param router 路由对象
     * @param concatRouter 路由树
     */
    loadRouteData(router: any, concatRouter: any) {
        const dynamicList = []
        concatRouter.forEach((route: any) => {
            this.listDynamicRoute(route, dynamicList)
        })

        dynamicList.forEach((route: any) => {
            if (!this.getCacheManager().hasMenuRouteId(route.meta.id)) {
                router.removeRoute(route.name)
            }
        })
    }

    /**
     * 查询全部动态校验权限的路由
     * @param route 路由
     * @param dynamicList 动态校验权限路由项列表
     * @returns 是否有动态路由
     */
    listDynamicRoute(route: any, dynamicList: any) {
        let hasDynamic = false
        if (route.children && route.children.length > 0) {
            route.children.forEach(child => {
                if (this.listDynamicRoute(child, dynamicList)) {
                    hasDynamic = true
                }
            })
        }
        if (hasDynamic || (route.meta && route.meta.dynamicLoad)) {
            if (!route.children || route.children.length == 0) {
                dynamicList.push(route)
            }
            hasDynamic = true
        }
        return hasDynamic
    }
}

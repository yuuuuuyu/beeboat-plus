import { BTPBaseInitHandler } from '../base/index'
import {
    Router,
    RouterHistory,
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from 'vue-router'
import BtNProgress from '../../utils/nprogress'
import { BtUseAppStore } from '../../store'
import { treeToList } from '../../utils/utils'
import BTGlobalAppManager from '../../view/global-manager'
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
        const history = this.createHistory()
        const scrollBehavior = this.createScrollBehavior as any

        const router: Router = createRouter({
            history,
            routes,
            strict: true,
            scrollBehavior(to, from, savedPosition) {
                return scrollBehavior(to, from, savedPosition)
            },
        })
        router.afterEach(() => {
            this.nprogress.done()
        })
        router.beforeEach(async (to, _from, next) => {
            this.nprogress.start()
            //1.判断地址是否白名单地址
            if (this.isWhiteUrl(to.path) || to.meta?.dynamicLoad == false) {
                next()
                return
            }
            if (this.getApp().getToken()) {
                //2.存在登录信息则正常跳转
                const appStore = BtUseAppStore()
                //判断用户信息是否加载完毕
                if (!appStore.getUser?.id) {
                    this.getApp().options.constRoutes.map(i => {
                        router.addRoute({ ...i })
                    })
                    //重新加载用户、菜单数据
                    //重新加载用户、菜单数据
                    await this.app.loadCacheData()
                    //进行路由菜单权限处理
                    this.loadRouteData(router, routes)
                }
                next()
                return
            }

            next({ path: this.getLoginUrl() })
        })

        this.getApp().setRouter(router)
    }

    /**
     * @description 创建滚动行为对象
     * @param to 目标
     * @param from  原始
     * @param savedPosition 已保存位置
     * @returns 对象
     */
    createScrollBehavior(to, from, savedPosition) {
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
     * @description 初始化URL路由模式 默认hash
     */
    createHistory(): RouterHistory {
        if ((this.getApp().getEnv('VITE_ROUTER_HISTORY') || 'hash') === 'hash') {
            return createWebHashHistory()
        } else {
            return createWebHistory()
        }
    }

    /**
     * @description 判断是否白名单地址
     * @param path 地址
     * @returns 是否白名单地址
     */
    isWhiteUrl(path) {
        return this.getApp().getEnv('VITE_WHITELIST').indexOf(path) !== -1
    }

    /**
     * @description 获取登录页面
     * @returns 登录页面
     */
    getLoginUrl() {
        return this.getApp()?.options?.loginPath || '/login'
    }

    loadRemoteRouteData() {
        return new Promise(resolve => {
            fetch('./mock/route.json')
                .then(response => response.json())
                .then(data => {
                    this.formatRouteView(data)
                    this.getApp().setAllRouter(data)
                    resolve(data)
                })
        })
    }

    formatRouteView(routes) {
        if (routes) {
            routes.forEach(item => {
                if (item.meta?.viewId) {
                    item.component = BTGlobalAppManager.getPage(
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
        const menuList = treeToList(BtUseAppStore().getMenuList())
        const menuMap = {}
        menuList.forEach(menu => {
            menuMap[menu.routeId] = menu
        })
        const dynamicList = []
        concatRouter.forEach((route: any) => {
            this.listDynamicRoute(route, dynamicList)
        })
        dynamicList.forEach((route: any) => {
            if (!menuMap[route.meta.id]) {
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

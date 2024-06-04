import BtBaseInitHandler from '../base/base-init-handler'
import {
    Router,
    RouterHistory,
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from 'vue-router'
import microApp from '@micro-zoe/micro-app'
import BtNProgress from '../utils/nprogress'
import { BtUseAppStore } from '../store'
import { treeToList } from '../utils'
/**
 * 路由创建对象
 * @author Enmaai
 */
export default class BtRouterCreateHandler extends BtBaseInitHandler {
    readonly className = 'BtRouterCreateHandler'
    /**
     * 进度条
     */
    protected nprogress = new BtNProgress()

    handle() {
        const routes = this.createRoutes(this.getApp().options.constRoutes)
        const history = this.createHistory()
        const router: Router = createRouter({
            history,
            routes,
            strict: true,
            scrollBehavior(to, from, savedPosition) {
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
            },
        })
        router.afterEach(() => {
            this.nprogress.done()
        })
        router.beforeEach(async (to, _from, next) => {
            this.nprogress.start()
            //1.判断地址是否白名单地址
            if (this.isWhiteUrl(to.path)) {
                next()
                return
            }
            if (to.meta?.dynamicLoad == false) {
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
                    await this.loadAppData(router, routes)
                }
                next()
                return
            }

            next({ path: this.getLoginUrl() })
        })

        this.getApp().setRouter(router)
    }

    /**
     * 初始化URL路由模式 默认hash
     * @param params
     */
    createHistory(): RouterHistory {
        if ((this.getApp().getEnv('VITE_ROUTER_HISTORY') || 'hash') === 'hash') {
            return createWebHashHistory()
        } else {
            return createWebHistory()
        }
    }

    /**
     * 初始化路由列表
     * @param routeList
     * @returns
     */
    createRoutes(routeList) {
        return routeList
    }

    /**
     * 判断是否白名单地址
     * @param path 地址
     * @returns 是否白名单地址
     */
    isWhiteUrl(path) {
        return this.getApp().options.whiteList.indexOf(path) !== -1
    }

    /**
     * 获取登录页面
     * @returns 登录页面
     */
    getLoginUrl() {
        return this.getApp()?.options?.loginPath || '/login'
    }

    /**
     * 加载动态权限路由
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

    /**
     * 加载应用数据
     * @param router 路由
     * @param routes 静态路由表
     */
    async loadAppData(_router: Router, _routes: any) {
        //重新加载子应用
        await this.loadMicroApp()
        //重新加载用户、菜单数据
        await this.app.loadCacheData()
        //TODO 暂时屏蔽路由逻辑判断
        //进行路由菜单权限处理
        this.loadRouteData(_router, _routes)
    }
    /**
     * 加载父应用数据
     */
    async loadMicroApp() {
        const app = this.app
        if (app.getConfig('serviceType', '20') != '21') {
            return
        }
        const apiUrl = app.getConfig('serviceLoadApi', '/system/app/serviceObject/list')
        const data = await app.$http.post(apiUrl, {})
        const appStore = BtUseAppStore()
        appStore.setServiceData(data.data)

        const childModules = data.data.map((v: any) => ({ name: v.appCode, url: v.addr }))
        const modules = {}
        childModules.map((i: any) => {
            const regExp = new RegExp(`(from|import)(\\s*['"])(\\/${i.name}\\/)`, 'g')
            modules[i.name] = [
                {
                    loader(code: string) {
                        if (process.env.NODE_ENV === 'development') {
                            code = code.replace(regExp, all => {
                                return all.replace(`/${i.name}/`, i.url)
                            })
                        }
                        return code
                    },
                },
            ]
        })
        // 子应用
        microApp.start({
            plugins: {
                global: [{ escapeProperties: ['onresize'] }],
                modules,
            },
            lifeCycles: {
                created(e) {
                    console.log(e, 'created')
                },
                mounted(e) {
                    console.log(e, 'mounted')
                },
                unmount(e) {
                    console.log(e, 'unmount')
                },
                error(e) {
                    console.log(e, 'error')
                },
                // 解决microapp更新后打包报错
                beforemount(e) {
                    console.log(e, 'error')
                },
                beforeshow(e) {
                    console.log(e, 'error')
                },
                aftershow(e) {
                    console.log(e, 'error')
                },
                afterhidden(e) {
                    console.log(e, 'error')
                },
            },
        })
    }
}

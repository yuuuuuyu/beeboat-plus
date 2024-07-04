var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BTPBaseInitHandler } from '../base/index';
import { createRouter, createWebHashHistory, } from 'vue-router';
import BtNProgress from '../../utils/nprogress';
import BTPUtils from '../../utils-ex/utils-ex';
/**
 * 路由创建对象
 * @author Enmaai
 */
export default class BTPRouterCreateHandler extends BTPBaseInitHandler {
    constructor() {
        super(...arguments);
        this.className = 'BTPRouterCreateHandler';
        /**
         * 进度条
         */
        this.nprogress = new BtNProgress();
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            const routes = (yield this.loadRemoteRouteData());
            const router = yield this.createRouterInstance();
            yield this.addRouteBeforeListener(router, routes);
            yield this.addRouteAfterListener(router, routes);
            yield this.getApp().setRouter(router);
        });
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
                return savedPosition;
            }
            else {
                if (from.meta.saveScrollTop) {
                    const top = document.documentElement.scrollTop || document.body.scrollTop;
                    resolve({ left: 0, top });
                }
            }
        });
    }
    /**
     * @description 创建路由对象
     * @returns 路由信息
     */
    createRouterInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            const history = this.createHistory();
            const routes = yield this.loadRemoteRouteData();
            const scrollBehavior = this.createScrollBehavior;
            const router = createRouter({
                history,
                routes,
                strict: true,
                scrollBehavior(to, from, savedPosition) {
                    return scrollBehavior(to, from, savedPosition);
                },
            });
            return new Promise(resolve => {
                resolve(router);
            });
        });
    }
    /**
     * @description 初始化URL路由模式
     * @returns 历史信息
     */
    createHistory() {
        return createWebHashHistory();
    }
    /**
     * @description 添加路由的前监听器
     * @param router 路由
     * @param routes 路由数据
     */
    addRouteBeforeListener(router, routes) {
        return new Promise(resolve => {
            router.beforeEach((to, _from, next) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                this.nprogress.start();
                if (this.isWhiteUrl(to.path) || ((_a = to.meta) === null || _a === void 0 ? void 0 : _a.dynamicLoad) == false) {
                    next();
                    return;
                }
                if (this.getApp().getToken()) {
                    if (!this.getCacheManager().getUserId()) {
                        //重新加载用户、菜单数据
                        yield this.getApp().loadCacheData();
                        //进行路由菜单权限处理
                        this.loadRouteData(router, routes);
                    }
                    next();
                    return;
                }
                next({ path: this.getLoginUrl() });
            }));
            resolve(true);
        });
    }
    /**
     * @description 添加路由的后监听器
     * @param router 路由
     * @param _routes 路由数据
     */
    addRouteAfterListener(router, _routes) {
        return new Promise(resolve => {
            router.afterEach(() => {
                this.nprogress.done();
            });
            resolve(true);
        });
    }
    /**
     * @description 判断是否白名单地址
     * @param path 地址
     * @returns 是否白名单地址
     */
    isWhiteUrl(path) {
        return this.getApp().getEnv('VITE_WHITELIST').indexOf(path) !== -1;
    }
    /**
     * @description 获取登录页面
     * @returns 登录页面
     */
    getLoginUrl() {
        var _a, _b;
        return ((_b = (_a = this.getApp()) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.loginPath) || '/login';
    }
    /**
     * @description 加载远程路由数据
     * @returns 路由数据
     */
    loadRemoteRouteData() {
        return new Promise(resolve => {
            BTPUtils.getAppManager().loadRemoteRouteData().then(data => {
                this.formatRouteView(data);
                this.getCacheManager().setAllRouter(data);
                resolve(data);
            });
        });
    }
    /**
     * @description 格式化路由视图
     * @param routes 路由信息
     */
    formatRouteView(routes) {
        if (routes) {
            routes.forEach(item => {
                var _a;
                if ((_a = item.meta) === null || _a === void 0 ? void 0 : _a.viewId) {
                    item.component = BTPUtils.getAppManager().getPage(item.meta.viewId, item.meta.viewModelId);
                }
                if (item.children) {
                    this.formatRouteView(item.children);
                }
            });
        }
    }
    /**
     * @description 加载动态权限路由
     * @param router 路由对象
     * @param concatRouter 路由树
     */
    loadRouteData(router, concatRouter) {
        const dynamicList = [];
        concatRouter.forEach((route) => {
            this.listDynamicRoute(route, dynamicList);
        });
        dynamicList.forEach((route) => {
            if (!this.getCacheManager().hasMenuRouteId(route.meta.id)) {
                router.removeRoute(route.name);
            }
        });
    }
    /**
     * 查询全部动态校验权限的路由
     * @param route 路由
     * @param dynamicList 动态校验权限路由项列表
     * @returns 是否有动态路由
     */
    listDynamicRoute(route, dynamicList) {
        let hasDynamic = false;
        if (route.children && route.children.length > 0) {
            route.children.forEach(child => {
                if (this.listDynamicRoute(child, dynamicList)) {
                    hasDynamic = true;
                }
            });
        }
        if (hasDynamic || (route.meta && route.meta.dynamicLoad)) {
            if (!route.children || route.children.length == 0) {
                dynamicList.push(route);
            }
            hasDynamic = true;
        }
        return hasDynamic;
    }
}

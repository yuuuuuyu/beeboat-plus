import { BTPBaseInitHandler } from '../base/index';
import { Router, RouterHistory } from 'vue-router';
import BtNProgress from '../../utils/nprogress';
/**
 * 路由创建对象
 * @author Enmaai
 */
export default class BTPRouterCreateHandler extends BTPBaseInitHandler {
    readonly className = "BTPRouterCreateHandler";
    /**
     * 进度条
     */
    protected nprogress: BtNProgress;
    handle(): Promise<void>;
    /**
     * @description 创建滚动行为对象
     * @param to 目标
     * @param from  原始
     * @param savedPosition 已保存位置
     * @returns 对象
     */
    createScrollBehavior(to: any, from: any, savedPosition: any): Promise<any>;
    /**
     * @description 创建路由对象
     * @returns 路由信息
     */
    createRouterInstance(): Promise<Router>;
    /**
     * @description 初始化URL路由模式
     * @returns 历史信息
     */
    createHistory(): RouterHistory;
    /**
     * @description 添加路由的前监听器
     * @param router 路由
     * @param routes 路由数据
     */
    addRouteBeforeListener(router: Router, routes: any): Promise<Boolean>;
    /**
     * @description 添加路由的后监听器
     * @param router 路由
     * @param _routes 路由数据
     */
    addRouteAfterListener(router: Router, _routes: any): Promise<Boolean>;
    /**
     * @description 判断是否白名单地址
     * @param path 地址
     * @returns 是否白名单地址
     */
    isWhiteUrl(path: any): boolean;
    /**
     * @description 获取登录页面
     * @returns 登录页面
     */
    getLoginUrl(): any;
    /**
     * @description 加载远程路由数据
     * @returns 路由数据
     */
    loadRemoteRouteData(): Promise<any>;
    /**
     * @description 格式化路由视图
     * @param routes 路由信息
     */
    formatRouteView(routes: any): void;
    /**
     * @description 加载动态权限路由
     * @param router 路由对象
     * @param concatRouter 路由树
     */
    loadRouteData(router: any, concatRouter: any): void;
    /**
     * 查询全部动态校验权限的路由
     * @param route 路由
     * @param dynamicList 动态校验权限路由项列表
     * @returns 是否有动态路由
     */
    listDynamicRoute(route: any, dynamicList: any): boolean;
}

import BTPBaseApplication from '../../app/base-application';
/**
 * init:初始加载插件，setup 启动加载插件，api加载插件
 */
export type LoadTypes = 'setup' | 'init' | 'api' | 'mount';
/**
 * 处理类基类
 * @author Enmaai
 */
export default class BtBaseHandler {
    /**
     * 应用程序对象
     */
    protected app: BTPBaseApplication;
    /**
     * 加载类型
     */
    protected _loadType: LoadTypes;
    /**
     * 排序 默认100
     */
    protected _rank: number;
    /**
     * 初始化应用程序入口
     * @param app createApp()对象
     */
    init(app: BTPBaseApplication): void;
    getApp(): BTPBaseApplication;
    getCacheManager(): import("../..").BTPAppCacheManager;
    getEnv(key: string): any;
    getVueApp(): import("vue").App<Element>;
    isType(loadType: LoadTypes): boolean;
    isMicroApp(): boolean;
    getMicroAppData(): any;
    handle(params: any): void;
}

/**
 * 全局应用缓存数据管理对象
 * @author Enmaai
 */
export default class BTPAppCacheManager {
    /**
     * 接口数据
     */
    private methodMap;
    /**
     * 全部路由数据
     */
    allRouter: any;
    /**
     * 用户登录信息
     */
    private userToken;
    /**
     * 角色列表
     */
    private roleIdList;
    /**
     * 权限列表
     */
    private rightIdList;
    /**
     * 菜单项路由ID列表数据
     */
    private menuRouteIdList;
    /**
     * 菜单树数据
     */
    private menuTreeList;
    /**
     * 数据字典数据
     */
    private dictMap;
    constructor();
    /**
     * 清空数据
     */
    clear(): void;
    /**
     * @description 判断是否拥有角色
     * @param roleId 角色标识
     * @returns 是否拥有角色
     */
    hasRole(roleId: String): Boolean;
    /**
     * @description 判断是否拥有权限
     * @param rightId 权限标识
     * @returns 是否拥有权限
     */
    hasRight(rightId: String): Boolean;
    /**
     * @description 获取登录令牌信息
     * @returns 获取登录令牌信息
     */
    getToken(): any;
    /**
     * @description 获取登录令牌ID
     * @returns 获取登录令牌ID
     */
    getTokenId(): String;
    /**
     * @description 获取登录用户信息
     * @returns 获取登录用户信息
     */
    getUser(): any;
    /**
     * @description 获取登录用户ID
     * @returns 获取登录用户ID
     */
    getUserId(): String;
    /**
     * @description 获取登录用户名称
     * @returns 获取登录用户名称
     */
    getUserName(): String;
    /**
     * @description 获取菜单树列表数据
     * @returns 菜单树列表数据
     */
    getMenuTreeList(): Array<any>;
    /**
     * @description 判断当前用户是否包含该菜单项
     * @param menuRouteId 菜单项路由ID
     * @returns 当前用户是否包含该菜单项
     */
    hasMenuRouteId(menuRouteId: String): Boolean;
    /**
     * @description 获取数据字典项
     * @returns 获取数据字典项
     */
    getDictItemList(dictId: any): Array<any>;
    /**
     * @description 根据字典Code标识和字典项值获取字典项
     * @param dictId 数据字典Code标识
     * @param itemValue 值
     * @returns 字典项
     */
    getDictItem(dictId: String, itemValue: String): String;
    /**
     * @description 根据字典Code标识和字典项值获取字典项的文本
     * @param dictId 数据字典Code标识
     * @param itemValue 值
     * @returns 字典项文本
     */
    getDictItemText(dictId: String, itemValue: String): String;
    /**
     * @description 根据字典Code标识和字典项文本获取字典项的值
     * @param dictId 数据字典Code标识
     * @param itemValue 文本
     * @returns 字典项值
     */
    getDictItemValue(dictId: String, itemText: String): String;
    /**
     * @description 设置用户登录信息
     * @param userToken 用户登录信息
     * @param containsRoleRight 包含角色权限数据
     */
    setToken(userToken: any, containsRoleRight?: boolean): void;
    /**
     * @description 从登录信息中解析角色权限数据
     */
    private parseRoleRight;
    /**
     * @description 设置菜单树数据
     * @param menuTreeList 菜单树数据
     */
    setMenuTreeList(menuTreeList: any): void;
    /**
     * @description 设置数据字典数据
     * @param dictMap 数据字典数据
     */
    setDictMap(dictMap: any): void;
    /**
     * @description 向下递归查找数据项
     * @param dataList 数据列表
     * @param propKey 匹配键
     * @param propValue 匹配值
     * @returns 数据项
     */
    private recursionChild;
    /**
     * @description 获取全部路由数据
     */
    getAllRouter(): any;
    /**
     * @description 设置全部路由数据
     */
    setAllRouter(allRouter: any): void;
    /**
     * @description 缓存接口列表
     * @param methodList 接口列表
     */
    cacheMethodList(methodList: Array<any>): void;
    /**
     * @description 获取接口信息
     * @param methodId 接口标识
     * @returns 接口信息
     */
    getMethod(methodId: string): any;
    /**
     * @description 获取接口地址
     * @param methodId 接口标识
     * @returns 接口地址
     */
    getMethodUrl(methodId: string): string;
    /**
     * @description 获取用户场景数据
     * @param sceneId 场景ID
     * @returns  用户场景数据
     */
    getScene(sceneId: string): Promise<any>;
    /**
     * @description 保存用户场景数据
     * @param sceneId 场景ID
     * @param data 场景数据
     * @returns  结果
     */
    saveScene(sceneId: string, data: any): Promise<any>;
}

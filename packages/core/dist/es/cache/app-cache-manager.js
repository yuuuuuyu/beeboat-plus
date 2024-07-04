import Utils from '../utils-ex/utils';
import BTPUtils from '../utils-ex/utils-ex';
/**
 * 全局应用缓存数据管理对象
 * @author Enmaai
 */
export default class BTPAppCacheManager {
    constructor() {
        /**
         * 接口数据
         */
        this.methodMap = {};
        /**
         * 用户登录信息
         */
        this.userToken = undefined;
        /**
         * 角色列表
         */
        this.roleIdList = [];
        /**
         * 权限列表
         */
        this.rightIdList = [];
        /**
         * 菜单项路由ID列表数据
         */
        this.menuRouteIdList = [];
        /**
         * 菜单树数据
         */
        this.menuTreeList = [];
        /**
         * 数据字典数据
         */
        this.dictMap = {};
    }
    /**
     * 清空数据
     */
    clear() {
        this.userToken = undefined;
        this.roleIdList = [];
        this.rightIdList = [];
        this.menuTreeList = [];
        this.dictMap = {};
    }
    /**
     * @description 判断是否拥有角色
     * @param roleId 角色标识
     * @returns 是否拥有角色
     */
    hasRole(roleId) {
        return this.roleIdList.includes(roleId);
    }
    /**
     * @description 判断是否拥有权限
     * @param rightId 权限标识
     * @returns 是否拥有权限
     */
    hasRight(rightId) {
        return this.rightIdList.includes(rightId);
    }
    /**
     * @description 获取登录令牌信息
     * @returns 获取登录令牌信息
     */
    getToken() {
        this.userToken;
    }
    /**
     * @description 获取登录令牌ID
     * @returns 获取登录令牌ID
     */
    getTokenId() {
        var _a;
        return (_a = this.userToken) === null || _a === void 0 ? void 0 : _a.id;
    }
    /**
     * @description 获取登录用户信息
     * @returns 获取登录用户信息
     */
    getUser() {
        var _a;
        return (_a = this.userToken) === null || _a === void 0 ? void 0 : _a.user;
    }
    /**
     * @description 获取登录用户ID
     * @returns 获取登录用户ID
     */
    getUserId() {
        var _a, _b;
        return (_b = (_a = this.userToken) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
    }
    /**
     * @description 获取登录用户名称
     * @returns 获取登录用户名称
     */
    getUserName() {
        var _a, _b;
        return (_b = (_a = this.userToken) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.name;
    }
    /**
     * @description 获取菜单树列表数据
     * @returns 菜单树列表数据
     */
    getMenuTreeList() {
        return this.menuTreeList;
    }
    /**
     * @description 判断当前用户是否包含该菜单项
     * @param menuRouteId 菜单项路由ID
     * @returns 当前用户是否包含该菜单项
     */
    hasMenuRouteId(menuRouteId) {
        return this.menuRouteIdList.includes(menuRouteId);
    }
    /**
     * @description 获取数据字典项
     * @returns 获取数据字典项
     */
    getDictItemList(dictId) {
        return this.dictMap[dictId] || [];
    }
    /**
     * @description 根据字典Code标识和字典项值获取字典项
     * @param dictId 数据字典Code标识
     * @param itemValue 值
     * @returns 字典项
     */
    getDictItem(dictId, itemValue) {
        const dataList = this.getDictItemList(dictId);
        const data = this.recursionChild(dataList, 'value', itemValue);
        return data;
    }
    /**
     * @description 根据字典Code标识和字典项值获取字典项的文本
     * @param dictId 数据字典Code标识
     * @param itemValue 值
     * @returns 字典项文本
     */
    getDictItemText(dictId, itemValue) {
        const dataList = this.getDictItemList(dictId);
        const data = this.recursionChild(dataList, 'value', itemValue);
        return (data === null || data === void 0 ? void 0 : data.name) || null;
    }
    /**
     * @description 根据字典Code标识和字典项文本获取字典项的值
     * @param dictId 数据字典Code标识
     * @param itemValue 文本
     * @returns 字典项值
     */
    getDictItemValue(dictId, itemText) {
        const dataList = this.getDictItemList(dictId);
        const data = this.recursionChild(dataList, 'name', itemText);
        return (data === null || data === void 0 ? void 0 : data.value) || null;
    }
    /**
     * @description 设置用户登录信息
     * @param userToken 用户登录信息
     * @param containsRoleRight 包含角色权限数据
     */
    setToken(userToken, containsRoleRight = true) {
        this.userToken = userToken;
        if (containsRoleRight) {
            this.parseRoleRight();
        }
    }
    /**
     * @description 从登录信息中解析角色权限数据
     */
    parseRoleRight() {
        var _a, _b;
        this.roleIdList = [];
        this.rightIdList = [];
        if ((_a = this.userToken) === null || _a === void 0 ? void 0 : _a.roleList) {
            this.userToken.roleList.forEach(item => {
                this.roleIdList.push(item.id);
            });
        }
        if ((_b = this.userToken) === null || _b === void 0 ? void 0 : _b.rightList) {
            this.userToken.rightList.forEach(item => {
                this.rightIdList.push(item.id);
            });
        }
    }
    /**
     * @description 设置菜单树数据
     * @param menuTreeList 菜单树数据
     */
    setMenuTreeList(menuTreeList) {
        this.menuTreeList = menuTreeList;
        this.menuRouteIdList = [];
        const menuList = Utils.treeToList(menuTreeList);
        menuList.forEach(item => {
            this.menuRouteIdList.push(item.routeId);
        });
    }
    /**
     * @description 设置数据字典数据
     * @param dictMap 数据字典数据
     */
    setDictMap(dictMap) {
        this.dictMap = dictMap;
    }
    /**
     * @description 向下递归查找数据项
     * @param dataList 数据列表
     * @param propKey 匹配键
     * @param propValue 匹配值
     * @returns 数据项
     */
    recursionChild(dataList, propKey, propValue) {
        if (!Array.isArray(dataList)) {
            return null;
        }
        for (let i = 0; i < dataList.length; i++) {
            const data = dataList[i];
            if (data[propKey] == propValue) {
                return data;
            }
            const child = this.recursionChild(data.children, propKey, propValue);
            if (child) {
                return child;
            }
        }
    }
    /**
     * @description 获取全部路由数据
     */
    getAllRouter() {
        return this.allRouter;
    }
    /**
     * @description 设置全部路由数据
     */
    setAllRouter(allRouter) {
        this.allRouter = allRouter;
    }
    /**
     * @description 缓存接口列表
     * @param methodList 接口列表
     */
    cacheMethodList(methodList) {
        if (Array.isArray(methodList)) {
            methodList.forEach(item => {
                this.methodMap[item.id] = item;
            });
        }
    }
    /**
     * @description 获取接口信息
     * @param methodId 接口标识
     * @returns 接口信息
     */
    getMethod(methodId) {
        return this.methodMap[methodId];
    }
    /**
     * @description 获取接口地址
     * @param methodId 接口标识
     * @returns 接口地址
     */
    getMethodUrl(methodId) {
        var _a;
        return ((_a = this.methodMap[methodId]) === null || _a === void 0 ? void 0 : _a.url) || null;
    }
    /**
     * @description 获取用户场景数据
     * @param sceneId 场景ID
     * @returns  用户场景数据
     */
    getScene(sceneId) {
        return new Promise(resolve => {
            BTPUtils.getApp()
                .getHttp()
                .get(`runtime/api/theme/scene?id=${sceneId}`)
                .then(res => {
                resolve(res.data);
            });
        });
    }
    /**
     * @description 保存用户场景数据
     * @param sceneId 场景ID
     * @param data 场景数据
     * @returns  结果
     */
    saveScene(sceneId, data) {
        const datas = {
            id: sceneId,
            data: data,
        };
        return new Promise(resolve => {
            BTPUtils.getApp()
                .getHttp()
                .post(`runtime/api/theme/saveScene`, datas)
                .then(res => {
                resolve(res.data);
            });
        });
    }
}

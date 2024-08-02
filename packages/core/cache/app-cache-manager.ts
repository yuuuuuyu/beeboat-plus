import { reactive } from 'vue'
import BTPUtils from '../utils/btp-utils'

/**
 * 全局应用缓存数据管理对象
 * @author Enmaai
 */
export default class BTPAppCacheManager {
    /**
     * 数据
     */
    public datas
    /**
     * 接口数据
     */
    private methodMap = {} as any

    /**
     * 全部路由数据
     */
    allRouter: any

    /**
     * 用户登录信息
     */
    private userToken = undefined as any

    /**
     * 角色列表
     */
    private roleIdList = [] as Array<String>

    /**
     * 权限列表
     */
    private rightIdList = [] as Array<String>

    /**
     * 菜单项路由ID列表数据
     */
    private menuRouteIdList = [] as Array<String>

    /**
     * 数据字典数据
     */
    private dictMap = [] as Array<any>

    constructor() {
        /**
         * 数据
         */
        this.datas = reactive({
            /**
             * 菜单树数据
             */
            menuTreeList: [] as Array<any>,
        })
    }

    /**
     * 清空数据
     */
    public clear() {
        this.userToken = undefined
        this.roleIdList = []
        this.rightIdList = []
        this.datas.menuTreeList = []
        this.dictMap = []
    }

    /**
     * @description 判断是否拥有角色
     * @param roleId 角色标识
     * @returns 是否拥有角色
     */
    public hasRole(roleId: String): Boolean {
        return this.roleIdList.includes(roleId)
    }

    /**
     * @description 判断是否拥有权限
     * @param rightId 权限标识
     * @returns 是否拥有权限
     */
    public hasRight(rightId: String): Boolean {
        return this.rightIdList.includes(rightId)
    }

    /**
     * @description 获取登录令牌信息
     * @returns 获取登录令牌信息
     */
    public getToken(): any {
        this.userToken
    }

    /**
     * @description 获取登录令牌ID
     * @returns 获取登录令牌ID
     */
    public getTokenId(): String {
        return this.userToken?.id
    }

    /**
     * @description 获取登录用户信息
     * @returns 获取登录用户信息
     */
    public getUser(): any {
        return this.userToken?.user
    }

    /**
     * @description 获取登录用户ID
     * @returns 获取登录用户ID
     */
    public getUserId(): String {
        return this.userToken?.user?.id
    }

    /**
     * @description 获取登录用户名称
     * @returns 获取登录用户名称
     */
    public getUserName(): String {
        return this.userToken?.user?.name
    }

    /**
     * @description 获取菜单树列表数据
     * @returns 菜单树列表数据
     */
    public getMenuTreeList(): Array<any> {
        return this.datas.menuTreeList
    }

    /**
     * @description 判断当前用户是否包含该菜单项
     * @param menuRouteId 菜单项路由ID
     * @returns 当前用户是否包含该菜单项
     */
    public hasMenuRouteId(menuRouteId: String): Boolean {
        return this.menuRouteIdList.includes(menuRouteId)
    }

    /**
     * @description 获取数据字典项
     * @returns 获取数据字典项
     */
    public getDictItemList(dictId: any): Array<any> {
        const dict = this.dictMap.find(item => item.value == dictId)
        return dict?.children || []
    }

    /**
     * @description 根据字典Code标识和字典项值获取字典项
     * @param dictId 数据字典Code标识
     * @param itemValue 值
     * @returns 字典项
     */
    public getDictItem(dictId: String, itemValue: String): String {
        const dataList = this.getDictItemList(dictId)
        const data = this.recursionChild(dataList, 'value', itemValue)
        return data
    }

    /**
     * @description 根据字典Code标识和字典项值获取字典项的文本
     * @param dictId 数据字典Code标识
     * @param itemValue 值
     * @returns 字典项文本
     */
    public getDictItemText(dictId: String, itemValue: String): String {
        const dataList = this.getDictItemList(dictId)
        const data = this.recursionChild(dataList, 'value', itemValue)
        return data?.name || null
    }

    /**
     * @description 根据字典Code标识和字典项文本获取字典项的值
     * @param dictId 数据字典Code标识
     * @param itemValue 文本
     * @returns 字典项值
     */
    public getDictItemValue(dictId: String, itemText: String): String {
        const dataList = this.getDictItemList(dictId)
        const data = this.recursionChild(dataList, 'name', itemText)
        return data?.value || null
    }

    /**
     * @description 设置用户登录信息
     * @param userToken 用户登录信息
     * @param containsRoleRight 包含角色权限数据
     */
    public setToken(userToken: any, containsRoleRight = true): void {
        this.userToken = userToken
        if (containsRoleRight) {
            this.parseRoleRight()
        }
    }

    /**
     * @description 从登录信息中解析角色权限数据
     */
    private parseRoleRight(): void {
        this.roleIdList = []
        this.rightIdList = []
        if (this.userToken?.roleList) {
            this.userToken.roleList.forEach(item => {
                this.roleIdList.push(item.id)
            })
        }
        if (this.userToken?.rightList) {
            this.userToken.rightList.forEach(item => {
                this.rightIdList.push(item.id)
            })
        }
    }

    /**
     * @description 设置菜单树数据
     * @param menuTreeList 菜单树数据
     */
    public setMenuTreeList(menuTreeList: any): void {
        this.datas.menuTreeList = menuTreeList
        this.menuRouteIdList = []
        const menuList = BTPUtils.treeToList(menuTreeList)
        menuList.forEach(item => {
            this.menuRouteIdList.push(item.routeId)
        })
    }

    /**
     * @description 设置数据字典数据
     * @param dictMap 数据字典数据
     */
    public setDictMap(dictMap: any): void {
        this.dictMap = dictMap
    }

    /**
     * @description 向下递归查找数据项
     * @param dataList 数据列表
     * @param propKey 匹配键
     * @param propValue 匹配值
     * @returns 数据项
     */
    private recursionChild(dataList, propKey, propValue): any {
        if (!Array.isArray(dataList)) {
            return null
        }
        for (let i = 0; i < dataList.length; i++) {
            const data = dataList[i]
            if (data[propKey] == propValue) {
                return data
            }
            const child = this.recursionChild(data.children, propKey, propValue)
            if (child) {
                return child
            }
        }
    }

    /**
     * @description 获取全部路由数据
     */
    public getAllRouter(): any {
        return this.allRouter
    }

    /**
     * @description 设置全部路由数据
     */
    public setAllRouter(allRouter: any): void {
        this.allRouter = allRouter
    }

    /**
     * @description 缓存接口列表
     * @param methodList 接口列表
     */
    public cacheMethodList(methodList: Array<any>): void {
        if (Array.isArray(methodList)) {
            methodList.forEach(item => {
                this.methodMap[item.id] = item
            })
        }
    }

    /**
     * @description 获取接口信息
     * @param methodId 接口标识
     * @returns 接口信息
     */
    public getMethod(methodId: string): any {
        return this.methodMap[methodId]
    }

    /**
     * @description 获取接口地址
     * @param methodId 接口标识
     * @returns 接口地址
     */
    public getMethodUrl(methodId: string): string {
        return this.methodMap[methodId]?.url || null
    }

    /**
     * @description 获取用户场景数据
     * @param sceneId 场景ID
     * @returns  用户场景数据
     */
    getScene(sceneId: string): Promise<any> {
        return new Promise(resolve => {
            BTPUtils.getApp()
                .getHttp()
                .get(`runtime/api/theme/scene?id=${sceneId}`)
                .then(res => {
                    resolve(res.data)
                })
        })
    }

    /**
     * @description 保存用户场景数据
     * @param sceneId 场景ID
     * @param data 场景数据
     * @returns  结果
     */
    saveScene(sceneId: string, data: any): Promise<any> {
        const datas = {
            id: sceneId,
            data: data,
        }
        return new Promise(resolve => {
            BTPUtils.getApp()
                .getHttp()
                .post(`runtime/api/theme/saveScene`, datas)
                .then(res => {
                    resolve(res.data)
                })
        })
    }
}

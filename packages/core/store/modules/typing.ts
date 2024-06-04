import { AxiosInstance } from 'axios'
import { VueCookies } from 'vue-cookies'
export { AxiosInstance } from 'axios'
export { VueCookies } from 'vue-cookies'
export interface IStoreState {
    userTokenData: Record<string, any>
    menuList: any[]
    menuTree: any[]
    roleList: any[]
    roleIdsList: string[]
    rightList: any[]
    rightIdsList: string[]
    dictList: any[]
    serviceList: any[]
}

export interface IStoreGetters {
    /**
     * 用户角色集合列表
     * @param state 状态集合
     * @returns `array`
     */
    getRoleList: (state: any) => any[]
    /**
     * 用户角色ID列表
     * @param state 状态集合
     * @returns `array`
     */
    getRoleIdsList: (state: any) => string[]
    /**
     * 用户权限集合列表
     * @param state 状态集合
     * @returns `array`
     */
    getRightList: (state: any) => any[]
    /**
     * 用户权限ID列表
     * @param state 状态集合
     * @returns `array`
     */
    getRightIdsList: (state: any) => string[]
    /**
     * 用户属性信息
     * @param state 状态集合
     * @returns `object`
     */
    getPropertiesData: (state: any) => Record<string, any>
    /**
     * 用户信息
     * @param state 状态集合
     * @returns `object`
     */
    getUser: (state: any) => Record<string, any>
}
export interface IStoreAction {
    getApp(): any
    getToken(): string
    getHttp(): AxiosInstance
    getCookie(): VueCookies
    hasSubCompany(): boolean
    getDictById(dictId: string): any[]
    getDictByParentCode(parentCode: string): any[]
    getEffectiveDictByParentCode(parentCode: string): any[]
    getDictItemList(dictCode: string): any[]
    getDictItemText(dictCode: any, itemValue: any): string
    getDictItem(dictCode: any, itemValue: any): Record<string, any> | null
    setUserTokenData(userInfo: any): void
    getUserTokenData(): Record<string, any>
    setMenuData(menuList: any[], menuTree: any[]): void
    getMenuList(): any[]
    getMenuTree(): any[]
    setDictData(dictList: any[]): void
    setServiceData(serviceList: any): void
    getServiceData(): any[]
    getServiceById(serviceId: string): Record<string, any> | null
    getSence(id): any
    saveSence(id, sence): any
}

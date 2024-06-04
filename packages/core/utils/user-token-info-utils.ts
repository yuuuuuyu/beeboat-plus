import { BtUseAppStore } from '../store'
import { IStoreAction, IStoreGetters, IStoreState } from '../store/modules/typing'
import { Store } from 'pinia'
/**
 * BtUserTokenInfo用户登录信息帮助类
 */
export class BtUserTokenInfo {
    /**
     * 获取appStore对象
     * @returns
     */
    static getStore() {
        return this.returnStore()
    }
    static returnStore = (): Store<string, IStoreState, IStoreGetters, IStoreAction> => {
        return BtUseAppStore()
    }
    /**
     * 获取全部用户信息对象
     * @returns
     */
    static getUserTokenData(): Record<string, any> {
        return this.getStore().getUserTokenData() || {}
    }
    /**
     * 获取用户ID
     * @returns `string`
     */
    static getUserId(): string {
        return this.getUserTokenData().userId
    }
    /**
     * 获取用户名称
     * @returns `string`
     */
    static getUserName(): string {
        return this.getUserTokenData().userName
    }
    /**
     * 获取用户对象
     * @returns `string`
     */
    static getUser(): Record<string, any> {
        return this.getStore().getUserTokenData().user || {}
    }
    /**
     * 获取账号对象
     * @returns `string`
     */
    static getAccount(): Record<string, any> {
        return this.getStore().getUserTokenData().account || {}
    }

    /**
     * 获取属性对象
     * @returns `object`
     */
    static getProperty(): Record<string, any> {
        return this.getStore().getPropertiesData || {}
    }
    /**
     * 获取企业对象
     * @returns `object`
     */
    static getCompany(): Record<string, any> {
        return this.getStore().getPropertiesData?.company || {}
    }
    /**
     * 获取企业对象v
     * @returns `object`
     */
    static getCompanyLegacy(): Record<string, any> {
        return this.getStore().getUserTokenData()?.company || {}
    }
    /**
     * 当前登录用户企业身份信息对象
     * @returns `object`
     */
    static getCompanyIdentity(): Record<string, any> {
        return this.getStore().getUserTokenData().userIdentity || {}
    }
    /**
     * 当前登录用户拥有访问权限的企业身份列表
     * @returns
     */
    static getCompanyIdentityList(): any[] {
        return this.getStore().getUserTokenData().userIdentityList || []
    }
    /**
     * 根据roleId判断是否拥有角色
     * @param roleId 角色ID
     * @returns `boolean`
     */
    static hasRole(roleId: string): boolean {
        return this.getStore().getRoleIdsList.includes(roleId)
    }
    /**
     * 根据rightId判断是否拥有角色
     * @param rightId 权限ID
     * @returns　`boolean`
     */
    static hasRight(rightId: string): boolean {
        return this.getStore().getRightIdsList.includes(rightId)
    }
    /**
     * 是否超级管理员
     * @returns `boolean`
     */
    static hasSuperAdmin(): boolean {
        return this.getStore().getUserTokenData().superAdmin
    }
    /**
     * 用户角色集合列表
     * @returns `array`
     */
    static getRoleList(): any[] {
        return this.getStore().getRoleList
    }
    /**
     * 用户权限集合列表
     * @returns `array`
     */
    static getRightList(): string[] {
        return this.getStore().getRightList
    }
    /**
     * 用户权限ID列表
     * @returns `array`
     */
    static getRightIdsList(): string[] {
        return this.getStore().getRightIdsList
    }
}

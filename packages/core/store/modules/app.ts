import { defineStore, StoreDefinition, _ActionsTree } from 'pinia'
import { IStoreState, IStoreAction, IStoreGetters, AxiosInstance, VueCookies } from './typing'
import BTPApplication from '../../app/application'
/**
 * appStore存储数据
 */
export const BtUseAppStore: StoreDefinition<string, IStoreState, IStoreGetters, IStoreAction> =
    defineStore('appStore', {
        state: () => ({
            /** 用户账号全量信息 */
            userTokenData: {} as Record<string, any>,
            /** 菜单列表 */
            menuList: [] as any[],
            /** 菜单树列表 */
            menuTree: [] as any[],
            /** 角色列表 */
            roleList: [] as any[],
            /** 角色ID列表 */
            roleIdsList: [] as string[],
            /** 权限列表 */
            rightList: [] as any[],
            /** 权限ID列表 */
            rightIdsList: [] as string[],
            /** 字典列表 */
            dictList: [] as any[],
            /** 服务列表 */
            serviceList: [] as any[],
        }),
        getters: {
            /**
             * 用户角色集合列表
             * @param state 状态集合
             * @returns `array`
             */
            getRoleList: (state): any[] => state.roleList,
            /**
             * 用户角色ID列表
             * @param state 状态集合
             * @returns `array`
             */
            getRoleIdsList: (state): string[] => state.roleIdsList,
            /**
             * 用户权限集合列表
             * @param state 状态集合
             * @returns `array`
             */
            getRightList: (state): any[] => state.rightList,
            /**
             * 用户权限ID列表
             * @param state 状态集合
             * @returns `array`
             */
            getRightIdsList: (state): string[] => state.rightIdsList,
            /**
             * 用户属性信息
             * @param state 状态集合
             * @returns `object`
             */
            getPropertiesData: (state): Record<string, any> | null =>
                state.userTokenData?.properties,
            /**
             * 用户信息
             * @param state 状态集合
             * @returns `object`
             */
            getUser: (state): Record<string, any> | null => state.userTokenData?.user || {},
        },
        actions: {
            /**
             * core库application类的全局app对象
             * @returns `application`
             */
            getApp(): any {
                return BTPApplication.getInstance()
            },
            /**
             * token登录令牌
             * @returns `token`
             */
            getToken(): string {
                return (this.getApp() as any)?.getToken()
            },
            /**
             * 全局$http对象
             */
            getHttp(): AxiosInstance {
                return (this.getApp() as any)?.$http
            },
            /**
             * 全局cookie对象
             * @returns 返回vue3cookie对象
             */
            getCookie(): VueCookies {
                return (this.getApp() as any)?.getCookie()
            },
            /** *保存用户信息 */
            setUserTokenData(userInfo): void {
                this.userTokenData = userInfo // 保存全部用户信息
                this.roleList = userInfo?.roleList || []
                this.roleIdsList = userInfo?.roleList?.map(i => i.id) || []
                this.rightList = userInfo?.rightList || []
                this.rightIdsList = userInfo?.rightList?.map(i => i.id) || []
            },
            /**
             * 用户信息
             * @returns object 用户信息
             */
            getUserTokenData(): Record<string, any> {
                return this.userTokenData
            },
            /**
             * 是否子公司
             * @returns bool
             */
            hasSubCompany(): boolean {
                return this.userTokenData.properties?.company?.type == 2
            },
            /**
             * 根据父ID获取子项列表
             * @param dictId 父ID
             * @returns `array` 字典项列表
             */
            getDictById(dictId: string): any[] {
                return this.dictList?.filter(item => item.parentId == dictId)
            },
            /**
             * 根据父字典Code获取字典子列表
             * @param parentCode 父字典Value
             * @returns `array`
             */
            getDictByParentCode(parentCode: string): any[] {
                const item = this.dictList?.find(item => item.value == parentCode && !item.parentId)
                return item && item.id && item.id != -1
                    ? this.dictList?.filter(i => i.parentId == item?.id)
                    : []
            },
            /**
             * 根据父字典Code获取字典子列表，过滤停用的数据字典 status 状态0 停用  1 使用 —— 威飞项目
             * @param parentCode 父字典Value
             * @returns `array`
             */
            getEffectiveDictByParentCode(parentCode: string): any[] {
                const item = this.dictList?.find(item => item.value == parentCode && !item.parentId)
                return item && item.id && item.id != -1
                    ? this.dictList?.filter(i => i.parentId == item?.id && i.status !== 0)
                    : []
            },
            /**
             * 根据父字典Code获取字典子列表
             * @param dictCode 父字典Value
             * @returns `array`
             */
            getDictItemList(dictCode: string): any[] {
                const item = this.dictList?.find(item => item.id == dictCode && !item.parentId)
                return item && item.id && item.id != -1
                    ? this.dictList?.filter(i => i.parentId == item?.id)
                    : []
            },
            /**
             * 获取数据字典项文本
             * @param dictCode 父字典Value
             * @param itemValue 子字典value
             * @returns
             */
            getDictItemText(dictCode, itemValue): string {
                const item = this.dictList?.find(item => item.id == dictCode && !item.parentId)
                if (item) {
                    return (
                        this.dictList?.find(
                            i => i.parentId == item.id && i.value == itemValue && !item.parentId,
                        )?.name || ''
                    )
                } else {
                    return ''
                }
            },
            /**
             * 字典项
             * @param dictCode 父字典code
             * @param itemValue 子字典value
             * @returns `object | null` 字典项对象
             */
            getDictItem(dictCode, itemValue): Record<string, any> | null {
                const item = this.dictList?.find(item => item.id == dictCode && !item.parentId)
                if (item) {
                    return this.dictList?.find(
                        i => i.parentId == item.id && i.value == itemValue && !item.parentId,
                    )
                } else {
                    return null
                }
            },
            /**
             * 设置菜单数据
             * @param menuList 数组对象菜单数据
             * @param menuTree 数组树菜单数据
             */
            setMenuData(menuList: any[], menuTree: any[]): void {
                this.menuList = menuList || []
                this.menuTree = menuTree
            },
            /**
             * 获取数组对象菜单数据
             * @returns `array`
             */
            getMenuList(): any[] {
                return this.menuList || []
            },
            /**
             * 获取数组树菜单数据
             * @returns `array`
             */
            getMenuTree(): any[] {
                return this.menuTree
            },
            /**
             * 设置字典数据
             * @param dictList 字典数据
             */
            setDictData(dictList: any[]): void {
                this.dictList = dictList
            },
            setServiceData(serviceList): void {
                this.serviceList = serviceList || []
            },
            getServiceData(): any[] {
                return this.serviceList
            },
            getServiceById(serviceId: string): Record<string, any> | null {
                if (!this.serviceList) {
                    return null
                }
                return this.serviceList?.find(item => item.id == serviceId)
            },

            /**
             * 获取高级搜索场景信息
             * @param id 场景id
             */
            getSence(id: string) {
                return this.getApp()?.getHandler('BtSenceHandler')?.getSence(id)
            },
            saveSence(id: string, sence: Object) {
                return this.getApp()?.getHandler('BtSenceHandler')?.saveSence(id, sence)
            },
        },
    })

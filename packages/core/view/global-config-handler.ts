import { BTPApplication } from '../app'

export default class BTPGlobalConfigHandler {
    constructor() {}

    public getApp(): BTPApplication {
        return BTPApplication.getInstance()
    }

    /**
     * @description 获取网关地址
     * @returns 网关地址
     */
    public getGatewayUrl(): String {
        return this.getApp().getEnv('VITE_GATEWAY_URL')
    }

    /**
     * @description 获取视图数据
     * @param viewModelId 视图ID
     * @returns 视图数据
     */
    getView(viewModelId: string): Promise<any> {
        const url = `${this.getGatewayUrl()}runtime//api/view/config?id=${viewModelId}`
        return new Promise(resolve => {
            fetch(url, { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    resolve(data.data)
                })
        })
    }

    /**
     * @description 获取远程路由数据
     * @returns 路由数据
     */
    loadRemoteRouteData(): Promise<any> {
        //服务ID
        const serviceId = this.getApp().getEnv('VITE_APP_ID')
        //拼接地址
        const url = `${this.getGatewayUrl()}runtime/api/route/tree?serviceId=${serviceId}`

        return new Promise(resolve => {
            fetch(url, { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    resolve(data.data)
                })
        })
    }

    /**
     * @description 获取系统全部接口数据
     */
    loadMethodList(): Promise<any> {
        //项目ID
        const solutionId = this.getApp().getEnv('VITE_MAIN_APP_ID')
        //拼接地址
        const url = `${this.getGatewayUrl()}runtime/api/method/list?solutionId=${solutionId}`
        return new Promise(resolve => {
            fetch(url, { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    resolve(data.data)
                })
        })
    }
}

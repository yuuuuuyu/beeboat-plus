
export default class BTPGlobalConfigHandler {

    static getView(viewModelId: string): any {
        return new Promise<any>(resolve => {
            resolve(undefined)
        })
    }
    static loadRemoteRouteData() {
        return new Promise<any>(resolve => {
            resolve([])
        })
    }
}
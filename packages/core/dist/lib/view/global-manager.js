"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const view_context_1 = __importDefault(require("./view-context"));
const dialog_view_context_1 = __importDefault(require("./dialog-view-context"));
const utils_ex_1 = __importDefault(require("../utils-ex/utils-ex"));
class BTPGlobalAppManager {
    constructor() {
        this.layoutView = null;
        this.components = [];
        this.page = {};
        this.viewContext = {};
    }
    /**
     * 注册组件
     */
    register(pageUid, componentUid, component) {
        this.components.push({
            pageUid: pageUid,
            componentUid: componentUid,
            component: component,
        });
    }
    /**
     * 注册页面
     * @param pageUid
     * @param component
     */
    registerPage(pageUid, component) {
        this.page[pageUid] = component;
    }
    registerViewContext(pageUid, contextClazz) {
        this.viewContext[pageUid] = contextClazz;
    }
    createViewContext(vueInstance, viewId, viewModelId, dialogMode = false, parentViewContext) {
        const realViewId = viewId || vueInstance.type.props.viewId;
        if (realViewId && this.viewContext[realViewId]) {
            return new this.viewContext[realViewId](vueInstance, realViewId, viewModelId, parentViewContext);
        }
        else {
            if (dialogMode) {
                return new dialog_view_context_1.default(vueInstance, realViewId, viewModelId, parentViewContext);
            }
            else {
                return new view_context_1.default(vueInstance, realViewId, viewModelId, parentViewContext);
            }
        }
    }
    /**
     * @description 获取网关地址
     * @returns 网关地址
     */
    getGatewayUrl() {
        return utils_ex_1.default.getApp().getEnv('VITE_GATEWAY_URL');
    }
    /**
     * @description 获取页面信息
     * @param pageUid 页面标识
     * @param pageConfigId 页面配置
     * @returns 页面对象
     */
    getPage(viewId, viewModelId) {
        const data = (0, lodash_1.cloneDeep)(this.page[viewId] || this.layoutView);
        data.props = data.props || {};
        data.props.viewId = viewId;
        data.props.viewModelId = viewModelId;
        return data;
    }
    getView(viewModelId) {
        const url = `${this.getGatewayUrl()}runtime/api/view/config?id=${viewModelId}`;
        return new Promise(resolve => {
            fetch(url, { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                resolve(data.data);
            });
        });
    }
    /**
     * @description 获取远程路由数据
     * @returns 路由数据
     */
    loadRemoteRouteData() {
        //服务ID
        const serviceId = utils_ex_1.default.getApp().getEnv('VITE_APP_ID');
        //拼接地址
        const url = `${this.getGatewayUrl()}runtime/api/route/tree?serviceId=${serviceId}`;
        return new Promise(resolve => {
            fetch(url, { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                resolve(data.data);
            });
        });
    }
    /**
     * @description 获取系统全部接口数据
     */
    loadMethodList() {
        //项目ID
        const solutionId = utils_ex_1.default.getApp().getEnv('VITE_MAIN_APP_ID');
        //拼接地址
        const url = `${this.getGatewayUrl()}runtime/api/method/list?solutionId=${solutionId}`;
        return new Promise(resolve => {
            fetch(url, { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                resolve(data.data);
            });
        });
    }
    /**
     * @description 将组件树转换成组件列表
     * @param componentList 组件树
     * @returns 组件列表
     */
    parseComponentList(componentList) {
        if (!componentList) {
            return [];
        }
        const datas = [];
        datas.push(...componentList);
        componentList.forEach(element => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            datas.push(...this.parseComponentList((element && element.children) || []));
            if ((_a = element.toolbar) === null || _a === void 0 ? void 0 : _a.children) {
                datas.push(...this.parseComponentList((_b = element.toolbar) === null || _b === void 0 ? void 0 : _b.children));
            }
            if ((_c = element.advsearchbar) === null || _c === void 0 ? void 0 : _c.children) {
                datas.push(...this.parseComponentList((_d = element.advsearchbar) === null || _d === void 0 ? void 0 : _d.children));
            }
            if ((_e = element.dock) === null || _e === void 0 ? void 0 : _e.children) {
                datas.push(...this.parseComponentList((_f = element.dock) === null || _f === void 0 ? void 0 : _f.children));
            }
            if ((_g = element.dockcontent) === null || _g === void 0 ? void 0 : _g.children) {
                datas.push(...this.parseComponentList((_h = element.dockcontent) === null || _h === void 0 ? void 0 : _h.children));
            }
        });
        return datas;
    }
}
exports.default = BTPGlobalAppManager;

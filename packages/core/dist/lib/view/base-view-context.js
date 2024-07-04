"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
class BTPBaseViewContext {
    constructor() {
        this.viewModel = this.initViewModel();
        this.dataModel = this.initDataModel();
        this.dataModelProxy = this.initDataModelProxy(this.dataModel);
    }
    /**
     * @description 初始化视图配置模型
     * @returns 配置
     */
    initViewModel() {
        return (0, vue_1.reactive)({ components: [] });
    }
    /**
     * @description 构建视图的V-Model数据
     */
    initDataModel() {
        return (0, vue_1.reactive)({});
    }
    /**
     * @description 构建视图的V-Model数据代理
     */
    initDataModelProxy(dataModel) {
        return new Proxy(dataModel, {
            get(target, key) {
                if (key == '__v_isRef') {
                    return false;
                }
                let lastObject = target;
                const keys = key.split('.');
                for (let i = 0; i < keys.length; i++) {
                    const val = keys[i];
                    if (i == keys.length - 1) {
                        return lastObject[val];
                    }
                    else {
                        if (!Reflect.has(lastObject, val)) {
                            lastObject[val] = {};
                        }
                        else {
                            lastObject = lastObject[val];
                        }
                    }
                }
                return null;
            },
            set(target, key, value) {
                let lastObject = target;
                const keys = key.split('.');
                for (let i = 0; i < keys.length; i++) {
                    const val = keys[i];
                    if (i == keys.length - 1) {
                        lastObject[val] = value;
                    }
                    else {
                        if (!Reflect.has(lastObject, val)) {
                            lastObject[val] = {};
                        }
                        lastObject = lastObject[val];
                    }
                }
                return true;
            },
        });
    }
}
exports.default = BTPBaseViewContext;

import { reactive } from 'vue';
export default class BTPBaseViewContext {
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
        return reactive({ components: [] });
    }
    /**
     * @description 构建视图的V-Model数据
     */
    initDataModel() {
        return reactive({});
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

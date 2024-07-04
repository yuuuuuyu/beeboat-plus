var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createApp } from 'vue';
import BTPBaseApplication from './base-application';
export default class BTPApplication extends BTPBaseApplication {
    constructor(options) {
        super(options);
        BTPApplication.setInstance(this);
    }
    /**
     * 静态方法 获取应用实例对象
     * @returns 应用实例
     */
    static getInstance() {
        return super.getInstance();
    }
    /**
     * 获取微应用事件
     * @returns 微应用事件
     */
    getMicroAppEvent() {
        return window[this.getEnv('VITE_APP_CHILD_EVENT_NAME')] || window.microApp;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.getMicroAppEvent()) {
                this.initMicroApp();
            }
            this.$app = createApp(this.options.appTemplate);
            this.$app.config.globalProperties.$btApplication = this;
            yield this.loadHandler('setup');
            this.$app.use(this.$router);
            if (this.getToken()) {
                // 可重写需要加载的缓存数据
                yield this.loadCacheData();
            }
            if (!this.isMicroApp()) {
                yield this.$router.isReady();
            }
            this.loadHandler('mount');
            this.$app.mount(`#${this.getEnv('VITE_APP_MOUNT_NAME')}`);
        });
    }
    /**
     * 卸载应用
     */
    unmount() {
        var _a, _b;
        (_a = this.$app) === null || _a === void 0 ? void 0 : _a.unmount();
        (_b = this.getMicroAppEvent()) === null || _b === void 0 ? void 0 : _b.clearDataListener();
        this.$app = null;
        this.$router = null;
    }
    /**
     * 初始化微应用
     */
    initMicroApp() {
        var _a;
        let status = false;
        (_a = this.getMicroAppEvent()) === null || _a === void 0 ? void 0 : _a.addDataListener(data => {
            const router = this.$router;
            if (data.path && typeof data.path === 'string') {
                data.path = data.path.replace(/^#/, '');
                if (status) {
                    router.push(data.path);
                }
                else {
                    //TODO 此处延迟代码又缺陷
                    setTimeout(() => {
                        router.push(data.path);
                        status = true;
                    }, 800);
                }
            }
        }, true);
        window.addEventListener('unmount', () => {
            this.unmount();
        });
    }
}

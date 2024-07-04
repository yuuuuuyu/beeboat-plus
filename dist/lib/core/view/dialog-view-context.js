"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const view_context_1 = __importDefault(require("./view-context"));
class BTPDialogViewContext extends view_context_1.default {
    constructor(vueInstance, viewId, viewModelId, parentViewContext) {
        super(vueInstance, viewId, viewModelId, parentViewContext);
    }
    /**
     * @description 创建视图的ViewContext对象
     * @param vueInstance 实例
     * @param viewId 视图ID
     * @param viewModelId 视图配置ID
     * @param parentViewContext 上级页面
     * @returns 对象
     */
    static createInstance(vueInstance, viewId, viewModelId, parentViewContext) {
        return new BTPDialogViewContext(vueInstance, viewId, viewModelId, parentViewContext);
    }
    getDialogRef() {
        return this.getRef(this.viewModel.components[0].props.ref);
    }
    openDialog() {
        var _a;
        (_a = this.getDialogRef()) === null || _a === void 0 ? void 0 : _a.openDialog();
    }
    closeDialog() {
        console.log('view context close dialog');
    }
    getExpose() {
        return Object.assign(Object.assign({}, super.getExpose()), { openDialog: () => {
                this.openDialog();
            }, closeDialog: () => {
                this.closeDialog();
            } });
    }
}
exports.default = BTPDialogViewContext;

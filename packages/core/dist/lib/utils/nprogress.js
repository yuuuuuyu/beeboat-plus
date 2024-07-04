"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtNProgress = void 0;
const nprogress_1 = __importDefault(require("nprogress"));
require("nprogress/nprogress.css");
/**
 * nprogress的帮助类类
 */
class BtNProgress {
    constructor(params) {
        this.initParams = {
            // 动画方式
            easing: 'ease',
            // 递增进度条的速度
            speed: 500,
            // 是否显示加载ico
            showSpinner: false,
            // 自动递增间隔
            trickleSpeed: 200,
            // 初始化时的最小百分比
            minimum: 0.3,
        };
        this.configure = nprogress_1.default.configure(this.initParams);
        if (params) {
            this.initParams = params;
        }
    }
    /**
     * 开始
     */
    start() {
        this.configure.start();
    }
    /**
     * 结束
     * @param whether 默认false
     */
    done(whether = false) {
        this.configure.done(whether);
    }
}
exports.BtNProgress = BtNProgress;
exports.default = BtNProgress;

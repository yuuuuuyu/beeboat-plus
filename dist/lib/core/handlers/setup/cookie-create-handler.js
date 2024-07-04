"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
const vue_cookies_1 = __importDefault(require("vue-cookies"));
/**
 * cookie加载处理对象
 * @author Enmaai
 */
class BTPCookieCreateHandler extends base_1.BTPBaseSetupHandler {
    constructor() {
        super(...arguments);
        this.className = 'BTPCookieCreateHandler';
    }
    handle() {
        this.getVueApp().use(vue_cookies_1.default);
    }
}
exports.default = BTPCookieCreateHandler;

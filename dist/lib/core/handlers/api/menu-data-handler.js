"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
/**
 * 用户菜单加载对象
 * @author Enmaai
 */
class BTPMenuDataHandler extends base_1.BTPBaseApiHandler {
    constructor() {
        super();
        this.className = 'BTPMenuDataHandler';
        this._rank = 10;
    }
    handle() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (((_a = this.getApp().options) === null || _a === void 0 ? void 0 : _a.autoLoadMicroAppData) && this.isMicroApp()) {
                const microAppData = this.getMicroAppData();
                this.getCacheManager().setMenuTreeList(((_b = microAppData.appData) === null || _b === void 0 ? void 0 : _b.menuTree) || []);
            }
            else {
                const data = yield this.getApp().$http.post(this.getEnv('VITE_GLOBAL_MENU_API'), {
                    t: Math.random() * 1000 + 1,
                });
                this.getCacheManager().setMenuTreeList(data.data);
            }
        });
    }
}
exports.default = BTPMenuDataHandler;

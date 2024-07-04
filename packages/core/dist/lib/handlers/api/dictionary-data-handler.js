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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
const utils_1 = __importDefault(require("../../utils-ex/utils"));
/**
 * 数据字典数据加载对象
 * @author Enmaai
 */
class BTPDictDataHandler extends base_1.BTPBaseApiHandler {
    constructor() {
        super();
        this.className = 'BTPDictDataHandler';
        this._rank = 10;
    }
    handle() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (((_a = this.getApp().options) === null || _a === void 0 ? void 0 : _a.autoLoadMicroAppData) && this.isMicroApp()) {
                this.getCacheManager().setDictMap(this.formatDictData(((_b = this.getMicroAppData().appData) === null || _b === void 0 ? void 0 : _b.dictList) || []));
            }
            else {
                const data = yield this.getApp().$http.post(this.getEnv('VITE_GLOBAL_DICT_API'), {
                    t: Math.random() * 1000 + 1,
                });
                this.getCacheManager().setDictMap(this.formatDictData(data.data || []));
            }
        });
    }
    /**
     * @description 格式化树数据
     * @param dataList 数据
     * @returns 树数据
     */
    formatDictData(dataList) {
        return utils_1.default.listToTree(dataList);
    }
}
exports.default = BTPDictDataHandler;

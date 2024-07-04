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
const index_1 = require("../base/index");
const utils_ex_1 = __importDefault(require("../../utils-ex/utils-ex"));
/**
 * 路由创建对象
 * @author Enmaai
 */
class BTPRemoteMethodLoadHandler extends index_1.BTPBaseInitHandler {
    constructor() {
        super(...arguments);
        this.className = 'BTPRemoteMethodLoadHandler';
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield utils_ex_1.default.getAppManager().loadMethodList();
            this.getCacheManager().cacheMethodList(data);
        });
    }
}
exports.default = BTPRemoteMethodLoadHandler;

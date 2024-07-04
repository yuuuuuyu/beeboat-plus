"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_handler_1 = __importDefault(require("./base-handler"));
/**
 * Api Handler基类
 * @author Enmaai
 */
class BTPBaseApiHandler extends base_handler_1.default {
    constructor() {
        super();
        this._loadType = 'api';
    }
}
exports.default = BTPBaseApiHandler;

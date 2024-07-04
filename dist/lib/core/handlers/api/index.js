"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BTPUserDataHandler = exports.BTPMenuDataHandler = exports.BTPDictDataHandler = void 0;
const dictionary_data_handler_1 = __importDefault(require("./dictionary-data-handler"));
exports.BTPDictDataHandler = dictionary_data_handler_1.default;
const menu_data_handler_1 = __importDefault(require("./menu-data-handler"));
exports.BTPMenuDataHandler = menu_data_handler_1.default;
const user_data_handler_1 = __importDefault(require("./user-data-handler"));
exports.BTPUserDataHandler = user_data_handler_1.default;

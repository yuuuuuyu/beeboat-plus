"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BTPRemoteMethodLoadHandler = exports.BTPRouterCreateHandler = void 0;
const router_create_handler_1 = __importDefault(require("./router-create-handler"));
exports.BTPRouterCreateHandler = router_create_handler_1.default;
const remote_method_load_handler_1 = __importDefault(require("./remote-method-load-handler"));
exports.BTPRemoteMethodLoadHandler = remote_method_load_handler_1.default;

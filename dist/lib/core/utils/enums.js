"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenError = exports.FixedColor = exports.ToolboxType = void 0;
/** *工具类型 */
var ToolboxType;
(function (ToolboxType) {
    ToolboxType["vertical"] = "vertical";
    ToolboxType["horizontal"] = "horizontal";
    ToolboxType["copy"] = "copy";
    ToolboxType["add"] = "add";
    ToolboxType["remove"] = "remove";
})(ToolboxType = exports.ToolboxType || (exports.ToolboxType = {}));
/** *固定颜色 */
var FixedColor;
(function (FixedColor) {
    FixedColor["blue"] = "#0087FE";
    FixedColor["red"] = "#F44E3B";
    FixedColor["yellow"] = "#FE9200";
})(FixedColor = exports.FixedColor || (exports.FixedColor = {}));
/** *错误代码 */
var TokenError;
(function (TokenError) {
    TokenError[TokenError["\u7528\u6237\u672A\u767B\u5F55"] = 130001] = "\u7528\u6237\u672A\u767B\u5F55";
    TokenError[TokenError["\u64CD\u4F5C\u672A\u6388\u6743"] = 130002] = "\u64CD\u4F5C\u672A\u6388\u6743";
    TokenError[TokenError["\u6570\u636E\u672A\u6388\u6743"] = 130003] = "\u6570\u636E\u672A\u6388\u6743";
    TokenError[TokenError["\u7528\u6237\u767B\u5F55\u8FC7\u671F"] = 13004] = "\u7528\u6237\u767B\u5F55\u8FC7\u671F";
    TokenError[TokenError["token"] = 13005] = "token";
})(TokenError = exports.TokenError || (exports.TokenError = {}));

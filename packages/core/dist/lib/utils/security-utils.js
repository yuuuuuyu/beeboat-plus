"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BTSecurityUtils = void 0;
const jsencrypt_1 = __importDefault(require("jsencrypt"));
/**
 * 加密解密工具类
 * @author Enmaai
 */
class BTSecurityUtils {
    /**
     * 进行RSA加密
     * @param publicKey 公钥
     * @param value 待加密字符串
     * @returns 加密后的字符串
     */
    static encryptRSA(publicKey, value) {
        const crypto = new jsencrypt_1.default();
        crypto.setPublicKey(publicKey);
        return crypto.encrypt(value);
    }
}
exports.BTSecurityUtils = BTSecurityUtils;
exports.default = BTSecurityUtils;

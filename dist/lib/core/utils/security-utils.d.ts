/**
 * 加密解密工具类
 * @author Enmaai
 */
declare class BTSecurityUtils {
    /**
     * 进行RSA加密
     * @param publicKey 公钥
     * @param value 待加密字符串
     * @returns 加密后的字符串
     */
    static encryptRSA(publicKey: any, value: any): string | false;
}
export default BTSecurityUtils;
export { BTSecurityUtils };

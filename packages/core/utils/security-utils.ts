import JSEncrypt from 'jsencrypt'
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
        const crypto = new JSEncrypt()
        crypto.setPublicKey(publicKey)
        return crypto.encrypt(value)
    }
}
export default BTSecurityUtils
export { BTSecurityUtils }

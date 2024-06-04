import { withInstall } from '@beeboat/core/with-install'
import captcha from './src/captcha.vue'

const BtCaptcha = withInstall(captcha)

export { BtCaptcha }
export default BtCaptcha

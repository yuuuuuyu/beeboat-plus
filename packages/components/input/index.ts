import { withInstall } from '../with-install'
import Input from './src/index.vue'
import InputNumber from './src/input-number.vue'

const BtpInput = withInstall(Input)
const BtpInputNumber = withInstall(InputNumber)

export { BtpInput, BtpInputNumber }

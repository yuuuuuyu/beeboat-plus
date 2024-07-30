import { withInstall } from '@beeboat/core'
import TreeSelect from './src/index.vue'
import { BtpTree } from '../tree'

const BtpTreeSelect = withInstall(TreeSelect)

export { BtpTreeSelect }
export default BtpTreeSelect

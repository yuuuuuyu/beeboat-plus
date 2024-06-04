import { withInstall } from '@beeboat/core/with-install'
import Preview from './src/preview.vue'
import { createImgPreview } from './src/index'
const BtPreview = withInstall(Preview)

export { BtPreview, createImgPreview }
export default BtPreview

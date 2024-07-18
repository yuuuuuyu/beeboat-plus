import { withInstall } from '@beeboat/core/utils/with-install'
import MicroAppHeader from './src/micro-app-header.vue'
import MicroAppMenu from './src/micro-app-menu.vue'
import MicroAppRouterView from './src/micro-app-router-view.vue'

const BtpMicroAppHeader = withInstall(MicroAppHeader)
const BtpMicroAppMenu = withInstall(MicroAppMenu)
const BtpMicroAppRouterView = withInstall(MicroAppRouterView)

export { BtpMicroAppHeader, BtpMicroAppMenu, BtpMicroAppRouterView }

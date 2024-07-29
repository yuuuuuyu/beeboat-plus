import { withInstall } from '@beeboat/core'
import Tabs from './src/index.vue'
import TabPane from './src/tab-pane.vue'
import TabsAnchor from './src/tabs-anchor.vue'

const BtpTabs = withInstall(Tabs)
const BtpTabPane = withInstall(TabPane)
const BtpTabsAnchor = withInstall(TabsAnchor)

export { BtpTabs, BtpTabPane, BtpTabsAnchor }

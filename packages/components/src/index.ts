import { makeInstaller } from '@beeboat/core'
import installs from './installs'

export * from './components'

export default makeInstaller([...installs] as any)

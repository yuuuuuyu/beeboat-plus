import { makeInstaller } from '../utils/make-installer'
import installs from './installs'

export * from './components'

export default makeInstaller([...installs] as any)

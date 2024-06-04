import components from './components'
import md from './md'

export enum MY_TAB {
    HOME = '/',
    COMP = '/components/',
    MD = '/markdown',
}

const sidebar = {
    '/components': components,
    '/markdown': md,
    '/': [],
}
export default sidebar

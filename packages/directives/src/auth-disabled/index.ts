import type { ObjectDirective } from 'vue'
import { BtUseAppStore } from '@beeboat/core/store'
const checkAuth = (el, binding) => {
    const appStore = BtUseAppStore()
    const { value, arg } = binding
    const newValue = value || arg
    const roleList = appStore.roleList?.map(i => i.id) || []
    const rightList = appStore.rightList?.map(i => i.id) || []
    const list = newValue?.split(':') || ['', '']
    const roles = list[0]?.split(',').filter(v => v.trim() != '')
    const rights = list[1]?.split(',').filter(v => v.trim() != '')
    // debugger
    // 删除dom
    const toggleDom = state => {
        // el.parentNode && el.parentNode.removeChild(el)
        if (state) {
            el.classList.add('is-disabled')
            el.setAttribute('disabled', true)
        } else {
            el.classList.remove('is-disabled')
            el.removeAttribute('disabled')
        }
    }
    let roleState = true
    if (roles && roles.length > 0) {
        // 判断是否有共同角色
        const state = roleList.some(i => roles.some(item => item == i))
        if (state) {
            toggleDom(false)
        } else {
            toggleDom(true)
            roleState = false
        }
    } else {
        toggleDom(false)
    }
    if (roleState && rights && rights.length > 0) {
        for (const item of rights) {
            if (rightList.includes(item)) {
                toggleDom(false)
            } else {
                toggleDom(true)
                break
            }
        }
    }
}
const btAuthReadonly: ObjectDirective = {
    mounted(el, binding) {
        checkAuth(el, binding)
    },
    updated(el, binding) {
        checkAuth(el, binding)
    },
}
export default btAuthReadonly

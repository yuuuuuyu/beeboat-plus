import type { ObjectDirective, DirectiveBinding } from 'vue'
export interface ElType extends HTMLElement {
    __handleClick__: () => any
    disabled: boolean
}
/**
 * 按钮节流防止重复点击
 */
const btDelayClick: ObjectDirective = {
    mounted(el: ElType, binding: DirectiveBinding) {
        el.__handleClick__ = () => {
            if (!el.disabled) {
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                }, binding?.value || 1000)
            }
        }

        el.addEventListener('click', el.__handleClick__)
    },
    unmounted(el: ElType) {
        el.removeEventListener('click', el.__handleClick__)
    },
}

export default btDelayClick

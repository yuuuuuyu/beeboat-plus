import type { ObjectDirective } from 'vue'
const triggerPower = (el, binding) => {
    const { value, arg } = binding
    const newValue = value || arg
    // 删除dom
    const toggleDom = state => {
        // el.parentNode && el.parentNode.removeChild(el)
        el.style.display = state
    }
    if (newValue) {
        toggleDom('block')
    } else {
        toggleDom('none')
    }
}
const btPower: ObjectDirective = {
    mounted(el, binding) {
        triggerPower(el, binding)
    },
    updated(el, binding) {
        triggerPower(el, binding)
    },
}
export default btPower

import type { ObjectDirective } from 'vue'

const btAuth: ObjectDirective = {
    mounted(el, binding) {
        //
        el.style.display = 'none'
    },
    updated(el, binding) {
        //
    },
}
export default btAuth

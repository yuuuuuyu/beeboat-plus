import type { ObjectDirective } from 'vue'

const btAuth: ObjectDirective = {
    mounted(el, binding) {
        console.log(el, binding)
    },
    updated(el, binding) {
        console.log(el, binding)
    },
}
export default btAuth

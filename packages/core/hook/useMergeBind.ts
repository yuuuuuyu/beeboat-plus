import { computed, inject, mergeProps, useAttrs } from 'vue'
import { btFormItemContextKey } from '../utils/tokens'

export const useMergeBind = () => {
    const btFormItemContext = inject(btFormItemContextKey, void 0)
    const elAttrs = useAttrs()
    const mergePropsBind = computed(() => {
        let bindObject: any = undefined
        if (btFormItemContext) {
            bindObject = mergeProps(elAttrs, btFormItemContext.props, btFormItemContext.attrs)
        } else {
            bindObject = elAttrs
        }
        return bindObject
    })
    return {
        btFormItemContext,
        elAttrs,
        mergePropsBind,
    }
}

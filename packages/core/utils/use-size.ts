import { InjectionKey, computed, inject, unref } from 'vue'

export interface SizeContext {
    size: any
}

export const SIZE_INJECTION_KEY: InjectionKey<SizeContext> = Symbol('size')

export const useGlobalSize = () => {
    const injectedSize = inject(SIZE_INJECTION_KEY, {} as SizeContext)

    return computed<any>(() => {
        return unref(injectedSize.size) || ''
    })
}

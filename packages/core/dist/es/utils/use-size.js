import { computed, inject, unref } from 'vue';
export const SIZE_INJECTION_KEY = Symbol('size');
export const useGlobalSize = () => {
    const injectedSize = inject(SIZE_INJECTION_KEY, {});
    return computed(() => {
        return unref(injectedSize.size) || '';
    });
};

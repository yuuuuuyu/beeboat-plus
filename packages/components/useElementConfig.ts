import { useGlobalConfig } from 'element-plus'
import { ref, watch } from 'vue'

export const useElementConfig = (option: Object) => {
    const size = ref('default')
    const sizeClass = ref('')
    const globalConfig = useGlobalConfig()

    // 监听el-config-provider的配置
    watch(
        () => globalConfig,
        config => {
            size.value = config.value.size
            config.value.size && (sizeClass.value = `${option.componentName}--${config.value.size}`)
        },
        { immediate: true, deep: true },
    )
    return {
        size,
        sizeClass,
    }
}

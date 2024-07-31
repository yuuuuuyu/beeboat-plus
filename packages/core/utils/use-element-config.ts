import { useGlobalConfig } from 'element-plus'
import { ref, watch } from 'vue'

export const UseElementConfig = (option: any, props: any) => {
    const size = ref('default')
    const sizeClass = ref('')
    const globalConfig = useGlobalConfig()

    // 监听el-config-provider的配置
    watch(
        () => globalConfig,
        config => {
            if (props?.size) {
                size.value = props.size
                sizeClass.value = `${option.componentName}--${size.value}`
            } else {
                size.value = config.value.size || 'default'
                config.value.size && (sizeClass.value = `${option.componentName}--${size.value}`)
            }
        },
        { immediate: true, deep: true },
    )
    return {
        size,
        sizeClass,
    }
}

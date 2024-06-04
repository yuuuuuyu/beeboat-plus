import beeTheme from '@beeboat/bee-theme'

let first = true
/**
 * TODO beeTheme.start()必须在dom渲染后执行，否则 pnpm docs:build构建报错
 * @param app vue对象
 */
function useBeeTheme(app) {
    app.mixin({
        mounted() {
            if (!first) return
            first = false
            beeTheme.start()
        },
    })
}
export default useBeeTheme

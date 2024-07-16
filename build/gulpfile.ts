// 打包方式：串行(series)  并行(parallel)
import { series, parallel } from 'gulp'
import { genTypes } from './gen-types'
import { withTaskName, run } from './utils'
import { outDir, btRoot, projectRoot, themeRoot, coreRoot, directivesRoot } from './utils/paths'
import { copy, remove } from 'fs-extra'

const copySourceCode = () => async () => {
    await copy(`${btRoot}/package.json`, `${outDir}/package.json`)
    await copy(`${projectRoot}/README.md`, `${outDir}/README.md`)
}
export default series(
    /**
     * clean任务: 删除dist目录/各个package下的es,lib目录
     */
    withTaskName('clean', async () => {
        // 删除dist目录
        await remove(outDir)
        // 删除packages/bee-theme目录下的es,lib目录
        await remove(`${themeRoot}/dist`)
        // 删除core下的es,lib目录
        await remove(`${coreRoot}/dist`)
        // 删除directives下的es,lib目录
        await remove(`${directivesRoot}/dist`)
    }),
    withTaskName('autoPatch', () => run('pnpm --filter ./packages/beeboat-plus auto-patch')),
    withTaskName('buildPackages', () => run('pnpm --filter ./packages --parallel build')),
    parallel(
        withTaskName('buildFullComponent', () => run('pnpm build buildFullComponent')),
        withTaskName('buildComponent', () => run('pnpm build buildComponent')),
    ),
    parallel(genTypes, copySourceCode()),
)

export * from './full-component'
export * from './component'

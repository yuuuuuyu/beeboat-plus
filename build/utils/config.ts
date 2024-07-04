import path from 'path'
import { outDir } from './paths'
export const buildConfig = {
    esm: {
        module: 'ESNext', // tsconfig输出的结果es6模块
        format: 'esm', // 需要配置格式化化后的模块规范
        output: {
            name: 'dist/es', // 打包到dist目录下的那个目录
            alias: 'es',
            path: path.resolve(outDir, 'es'),
        },
        bundle: {
            path: 'beeboat-plus/es',
        },
    },
    cjs: {
        module: 'CommonJS',
        format: 'cjs',
        output: {
            name: 'dist/lib',
            alias: 'lib',
            path: path.resolve(outDir, 'lib'),
        },
        bundle: {
            path: 'beeboat-plus/lib',
        },
    },
}
export type BuildConfig = typeof buildConfig

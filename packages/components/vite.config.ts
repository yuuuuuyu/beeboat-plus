import { defineConfig } from 'vite'
import baseConfig from '../../vite.config'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

import vitePluginCleaned from 'vite-plugin-cleaned'
import VitePluginCopyto from 'vite-plugin-copyto'

export default defineConfig({
    build: {
        ...baseConfig.build,
        lib: {
            // 指定入口文件
            entry: 'src/index.ts',
            // 模块名
            name: 'beeboat_components',
        },
    },
    plugins: [
        ...baseConfig.plugins,
        vitePluginCleaned({
            folder: ['dist'],
        }),
        dts({
            entryRoot: 'src',
            outputDir: 'dist/types',
            tsConfigFilePath: '../../tsconfig.json',
            afterBuild() {
                const cpto = VitePluginCopyto({
                    root: resolve(__dirname),
                    base: 'dist',
                    source: ['es', 'lib', 'types'],
                    dest: '../beeboat-plus',
                })
                cpto.closeBundle()
            },
        }),
    ],
    resolve: {
        alias: {
            '@beeboat/core': resolve(__dirname, '../core'),
        },
    },
})

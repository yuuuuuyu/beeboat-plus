import { defineConfig } from 'vite'
import { resolve } from 'path'
import baseConfig from '../../vite.config'
import dts from 'vite-plugin-dts'

import VitePluginCleaned from 'vite-plugin-cleaned'
import VitePluginCopyto from 'vite-plugin-copyto'

export default defineConfig({
    build: {
        ...baseConfig.build,
        lib: {
            entry: ['src/index.ts', 'src/index.scss'], // scss入口：合并一个文件
            name: 'beeboat_theme',
        },
    },
    plugins: [
        ...baseConfig.plugins,
        VitePluginCleaned({
            folder: ['dist'],
        }),
        dts({
            entryRoot: 'src',
            outputDir: ['dist/es', 'dist/lib'],
            tsConfigFilePath: '../../tsconfig.json',
            afterBuild() {
                const cpto = VitePluginCopyto({
                    base: 'src',
                    source: ['fonts'],
                    dest: './dist/es',
                })
                cpto.closeBundle()
                const cptoAll = VitePluginCopyto({
                    root: resolve(__dirname),
                    base: 'dist',
                    source: ['es', 'lib'],
                    dest: '../beeboat-plus',
                })
                cptoAll.closeBundle()
                const cptoThemeChalk = VitePluginCopyto({
                    base: 'dist/es',
                    source: ['components', 'index.css'],
                    dest: '../beeboat-plus/theme-chalk',
                })
                cptoThemeChalk.closeBundle()
            },
        }),
    ],
})

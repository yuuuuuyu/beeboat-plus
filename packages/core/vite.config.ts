import { defineConfig } from 'vite'
import { resolve } from 'path'
import baseConfig from '../../vite.config'
import dts from 'vite-plugin-dts'

import VitePluginCleaned from 'vite-plugin-cleaned'
import VitePluginCopyto from 'vite-plugin-copyto'

export default defineConfig({
    build: {
        ...baseConfig.build,
    },
    plugins: [
        ...baseConfig.plugins,
        VitePluginCleaned({
            folder: 'dist',
        }),
        dts({
            entryRoot: './',
            outputDir: ['dist/es', 'dist/lib'],
            tsConfigFilePath: '../../tsconfig.json',
            afterBuild() {
                const cpto = VitePluginCopyto({
                    root: resolve(__dirname),
                    base: 'dist',
                    source: ['es', 'lib'],
                    dest: '../beeboat-plus',
                })
                cpto.closeBundle()
            },
        }),
    ],
})

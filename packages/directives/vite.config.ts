import { defineConfig } from 'vite'
import { resolve } from 'path'
import baseConfig from '../../vite.config'
import dts from 'vite-plugin-dts'

import vitePluginCleaned from 'vite-plugin-cleaned'
import vitePluginCopyto from 'vite-plugin-copyto'

export default defineConfig({
    build: {
        ...baseConfig.build,
    },
    plugins: [
        ...baseConfig.plugins,
        vitePluginCleaned({
            folder: 'dist',
        }),
        dts({
            entryRoot: './',
            outputDir: ['dist/es', 'dist/lib'],
            tsConfigFilePath: '../../tsconfig.json',
            afterBuild() {
                const cpto = vitePluginCopyto({
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

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
            outputDir: 'dist/types',
            tsConfigFilePath: '../../tsconfig.json',
            copyDtsFiles: true,
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
})

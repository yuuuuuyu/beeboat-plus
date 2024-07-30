import { defineConfig } from 'vite'
import { resolve } from 'path'
import baseConfig from '../../vite.config'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import DefineOptions from 'unplugin-vue-define-options/vite'

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
            outputDir: 'dist/types',
            tsConfigFilePath: '../../tsconfig.json',
            afterBuild() {
                const cpto = vitePluginCopyto({
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

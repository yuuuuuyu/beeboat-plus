import { defineConfig } from 'vite'
import baseConfig from '../../vite.config'
import dts from 'vite-plugin-dts'

import VitePluginCleaned from 'vite-plugin-cleaned'

export default defineConfig({
    build: {
        ...baseConfig.build,
        rollupOptions: {
            ...baseConfig.build?.rollupOptions,
            output: [
                {
                    format: 'es',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    exports: 'named',
                    dir: 'es',
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    exports: 'named',
                    dir: 'lib',
                },
            ],
        },
    },
    plugins: [
        ...baseConfig.plugins,
        VitePluginCleaned({ folder: ['es', 'lib', 'theme-chalk'] }),
        dts({
            entryRoot: './',
            outputDir: ['es', 'lib'],
            tsConfigFilePath: '../../tsconfig.json',
        }),
    ],
})

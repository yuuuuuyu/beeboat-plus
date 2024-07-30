import { defineConfig } from 'vite'
import baseConfig from '../../vite.config'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import DefineOptions from 'unplugin-vue-define-options/vite'

import VitePluginCleaned from 'vite-plugin-cleaned'
import VitePluginCopyto from 'vite-plugin-copyto'

export default defineConfig({
    ...baseConfig,
    build: {
        minify: false,
        rollupOptions: {
            external: id => {
                const externals = [
                    'vue',
                    'lodash',
                    'lodash-es',
                    'vue-router',
                    '@vueuse/core',
                    'axios',
                    'element-plus',
                    'nprogress',
                    'vue-demi',
                    '@vue_shared',
                    'vue-cookies',
                    'pinia',
                    'uuid',
                ]
                // 匹配直接模块名
                if (externals.includes(id)) {
                    return true
                }
                // 匹配子模块情况，如 nprogress 的子路径
                return externals.some(pkg => id.startsWith(pkg))
            },
            output: [
                {
                    format: 'es',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    exports: 'named',
                    dir: './dist/es',
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    exports: 'named',
                    dir: './dist/lib',
                },
            ],
        },
        lib: {
            entry: './index.ts',
            formats: ['es', 'cjs'],
        },
    },
    plugins: [
        VitePluginCleaned({
            folder: 'dist',
        }),
        vue(),
        DefineOptions(),
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

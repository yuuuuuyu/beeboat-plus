import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite'

import vitePluginCleaned from 'vite-plugin-cleaned'
import VitePluginCopyto from 'vite-plugin-copyto'

export default defineConfig(() => {
    return {
        plugins: [
            vitePluginCleaned({
                folder: ['dist'],
            }),
            vue(),
            DefineOptions(),
            dts({
                entryRoot: 'src',
                outputDir: 'dist/types',
                tsConfigFilePath: './tsconfig.json',
                afterBuild() {
                    const cpto = VitePluginCopyto({
                        root: resolve(__dirname),
                        base: 'dist',
                        source: ['es', 'lib', 'types', 'utils'],
                        dest: '../beeboat-plus',
                    })
                    cpto.closeBundle()
                },
            }),
        ],
        build: {
            rollupOptions: {
                // 将vue模块排除在打包文件之外，使用用这个组件库的项目的vue模块
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
                        '@beeboat/core',
                        'resize-observer',
                        'async-validator',
                        '@ctrl/tinycolor',
                    ]
                    // 匹配直接模块名
                    if (externals.includes(id)) {
                        return true
                    }
                    // 匹配子模块情况，如 nprogress 的子路径
                    return externals.some(pkg => id.startsWith(pkg))
                },

                // 输出配置
                output: [
                    {
                        // 打包成 es module
                        format: 'es',
                        // 重命名
                        entryFileNames: '[name].js',
                        // 打包目录和开发目录对应
                        preserveModules: true,
                        // 输出目录
                        dir: 'dist/es',
                        // 指定保留模块结构的根目录
                        preserveModulesRoot: 'src',
                        exports: 'named',
                    },
                    {
                        // 打包成 commonjs
                        format: 'cjs',
                        // 重命名
                        entryFileNames: '[name].js',
                        // 打包目录和开发目录对应
                        preserveModules: true,
                        // 输出目录
                        dir: 'dist/lib',
                        // 指定保留模块结构的根目录
                        preserveModulesRoot: 'src',
                        exports: 'named',
                    },
                ],
            },
            lib: {
                // 指定入口文件
                entry: 'src/index.ts',
                // 模块名
                name: 'beeboat_components',
            },
        },
        resolve: {
            alias: {
                '@beeboat/core': resolve(__dirname, '../core'),
            },
        },
    } as UserConfig
})

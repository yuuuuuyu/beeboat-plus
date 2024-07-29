import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { resolve } from 'path'

import VitePluginCleaned from 'vite-plugin-cleaned'
import VitePluginCopyto from 'vite-plugin-copyto'
// import VitePluginCopyto from './plugins/index'

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [
            VitePluginCleaned({
                folder: ['dist'],
            }),
            vue(),
            DefineOptions(),
            dts({
                entryRoot: 'src',
                outputDir: 'dist/types',
                tsConfigFilePath: './tsconfig.json',
                // // 如果使用rollupTypes: true会报错，貌似结果是对的
                // rollupTypes: true,
                // copyDtsFiles: true,
                afterBuild() {
                    const cpto = VitePluginCopyto({
                        base: 'src',
                        source: ['fonts', 'types'],
                        dest: './dist/es',
                    })
                    cpto.closeBundle()
                    const cptoAll = VitePluginCopyto({
                        root: resolve(__dirname),
                        base: 'dist',
                        source: ['es', 'lib', 'types'],
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
        build: {
            cssCodeSplit: true, // 开启 CSS 代码分割
            rollupOptions: {
                external: id => {
                    const externals = ['vue', '@ctrl/tinycolor']
                    return externals.includes(id) || externals.some(pkg => id.startsWith(pkg))
                },
                output: [
                    {
                        format: 'es',
                        entryFileNames: '[name].js',
                        preserveModules: true,
                        dir: 'dist/es',
                        preserveModulesRoot: 'src',
                        exports: 'named',
                    },
                    {
                        format: 'cjs',
                        entryFileNames: '[name].js',
                        preserveModules: true,
                        dir: 'dist/lib',
                        preserveModulesRoot: 'src',
                        exports: 'named',
                    },
                ],
            },
            lib: {
                entry: ['src/index.ts', 'src/index.scss'], // scss入口：合并一个文件
                name: 'beeboat_theme',
            },
        },
    } as UserConfig
})

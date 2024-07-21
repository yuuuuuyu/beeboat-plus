import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite'

import postcss from 'rollup-plugin-postcss'

// fs
import pkg from 'fs-extra'
const { copySync, copyFileSync } = pkg

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [
            vue(),
            DefineOptions(),
            dts({
                entryRoot: 'src',
                outputDir: 'dist/types',
                // outputDir: ['dist/es', 'dist/lib'],
                //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
                tsConfigFilePath: './tsconfig.json',
                // // 如果使用rollupTypes: true会报错，貌似结果是对的
                // rollupTypes: true,
                // copyDtsFiles: true,
                afterBuild: () => {
                    // 复制文件的操作
                    // TODO: 复制文件到对应的目录
                    copyFileSync('src/fonts', 'dist/es/fonts')
                    copyFileSync('src/fonts', 'dist/lib/fonts')
                },
            }),
            postcss({
                extract: 'dist/index.css', // 提取CSS到单独文件
                minimize: false, // 最小化CSS
                sourceMap: false,
                modules: false,
                minify: false,
                extensions: ['.scss', '.css'],
                use: [
                    [
                        'sass',
                        {
                            includePaths: ['./src'],
                        },
                    ],
                ],
            }),
        ],
        build: {
            rollupOptions: {
                // 将vue模块排除在打包文件之外，使用用这个组件库的项目的vue模块
                external: id => {
                    const externals = ['vue', '@ctrl/tinycolor']
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
                name: 'beeboat_theme',
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "src/index.scss";`,
                },
            },
            postcss: {
                plugins: [],
            },
        },
    } as UserConfig
})

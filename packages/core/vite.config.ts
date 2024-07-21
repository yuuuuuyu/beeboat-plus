// root/packages/core/vite.config.js
import { defineConfig } from 'vite'
import baseConfig from '../../vite.config'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import DefineOptions from 'unplugin-vue-define-options/vite'

// fs
import pkg from 'fs-extra'
const { copySync } = pkg

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
            input: ['index.ts'],
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
        vue(),
        DefineOptions(),
        dts({
            entryRoot: './',
            outputDir: 'dist/types',
            // outputDir: ['../beeboat-plus/es/src', '../beeboat-plus/lib/src'],
            //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
            tsConfigFilePath: './tsconfig.json',
            afterBuild: () => {
                copySync('dist/es/', '../beeboat-plus/dist/es/core')
                copySync('dist/lib/', '../beeboat-plus/dist/lib/core')
                copySync('dist/types/', '../beeboat-plus/dist/types/core')
            },
        }),
    ],
})

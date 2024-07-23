import { defineConfig } from 'vite'
import baseConfig from '../../vite.config'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import DefineOptions from 'unplugin-vue-define-options/vite'

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
                    // 'vue-cookies',
                    'pinia',
                    'uuid',
                    'resize-observer',
                    'async-validator',
                    '@beeboat/components',
                    '@beeboat/core',
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
        lib: {
            entry: './index.ts',
            formats: ['es', 'cjs'],
        },
    },
    plugins: [
        DefineOptions(),
        dts({
            entryRoot: './',
            outputDir: 'types',
            // outputDir: ['../beeboat-plus/es/src', '../beeboat-plus/lib/src'],
            //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
            tsConfigFilePath: './tsconfig.json',
        }),
    ],
    resolve: {
        alias: {
            '@beeboat/core': resolve(__dirname, '../core'),
            '@beeboat/components': resolve(__dirname, '../components'),
        },
    },
    // logLevel: 'debug', // 开启调试日志
})

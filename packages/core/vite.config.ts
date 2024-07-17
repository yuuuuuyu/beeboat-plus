// root/packages/core/vite.config.js
import { defineConfig } from 'vite'
import baseConfig from '../../vite.config'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

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
    plugins: [vue()],
})
